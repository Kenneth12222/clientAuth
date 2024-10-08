

import React, { useState } from 'react';
import '../../styles/Register.css'
import { registerUser } from '../../api/userApi';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        bio: '',
        location: '',
        nationality: '',
        profilePic: null
    });
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: name === 'profilePic' ? files[0] : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        try {
            const formDataToSend = new FormData();
            Object.keys(formData).forEach(key => formDataToSend.append(key, formData[key]));

            const response = await registerUser(formDataToSend);

            if (response.ok) {
                // Handle successful registration
                setSuccessMessage('Registration successful! Redirecting you to the login page...');
                setFormData({
                    username: '',
                    email: '',
                    password: '',
                    bio: '',
                    location: '',
                    nationality: '',
                    profilePic: null
                });
                // Redirect after a delay
                setTimeout(() => navigate('/login'), 2000);
            } else {
                const data = await response.json();
                setError(data.message || 'An error occurred during registration');
            }
        } catch (error) {
            setError('A network error occurred. Please try again later.');
        }
    };

    return (
        <div className="form">
            <div className="auth-container">
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Username"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password"
                        required
                    />
                    <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        placeholder="Bio"
                    />
                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="Location"
                    />
                    <input
                        type="text"
                        name="nationality"
                        value={formData.nationality}
                        onChange={handleChange}
                        placeholder="Nationality"
                    />
                    <input
                        type="file"
                        name="profilePic"
                        onChange={handleChange}
                    />
                    {error && <p className="error">{error}</p>}
                    {successMessage && <p className="success">{successMessage}</p>}
                    <button type="submit">Register</button>
                    <p>Already have an account? <Link to="/login">Login</Link></p>
                </form>
            </div>
        </div>
    );
};

export default Register;


