import axios from 'axios';
import { clearToken } from '../authUtils/authUtils';

export const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';
const MAX_RETRIES = 3;

// Handles all API requests
async function apiRequest(method, path, data = null, token = null, contentType = 'application/json', retries = 0) {
    const headers = {
        'Content-Type': contentType,
        ...(token && { Authorization: `Bearer ${token}` }),
    };

    try {
        const response = await axios({
            method,
            url: `${API_URL}${path}`,
            data,
            headers,
        });
        return response.data;
    } catch (error) {
        const status = error.response?.status;
        const errorMessage = error.response?.data || 'Unknown error';

        // Handle unauthorized error globally
        if (status === 401) {
            console.warn('Unauthorized request. Redirecting to login...');
            clearToken();
            window.location.href = '/login'; // Adjust as per your routing
            return;
        }

        // Retry for server errors
        if (retries < MAX_RETRIES && status >= 500) {
            console.warn(`Retrying request to ${path}...(${retries + 1}/${MAX_RETRIES})`);
            await new Promise((resolve) =>
                setTimeout(resolve, 1000 * (retries + 1) + Math.random() * 500)
            );
            return apiRequest(method, path, data, token, contentType, retries + 1);
        }

        // Throw the error for caller to handle
        throw { status, message: errorMessage };
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


































// // api.js

// import axios from 'axios';

// export const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';
// const MAX_RETRIES = 3;

// // Handles all API requests
// async function apiRequest(method, path, data = null, token = null, contentType = 'application/json', retries = 0) {
//     const headers = {
//         'Content-Type': contentType,
//         ...(token && { Authorization: `Bearer ${token}` }), 
//     };

//     try {
//         const response = await axios({
//             method,
//             url: `${API_URL}${path}`,
//             data,
//             headers,
//         });
//         return response.data;
//     } catch (error) {
//         if (retries < MAX_RETRIES && error.response?.status >= 500) {
//             console.warn(`Retrying request to ${path}...(${retries + 1}/${MAX_RETRIES})`);
//             await new Promise((resolve) => setTimeout(resolve, 1000 * (retries + 1)));
//             return apiRequest(method, path, data, token, contentType, retries + 1);
//         }

//         // Return detailed error information
//         const errorMessage = error.response?.data || 'Unknown error';
//         const status = error.response?.status || 'No status code';
//         return { error: errorMessage, status };
//     }
// }

// // Reusable CRUD functions
// export function get(path, token) {
//     return apiRequest('get', path, null, token);
// }

// export function post(path, data, token, contentType = 'application/json') {
//     return apiRequest('post', path, data, token, contentType);
// }

// export function put(path, data, token) {
//     return apiRequest('put', path, data, token);
// }

// export function del(path, token) {
//     return apiRequest('delete', path, null, token);
// }

