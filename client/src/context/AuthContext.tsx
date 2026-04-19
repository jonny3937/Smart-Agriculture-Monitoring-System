import React, { createContext, useState, useEffect, ReactNode } from 'react';
import api from '../services/api';

interface AuthContextType {
    user: any;
    login: (email: string, password: string) => Promise<any>;
    logout: () => void;
    loading: boolean;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const verifyUser = async () => {
            try {
                const { data } = await api.get('/users/me');
                setUser(data);
            } catch (err) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        verifyUser();
    }, []);

    const login = async (email: any, password: any) => {
        const { data } = await api.post('/users/login', { email, password });
        setUser(data.user);
        return data.user;
    };

    const logout = async () => {
        try {
            await api.post('/users/logout');
        } catch (err) {
            console.error('Logout failed', err);
        } finally {
            setUser(null);
            // Optional: Redirect to login or clear other states
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
