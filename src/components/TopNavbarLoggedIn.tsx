import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import AuthService from '../authService';
import Logo from '../assets/CopyFreeBackground.jpg';
import { NavLink, useNavigate } from 'react-router-dom';
import './TopNavbarLoggedIn.css';

function TopNavbarLoggedIn() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await AuthService.signOut();
            navigate('/profile');
        } catch (error) {
            console.error("error logging out", error);
        }

    }

    return (
        <AppBar className='Navbar'>
            <Container className='NavbarContainer'>
                <Toolbar className='NavbarToolbar'>
                    <div className='LogoContainer'>
                        <NavLink to='/'>
                            <div className='logo'><p>Arcade-Rate</p></div>

                        </NavLink>
                    </div>

                    <div className='MenuContainer'>
                        <NavLink to='/' className='MenuLink'>
                            <h2>Home</h2>
                        </NavLink>

                        <NavLink to='/Search' className='MenuLink'>
                            <h2>Games</h2>
                        </NavLink>

                        {/* Make dropdown menu */}
                        <NavLink to='/Profile' className='MenuLink'>
                            <h2>Profile</h2>
                        </NavLink>

                        <button onClick={handleLogout}>Logout</button>
                    </div>
                </Toolbar>
            </Container>
        </AppBar>
    );
}


export default TopNavbarLoggedIn;
