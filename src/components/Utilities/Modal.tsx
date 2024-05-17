// Modal.tsx
import React, { useState, FormEvent } from 'react';
import './Modal.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { username?: string, name?: string }) => void;
  initialData: { username: string, name: string };
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit, initialData }) => {
    const [username, setUsername] = useState(initialData.username);
    const [name, setName] = useState(initialData.name);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSubmit({ username, name });
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
                    <button type="submit">Update</button>
                </form>
            </div>
        </div>
    );
};

export default Modal;
