"use client";

import { OHLCData } from "@/lib/api";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { cn } from "@/lib/utils";

interface CompactOHLCChartProps {
    data: OHLCData[];
    tweetDate: string;
    sentiment?: "BULLISH" | "BEARISH" | "NEUTRAL";
    className?: string;
}

export const CompactOHLCChart = ({
    data,
    tweetDate,
    sentiment,
    className
}: CompactOHLCChartProps) => {
    if (!data || data.length === 0) return null;

    const sentimentColor = sentiment === "BULLISH" ? "#10b981" : sentiment === "BEARISH" ? "#ef4444" : "#64748b";

    // Find the price at tweet time
    const tweetTime = new Date(tweetDate).getTime();
    const tweetCandle = data.find(d => tweetTime >= d.openTime && tweetTime <= d.closeTime);
    const tweetPrice = tweetCandle?.close;

    return (
        <div className={cn("w-full", className)}>
            <ResponsiveContainer width="100%" height={120}>
                <LineChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                    <XAxis
                        dataKey="openTime"
                        tick={{ fontSize: 10, fill: "#64748b" }}
                        tickFormatter={(value) => {
                            const date = new Date(value);
                            return `${date.getMonth() + 1}/${date.getDate()}`;
                        }}
                        stroke="#334155"
                    />
                    <YAxis
                        tick={{ fontSize: 10, fill: "#64748b" }}
                        domain={['auto', 'auto']}
                        stroke="#334155"
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: "#1e293b",
                            border: "1px solid #334155",
                            borderRadius: "8px",
                            fontSize: "12px"
                        }}
                        labelStyle={{ color: "#94a3b8" }}
                        itemStyle={{ color: "#e2e8f0" }}
                        labelFormatter={(value) => {
                            const date = new Date(value);
                            return date.toLocaleString();
                        }}
                    />
                    {tweetPrice && (
                        <ReferenceLine
                            y={tweetPrice}
                            stroke="#6366f1"
                            strokeDasharray="3 3"
                            label={{ value: "Tweet", position: "right", fill: "#6366f1", fontSize: 10 }}
                        />
                    )}
                    <Line
                        type="monotone"
                        dataKey="close"
                        stroke={sentimentColor}
                        strokeWidth={2}
                        dot={false}
                        activeDot={{ r: 4 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};
