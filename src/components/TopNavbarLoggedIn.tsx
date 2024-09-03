import React, { useState, FormEvent, ChangeEvent } from 'react';
import { AppBar, Toolbar, Container } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import AuthService from '../authService';
import ArcadeRateLogo from '../assets/ArcadeRateLogo2.jpg';
import './TopNavbarLoggedIn.css';

function TopNavbarLoggedIn() {
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const handleLogout = async () => {
        try {
            await AuthService.signOut();
            navigate('/profile');
        } catch (error) {
            console.error("error logging out", error);
        }
    };

    const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/searchuser?query=${encodeURIComponent(searchTerm.trim())}`);
        }
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    return (
        <AppBar className='Navbar'>
            <Container className='NavbarContainer'>
                <Toolbar className='NavbarToolbar'>
                    <div className='LogoContainer'>
                        <NavLink to='/'>
                            <div className='logo'>
                                <img src={ArcadeRateLogo} alt="Arcade rate logo"></img>
                            </div>
                        </NavLink>
                    </div>

                    <form onSubmit={handleSearchSubmit} style={{ display: 'flex', alignItems: 'center' }}>
                        <input
                            className="search-input"
                            type="text"
                            placeholder="Search users..."
                            value={searchTerm}
                            onChange={handleInputChange}
                        />
                        <button className="search-button" type="submit">Search</button>
                    </form>

                    <div className='MenuContainer'>
                        <NavLink to='/' className='MenuLink'>
                            <h2>Home</h2>
                        </NavLink>
                        <NavLink to='/Search' className='MenuLink'>
                            <h2>Games</h2>
                        </NavLink>

                        <div
                            className='MenuLink ProfileLink'
                            onMouseEnter={() => setDropdownOpen(true)}
                            onMouseLeave={() => setDropdownOpen(false)}>
                            <NavLink to='/Profile' className='MenuLink'>
                                <h2>Profile</h2>
                            </NavLink>
                            {dropdownOpen && (
                                <div className='DropdownMenu'>
                                    <li><NavLink to='/profile/settings' className='MenuLink'>Settings</NavLink></li>
                                    <li><NavLink to='/profile' className='MenuLink'>My Games</NavLink></li>
                                    <li><button className='MenuLink' onClick={handleLogout}>Logout</button></li>
                                </div>
                            )}
                        </div>

                        
                    </div>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default TopNavbarLoggedIn;
