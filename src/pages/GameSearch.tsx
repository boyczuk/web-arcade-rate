import React, { useEffect, useState } from 'react';
import searchGames from '../components/Utilities/searchGames';
import addGames from '../components/Utilities/addGames';
import { Game } from '../components/Types/Game';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import AddGameModal from '../components/Utilities/addGamesModal';
import './GameSearch.css';

interface UserData {
    userId: string;
    username: string;
    name: string;
}

const GameSearch = () => {
    const [games, setGames] = useState<Game[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [addedGames, setAddedGames] = useState<number[]>([]);
    const [userData, setUserData] = useState<UserData | undefined>();
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedGame, setSelectedGame] = useState<{ gameId: number; gameName: string } | null>(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async user => {
            if (user) {
                console.log("User is signed in");
                const userDocRef = doc(db, 'users', user.uid);
                const userDoc = await getDoc(userDocRef);
                if (userDoc.exists()) {
                    setUserData({
                        userId: user.uid,
                        username: userDoc.data().username,
                        name: userDoc.data().name
                    });
                } else {
                    console.log("No such document!");
                }
            } else {
                console.log("No user signed in");
                setUserData(undefined);
            }
        });

        return () => unsubscribe();
    }, []);

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

    const handleOpenModal = (gameId: number, gameName: string) => {
        setSelectedGame({ gameId, gameName });
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedGame(null);
    };

    const handleAddGame = async (gameId: number, gameName: string, rating: number, notes: string) => {
        if (userData && userData.userId) {
            await addGames(userData.userId, gameId, gameName, (response) => {
                console.log('Game added:', response);
                setAddedGames(prevGames => [...prevGames, gameId]);
            }, rating, notes);
        } else {
            console.error('User data not available. Cannot add game.');
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
                                onClick={() => handleOpenModal(game.id, game.name)}
                            >
                                {addedGames.includes(game.id) ? <CheckCircleIcon /> : <AddCircleOutlineIcon />}
                            </IconButton>
                        </div>
                    </div>
                ))}
            </div>
            {selectedGame && (
                <AddGameModal
                    open={modalOpen}
                    handleClose={handleCloseModal}
                    handleAddGame={handleAddGame}
                    gameId={selectedGame.gameId}
                    gameName={selectedGame.gameName}
                />
            )}
        </div>
    );
};

export default GameSearch;
