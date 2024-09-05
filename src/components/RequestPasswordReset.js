

// src/components/RequestPasswordReset.js
import React, { useState } from 'react';
import { requestPasswordReset } from '../api/userApi';

const RequestPasswordReset = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        try {
            await requestPasswordReset(email);
            setMessage('A password reset link has been sent to your email.');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div>
            <h2>Request Password Reset</h2>
            {message && <p style={{ color: 'green' }}>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Request Reset</button>
            </form>
        </div>
    );
};

export default RequestPasswordReset;
