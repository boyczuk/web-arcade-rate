import React, { useState, useEffect } from 'react';
import './Settings.css';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';

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
            return userDoc.data() as UserData;
        } else {
            console.log("No such document!");
        }
    } else {
        console.log("No user signed in");
    }
}

const Settings = () => {
    const [userData, setUserData] = useState<UserData | undefined>();
    const [isEditing, setIsEditing] = useState<{ [key: string]: boolean }>({
        username: false,
        name: false,
        email: false,
    });
    const [editedData, setEditedData] = useState<UserData | undefined>();

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchUserData();
            if (data) {
                setUserData(data);
                setEditedData(data);
            }
        };

        fetchData();
    }, []);

    const handleEditClick = (field: string) => {
        setIsEditing(prevState => ({ ...prevState, [field]: true }));
    };

    const handleSaveClick = async (field: string) => {
        if (!auth.currentUser || !editedData) {
            return;
        }

        const userRef = doc(db, 'users', auth.currentUser.uid);

        try {
            await updateDoc(userRef, { [field]: editedData[field as keyof UserData] });
            setUserData(prev => ({ ...prev!, [field]: editedData[field as keyof UserData] }));
            setIsEditing(prevState => ({ ...prevState, [field]: false }));
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const handleInputChange = (field: string, value: string) => {
        setEditedData(prev => ({ ...prev!, [field]: value }));
    };

    if (!userData || !editedData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="settings-profile-container">
            <h1>Settings</h1>
            <div className="settings-profile-info">
                <div className="settings-image-container">
                    {userData.photoURL ? (
                        <img src={userData.photoURL} alt="Profile" />
                    ) : (
                        <div className="settings-image-placeholder">Image Placeholder</div>
                    )}
                </div>
                <div className="settings-profile-details">
                    <div className="settings-profile-field">
                        <strong>Username:</strong> 
                        {isEditing.username ? (
                            <>
                                <input
                                    type="text"
                                    value={editedData.username}
                                    onChange={(e) => handleInputChange('username', e.target.value)}
                                />
                                <button onClick={() => handleSaveClick('username')}>Save</button>
                            </>
                        ) : (
                            <>
                                <span>{userData.username}</span>
                                <button onClick={() => handleEditClick('username')}>Edit</button>
                            </>
                        )}
                    </div>

                    <div className="settings-profile-field">
                        <strong>Name:</strong> 
                        {isEditing.name ? (
                            <>
                                <input
                                    type="text"
                                    value={editedData.name}
                                    onChange={(e) => handleInputChange('name', e.target.value)}
                                />
                                <button onClick={() => handleSaveClick('name')}>Save</button>
                            </>
                        ) : (
                            <>
                                <span>{userData.name}</span>
                                <button onClick={() => handleEditClick('name')}>Edit</button>
                            </>
                        )}
                    </div>

                    <div className="settings-profile-field">
                        <strong>Email:</strong> 
                        {isEditing.email ? (
                            <>
                                <input
                                    type="text"
                                    value={editedData.email}
                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                />
                                <button onClick={() => handleSaveClick('email')}>Save</button>
                            </>
                        ) : (
                            <>
                                <span>{userData.email}</span>
                                <button onClick={() => handleEditClick('email')}>Edit</button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
