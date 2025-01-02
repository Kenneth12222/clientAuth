
// // userApi.js
// import { post, get } from './api';

// // Auth-related endpoints
// export const registerUser = (userData) => post('/register', userData, null, 'multipart/form-data');
// export const loginUser = (userData) => post('/login', userData).then(data => data.access_token);
// export const fetchProfile = (token) => get('/profile', token);
// export const logoutUser = () => post('/logout', {}, localStorage.getItem('access_token'));

// // Password management
// export const requestPasswordReset = (email) => post('/request-reset', { email });
// export const resetPassword = (token, newPassword) => post(`/reset-password/${token}`, { new_password: newPassword });

// // Image management
// export const uploadImage = (formData, token) => post('/upload-image', formData, token, 'multipart/form-data');
// export const fetchUserImages = (token) => get('/my-images', token);











// api.js
import axios from 'axios';

// Base API URL
const API_URL = process.env.REACT_APP_API_URL;

// Helper to handle responses and errors
// This function handles the response from the API
async function handleResponse(response) {
    // Check if the response status indicates an error
    if (response.status >= 400) {
        // Extract the error message from the response
        const errorData = response.data; // This will give you the data object from the response
        throw new Error(errorData.message || 'Something went wrong');
    }
    return response.data; // Return the data if successful
}

// This function handles user registration
export async function registerUser(userData) {
    try {
        const response = await axios.post(`${API_URL}/register`, userData, {
            headers: {
                'Content-Type': 'multipart/form-data', 
            },
        });
        // Call the handleResponse function to process the response
        return handleResponse(response);
    } catch (error) {
        // Handle the error (you might want to log it or show it to the user)
        console.error('Registration error:', error);
        throw error; // Rethrow the error for further handling
    }
}

export async function loginUser(userData) {
    try {
        const response = await axios.post(`${API_URL}/login`, userData);
        const data = await handleResponse(response);
        return data.access_token;
    } catch (error) {
        throw error;
    }
}

export async function fetchProfile(token) {
    try {
        const response = await axios.get(`${API_URL}/profile`, {
            headers: {
                'Authorization': `Bearer ${token}`, 
            },
        });
        return handleResponse(response);
        
    } catch (error) {
        throw error;
    }
    
}


export async function logoutUser() {
    try {
        const response = await axios.post(`${API_URL}/logout`, {}, {
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
        const response = await axios.post(`${API_URL}/request-reset`, { email });
        return handleResponse(response);
    } catch (error) {
        throw error;
    }
}


export async function resetPassword(token, newPassword) {
    try {
        const response = await axios.post(`${API_URL}/reset-password/${token}`, 
            { new_password: newPassword });
        return handleResponse(response);
    } catch (error) {
        console.error('Error resetting password:', error);
        throw error;
    }
}


// Upload Image
export async function uploadImage(formData, token) {
    try {
        const response = await axios.post(`${API_URL}/upload-image`, formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        });
        return handleResponse(response);
    } catch (error) {
        throw error;
    }
}

export async function fetchUserImages(token) {
    try {
        const response = await axios.get(`${API_URL}/my-images`, {
            headers: {
                'Authorization': `Bearer ${token}`,  // Ensure 'Bearer' is included
            },
        });
        return handleResponse(response);
    } catch (error) {
        throw error;
    }
}

// Programmer12=>$
