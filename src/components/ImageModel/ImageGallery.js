import React, { useEffect, useState } from 'react';

function ImageGallery() {
    const [images, setImages] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchImages = async () => {
            setLoading(true);
            try {
                const response = await fetch('http://localhost:5000/api/images'); // Fetch from the public endpoint

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                console.log('Fetched data:', data);
                setImages(data.images); // Access the `images` key
            } catch (error) {
                setError(error.message);
                console.error('Error fetching images:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchImages();
    }, []);

    return (
        <div>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div>
                {images.length === 0 && !loading ? (
                    <p>No images found</p>
                ) : (
                    images.map((image) => (
                        <div key={image.id}>
                            <img
                                src={`http://localhost:5000/uploads/${image.filename}`} // Correct URL format
                                alt={image.title}
                                style={{ width: '200px', height: 'auto' }}
                            />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default ImageGallery;
