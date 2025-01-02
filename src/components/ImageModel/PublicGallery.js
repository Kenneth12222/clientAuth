import React, { useEffect, useState } from 'react';
import '../../styles/global.css';
import { useUser } from '../../context/UserContext';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const PublicGallery = () => {
    const [images, setImages] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);
    const { user } = useUser();

    const fetchImages = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/api/images`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`HTTP Error: ${response.status} - ${response.statusText} - ${JSON.stringify(errorData)}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error fetching images:', error.message);
            throw error;
        }
    };

    useEffect(() => {
        const loadImages = async () => {
            try {
                const data = await fetchImages();
                if (data?.images?.length) {
                    setImages(data.images);
                } else {
                    setError('No images found');
                }
            } catch (error) {
                setError('Failed to load images');
            } finally {
                setLoading(false);
            }
        };

        loadImages();
    }, []);

    const openImageModal = (image) => {
        setSelectedImage(image);
    };

    const closeModal = (e) => {
        // Ensure that click on the modal content does not close the modal
        if (e.target === e.currentTarget) {
            setSelectedImage(null);
        }
    };
    
    const defaultProfilePicture = faUser;



    return (
        <div className="user-gallery-container">
            <div className="gallery-container">
                {loading && <p className="loading-text">Loading...</p>}
                {error && <p className="error-text">{error}</p>}
                <div className="gallery-grid">
                    {!loading && images.length === 0 ? (
                        <p className="no-images-text">No images found</p>
                    ) : (
                        images.map((image) => (
                            <div className="gallery-item" key={image.id} onClick={() => openImageModal(image)}>
                                <img
                                    src={`http://localhost:5000/uploads/${image.filename}`}
                                    alt={image.title}
                                    className="gallery-image"
                                />
                                {/* user profile display here */}
                                <div className="gallary-details">
                                    <span>{image.username}</span>
                                    <div>
                                        <p></p>
                                    </div>
                                </div>
                            </div>
                        ))
                        
                    )}
                </div>

                {selectedImage && (
                    <div className="image-modal active" onClick={closeModal}>
                        <img
                            src={`http://localhost:5000/uploads/${selectedImage.filename}`}
                            alt={selectedImage.title}
                            className="modal-image"
                        />
                        <span className="image-modal-close" onClick={closeModal}>✕</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PublicGallery;

