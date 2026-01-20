"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { login as apiLogin, register as apiRegister, getMe, googleOAuthCallback, AuthResponse } from "@/lib/api";

interface User {
    id: string;
    name: string;
    email: string;
    avatar: string;
    role?: string;
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string, fullName: string) => Promise<void>;
    handleGoogleCallback: (code: string) => Promise<void>;
    logout: () => void;
    isLoading: boolean;
    error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TOKEN_KEY = "auth_token";
const USER_KEY = "auth_user";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Load user and token from sessionStorage on mount and fetch fresh user data
    useEffect(() => {
        const storedToken = sessionStorage.getItem(TOKEN_KEY);
        const storedUser = sessionStorage.getItem(USER_KEY);
        
        if (storedToken) {
            setToken(storedToken);
            
            // Try to load from sessionStorage first for immediate UI update
            if (storedUser) {
                try {
                    const parsedUser = JSON.parse(storedUser);
                    setUser(parsedUser);
                } catch (error) {
                    console.error("Failed to parse stored user:", error);
                }
            }
            
            // Fetch fresh user data from API
            getMe(storedToken)
                .then((userData) => {
                    const user: User = {
                        id: userData.id,
                        name: userData.full_name || userData.email.split("@")[0],
                        email: userData.email,
                        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.email}`,
                        role: userData.role,
                    };
                    setUser(user);
                    sessionStorage.setItem(USER_KEY, JSON.stringify(user));
                })
                .catch((error) => {
                    console.error("Failed to fetch user info:", error);
                    // If token is invalid, clear everything
                    if (error.message.includes("Invalid token") || error.message.includes("Unauthorized")) {
                        sessionStorage.removeItem(TOKEN_KEY);
                        sessionStorage.removeItem(USER_KEY);
                        setToken(null);
                        setUser(null);
                    }
                });
        }
    }, []);

    const login = async (email: string, password: string) => {
        setIsLoading(true);
        setError(null);
        
        try {
            const response: AuthResponse = await apiLogin({ email, password });
            
            const userData: User = {
                id: response.user.id,
                name: response.user.full_name || email.split("@")[0],
                email: response.user.email,
                avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${response.user.email}`,
                role: response.user.role,
            };

            setUser(userData);
            setToken(response.token);
            
            // Store in sessionStorage
            sessionStorage.setItem(TOKEN_KEY, response.token);
            sessionStorage.setItem(USER_KEY, JSON.stringify(userData));
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Login failed";
            setError(errorMessage);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (email: string, password: string, fullName: string) => {
        setIsLoading(true);
        setError(null);
        
        try {
            const response: AuthResponse = await apiRegister({ email, password, fullName });
            
            const userData: User = {
                id: response.user.id,
                name: response.user.full_name || fullName,
                email: response.user.email,
                avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${response.user.email}`,
                role: response.user.role,
            };

            setUser(userData);
            setToken(response.token);
            
            // Store in sessionStorage
            sessionStorage.setItem(TOKEN_KEY, response.token);
            sessionStorage.setItem(USER_KEY, JSON.stringify(userData));
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Registration failed";
            setError(errorMessage);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleCallback = async (code: string) => {
        setIsLoading(true);
        setError(null);
        
        try {
            const response: AuthResponse = await googleOAuthCallback(code);
            
            const userData: User = {
                id: response.user.id,
                name: response.user.full_name || response.user.email.split("@")[0],
                email: response.user.email,
                avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${response.user.email}`,
                role: response.user.role,
            };

            setUser(userData);
            setToken(response.token);
            
            // Store in sessionStorage
            sessionStorage.setItem(TOKEN_KEY, response.token);
            sessionStorage.setItem(USER_KEY, JSON.stringify(userData));
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Google authentication failed";
            setError(errorMessage);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        sessionStorage.removeItem(TOKEN_KEY);
        sessionStorage.removeItem(USER_KEY);
    };

    return (
        <AuthContext.Provider value={{ user, token, login, register, handleGoogleCallback, logout, isLoading, error }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
