import React, { useState } from 'react';

type LoginComponentProps = {
    onLoginSuccess?: () => void;
};

const LoginComponent: React.FC<LoginComponentProps> = ({ onLoginSuccess }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (username === 'admin' && password === '1234') {
            if (onLoginSuccess) {
                onLoginSuccess();
            }
        } else {
            setErrorMsg('Invalid credentials');
        }
    };

    return (
        <div id="login-component">
            <h2>Login</h2>
            <form id="loginForm" autoComplete="off" onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    required
                />
                <br />
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />
                <br />
                <button type="submit" id="loginBtn">Login</button>
                <div id="errorMsg" style={{ color: 'red' }}>{errorMsg}</div>
            </form>
        </div>
    );
};

export default LoginComponent;
