import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const SearchResults = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('query');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchResults = async () => {
            setLoading(true);
            try {
                // Replace with your API endpoint or data fetching logic
                const response = await fetch(`/http://localhost:5000/api/search?query=${encodeURIComponent(query)}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch results');
                }
                const data = await response.json();
                setResults(data); // Set the results from your API response
            } catch (err) {
                setError(err.message); // Handle errors
            } finally {
                setLoading(false); // Stop loading state
            }
        };

        if (query) {
            fetchResults();
        }
    }, [query]); // Dependency array includes query to re-fetch when it changes

    if (loading) {
        return <div>Loading...</div>; // Loading state
    }

    if (error) {
        return <div>Error: {error}</div>; // Error handling
    }
    return (
        <div className="search-results">
            <h2>Search Results for: "{query}"</h2>
            {results.length === 0 ? (
                <p>No results found.</p> // No results message
            ) : (
                <ul>
                    {results.map((item) => (
                        <li key={item.id}>
                            {/* Customize based on your item structure */}
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                            <a href={item.link} target="_blank" rel="noopener noreferrer">View More</a>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchResults;


