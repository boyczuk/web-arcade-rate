import React, { useState } from 'react';
import { Modal, Box, TextField, Button, Rating } from '@mui/material';
import './addGamesModal.css';

interface AddGameModalProps {
    open: boolean;
    handleClose: () => void;
    handleAddGame: (gameId: number, gameName: string, rating: number, notes: string) => void;
    gameId: number;
    gameName: string;
}

const AddGameModal: React.FC<AddGameModalProps> = ({ open, handleClose, handleAddGame, gameId, gameName }) => {
    const [rating, setRating] = useState<number | null>(0);
    const [notes, setNotes] = useState('');

    const handleSubmit = () => {
        if (rating !== null) {
            handleAddGame(gameId, gameName, rating, notes);
            handleClose();
        }
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box className="modal-box">
                <h2>Add {gameName}</h2>
                <Rating
                    name="game-rating"
                    value={rating}
                    onChange={(event, newValue) => setRating(newValue)}
                    precision={0.5}
                />
                <TextField
                    label="Notes"
                    multiline
                    rows={4}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    variant="outlined"
                    fullWidth
                />
                <Button onClick={handleSubmit} variant="contained" color="primary">
                    Add Game
                </Button>
            </Box>
        </Modal>
    );
};

export default AddGameModal;
