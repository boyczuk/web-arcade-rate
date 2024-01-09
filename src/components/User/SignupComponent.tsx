import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../../src/authService';

interface SignupFormProps {
    onSwitchMode: () => void;
  }

const SignupForm: React.FC<SignupFormProps> = ({ onSwitchMode }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [signupFailed, setSignupFailed] = useState(false);
    
    const navigate = useNavigate();

    const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await AuthService.signIn(email, password);
            navigate('/profile');
        } catch (error) {
            setSignupFailed(true);
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSignup} className="login-form">
                <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Create your password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Sign up</button>
            </form>
            <div className="error-message">
                {signupFailed && <p>Registration failed</p>}
            </div>
            <button onClick={onSwitchMode}>Already have an account? Log in</button>
        </div>
    );
};

export default SignupForm;