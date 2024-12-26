

// UserContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, fetchProfile, logoutUser } from '../api/userApi';

const UserContext = createContext();

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('access_token'));
    const [loading, setLoading] = useState(false);

    // Function to log in a user
    const login = async (credentials) => {
        setLoading(true);
        try {
            const userToken = await loginUser(credentials);
            setToken(userToken);
            localStorage.setItem('access_token', userToken);
            await loadUserProfile(userToken);
        } catch (error) {
            console.error('Login failed:', error);
        } finally {
            setLoading(false);
        }
    };

    // Fetch user profile and set user state
    const loadUserProfile = async (userToken) => {
        try {
            const profile = await fetchProfile(userToken);
            setUser(profile.user);
        } catch (error) {
            console.error('Fetching profile failed:', error);
        }
    };

    // Logout functionality
    const logout = async () => {
        setLoading(true);
        try {
            await logoutUser();
            setUser(null);
            setToken(null);
            localStorage.removeItem('access_token');
        } catch (error) {
            console.error('Logout failed:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Load user profile if token is found in localStorage
        if (token) loadUserProfile(token);
    }, [token]);

    return (
        <UserContext.Provider value={{ user, token, loading, login, logout }}>
            {children}
        </UserContext.Provider>
    );
}

// Custom hook to access user context
export function useUser() {
    return useContext(UserContext);
}
