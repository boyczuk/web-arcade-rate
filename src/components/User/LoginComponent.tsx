import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../../src/authService';

import './LoginComponent.css';

interface LoginFormProps {
    onSwitchMode: () => void;
  }

const LoginForm: React.FC<LoginFormProps> = ({ onSwitchMode }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginFailed, setLoginFailed] = useState(false);
    
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await AuthService.signIn(email, password);
            navigate('/profile');
        } catch (error) {
            setLoginFailed(true);
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleLogin} className="login-form">
                <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Login</button>
            </form>
            <div className="error-message">
                {loginFailed && <p>Incorrect password or username</p>}
            </div>
            <button className='switch-button' onClick={onSwitchMode}>Need an account? Sign up</button>
        </div>
    );
};

export default LoginForm;