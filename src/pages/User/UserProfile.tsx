import React, { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase'; 
import './Profile.css';
import { useParams } from 'react-router-dom';
import { Rating } from '@mui/material';

interface UserData {
    uid: string;
    username: string;
    name: string;
    games: {
        gameId: number;
        gameName: string;
        rating: number;
        notes: string;
    }[];
    photoURL?: string;
    // Add other user properties as needed
}

async function fetchUserData(userId: string): Promise<UserData | undefined> {
    const userDocRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
        const data = userDoc.data();
        console.log("Fetched user data:", data); // Debugging statement
        const gamesArray = Array.isArray(data.games) ? data.games : [];
        return {
            uid: userId,
            username: data.username,
            name: data.name,
            games: gamesArray,
            photoURL: data.photoURL
        } as UserData;
    } else {
        console.log("No such document!");
    }
}

const UserProfile: React.FC = () => {
    const { userId } = useParams<{ userId: string }>();
    const [userData, setUserData] = useState<UserData | undefined>();

    useEffect(() => {
        const fetchData = async () => {
            if (userId) {
                const data = await fetchUserData(userId);
                console.log("User data set to state:", data); // Debugging statement
                if (data) {
                    setUserData(data);
                }
            }
        };

        fetchData();
    }, [userId]);

    if (!userData) {
        return <div>Loading...</div>;
    }

    if (!Array.isArray(userData.games)) {
        console.error('userData.games is not an array', userData.games);
        return <div>Error: Invalid data structure</div>;
    }

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
                    {userData.games.length > 0 ? (
                        <ul>
                            {userData.games.map((game, index) => (
                                <li key={index}>
                                    <p>{game.gameName}</p>
                                    <Rating value={game.rating} readOnly />
                                    <p>{game.notes}</p>
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

export default UserProfile;
