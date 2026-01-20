/**
 * SocketService
 * Manages WebSocket connection for real-time leaderboard updates and score changes.
 */

type EventType = 'score_changed' | 'leaderboard_updated' | 'connected' | 'error' | 'pong';

type EventCallback = (data: any) => void;

interface WebSocketMessage {
    type: EventType;
    data?: any;
    message?: string;
    timestamp?: string;
}

class SocketService {
    private ws: WebSocket | null = null;
    private reconnectAttempts = 0;
    private maxReconnectAttempts = 5;
    private reconnectDelay = 3000; // 3 seconds
    private reconnectTimer: NodeJS.Timeout | null = null;
    private eventListeners: Map<EventType, Set<EventCallback>> = new Map();
    private subscriptions: Set<string> = new Set();
    private isConnecting = false;
    private pingInterval: NodeJS.Timeout | null = null;
    private readonly PING_INTERVAL = 30000; // 30 seconds

    constructor() {
        // Auto-reconnect on page visibility change
        if (typeof window !== 'undefined') {
            document.addEventListener('visibilitychange', () => {
                if (document.visibilityState === 'visible' && !this.isConnected()) {
                    this.connect();
                }
            });
        }
    }

    /**
     * Connect to WebSocket server
     */
    connect(): void {
        if (this.isConnecting || this.isConnected()) {
            return;
        }

        this.isConnecting = true;

        // Determine WebSocket URL
        // Use the same base URL as the API (from api.ts)
        const apiBaseUrl = typeof window !== 'undefined' 
            ? (process.env.NEXT_PUBLIC_API_URL || 'https://api.finfluencer.tr')
            : 'https://api.finfluencer.tr';
        
        // Convert HTTP/HTTPS to WS/WSS
        const wsUrl = apiBaseUrl
            .replace(/^https:/, 'wss:')
            .replace(/^http:/, 'ws:')
            .replace(/\/$/, '') + '/ws';

        try {
            this.ws = new WebSocket(wsUrl);

            this.ws.onopen = () => {
                console.log('🔌 WebSocket connected');
                this.isConnecting = false;
                this.reconnectAttempts = 0;

                // Subscribe to channels
                if (this.subscriptions.size > 0) {
                    this.subscribe(Array.from(this.subscriptions));
                } else {
                    // Default subscriptions
                    this.subscribe(['leaderboard', 'scores']);
                }

                // Start ping interval
                this.startPingInterval();
            };

            this.ws.onmessage = (event) => {
                try {
                    const message: WebSocketMessage = JSON.parse(event.data);
                    this.handleMessage(message);
                } catch (error) {
                    console.error('Error parsing WebSocket message:', error);
                }
            };

            this.ws.onerror = (error) => {
                console.error('WebSocket error:', error);
                this.isConnecting = false;
            };

            this.ws.onclose = () => {
                console.log('🔌 WebSocket disconnected');
                this.isConnecting = false;
                this.stopPingInterval();
                this.scheduleReconnect();
            };
        } catch (error) {
            console.error('Failed to create WebSocket connection:', error);
            this.isConnecting = false;
            this.scheduleReconnect();
        }
    }

    /**
     * Disconnect from WebSocket server
     */
    disconnect(): void {
        if (this.reconnectTimer) {
            clearTimeout(this.reconnectTimer);
            this.reconnectTimer = null;
        }
        this.stopPingInterval();
        if (this.ws) {
            this.ws.close();
            this.ws = null;
        }
    }

    /**
     * Check if WebSocket is connected
     */
    isConnected(): boolean {
        return this.ws !== null && this.ws.readyState === WebSocket.OPEN;
    }

    /**
     * Subscribe to channels
     */
    subscribe(channels: string[]): void {
        channels.forEach(ch => this.subscriptions.add(ch));

        if (this.isConnected() && this.ws) {
            this.ws.send(JSON.stringify({
                type: 'subscribe',
                channels
            }));
        }
    }

    /**
     * Unsubscribe from channels
     */
    unsubscribe(channels: string[]): void {
        channels.forEach(ch => this.subscriptions.delete(ch));

        if (this.isConnected() && this.ws) {
            this.ws.send(JSON.stringify({
                type: 'unsubscribe',
                channels
            }));
        }
    }

    /**
     * Add event listener
     */
    on(event: EventType, callback: EventCallback): () => void {
        if (!this.eventListeners.has(event)) {
            this.eventListeners.set(event, new Set());
        }
        this.eventListeners.get(event)!.add(callback);

        // Return unsubscribe function
        return () => {
            const callbacks = this.eventListeners.get(event);
            if (callbacks) {
                callbacks.delete(callback);
            }
        };
    }

    /**
     * Remove event listener
     */
    off(event: EventType, callback: EventCallback): void {
        const callbacks = this.eventListeners.get(event);
        if (callbacks) {
            callbacks.delete(callback);
        }
    }

    /**
     * Handle incoming WebSocket message
     */
    private handleMessage(message: WebSocketMessage): void {
        const { type, data, message: msg } = message;

        switch (type) {
            case 'connected':
                console.log('✅ WebSocket connection confirmed');
                break;

            case 'pong':
                // Keep-alive response
                break;

            case 'subscribed':
                console.log('📡 Subscribed to channels:', data?.channels || []);
                break;

            case 'unsubscribed':
                console.log('📡 Unsubscribed from channels:', data?.channels || []);
                break;

            case 'error':
                console.error('WebSocket error:', msg || data);
                break;

            case 'score_changed':
            case 'leaderboard_updated':
                // Emit to listeners
                const callbacks = this.eventListeners.get(type);
                if (callbacks) {
                    callbacks.forEach(callback => {
                        try {
                            callback(data);
                        } catch (error) {
                            console.error('Error in event callback:', error);
                        }
                    });
                }
                break;

            default:
                console.log('Unknown WebSocket message type:', type);
        }
    }

    /**
     * Schedule reconnection attempt
     */
    private scheduleReconnect(): void {
        if (this.reconnectAttempts >= this.maxReconnectAttempts) {
            console.error('Max reconnection attempts reached');
            return;
        }

        if (this.reconnectTimer) {
            return; // Already scheduled
        }

        this.reconnectAttempts++;
        const delay = this.reconnectDelay * this.reconnectAttempts;

        console.log(`🔄 Scheduling reconnection attempt ${this.reconnectAttempts}/${this.maxReconnectAttempts} in ${delay}ms`);

        this.reconnectTimer = setTimeout(() => {
            this.reconnectTimer = null;
            this.connect();
        }, delay);
    }

    /**
     * Start ping interval for keep-alive
     */
    private startPingInterval(): void {
        this.stopPingInterval();
        this.pingInterval = setInterval(() => {
            if (this.isConnected() && this.ws) {
                this.ws.send(JSON.stringify({ type: 'ping' }));
            }
        }, this.PING_INTERVAL);
    }

    /**
     * Stop ping interval
     */
    private stopPingInterval(): void {
        if (this.pingInterval) {
            clearInterval(this.pingInterval);
            this.pingInterval = null;
        }
    }
}

// Export singleton instance
export const socketService = new SocketService();
