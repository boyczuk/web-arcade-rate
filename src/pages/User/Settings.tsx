import React, { useState, useEffect } from 'react';
import './Profile.css';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import Modal from '../../components/Utilities/Modal';
import './Settings.css'

interface UserData {
    username: string;
    name: string;
    email: string;
    photoURL?: string;  
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
    const [isModalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchUserData();
            if (data) {
                setUserData(data);
            }
        };

        fetchData();
    }, []);

    const handleUpdateUser = async (data: { username?: string, name?: string, email?: string, photoURL?: string }) => {
        if (!auth.currentUser) {
            console.error('No user logged in');
            return;
        }
        const userRef = doc(db, 'users', auth.currentUser.uid);
        try {
            await updateDoc(userRef, { ...data });
            setUserData(prev => ({ ...prev!, ...data }));
            alert('User updated successfully!');
        } catch (error) {
            console.error('Error updating user:', error);
            alert('Failed to update user.');
        }
    };

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="profile-container">
            <h1>Settings</h1>
            <div className="image-container">
                {userData.photoURL ? (
                    <img src={userData.photoURL} alt="Profile" style={{ width: '100px', height: '100px' }} />
                ) : (
                    <div className="image-placeholder">Image Placeholder</div>
                )}
            </div>
            <div className="content">
                <p>Username: {userData.username}</p>
                <p>Name: {userData.name}</p>
                <p>Email: {userData.email}</p>
                <button onClick={() => setModalOpen(true)}>Modify</button>
            </div>
            <Modal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                onSubmit={handleUpdateUser}
                initialData={userData}
            />
        </div>
    );
};

export default Profile;
