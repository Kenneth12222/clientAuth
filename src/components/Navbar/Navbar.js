


import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCamera, faImages, faUser } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css';
import Logo from '../../assets/logo.png';

function Navbar({ setShowLogin }) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const { user, logout } = useUser();
    const navigate = useNavigate();

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const defaultProfilePicture = '/default-avatar.png';

    const handleProfileIconClick = () => {
        user ? toggleDropdown() : setShowLogin(prev => !prev);
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    <img src={Logo} alt="Logo" className="logo-image" />
                </Link>
                <div className="search-container">
                    <input type="text" className="search-input" placeholder="Search..." />
                </div>
                <ul className="nav-menu">
                    <li className="nav-item">
                        <Link to="/" className="nav-links">
                            <FontAwesomeIcon icon={faHome} className="nav-icon" />
                       
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/public-gallery" className="nav-links">
                            <FontAwesomeIcon icon={faImages} className="nav-icon" />
                          
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/upload-image" className="nav-links">
                            <FontAwesomeIcon icon={faCamera} className="nav-icon" />
                        
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/my-gallery" className="nav-links">
                            <FontAwesomeIcon icon={faUser} className="nav-icon" />
                      
                        </Link>
                    </li>
                </ul>
                <div className='navbar-right'>
                    {user ? (
                        <div className="profile-container">
                            <img
                                src={user.image_url || defaultProfilePicture}
                                alt="Profile"
                                className="profile-icon"
                                onClick={handleProfileIconClick}
                                onError={(e) => e.target.src = defaultProfilePicture}
                            />
                            {dropdownOpen && (
                                <div className="profile-dropdown">
                                    <Link to="/profile" className="dropdown-item">View Profile</Link>
                                    <Link to="/edit-profile" className="dropdown-item">Edit Profile</Link>
                                    <Link to="/delete-account" className="dropdown-item">Delete Account</Link>
                                    <button onClick={handleLogout} className="dropdown-item logout-button">Logout</button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <button onClick={handleProfileIconClick} className='login-button'>
                            <FontAwesomeIcon icon={faUser} size="2x" color="#888" />
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;

























// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSearch, faBell, faCommentDots, faChevronDown, faUserCircle } from '@fortawesome/free-solid-svg-icons';
// import './Navbar.css';

// import Profile from '../Profile/Profile'; 
// import { useUser } from '../../context/UserContext';
// import Logo from '../../assets/logo.png'

// function Navbar() {
//     const [dropdownOpen, setDropdownOpen] = useState(false);
//     const { token, user } = useUser(); 

//     const toggleDropdown = () => {
//         setDropdownOpen(!dropdownOpen);
//     };

//     return (
//         <nav className="pinterest">
//             <div className="left">
//                 <Link to="/" className="logo">
//                     <img src={Logo} className='logo-icon' />
//                 </Link>
//                 <Link to="/" className="home">Home</Link>
//             </div>
//             <div className="search">
//                 <FontAwesomeIcon icon={faSearch} />
//                 <input type="search" placeholder="Search" />
//             </div>
//             <div className="right">
//                 <Link to="#" className="items">
//                     <FontAwesomeIcon icon={faBell} />
//                 </Link>
//                 <Link to="#" className="items">
//                     <FontAwesomeIcon icon={faCommentDots} />
//                 </Link>
//                 <div className="nav-search-profile">
//                     {token ? (
//                         <div className="profile-container">
//                             <button onClick={toggleDropdown} className="profile-button">
//                                 {user?.image_url ? (
//                                     <img
//                                         src={user.image_url}
//                                         alt="Profile"
//                                         className="profile-icon"
                                        
//                                     />
//                                 ) : (
//                                     <FontAwesomeIcon icon={faUserCircle} size="2x" color="#888" />
//                                 )}
//                             </button>
//                             {dropdownOpen && (
//                                 <div className="profile-dropdown">
//                                     <Profile />
//                                 </div>
//                             )}
//                         </div>
//                     ) : (
//                         <div className="auth-links">
//                             <Link to="/login" className="nav-link">Login</Link>
//                             <Link to="/register" className="nav-link">Register</Link>
//                         </div>
//                     )}
//                 </div>
//                 <Link to="#" className="items-down">
//                     <FontAwesomeIcon icon={faChevronDown} />
//                 </Link>
//             </div>
//         </nav>
//     );
// }

// export default Navbar;

