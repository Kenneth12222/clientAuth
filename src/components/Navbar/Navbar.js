import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import Profile from '../Profile/Profile'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css';
import Logo from '../../assets/logo.png'

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const { token, user } = useUser(); // Get user details from context

    const handleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const defaultProfilePicture = '/default-avatar.png'; // Path to default image

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    <img src={Logo} alt="Logo" className="logo-image" />
                </Link>
                <div className={`menu-icon ${menuOpen ? 'active' : ''}`} onClick={handleMenu}>
                    <i className={menuOpen ? 'fas fa-times' : 'fas fa-bars'}></i>
                </div>
                <ul className={`nav-menu ${menuOpen ? 'active' : ''}`}>
                    <li className="nav-item">
                        <Link to="/" className="nav-links" onClick={closeMenu}>
                            Home
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/movies" className="nav-links" onClick={closeMenu}>
                            Movies
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/tv-shows" className="nav-links" onClick={closeMenu}>
                            TV Shows
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/my-list" className="nav-links" onClick={closeMenu}>
                            My List
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/movie-list" className="nav-links" onClick={closeMenu}>
                            Movie List
                        </Link>
                    </li>
                </ul>

                {/* Profile/Login Section */}
                <div className="nav-search-profile">
                    {token ? (
                        <div className="profile-container">
                            <button onClick={toggleDropdown} className="profile-button">
                                {user?.image_url ? (
                                    <img
                                        src={user.image_url}
                                        alt="Profile"
                                        className="profile-icon"
                                        onError={(e) => e.target.src = defaultProfilePicture}
                                    />
                                ) : (
                                    <FontAwesomeIcon icon={faUserCircle} size="2x" color="#888" />
                                )}
                            </button>
                            {dropdownOpen && (
                                <div className="profile-dropdown">
                                    <Profile />
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="auth-links">
                            <Link to="/login" className="nav-link">Login</Link>
                            <Link to="/register" className="nav-link">Register</Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
