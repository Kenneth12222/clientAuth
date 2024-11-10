import React, { useState } from 'react';
import '../../styles/Register.css';
import { registerUser } from '../../api/userApi';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        bio: '',
        location: '',
        nationality: '',
        profilePic: null,
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: name === 'profilePic' ? files[0] : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formDataToSend = new FormData();
            Object.keys(formData).forEach((key) => formDataToSend.append(key, formData[key]));

            const response = await registerUser(formDataToSend);

            // If response is successful
            if (response) {
                toast.success('Registration successful! Redirecting you to the login page...');
                setFormData({
                    username: '',
                    email: '',
                    password: '',
                    bio: '',
                    location: '',
                    nationality: '',
                    profilePic: null,
                });
                // Redirect after a delay
                setTimeout(() => navigate('/login'), 2000);
            }
        } catch (error) {
            toast.error(error.message || 'An error occurred during registration');
        }
    };

    return (
        <div className="form">
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} closeOnClick pauseOnHover draggable />
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
                    <button type="submit">Register</button>
                    <p>Already have an account? <Link to="/login">Login</Link></p>
                </form>
            </div>
        </div>
    );
};

export default Register;





















// import React, { useState } from 'react';
// import '../../styles/Register.css';
// import { registerUser } from '../../api/userApi';
// import { Link, useNavigate } from 'react-router-dom';

// const Register = () => {
//     const [formData, setFormData] = useState({
//         username: '',
//         email: '',
//         password: '',
//         bio: '',
//         location: '',
//         nationality: '',
//         profilePic: null,
//     });
//     const [error, setError] = useState('');
//     const [successMessage, setSuccessMessage] = useState('');
//     const navigate = useNavigate();

//     const handleChange = (e) => {
//         const { name, value, files } = e.target;
//         setFormData({
//             ...formData,
//             [name]: name === 'profilePic' ? files[0] : value,
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError('');
//         setSuccessMessage('');

//         try {
//             const formDataToSend = new FormData();
//             Object.keys(formData).forEach((key) => formDataToSend.append(key, formData[key]));

//             const response = await registerUser(formDataToSend);

//             // Check if the registration was successful
//             if (response) {  // If there's a response, the registration is successful
//                 // Handle successful registration
//                 setSuccessMessage('Registration successful! Redirecting you to the login page...');
//                 setFormData({
//                     username: '',
//                     email: '',
//                     password: '',
//                     bio: '',
//                     location: '',
//                     nationality: '',
//                     profilePic: null,
//                 });
//                 // Redirect after a delay
//                 setTimeout(() => navigate('/login'), 2000);
//             }
//         } catch (error) {
//             // Here, you can set a more descriptive error message based on the error caught
//             setError(error.message || 'An error occurred during registration');
//         }
//     };

//     return (
//         <div className="form">
//             <div className="auth-container">
//                 <form onSubmit={handleSubmit}>
//                     <input
//                         type="text"
//                         name="username"
//                         value={formData.username}
//                         onChange={handleChange}
//                         placeholder="Username"
//                         required
//                     />
//                     <input
//                         type="email"
//                         name="email"
//                         value={formData.email}
//                         onChange={handleChange}
//                         placeholder="Email"
//                         required
//                     />
//                     <input
//                         type="password"
//                         name="password"
//                         value={formData.password}
//                         onChange={handleChange}
//                         placeholder="Password"
//                         required
//                     />
//                     <textarea
//                         name="bio"
//                         value={formData.bio}
//                         onChange={handleChange}
//                         placeholder="Bio"
//                     />
//                     <input
//                         type="text"
//                         name="location"
//                         value={formData.location}
//                         onChange={handleChange}
//                         placeholder="Location"
//                     />
//                     <input
//                         type="text"
//                         name="nationality"
//                         value={formData.nationality}
//                         onChange={handleChange}
//                         placeholder="Nationality"
//                     />
//                     <input
//                         type="file"
//                         name="profilePic"
//                         onChange={handleChange}
//                     />
//                     {error && <p className="error">{error}</p>}
//                     {successMessage && <p className="success">{successMessage}</p>}
//                     <button type="submit">Register</button>
//                     <p>Already have an account? <Link to="/login">Login</Link></p>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default Register;
