import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../../src/authService';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import './SignupComponent.css';

interface SignupFormProps {
    onSwitchMode: () => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ onSwitchMode }) => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');
    const [password, setPassword] = useState('');
    const [verifyPassword, setVerifyPassword] = useState('');

    const [showPassword, setShowPassword] = useState(false);
    const [showVerifyPassword, setShowVerifyPassword] = useState(false);

    const [signupFailed, setSignupFailed] = useState(false);
    const [error, setErrorMessage] = useState("");

    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleVerifyPasswordVisibility = () => {
        setShowVerifyPassword(!showVerifyPassword);
    }

    const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (name == "") {
            setSignupFailed(true);
            setErrorMessage('Name can\'t be empty');
            return;
        }

        if (username == "") {
            setSignupFailed(true);
            setErrorMessage('Username can\'t be empty');
            return;
        }

        if (email == "") {
            setSignupFailed(true);
            setErrorMessage('Email can\'t be empty');
            return;
        }

        if (birthday == "") {
            setSignupFailed(true);
            setErrorMessage('Birthday can\'t be empty');
            return;
        }

        if (password == "") {
            setSignupFailed(true);
            setErrorMessage('Password can\'t be empty');
            return;
        }

        if (password !== verifyPassword) {
            setSignupFailed(true);
            setErrorMessage('Passwords do not match');
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await setDoc(doc(db, 'users', user.uid), {
                name,
                username,
                email,
                birthday
            });

            navigate("/profile");
        } catch (error) {
            setSignupFailed(true);
            if (error instanceof Error) {
                console.error("Signup failed:", error.message);
                //setErrorMessage(error.message);
            } else {
                console.error("An unknown error occurred during signup");
                setErrorMessage("An unknown error occurred during signup");
            }
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSignup} className="login-form">
                <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="date" placeholder="Birthday" value={birthday} onChange={(e) => setBirthday(e.target.value)} />
                <div className="password-container">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Create your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="show-password-button"
                    >
                        {showPassword ? 'Hide' : 'Show'}
                    </button>
                </div>

                <div className="password-container">
                    <input
                        type={showVerifyPassword ? 'text' : 'password'}
                        placeholder="Verify your password"
                        value={verifyPassword}
                        onChange={(e) => setVerifyPassword(e.target.value)}
                    />
                    <button
                        type="button"
                        onClick={toggleVerifyPasswordVisibility}
                        className="show-password-button"
                    >
                        {showVerifyPassword ? 'Hide' : 'Show'}
                    </button>
                </div>
                <button type="submit">Sign up</button>
            </form>

            <div className="error-message">
                {signupFailed && error && <p>{error}</p>}
            </div>
            <button className='switch-button' onClick={onSwitchMode}>Already have an account? Log in</button>
        </div>
    );
};

export default SignupForm;