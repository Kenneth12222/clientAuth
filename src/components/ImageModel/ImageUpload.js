

import React, { useState } from 'react';
import { uploadImage } from '../../api/userApi';
import { useUser } from '../../context/UserContext';
import '../../styles/ImageUpload.css';  // Updated for Pinterest-like styles

function ImageUpload() {
    const { token } = useUser();
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
        if (selectedFile) {
            const fileURL = URL.createObjectURL(selectedFile);
            setPreview(fileURL);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!file || !title) {
            setError('Please fill in all required fields and upload an image.');
            setSuccess(null);
            return;
        }

        const formData = new FormData();
        formData.append('image', file);
        formData.append('title', title);
        formData.append('description', description);
        formData.append('category', category);

        try {
            await uploadImage(formData, token);
            setSuccess('Image uploaded successfully');
            setError(null);
            setFile(null);
            setTitle('');
            setDescription('');
            setCategory('');
            setPreview(null);
        } catch (err) {
            setError(err.message);
            setSuccess(null);
        }
    };

    return (
        <div className="upload-form-container">
            <form onSubmit={handleSubmit} className="upload-form-card">
                <h2 className="upload-form-title">Upload Image</h2>

                <label htmlFor="fileInput" className="upload-file-label">
                    {preview ? (
                        <img src={preview} alt="Preview" className="image-preview-pinterest" />
                    ) : (
                        <div className="upload-placeholder">Click to select an image</div>
                    )}
                    <input
                        type="file"
                        id="fileInput"
                        className="upload-input-file"
                        onChange={handleFileChange}
                        required
                    />
                </label>

                <input
                    type="text"
                    placeholder="Add a title (required)"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="upload-input-title"
                    required
                />

                <textarea
                    placeholder="Add a description (optional)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="upload-input-description"
                />

                <input
                    type="text"
                    placeholder="Add a category (optional)"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="upload-input-category"
                />

                <button type="submit" className="upload-button-pinterest">
                    Upload
                </button>

                {error && <p className="upload-error">{error}</p>}
                {success && <p className="upload-success">{success}</p>}
            </form>
        </div>
    );
}

export default ImageUpload;


