import React from 'react';
import { useUser } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import './Profile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faEdit, faUserCircle } from '@fortawesome/free-solid-svg-icons';

// Reusable ProfileImage Component
const ProfileImage = ({ imageUrl }) => (
    imageUrl ? (
        <img
            src={imageUrl}
            alt="Profile"
            className="profile-image-img"
            onError={(e) => e.target.src = '/default-avatar.png'}
        />
    ) : (
        <FontAwesomeIcon icon={faUserCircle} size="5x" color="#c4c4c4" />
    )
);

const Profile = () => {
    const { user, loading, logout } = useUser();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    if (loading) return <div className="loading-text">Loading...</div>;
    if (!user) return <div className="loading-text">No user data available</div>;

    const { username, email, bio, location, nationality, image_url } = user;

    return (
        <div className="profile-card">
            <div className="profile-header">
                <div className="profile-image">
                    <ProfileImage imageUrl={image_url} />
                </div>
            </div>
            <div className="profile-body">
                <h1 className="username">{username}</h1>
                <p className="email">{email}</p>
                <p className="bio">{bio || 'No bio available'}</p>
                <p className="location">{location || 'No location available'}</p>
                <p className="nationality">{nationality || 'No nationality available'}</p>
            </div>
            <div className="profile-actions">
                <button className="action-button logout-button" onClick={handleLogout}>
                    <FontAwesomeIcon icon={faSignOutAlt} /> Log Out
                </button>
                <button className="action-button edit-button">
                    <FontAwesomeIcon icon={faEdit} /> Edit Profile
                </button>
            </div>
        </div>
    );
};

export default Profile;
