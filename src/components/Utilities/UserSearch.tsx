import React, { useState } from 'react';
import './UserSearch.css'; // Make sure the path is correct

interface UserSearchProps {
    onSearch: (searchTerm: string) => void;
}

const UserSearch: React.FC<UserSearchProps> = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = () => {
        if (searchTerm.trim()) {
            onSearch(searchTerm.trim());
        }
    };

    return (
        <div className="search-container">
            <input
                className="search-input"
                type='text'
                placeholder='Search users...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button className="search-button" onClick={handleSearch}>Search</button>
        </div>
    );
};

export default UserSearch;
