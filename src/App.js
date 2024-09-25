import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider, useUser } from './context/UserContext';
import Home from './components/Profile/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import RequestPasswordReset from './components/Auth/RequestPasswordReset';
import ResetPassword from './components/Auth/ResetPassword';
import Navbar from './components/Navbar/Navbar';
import ImageUpload from './components/ImageModel/ImageUpload';
import UserGallery from './components/ImageModel/UserGallery';
import PublicGallery from './components/ImageModel/PublicGallery';

function App() {
    const [showLogin, setShowLogin] = useState(false);

    return (
        <UserProvider>
            <Router>
                <Navbar setShowLogin={setShowLogin} />
                {showLogin && <Login setShowLogin={setShowLogin} />}
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/request-password-reset" element={<RequestPasswordReset />} />
                    <Route path="/reset-password/:token" element={<ResetPassword />} />
                    <Route path="/upload-image" element={<ImageUpload />} />
                    <Route path="/public-gallery" element={<PublicGallery />} />
                    <Route path="/my-gallery" element={<UserGallery />} />
                </Routes>
            </Router>
        </UserProvider>
    );
}

export default App;



// import React, { useState } from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import { UserProvider, useUser } from './context/UserContext';
// import Home from './components/Profile/Home';
// import Login from './components/Auth/Login';
// import Register from './components/Auth/Register';
// import RequestPasswordReset from './components/Auth/RequestPasswordReset';
// import ResetPassword from './components/Auth/ResetPassword';
// import Navbar from './components/Navbar/Navbar';
// import ImageUpload from './components/ImageModel/ImageUpload';
// import UserGallery from './components/ImageModel/UserGallery';
// import PublicGallery from './components/ImageModel/PublicGallery';

// function App() {
//     const [showLogin, setShowLogin] = useState(false);

//     return (
//         <UserProvider>
//             <Router>
//             <Navbar setShowLogin={setShowLogin} showLogin={showLogin} />
//             {showLogin && <Login setShowLogin={setShowLogin} />}
//                 <AuthRoutes setShowLogin={setShowLogin} />
//                 <Routes>
//                     <Route path="/" element={<Home />} />
//                     <Route path="/register" element={<Register />} />
//                     <Route path="/request-password-reset" element={<RequestPasswordReset />} />
//                     <Route path="/reset-password/:token" element={<ResetPassword />} />
//                     <Route path="/upload-image" element={<ImageUpload />} />
//                     <Route path="/public-gallery" element={<PublicGallery />} />
//                     <Route path="/my-gallery" element={<UserGallery />} />
//                 </Routes>
//             </Router>
//         </UserProvider>
//     );
// }

// // Separate component to handle login visibility
// function AuthRoutes({ setShowLogin }) {
//     const { user } = useUser(); // Get user details from context

//     return user ? null : <Login setShowLogin={setShowLogin} />;
// }

// export default App;




// // src/App.js
// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import { UserProvider } from './context/UserContext';
// import HomePage from './pages/HomePage';
// import Login from './components/Auth/Login';
// import Register from './components/Auth/Register';
// import Profile from './components/Profile/Profile';
// import RequestPasswordReset from './components/Auth/RequestPasswordReset';
// import ResetPassword from './components/Auth/ResetPassword';
// import Navbar from './components/Navbar/Navbar';


// function App() {
//     return (
//         <UserProvider>
//             <Router>
//             <Navbar/>
//                 <Routes>
//                     <Route path="/" element={<HomePage />} />
//                     <Route path="/login" element={<Login />} />
//                     <Route path="/register" element={<Register />} />
          
//                     <Route path="/request-password-reset" element={<RequestPasswordReset />} />
//                     <Route path="/reset-password/:token" element={<ResetPassword />} />
//                 </Routes>
//             </Router>
//         </UserProvider>
//     );
// }

// export default App;



