

// UserContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, fetchProfile, logoutUser } from '../api/userApi';
import { getToken, setToken, clearToken } from '../authUtils/authUtils';

const UserContext = createContext();

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setTokenState] = useState(getToken());
    const [loading, setLoading] = useState(false);

    // Helper function to load user profile
    const loadUserProfile = async (token) => {
        try {
            const profile = await fetchProfile(token);
            setUser(profile.user);
        } catch (error) {
            console.error('Failed to fetch user profile:', error);
        }
    };

    // Function to log in a user
    const login = async (credentials) => {
        setLoading(true);
        try {
            const userToken = await loginUser(credentials);
            setTokenState(userToken);
            setToken(userToken); // Save token to localStorage
            await loadUserProfile(userToken);
        } catch (error) {
            console.error('Login failed:', error);
        } finally {
            setLoading(false);
        }
    };

    // Function to log out a user
    const logout = async () => {
        setLoading(true);
        try {
            await logoutUser();
            setUser(null);
            setTokenState(null);
            clearToken(); // Clear token from localStorage
        } catch (error) {
            console.error('Logout failed:', error);
        } finally {
            setLoading(false);
        }
    };

    // Automatically load user profile on token change
    useEffect(() => {
        if (token) {
            loadUserProfile(token);
        }
    }, [token]);

    return (
        <UserContext.Provider value={{ user, token, loading, login, logout }}>
            {children}
        </UserContext.Provider>
    );
}

// Custom hook for consuming user context
export function useUser() {
    return useContext(UserContext);
}


// 