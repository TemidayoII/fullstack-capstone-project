import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SearchPage.css';
import { urlConfig } from '../../config';

function SearchPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [ageRange, setAgeRange] = useState(6);
    const [searchResults, setSearchResults] = useState([]);
    const [category, setCategory] = useState('');
    const [condition, setCondition] = useState('');

    const categories = ['Living', 'Bedroom', 'Bathroom', 'Kitchen', 'Office'];
    const conditions = ['New', 'Like New', 'Older'];

    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const url = `${urlConfig.backendUrl}/api/gifts`;
                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error(`HTTP error: ${response.status}`);
                }

                const data = await response.json();
                setSearchResults(data);
            } catch (error) {
                console.log('Fetch error: ' + error.message);
            }
        };

        fetchProducts();
    }, []);

    const handleSearch = async () => {
        const baseUrl = `${urlConfig.backendUrl}/api/search?`;

        const queryParams = new URLSearchParams({
            name: searchQuery,
            age_years: ageRange,
            category: category,
            condition: condition,
        }).toString();

        try {
            const response = await fetch(`${baseUrl}${queryParams}`);

            if (!response.ok) {
                throw new Error('Search failed');
            }

            const data = await response.json();
            setSearchResults(data);
        } catch (error) {
            console.error('Failed to fetch search results:', error);
        }
    };

    const goToDetailsPage = (productId) => {
        navigate(`/app/product/${productId}`);
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">

                    {/* Filters */}
                    <div className="filter-section mb-3 p-3 border rounded">
                        <h5>Filters</h5>
                        <div className="d-flex flex-column">

                            {/* Category */}
                            <label>Category</label>
                            <select
                                className="form-control my-1"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value="">All</option>
                                {categories.map((cat) => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>

                            {/* Condition */}
                            <label>Condition</label>
                            <select
                                className="form-control my-1"
                                value={condition}
                                onChange={(e) => setCondition(e.target.value)}
                            >
                                <option value="">All</option>
                                {conditions.map((cond) => (
                                    <option key={cond} value={cond}>{cond}</option>
                                ))}
                            </select>

                            {/* Age Range */}
                            <label>Less than {ageRange} years</label>
                            <input
                                type="range"
                                className="form-control-range"
                                min="1"
                                max="10"
                                value={ageRange}
                                onChange={(e) => setAgeRange(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Search Input */}
                    <input
                        type="text"
                        className="form-control mb-2"
                        placeholder="Search for items..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />

                    <button
                        className="btn btn-primary mb-3"
                        onClick={handleSearch}
                    >
                        Search
                    </button>

                    {/* Results */}
                    <div className="search-results">
                        {searchResults.length > 0 ? (
                            searchResults.map((item) => (
                                <div
                                    key={item._id}
                                    className="card mb-3 p-3"
                                    onClick={() => goToDetailsPage(item.id)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <h5>{item.name}</h5>
                                    <p>Category: {item.category}</p>
                                    <p>Condition: {item.condition}</p>
                                    <p>Age: {item.age_years} years</p>
                                </div>
                            ))
                        ) : (
                            <p>No results found</p>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}

export default SearchPage;