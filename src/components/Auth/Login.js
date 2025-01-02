// 

import React, { useState } from 'react';
import { useUser } from '../../context/UserContext';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../Auth.css';

// Reusable InputField Component
const InputField = ({ label, type, value, onChange, id }) => (
    <label htmlFor={id}>
        {label}
        <input
            id={id}
            type={type}
            value={value}
            onChange={onChange}
            required
            aria-label={label}
        />
    </label>
);

function Login({ setShowLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login, loading } = useUser();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isSubmitting) return; // Prevent multiple submissions

        setIsSubmitting(true);
        try {
            // Call the login function from UserContext
            await login({ username, password });

            // Display success toast and close the login form
            toast.success('Login successful!');
            setShowLogin(false);

            // Redirect to home page after a short delay
            setTimeout(() => navigate('/'), 2000);
        } catch (error) {
            // Handle different types of errors explicitly
            if (error.response?.status === 401) {
                toast.error('Invalid username or password. Please try again.');
            } else {
                toast.error(error.message || 'An unexpected error occurred. Please try again later.');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <div className="overlay" onClick={() => setShowLogin(false)}></div>
            <div className="form">
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    closeOnClick
                    pauseOnHover
                    draggable
                    aria-live="assertive"
                />
                <div className="auth-container">
                    <h2>Login</h2>
                    <form onSubmit={handleSubmit}>
                        <InputField
                            label="Username:"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            id="username"
                        />
                        <InputField
                            label="Password:"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            id="password"
                        />
                        <button type="submit" disabled={loading || isSubmitting}>
                            {loading || isSubmitting ? 'Logging in...' : 'Login'}
                        </button>
                        <p>Don't have an account? <Link to="/register">Register</Link></p>
                        <p>Forgot your password? <Link to="/request-password-reset">Reset Password</Link></p>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Login;


// 