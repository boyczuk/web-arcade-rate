import React, { useState, useEffect, useRef } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import { NavLink } from 'react-router-dom';
import ArcadeRateLogo from '../assets/ArcadeRateLogo2.jpg';
import './TopNavbarLoggedOut.css';

function TopNavbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement | null>(null);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuOpen && menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuOpen]);

    return (
        <AppBar className='Navbar'>
            <Container className='NavbarContainer'>
                <Toolbar className='NavbarToolbar'>
                    <div className='LogoContainer'>
                        <NavLink to='/'>
                            <div className='logo'>
                                <img src={ArcadeRateLogo} alt="Arcade rate logo" />
                            </div>
                        </NavLink>
                    </div>

                    <div className='MenuContainer'>
                        <NavLink to='/' className='MenuLink'>
                            <h2>Home</h2>
                        </NavLink>

                        <NavLink to='/Login' className='MenuLink'>
                            <h2>Games</h2>
                        </NavLink>

                        <NavLink to='/Login' className='MenuLink'>
                            <h2>Log in</h2>
                        </NavLink>
                    </div>

                    <div className="HamburgerIcon" onClick={toggleMenu}>
                        &#9776;
                    </div>
                </Toolbar>

                {/* Mobile menu */}
                {menuOpen && (
                    <div className="MobileMenu" ref={menuRef}>
                        <NavLink to='/' className='MenuLink' onClick={toggleMenu}>
                            <h2>Home</h2>
                        </NavLink>

                        <NavLink to='/Login' className='MenuLink' onClick={toggleMenu}>
                            <h2>Games</h2>
                        </NavLink>

                        <NavLink to='/Login' className='MenuLink' onClick={toggleMenu}>
                            <h2>Log in</h2>
                        </NavLink>
                    </div>
                )}
            </Container>
        </AppBar>
    );
}

export default TopNavbar;
