import React, { useState, useEffect } from 'react';
import './Profile.css';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import './Settings.css'

interface UserData {
    username: string;
    name: string;
    // Add other user properties as needed
}

async function fetchUserData(): Promise<UserData | undefined> {
    const user = auth.currentUser;
    if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
            return userDoc.data() as UserData; // Type assertion
        } else {
            console.log("No such document!");
        }
    } else {
        console.log("No user signed in");
    }
}

const Profile = () => {
    const [userData, setUserData] = useState<UserData | undefined>();

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

    return (
        <div className="profile-container">
            <h1>Settings</h1>
            <div className="image-placeholder">Image Placeholder</div>
            <div className="content">
                <p>Username: {userData.username}</p>
                <p>Name: {userData.name}</p>
            </div>
        </div>
    );
};

export default Profile;
