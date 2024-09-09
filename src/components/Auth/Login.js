import React, { useState } from 'react';
import { useUser } from '../../context/UserContext';
import { loginUser } from '../../api/userApi';
import { Link, useNavigate } from 'react-router-dom';
import '../Auth.css';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login, loading } = useUser();
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            const token = await loginUser({ username, password });
            localStorage.setItem('access_token', token);
            login(token);
            navigate('/profile');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="auth-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </label>
                <label>
                    Password:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </label>
                {error && <p className="error">{error}</p>}
                <button type="submit" disabled={loading}>Login</button>
                <p>Don't have an account? <Link to="/register">Register</Link></p>
                <p>Forgot your password? <Link to="/request-password-reset">Reset Password</Link></p>
            </form>
        </div>
    );
}

export default Login;
