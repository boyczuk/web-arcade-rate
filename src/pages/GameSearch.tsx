import React, { useState } from 'react';
import SearchBar from '../components/Utilities/SearchBar';
import searchGames from '../components/Utilities/searchGames';
import { Game } from '../components/Types/Game';
import './GameSearch.css'

const GameSearch = () => {
    const [games, setGames] = useState<Game[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (searchTerm: string) => {
        if (searchTerm) {
            searchGames(searchTerm, setGames);
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSearch(searchTerm);
        }
    };

    return (
        <div className="game-search-container">
            <input
                type="text"
                value={searchTerm}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Search for games..."
                className="search-input"
            />
            <div className="game-results">
                {games.map((game, index) => (
                    <div key={index} className="game-item">
                        <img
                            src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover?.image_id}.jpg`}
                            alt={`${game.name} cover`}
                            className="game-image"
                        />
                        <div className="game-info">
                            <h3>{game.name}</h3>
                            {/* Display other game details here */}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GameSearch;
