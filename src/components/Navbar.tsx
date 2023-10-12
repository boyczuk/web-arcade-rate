import { Link as RouterLink } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import './Navbar.css';

function Navbar() {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Drawer
                variant="permanent"
                anchor="left"
            >
                <List>
                    <ListItem component={RouterLink} to="/">
                        <ListItemText primary="Home" data-text="Home" />
                    </ListItem>
                    <ListItem component={RouterLink} to="/search">
                        <ListItemText primary="Search" data-text="Search" />
                    </ListItem>
                    <ListItem onClick={handleClickOpen}>
                        <ListItemText primary="Add Game" data-text="Add Game" />
                    </ListItem>
                    <ListItem component={RouterLink} to="/profile">
                        <ListItemText primary="Profile" data-text="Profile" />
                    </ListItem>
                </List>
            </Drawer>
            <Dialog open={open} onClose={handleClose} className='add-popup'>
                <div className='popup-content'>
                    <DialogTitle>Add Game</DialogTitle>
                    <DialogContent>
                        <p>
                            Here, you can have a form or other content to add a game.
                        </p>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button onClick={handleClose}>
                            Add
                        </Button>
                    </DialogActions>
                </div>
            </Dialog>
        </>
    );
}

export default Navbar;
