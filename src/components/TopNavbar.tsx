import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import { NavLink } from 'react-router-dom';
import './TopNavbar.css';

function TopNavbar() {
    return (
        <AppBar className='Navbar'>
            <Container className='NavbarContainer'>
                <Toolbar className='NavbarToolbar'>
                    <div className='LogoContainer'>
                        <NavLink to='/'>
                            <img
                                //src={Logo}
                                alt='Logo'
                                width={50}
                                height={50}
                            />
                        </NavLink>
                    </div>

                    <div className='MenuContainer'>
                        <NavLink to='/' className='MenuLink'>
                            <h2>Home</h2>
                        </NavLink>

                        <NavLink to='/games' className='MenuLink'>
                            <h2>Games</h2>
                        </NavLink>

                        <NavLink to='/log-in' className='MenuLink'>
                            <h2>Log in</h2>
                        </NavLink>
                    </div>
                </Toolbar>
            </Container>
        </AppBar>
    );
}


export default TopNavbar;
