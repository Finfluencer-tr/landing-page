"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface User {
    id: string;
    name: string;
    email: string;
    avatar: string;
}

interface AuthContextType {
    user: User | null;
    login: (email: string) => void;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const login = (email: string) => {
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setUser({
                id: "u_123",
                name: "Demo User",
                email: email,
                avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
            });
            setIsLoading(false);
        }, 1000);
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoading }}>
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
