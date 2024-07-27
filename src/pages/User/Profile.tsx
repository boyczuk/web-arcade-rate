import React, { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import { Rating } from '@mui/material';
import './Profile.css';

interface Game {
    gameId: number;
    gameName: string;
    rating: number;
    notes: string;
    cover?: {
        url?: string;
    };
}

interface UserData {
    username: string;
    name: string;
    games: Game[];
    photoURL?: string;
}

async function fetchUserData(): Promise<UserData | undefined> {
    const user = auth.currentUser;
    if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
            const data = userDoc.data();
            const gamesArray = Array.isArray(data.games) ? data.games : [];
            return {
                username: data.username,
                name: data.name,
                games: gamesArray,
                photoURL: data.photoURL
            } as UserData;
        } else {
            console.log("No such document!");
        }
    } else {
        console.log("No user signed in");
    }
}

const Profile = () => {
    const [userData, setUserData] = useState<UserData | undefined>();
    const [games, setGames] = useState<Game[]>([]);

    const loadUserGames = async () => {
        if (!userData) {
            console.log("User data is undefined, cannot load games.");
            return;
        }

        try {
            const fetchedGames = [];
            for (let game of userData.games) {
                const response = await fetch(`http://localhost:3001/fetch-game-by-id?id=${game.gameId}`);
                const gameDataArray = await response.json(); 
                const gameData = gameDataArray[0]; 
                fetchedGames.push({ ...gameData, ...game }); 
            }
            console.log("Fetched Games:", fetchedGames);
            setGames(fetchedGames);
        } catch (error) {
            console.error('Failed to fetch games:', error);
        }
    };

    useEffect(() => {
        if (userData) {
            loadUserGames();
        }
    }, [userData]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchUserData();
            if (data) {
                setUserData(data);
            }
        };

        fetchData();
    }, []);

    if (!userData) {
        return <div>Loading...</div>;
    }

    const getLargeCoverUrl = (url: string | undefined) => {
        return url ? url.replace('t_thumb', 't_cover_big') : '';
    };

    return (
        <div className="profile-container">
            <div className="image-container">
                {userData.photoURL ? (
                    <img src={userData.photoURL} alt="Profile" style={{ width: '100px', height: '100px' }} />
                ) : (
                    <div className="image-placeholder">Image Placeholder</div>
                )}
            </div>
            <div className="content">
                <h1>User Profile</h1>
                <p>Username: {userData.username}</p>
                <p>Name: {userData.name}</p>
                <div className='user-games'>
                    <h2>Games</h2>
                    {games.length > 0 ? (
                        <ul>
                            {games.map((game, index) => (
                                <li key={index}>
                                    <p>{game.gameName}</p>
                                    <Rating value={game.rating} readOnly />
                                    <p>{game.notes}</p>
                                    {games[index]?.cover?.url ? (
                                        <img src={getLargeCoverUrl(games[index].cover?.url)} alt={`${games[index].gameName} cover`} style={{ width: '100px', height: 'auto' }} />
                                    ) : (
                                        <div style={{ height: '100px', width: '100px', backgroundColor: '#ccc' }}>No cover</div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No games to display yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
