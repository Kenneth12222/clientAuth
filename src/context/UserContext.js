import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, fetchProfile, logoutUser } from '../api/userApi';
import { getToken, setToken, clearToken } from '../authUtils/authUtils';

const UserContext = createContext();

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setTokenState] = useState(getToken());
    const [loading, setLoading] = useState(false);
    const [loginLoading, setLoginLoading] = useState(false);
    const [profileLoading, setProfileLoading] = useState(false);

    // Helper function to load user profile
    const loadUserProfile = async () => {
        if (!token) return;
        setProfileLoading(true);
        try {
            const profile = await fetchProfile();
            setUser(profile.user);
        } catch (error) {
            console.error('Failed to fetch user profile:', error);
            clearToken();
            setTokenState(null);
        } finally {
            setProfileLoading(false);
        }
    };

    // Function to log in a user
    const login = async (credentials) => {
        setLoginLoading(true);
        try {
            const userToken = await loginUser(credentials);
            setTokenState(userToken);
            setToken(userToken); // Save token to localStorage
            await loadUserProfile();
        } catch (error) {
            console.error('Login failed:', error);
        } finally {
            setLoginLoading(false);
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
        loadUserProfile();
    }, [token]);

    return (
        <UserContext.Provider
            value={{
                user,
                token,
                loading,
                loginLoading,
                profileLoading,
                login,
                logout,
            }}
        >
            {children}
        </UserContext.Provider>
    );
}

// Custom hook for consuming user context
export function useUser() {
    return useContext(UserContext);
}
