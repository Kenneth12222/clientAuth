

import axios from 'axios';

// Base API URL
const API_URL = process.env.REACT_APP_API_URL;

// Helper to handle responses and errors
async function handleResponse(response) {
    if (response.status >= 400) {
        const errorData = response.data;
        throw new Error(errorData.message || 'Something went wrong');
    }
    return response.data;
}

export async function registerUser(userData) {
    try {
        const response = await axios.post(`${API_URL}/register`, userData, {
            headers: {
                'Content-Type': 'multipart/form-data', 
            },
        });
        return handleResponse(response);
    } catch (error) {
        throw error;
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



// export async function fetchUserImages(token) {
//     try {
//         const response = await axios.get(`${API_URL}/my-images`, {
//             headers: {
//                 'Authorization': `Bearer ${token}`,  // Ensure 'Bearer' is included
//             },
//         });
//         return handleResponse(response);
//     } catch (error) {
//         throw error;
//     }
// }


console.log(process.env.REACT_APP_API_URL);


