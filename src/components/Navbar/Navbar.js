import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCamera, faImages, faUser } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css';
import Logo from '../../assets/logo.png';

function Navbar({ setShowLogin }) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState(''); // State for search query
    const { user, logout } = useUser();
    const navigate = useNavigate();

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const defaultProfilePicture = faUser;

    const handleProfileIconClick = () => {
        user ? toggleDropdown() : setShowLogin(prev => !prev);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery) {
            navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
            setSearchQuery(''); // Clear search input after submission
        }
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    <img src={Logo} alt="Logo" className="logo-image" />
                </Link>
                <div className="search-container">
                    <form onSubmit={handleSearchSubmit}>
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </form>
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
                                alt={user.name || ''}
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
