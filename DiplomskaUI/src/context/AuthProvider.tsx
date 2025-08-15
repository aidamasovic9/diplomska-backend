import React, { createContext, useState, useContext } from "react";
import {UserResponse} from "../api/generated";

const AuthContext = createContext<{
    token: string | null;
    userId: string | null;
    user: UserResponse | null;
    login: (jwt: string) => void;
    logout: () => void;
    setUser: (user: UserResponse) => void;
} | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(sessionStorage.getItem("token"));
    const [user, setUser] = useState<UserResponse | null>(
        JSON.parse(sessionStorage.getItem("currentUser") || "null")
    );

    const login = (jwt: string) => {
        sessionStorage.setItem("token", jwt);
        setToken(jwt);
    };

    const logout = () => {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("currentUser");
        setToken(null);
        setUser(null);
    };

    const updateUser = (userData: UserResponse) => {
        sessionStorage.setItem("currentUser", JSON.stringify(userData));
        setUser(userData);
    };

    const userId = user?.id?.toString() || null;

    return (
        <AuthContext.Provider value={{ token, userId, user, login, logout, setUser: updateUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
};
