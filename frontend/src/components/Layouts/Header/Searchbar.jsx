import SearchIcon from '@mui/icons-material/Search';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Searchbar = () => {
    const [keyword, setKeyword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            navigate(`/products/${keyword}`);
        } else {
            navigate('/products');
        }
    };

    return (
        <>
            <form className="main-form" onSubmit={handleSubmit}>
                <label htmlFor="main-search"></label>
                <input
                    type="text"
                    id="main-search"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    className="input-text input-text--border-radius input-text--style-1"
                    placeholder="Search for products, brands and more"
                />
                <button className="btn btn--icon fas fa-search main-search-button" type="submit"></button>
            </form>
        </>
    );
};

export default Searchbar;
