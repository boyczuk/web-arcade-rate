import React, { useState } from 'react';
import SearchBar from '../components/Utilities/SearchBar';
import searchGames from '../components/Utilities/searchGames';
import { Game } from '../components/Types/Game';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import './GameSearch.css'

const GameSearch = () => {
    const [games, setGames] = useState<Game[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [addedGames, setAddedGames] = useState<number[]>([]);

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

    const handleAddGame = (gameId: number, game: String) => {
        console.log(`Game added: ${game}`)
        setAddedGames([...addedGames, gameId]);
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
            <button

                onClick={() => handleSearch(searchTerm)}
                className='search-button'
            >Search</button>
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
                            <IconButton
                                className='addGameButton'
                                color="primary"
                                aria-label="add to profile"
                                onClick={() => handleAddGame(game.id, game.name)}
                            >
                                {/*Change tile colour*/}
                                {addedGames.includes(game.id) ? <CheckCircleIcon /> : <AddCircleOutlineIcon />}
                            </IconButton>
                            {/* Display other game details here */}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GameSearch;
