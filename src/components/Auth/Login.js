

import React, { useState } from 'react';
import { useUser } from '../../context/UserContext';
import { loginUser } from '../../api/userApi';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../Auth.css';

function Login({ setShowLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login, loading } = useUser();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = await loginUser({ username, password });
            localStorage.setItem('access_token', token);
            login(token);
            
            // Display success toast and close the login form
            toast.success('Login successful!');
            setShowLogin(false);

            // Redirect to home page
            setTimeout(() => navigate('/'), 2000);

        } catch (error) {
            // Display error toast
            toast.error(error.message || 'An error occurred during login');
        }
    };

    return (
        <>
            <div className="overlay" onClick={() => setShowLogin(false)}></div>
            <div className="form">
                <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} closeOnClick pauseOnHover draggable />
                <div className="auth-container">
                    <h2>Login</h2>
                    <form onSubmit={handleSubmit}>
                        <label>
                            Username:
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </label>
                        <label>
                            Password:
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </label>
                        <button type="submit" disabled={loading}>
                            {loading ? 'Logging in...' : 'Login'}
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











// import React, { useState } from 'react';
// import { useUser } from '../../context/UserContext';
// import { loginUser } from '../../api/userApi';
// import { Link, useNavigate } from 'react-router-dom';
// import '../Auth.css';

// function Login({ setShowLogin }) {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const { login, loading } = useUser();
//     const [error, setError] = useState(null);
//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError(null);
//         try {
//             const token = await loginUser({ username, password });
//             localStorage.setItem('access_token', token);
//             login(token);
//             setShowLogin(false); // Close the login form after successful login
//             navigate('/'); // Redirect to home
//         } catch (error) {
//             setError(error.message);
//         }
//     };

//     return (
//         <>
//             <div className="overlay" onClick={() => setShowLogin(false)}></div>
//             <div className="form">
//                 <div className="auth-container">
//                     <h2>Login</h2>
//                     <form onSubmit={handleSubmit}>
//                         <label>
//                             Username:
//                             <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
//                         </label>
//                         <label>
//                             Password:
//                             <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
//                         </label>
//                         {error && <p className="error">{error}</p>}
//                         <button type="submit" disabled={loading}>Login</button>
//                         <p>Don't have an account? <Link to="/register">Register</Link></p>
//                         <p>Forgot your password? <Link to="/request-password-reset">Reset Password</Link></p>
//                     </form>
//                 </div>
//             </div>
//         </>
//     );
// }

// export default Login;


// // import React, { useState } from 'react';
// // import { useUser } from '../../context/UserContext';
// // import { loginUser } from '../../api/userApi';
// // import { Link, useNavigate } from 'react-router-dom';
// // import '../Auth.css';

// // function Login({ setShowLogin }) {
// //     const [username, setUsername] = useState('');
// //     const [password, setPassword] = useState('');
// //     const { login, loading } = useUser();
// //     const [error, setError] = useState(null);
// //     const navigate = useNavigate();

// //     const handleSubmit = async (e) => {
// //         e.preventDefault();
// //         setError(null);
// //         try {
// //             const token = await loginUser({ username, password });
// //             localStorage.setItem('access_token', token);
// //             login(token);
// //             navigate('/');
// //         } catch (error) {
// //             setError(error.message);
// //         }
// //     };

// //     return (
// //         <>
// //             <div className="overlay" onClick={() => setShowLogin(false)}></div>
// //             <div className="form">
// //                 <div className="auth-container">
// //                     <h2>Login</h2>
// //                     <form onSubmit={handleSubmit}>
// //                         <label>
// //                             Username:
// //                             <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
// //                         </label>
// //                         <label>
// //                             Password:
// //                             <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
// //                         </label>
// //                         {error && <p className="error">{error}</p>}
// //                         <button type="submit" disabled={loading}>Login</button>
// //                         <p>Don't have an account? <Link to="/register">Register</Link></p>
// //                         <p>Forgot your password? <Link to="/request-password-reset">Reset Password</Link></p>
// //                     </form>
// //                 </div>
// //             </div>
// //         </>
// //     );
// // }

// // export default Login;


