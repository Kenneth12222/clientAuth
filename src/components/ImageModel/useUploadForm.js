import { useState } from 'react';

export function useUploadForm(onSubmitCallback) {
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
            await onSubmitCallback(formData);
            resetForm();
            setSuccess('Image uploaded successfully');
            setError(null);
        } catch (err) {
            setError(err.message);
            setSuccess(null);
        }
    };

    const resetForm = () => {
        setFile(null);
        setTitle('');
        setDescription('');
        setCategory('');
        setPreview(null);
    };

    const handleRemovePreview = () => {
        setFile(null);
        setPreview(null);
    };

    return {
        file,
        title,
        setTitle,
        description,
        setDescription,
        category,
        setCategory,
        error,
        success,
        preview,
        handleFileChange,
        handleSubmit,
        handleRemovePreview,
    };
}
