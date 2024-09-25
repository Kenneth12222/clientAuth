import React, { useEffect, useState } from 'react';
import '../../styles/Home.css'

function Home() {
  const [images, setImages] = useState([]);  // State to hold the images
  const [error, setError] = useState(null);  // State to hold any error
  const [loading, setLoading] = useState(true);  // Loading state
  const [selectedImage, setSelectedImage] = useState(null);
  // Fetch Images Function
  async function fetchImages() {
      try {
          const response = await fetch(`http://127.0.0.1:5000/api/images`, {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
              },
          });

          if (!response.ok) {
              const errorData = await response.json();
              throw new Error(`HTTP Error: ${response.status} ${response.statusText} ${JSON.stringify(errorData)}`);
          }

          const data = await response.json(); // Parse response data
          console.log(data);  // Check the structure of the response

          return data;  // Return the data object
      } catch (error) {
          console.error('Error fetching images:', error.message);
          throw error;  // Re-throw the error to handle in useEffect
      }
  }

  useEffect(() => {
      const loadImages = async () => {
          try {
              const data = await fetchImages();  // Fetch the data
              if (data && data.images) {  // Ensure 'images' field exists in the data
                  setImages(data.images);  // Set the images state
              } else {
                  setError('No images found');
              }
          } catch (error) {
              setError(error.message);  // Set the error message
          } finally {
              setLoading(false);  // Stop loading state
          }
      };

      loadImages();  // Call the function to load images
  }, []);  // Empty dependency array means this effect runs once after the initial render

  const openImageModal = (image) => {
    setSelectedImage(image);
};

const closeModal = () => {
    setSelectedImage(null);
};
return (
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
                    </div>
                ))
            )}
        </div>

        {selectedImage && (
            <div className="image-modal active" onClick={closeModal}>
                <img src={`http://localhost:5000/uploads/${selectedImage.filename}`} alt={selectedImage.title} />
                <span className="image-modal-close" onClick={closeModal}>✕</span>
            </div>
        )}
    </div>
);
}

export default Home
