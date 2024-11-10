import React, { useEffect, useState } from 'react';
import { useUser } from '../../context/UserContext'; // Adjust the path as needed
import { fetchUserImages } from '../../api/userApi'; // Adjust the path as needed
import '../../styles/UserGallery.css';  // Ensure global styles are applied
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

function UserGallery() {
    const { token } = useUser(); // Get the token from the context
    const [images, setImages] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);  // Track selected image for modal
    const { user } = useUser();

    useEffect(() => {
        const fetchImages = async () => {
            if (!token) {
                setError('User not authenticated');
                setLoading(false);
                return;
            }

            setLoading(true);
            try {
                const data = await fetchUserImages(token);
                setImages(data.images);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchImages();
    }, [token]);

    const openImageModal = (image) => {
        setSelectedImage(image);  // Set the image for modal display
    };

    const closeModal = () => {
        setSelectedImage(null);  // Close modal by clearing selected image
    };

    const defaultProfilePicture = '/default-avatar.png';

    return (
        <div className="user-gallery-container">
            <div className='gallery-container'>
                {loading && <p className="loading-text">Loading...</p>}
                {error && <p className="error-text">{error}</p>}
                <div className="header-user-profile">
                    <div
                        className="user-profile"
                        style={{
                            backgroundImage: `url(${user.image_url || defaultProfilePicture})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            height: '70vh',
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            color: 'white',
                            position: 'relative',
                            textAlign: 'center',
                        }}
                    >
                        <h1 className="user-name">{user.name || 'Guest User'}</h1>
                        <p className="user-bio">{user.bio || 'Welcome to your gallery!'}</p>
                        <div className="profile-icons">
                            <FontAwesomeIcon icon={faUser} size="2x" />
                            {/* Add more icons as needed */}
                        </div>
                        <div className="hero-buttons">
                            <button className="primary-button">Upload Image</button>
                            <button className="secondary-button">View Profile</button>
                        </div>
                    </div>
                </div>
                <div className="gallery-grid">
                    {images.length === 0 && !loading ? (
                        <p className="no-images-text">No images found</p>
                    ) : (
                        images.map((image) => (
                            <div className="gallery-item" key={image.id} onClick={() => openImageModal(image)}>
                                <img
                                    src={`http://localhost:5000/uploads/${image.filename}`}  // Correct URL format
                                    alt={image.title}
                                    className="gallery-image"  // Apply uniform styling
                                />
                            </div>
                        ))
                    )}
                </div>

                {/* Image Modal */}
                {selectedImage && (
                    <div className="image-modal active" onClick={closeModal}>
                        <img src={`http://localhost:5000/uploads/${selectedImage.filename}`} alt={selectedImage.title} />
                        <span className="image-modal-close" onClick={closeModal}>✕</span>
                    </div>
                )}
            </div>
        </div>
    );
}

export default UserGallery;
