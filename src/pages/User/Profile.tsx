import React, { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import { Game } from '../../components/Types/Game';
import './Profile.css'

interface UserData {
    username: string;
    name: string;
    games: number[];
    // Add other user properties as needed
}

async function fetchUserData(): Promise<UserData | undefined> {
    const user = auth.currentUser;
    if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
            const data = userDoc.data();
            const gamesArray = data.games ? data.games.split(",").map(Number) : [];
            return {
                username: data.username,
                name: data.name,
                games: gamesArray
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
            for (let gameId of userData.games) {
                const response = await fetch(`http://localhost:3001/fetch-game-by-id?id=${gameId}`);
                const gameDataArray = await response.json(); // Assuming this is an array containing one game object
                const gameData = gameDataArray[0]; // Take the first element from the array
                fetchedGames.push(gameData); // Push the game object directly into fetchedGames
            }
            //console.log("Fetched Games:", fetchedGames);
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

    const getLargeCoverUrl = (url: string) => {
        return url.replace('t_thumb', 't_cover_big');
    };

    return (
        <div className="profile-container">
            <div className="image-placeholder">Image Placeholder</div>
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
                                    {game.cover && game.cover.url ? (
                                        <img src={getLargeCoverUrl(game.cover.url)} alt={`${game.name} cover`} style={{ width: '100px', height: 'auto' }} />
                                    ) : (
                                        <div style={{ height: '100px', width: '100px', backgroundColor: '#ccc' }}>No cover</div>
                                    )}
                                    <p>{game.name}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No games to display yet.</p>
                    )}
                </div>
                {/* Display other user data as needed */}
            </div>
        </div>
    );
};

export default Profile;
