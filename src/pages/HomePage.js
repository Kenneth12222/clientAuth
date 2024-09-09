
// // src/pages/HomePage.js
// import React from 'react';
// import { Link } from 'react-router-dom';
// import { useUser } from '../context/UserContext';

// function HomePage() {
//     const { token, logout, loading } = useUser();

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div>
//             <h1>Home Page</h1>
//             {token ? (
//                 <>
//                     <Link to="/profile">Profile</Link>
//                     <button onClick={logout}>Logout</button>
//                 </>
//             ) : (
//                 <>
//                     <Link to="/login">Login</Link>
//                     <Link to="/register">Register</Link>
//                 </>
//             )}
//         </div>
//     );
// }

// export default HomePage;

