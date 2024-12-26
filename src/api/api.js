

// api.js
import axios from 'axios';

// Base API URL from environment
export const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';
const MAX_RETRIES = 3;
// Handles all API requests
async function apiRequest(method, path, data = null, token = null, contentType = 'application/json', retries = 0) {
    const headers = {
        'Content-Type': contentType,
        ...(token && { 'Authoeization': `Bearer ${token}` }),
    };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    try {
        const response = await axios({
            method,
            url: `${API_URL}${path}`,
            data,
            headers,
        });
        return response.data;
    } catch (error) {
        if (retries < MAX_RETRIES && error.response?.status >= 500) {
            console.warn(`Retrying request to ${path}...(${retries + 1}/${MAX_RETRIES})`)
            await new Promise(resolve => setTimeout(resolve, 1000 * (retries + 1)))
            return apiRequest(method, path, data, token, contentType, retries + 1)
        } 
        return { error: error.response ? error.response.data : 'Unknown error' }
    }
}

// Reusable CRUD functions
export function get(path, token) {
    return apiRequest('get', path, null, token);
}

export function post(path, data, token, contentType = 'application/json') {
    return apiRequest('post', path, data, token, contentType);
}

export function put(path, data, token) {
    return apiRequest('put', path, data, token);
}

export function del(path, token) {
    return apiRequest('delete', path, null, token);
}


