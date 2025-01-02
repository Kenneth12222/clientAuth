import React, { useEffect, useState } from 'react';
import '../../styles/Home.css';

// Modal component to view the image in full size
const ImageModal = ({ image, onClose }) => (
    <div className="image-modal active" onClick={onClose}>
        <img
            src={`http://localhost:5000/uploads/${image.filename}`}
            alt={image.title}
        />
        <span className="image-modal-close" onClick={onClose}>✕</span>
    </div>
);

function Home() {
    const [images, setImages] = useState([]);  // State to hold the images
    const [error, setError] = useState(null);   // State to hold any error
    const [loading, setLoading] = useState(true);  // Loading state
    const [selectedImage, setSelectedImage] = useState(null);

    // Fetch Images Function
    const fetchImages = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/api/images`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`HTTP Error: ${response.status} ${response.statusText} ${JSON.stringify(errorData)}`);
            }

            const data = await response.json(); // Parse response data
            return data;  // Return the data object
        } catch (error) {
            setError(error.message);  // Set error state
            console.error('Error fetching images:', error.message);
        } finally {
            setLoading(false);  // Stop loading state
        }
    };

    useEffect(() => {
        const loadImages = async () => {
            const data = await fetchImages();  // Fetch the data
            if (data && data.images) {
                setImages(data.images);  // Set the images state
            } else {
                setError('No images found');
            }
        };

        loadImages();  // Call the function to load images
    }, []);  // Empty dependency array means this effect runs once after the initial render

    // Open Image Modal
    const openImageModal = (image) => setSelectedImage(image);

    // Close Modal
    const closeModal = () => setSelectedImage(null);

    return (
        <div className="gallery-container">
            {loading && <p className="loading-text">Loading...</p>}
            {error && !loading && <p className="error-text">{error}</p>}
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
                                loading="lazy"  // Lazy loading for performance
                            />
                        </div>
                    ))
                )}
            </div>

            {selectedImage && <ImageModal image={selectedImage} onClose={closeModal} />}
        </div>
    );
}

export default Home;
