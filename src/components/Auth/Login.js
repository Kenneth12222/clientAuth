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
    const [formData, setFormData] = useState({ username: '', password: '' });
    const { login, loading } = useUser();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isSubmitting) return;

        setIsSubmitting(true);
        try {
            await login(formData);

            toast.success('Login successful!');
            setShowLogin(false);

            setTimeout(() => navigate('/'), 2000);
        } catch (error) {
            const errorMessage =
                error.response?.status === 401
                    ? 'Invalid username or password. Please try again.'
                    : error.message || 'An unexpected error occurred. Please try again later.';
            toast.error(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div>
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
                            value={formData.username}
                            onChange={handleChange}
                            id="username"
                        />
                        <InputField
                            label="Password:"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            id="password"
                        />
                        <button
                            type="submit"
                            disabled={loading || isSubmitting}
                            aria-busy={loading || isSubmitting}
                        >
                            {loading || isSubmitting ? 'Logging in...' : 'Login'}
                        </button>
                        <p>
                            Don't have an account? <Link to="/register">Register</Link>
                        </p>
                        <p>
                            Forgot your password?{' '}
                            <Link to="/request-password-reset">Reset Password</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
