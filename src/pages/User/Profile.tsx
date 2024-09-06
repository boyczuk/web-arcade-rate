import React, { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import { Rating } from '@mui/material';
import { onAuthStateChanged } from 'firebase/auth';
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
    // Add other user properties as needed
}

async function fetchUserData(): Promise<UserData | undefined> {
    const user = auth.currentUser;
    if (user) {
        try {
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
                return undefined;
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
            return undefined;
        }
    } else {
        console.log("No user signed in");
        return undefined;
    }
}

const Profile = () => {
    const [userData, setUserData] = useState<UserData | undefined>();
    const [games, setGames] = useState<Game[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState<any>(null); // Track authenticated user

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (authUser) => {
            if (authUser) {
                setUser(authUser);
                console.log("User signed in:", authUser.uid);
            } else {
                console.log("No user signed in");
                setUser(null);
                setIsLoading(false);
            }
        });
        return () => unsubscribe();
    });

    const loadUserGames = async () => {
        if (!userData) {
            console.log("User data is undefined, cannot load games.");
            return;
        }

        try {
            const fetchedGames: Game[] = [];
            for (let game of userData.games) {
                const response = await fetch(`http://localhost:3001/fetch-game-by-id?id=${game.gameId}`);
                const gameDataArray = await response.json();
                const gameData = gameDataArray[0]; // Assuming game data is in array form
                fetchedGames.push({ ...gameData, ...game });
            }
            setGames(fetchedGames);
        } catch (error) {
            console.error('Failed to fetch games:', error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchUserData();
            if (data) {
                setUserData(data);
            } else {
                console.log("No user data found.");
            }
            setIsLoading(false); 
        };

        fetchData();
    }, [user]);

    useEffect(() => {
        if (userData) {
            loadUserGames();
        }
    }, [userData]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!userData) {
        return <div>No user data found.</div>;
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
                                    <Rating value={game.rating} readOnly precision={0.5} />
                                    <p>{game.notes}</p>
                                    {game.cover?.url ? (
                                        <img src={getLargeCoverUrl(game.cover.url)} alt={`${game.gameName} cover`} style={{ width: '100px', height: 'auto' }} />
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
