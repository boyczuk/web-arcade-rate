import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../../components/User/LoginComponent';
import SignupForm from '../../components/User/SignupComponent';
import './Login.css'

const Login: React.FC = () => {
    const [isLoginMode, setIsLoginMode] = useState(true);

    const switchMode = () => setIsLoginMode(!isLoginMode);

    return (
        <div>
            {isLoginMode ? (
                <LoginForm onSwitchMode={switchMode} />
            ) : (
                <SignupForm onSwitchMode={switchMode} />
            )}
        </div>
    );
};

export default Login;
