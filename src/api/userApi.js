import axios from 'axios';

// Base API URL
const API_URL = process.env.REACT_APP_API_URL;

const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Helper to handle responses and errors
async function handleResponse(response) {
    if (response.status >= 400) {
        const errorData = response.data;
        throw new Error(errorData.message || 'Something went wrong');
    }
    return response.data;
}

// Register User
export async function registerUser(userData) {
    try {
        const response = await apiClient.post('/register', userData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Overriding headers for this specific request
            },
        });
        return handleResponse(response);
    } catch (error) {
        throw error;
    }
}

// Login User
export async function loginUser(userData) {
    try {
        const response = await apiClient.post('/login', userData);
        const data = await handleResponse(response);
        return data.access_token;
    } catch (error) {
        throw error;
    }
}

// Fetch Profile
export async function fetchProfile(token) {
    try {
        const response = await apiClient.get('/profile', {
            headers: {
                'Authorization': `Bearer ${token}`, // Adding authorization token
            },
        });
        return handleResponse(response);
    } catch (error) {
        throw error;
    }
}

// Logout User
export async function logoutUser() {
    try {
        const response = await apiClient.post('/logout', {}, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
            },
        });
        if (response.status === 200) {
            localStorage.removeItem('access_token');
        } else {
            throw new Error('Failed to logout');
        }
    } catch (error) {
        throw error;
    }
}

// Request Password Reset
export async function requestPasswordReset(email) {
    try {
        const response = await apiClient.post('/request-reset', { email });
        return handleResponse(response);
    } catch (error) {
        throw error;
    }
}

// Reset Password
export async function resetPassword(token, newPassword) {
    try {
        const response = await apiClient.post(`/reset-password/${token}`, {
            new_password: newPassword,
        });
        return handleResponse(response);
    } catch (error) {
        throw error;
    }
}


