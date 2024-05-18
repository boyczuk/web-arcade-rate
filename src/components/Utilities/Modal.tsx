import React, { useState, FormEvent, ChangeEvent } from 'react';
import { getStorage, ref as firebaseStorageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth } from '../../firebase'; // Ensure these imports are correct

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: { username?: string, name?: string, email?: string, photoURL?: string }) => void;
    initialData: { username: string, name: string, email: string, photoURL?: string };
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit, initialData }) => {
    const [username, setUsername] = useState(initialData.username);
    const [name, setName] = useState(initialData.name);
    const [email, setEmail] = useState(initialData.email);
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        let photoURL = initialData.photoURL;

        if (file && auth.currentUser) {
            const storage = getStorage();
            const userStorageRef = firebaseStorageRef(storage, `profileImages/${auth.currentUser.uid}/${file.name}`);
            const snapshot = await uploadBytes(userStorageRef, file);
            photoURL = await getDownloadURL(snapshot.ref);
        }

        onSubmit({ username, name, email, photoURL });
        onClose(); // Close the modal after submission
    };

    if (!isOpen) return null;

    return (
        <div className='modal-text' style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)' }} onClick={onClose}>
            <div style={{ maxWidth: '500px', margin: '100px auto', backgroundColor: '#fff', padding: '20px', position: 'relative' }} onClick={(e) => e.stopPropagation()}>
                <button onClick={onClose} style={{ position: 'absolute', top: '10px', right: '10px' }}>Close</button>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Username:</label>
                        <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
                    </div>
                    <div>
                        <label>Name:</label>
                        <input type="text" value={name} onChange={e => setName(e.target.value)} />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div>
                        <label>Profile Picture:</label>
                        <input type="file" onChange={handleFileChange} accept="image/*" />
                    </div>
                    <button type="submit">Update</button>
                </form>
            </div>
        </div>
    );
};

export default Modal;
