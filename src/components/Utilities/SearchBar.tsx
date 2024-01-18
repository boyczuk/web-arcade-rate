import React, { useState } from 'react';

const SearchBar = ({ onSearch }: { onSearch: (term: string) => void }) => {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleSearch = () => {
        onSearch(inputValue);
    };

    return (
        <div className="search-bar">
            <input type="text" value={inputValue} onChange={handleInputChange} />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
};

export default SearchBar;
