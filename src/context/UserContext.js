

import React, { createContext, useContext, useState } from 'react';
import { fetchProfile, logoutUser } from '../api/userApi';

const UserContext = createContext();

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('access_token') || '');
    const [loading, setLoading] = useState(false);

    const login = async (userToken) => {
        setToken(userToken);
        localStorage.setItem('access_token', userToken);
        setLoading(true);
        try {
            const profile = await fetchProfile(userToken);
            setUser(profile.user);
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            await logoutUser(); // Ensure the API call is successful
            setUser(null);
            setToken('');
            localStorage.removeItem('access_token'); // Clear token from local storage
        } catch (error) {
            console.error('Logout failed:', error); // Log error if logout fails
        }
    };
    

    return (
        <UserContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    return useContext(UserContext);
}

