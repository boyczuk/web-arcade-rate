import { Link as RouterLink } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import './Navbar.css';

function Navbar() {
    return (
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
                    <ListItem component={RouterLink} to="/add-movie">
                        <ListItemText primary="Add Movie" data-text="Add Movie" />
                    </ListItem>
                    <ListItem component={RouterLink} to="/profile">
                        <ListItemText primary="Profile" data-text="Profile" />
                    </ListItem>
                </List>
            </Drawer>
    );
}

export default Navbar;
