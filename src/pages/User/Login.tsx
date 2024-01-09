import React, { useState } from 'react';
import AuthService from '../../../src/authService';
import { useNavigate } from 'react-router-dom';
import './Login.css'

const LoginComponent: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await AuthService.signIn(email, password);
            navigate('/profile');
        } catch (error) {
            console.error("Authentication failed", error);
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleLogin} className="login-form">
                <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginComponent;
