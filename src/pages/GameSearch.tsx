import React, { useState } from 'react';
import SearchBar from '../components/Utilities/SearchBar';
import searchGames from '../components/Utilities/searchGames';
import { Game } from '../components/Types/Game';
import './GameSearch.css'

const GameSearch = () => {
    const [games, setGames] = useState<Game[]>([]);

    const handleSearch = (searchTerm: string) => {
        searchGames(searchTerm, setGames);
    };

    return (
        <div className="game-search-container">
            <SearchBar onSearch={handleSearch} />
            <div className="game-results">
                {games.map((game, index) => (
                    <div key={index}>
                        <h3>{game.name}</h3>
                        {/* Display other game details */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GameSearch;
