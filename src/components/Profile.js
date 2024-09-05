import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.png';
import './Profile.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faEdit, faUserCircle } from '@fortawesome/free-solid-svg-icons';

const Profile = () => {
    const { user, loading, logout } = useUser();
    const [isCardOpen, setIsCardOpen] = useState(false);
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };


    if (loading) return <div className="loading-text">Loading...</div>;
    if (!user) return <div className="loading-text">No user data available</div>;

    const handleProfileImageClick = () => {
        setIsCardOpen(!isCardOpen);
    };

    const handleLogout = async () => {
        try {
            console.log('Logging out...');
            await logout(); // Ensure this resolves
            console.log('Logged out successfully');
            navigate('/login'); // Redirect to login page
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };
    

    return (
        <div className="user-profile">
            <nav className='navbar'>
                <img src={Logo} alt="Logo" className="logo" />

                <div className={`menu-icon ${menuOpen ? 'active' : ''}`} onClick={handleMenu}>
                    <i className={menuOpen ? 'fas fa-times' : 'fas fa-bars'}></i>
                </div>
                <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
                    <li><Link className='links' to="/">Home</Link></li>
                    <li><Link className='links' to="/about">About</Link></li>
                    <li><Link className='links' to="/services">Services</Link></li>
                    <li><Link className='links' to="/contact">Contact</Link></li>
                </ul>
                <div className="profile">
                    <div
                        className="profile-image"
                        onClick={handleProfileImageClick}
                    >
                        {user.image_url ? (
                            <img
                                src={user.image_url}
                                alt="Profile" className='profile-image'
                                onError={(e) => e.target.src = '/default-avatar.png'} // Ensure path is correct
                            />
                        ) : (
                            <FontAwesomeIcon icon={faUserCircle} size="2x" color="#888" />
                        )}
                    </div>
                    {isCardOpen && (
                        <div className="profile-card">
                            <div className="profile-header">
                                <div className="profile-card-image">
                                    {user.image_url ? (
                                        <img
                                            src={user.image_url}
                                            alt="Profile" className='profile-card-image '
                                            onError={(e) => e.target.src = '/default-avatar.png'} // Ensure path is correct
                                        />
                                    ) : (
                                        <FontAwesomeIcon icon={faUserCircle} size="3x" color="#888" />
                                    )}
                                </div>
                            </div>
                            <div className="profile-details">
                                <h1 className="username">{user.username}</h1>
                                <p className="email">{user.email}</p>
                                <p className="bio">{user.bio || 'No bio available'}</p>
                                <p className="location">{user.location || 'No location available'}</p>
                                <p className="nationality">{user.nationality || 'No nationality available'}</p>
                            </div>
                            <div className="profile-actions">
                                <button className="logout-button" onClick={handleLogout}>
                                    <FontAwesomeIcon icon={faSignOutAlt} />
                                </button>
                                <button className="edit-button">
                                    <FontAwesomeIcon icon={faEdit} />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </nav>
        </div>
    );
};

export default Profile;
