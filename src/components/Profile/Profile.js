import React from 'react';
import { useUser } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import './Profile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faEdit, faUserCircle } from '@fortawesome/free-solid-svg-icons';

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

    return (
        <div className="profile-card">
            <div className="profile-header">
                <div className="profile-image">
                    {user.image_url ? (
                        <img
                            src={user.image_url}
                            alt="Profile"
                            className='profile-image-img'
                            onError={(e) => e.target.src = '/default-avatar.png'}
                        />
                    ) : (
                        <FontAwesomeIcon icon={faUserCircle} size="5x" color="#c4c4c4" />
                    )}
                </div>
            </div>
            <div className="profile-body">
                <h1 className="username">{user.username}</h1>
                <p className="email">{user.email}</p>
                <p className="bio">{user.bio || 'No bio available'}</p>
                <p className="location">{user.location || 'No location available'}</p>
                <p className="nationality">{user.nationality || 'No nationality available'}</p>
            </div>
            <div className="profile-actions">
                <button className="action-button logout-button" onClick={handleLogout}>
                    <FontAwesomeIcon icon={faSignOutAlt} />
                </button>
                <button className="action-button edit-button">
                    <FontAwesomeIcon icon={faEdit} />
                </button>
            </div>
        </div>
    );
};

export default Profile;
