import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../../src/authService';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';

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

    const [signupFailed, setSignupFailed] = useState(false);
    const [passwordMismatch, setPasswordMismatch] = useState(false);

    const navigate = useNavigate();

    const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (password !== verifyPassword) {
            setSignupFailed(true);
            console.error(("Passwords don't match"));
            setPasswordMismatch(true);
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
        
                const firebaseError = error as any;
                if (firebaseError.response && firebaseError.response.data) {
                    console.error("Detailed error:", firebaseError.response.data.error.message);
                }
            } else {
                console.error("An unknown error occurred during signup");
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
                <input type="password" placeholder="Create your password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <input type="password" placeholder="Verify your password" value={verifyPassword} onChange={(e) => setVerifyPassword(e.target.value)} />
                <button type="submit">Sign up</button>
            </form>

            <div className="error-message">
                {signupFailed && <p>Registration failed</p>}
                {passwordMismatch && <p>Passwords do not match</p>}
            </div>
            <button onClick={onSwitchMode}>Already have an account? Log in</button>
        </div>
    );
};

export default SignupForm;