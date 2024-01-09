import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Logo from '../assets/CopyFreeBackground.jpg';
import { NavLink } from 'react-router-dom';
import './TopNavbar.css';

function TopNavbar() {
    return (
        <AppBar className='Navbar'>
            <Container className='NavbarContainer'>
                <Toolbar className='NavbarToolbar'>
                    <div className='LogoContainer'>
                        <NavLink to='/'>
                            <p>AR</p>
                        </NavLink>
                    </div>

                    <div className='MenuContainer'>
                        <NavLink to='/' className='MenuLink'>
                            <h2>Home</h2>
                        </NavLink>

                        <NavLink to='/Search' className='MenuLink'>
                            <h2>Games</h2>
                        </NavLink>

                        <NavLink to='/Login' className='MenuLink'>
                            <h2>Log in</h2>
                        </NavLink>
                    </div>
                </Toolbar>
            </Container>
        </AppBar>
    );
}


export default TopNavbar;
