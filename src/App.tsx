import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from './firebase';

import Home from './pages/Home';
import TopNavbarLoggedIn from './components/TopNavbarLoggedIn';
import TopNavbarLoggedOut from './components/TopNavbarLoggedOut';
import Footer from './components/Footer';
import GameSearch from './pages/GameSearch';
import Login from './pages/User/Login';
import Profile from './pages/User/Profile';
import Settings from './pages/User/Settings';
import './App.css';
import SearchResultsPage from './pages/SearchResultsPage';

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <Router>
      {currentUser ? <TopNavbarLoggedIn /> : <TopNavbarLoggedOut />}
      <div className='content'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<GameSearch />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/settings" element={<Settings />} />
          <Route path="/searchuser" element={<SearchResultsPage />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
