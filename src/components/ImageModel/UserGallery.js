import React, { useEffect, useState } from 'react';
import { useUser } from '../../context/UserContext'; // Adjust the path as needed
import { fetchUserImages } from '../../api/userApi'; // Adjust the path as needed
import '../../styles/UserGallery.css';  // Ensure global styles are applied

function UserGallery() {
    const { token } = useUser(); // Get the token from the context
    const [images, setImages] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);  // Track selected image for modal

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

    return (
        <div className="user-gallery-container">
            {loading && <p className="loading-text">Loading...</p>}
            {error && <p className="error-text">{error}</p>}
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
    );
    
}

export default UserGallery;
