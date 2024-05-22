import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import searchUsers from '../components/Utilities/searchUsers';
import { FirestoreUser } from '../components/Types/User';
import './SearchResultsPage.css'; 

function SearchResultsPage() {
    const [users, setUsers] = useState<FirestoreUser[]>([]);
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('query');

    useEffect(() => {
        const fetchUsers = async () => {
            if (query) {
                const results = await searchUsers(query);
                setUsers(results);
            }
        };
        fetchUsers();
    }, [query]);

    return (
        <div className="search-results-container">
            <h1 className="search-results-header">Search Results</h1>
            {users.map(user => (
                <div key={user.uid} className="user-result">
                    <p className="user-info">{user.username} - {user.name}</p>
                </div>
            ))}
        </div>
    );
}

export default SearchResultsPage;
