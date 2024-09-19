import React, { useState, useEffect, useRef, FormEvent, ChangeEvent } from 'react';
import { AppBar, Toolbar, Container } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import AuthService from '../authService';
import ArcadeRateLogo from '../assets/ArcadeRateLogo2.jpg';
import SearchIcon from '@mui/icons-material/Search'; // Import Search Icon for the button
import './TopNavbarLoggedIn.css';

function TopNavbarLoggedIn() {
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false); // State for mobile menu
    const [searchTerm, setSearchTerm] = useState('');
    const menuRef = useRef<HTMLDivElement | null>(null); // Ref to track the mobile menu container
    const hamburgerRef = useRef<HTMLDivElement | null>(null); // Ref to track the hamburger icon

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

    const toggleMenu = () => {
        setMenuOpen(!menuOpen); // Toggle the mobile menu
    };

    // Close the menu if clicked outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                menuOpen &&
                menuRef.current &&
                !menuRef.current.contains(event.target as Node) &&
                hamburgerRef.current &&
                !hamburgerRef.current.contains(event.target as Node)
            ) {
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

                    {/* Search bar is always in the top navbar */}
                    <div className='search-container'>
                        <form onSubmit={handleSearchSubmit} className="SearchForm" style={{ display: 'flex', alignItems: 'center' }}>
                            <input
                                className="search-input"
                                type="text"
                                placeholder="Search users..."
                                value={searchTerm}
                                onChange={handleInputChange}
                            />
                            {/* Show search button only on desktop */}
                            <button className="search-button" type="submit">
                                <SearchIcon />
                            </button>
                        </form>
                    </div>

                    {/* Desktop menu */}
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

                    {/* Hamburger icon for mobile */}
                    <div className="HamburgerIcon" onClick={toggleMenu} ref={hamburgerRef}>
                        &#9776; {/* Unicode character for hamburger icon */}
                    </div>
                </Toolbar>

                {/* Mobile menu */}
                {menuOpen && (
                    <div className="MobileMenu" ref={menuRef}>
                        <NavLink to='/' className='MenuLink' onClick={toggleMenu}>
                            <h2>Home</h2>
                        </NavLink>
                        <NavLink to='/Search' className='MenuLink' onClick={toggleMenu}>
                            <h2>Games</h2>
                        </NavLink>
                        <NavLink to='/Profile' className='MenuLink' onClick={toggleMenu}>
                            <h2>Profile</h2>
                        </NavLink>
                        <button className='MenuLink' onClick={handleLogout}>
                            <h2>Logout</h2>
                        </button>
                    </div>
                )}
            </Container>
        </AppBar>
    );
}

export default TopNavbarLoggedIn;
