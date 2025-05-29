import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LandingLR.css';

const LandingLR = () => {
    const [mail, setMail] = useState('');
    const [pass, setPass] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        if (!mail || !pass) {
            alert('Please fill in all fields');
            return;
        }

        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            if (mail === 'gsivagangadhar367@gmail.com' && pass === 'Aq@12345') {
                navigate('/admin-dashboard');
            } else {
                alert('Invalid credentials');
            }
            setIsLoading(false);
        }, 1500);
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h1 className="login-title">REQUESTHUB ADMIN</h1>
                <form onSubmit={handleLogin}>
                    <div className="input-group">
                        <label htmlFor="email">Username</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={mail}
                            onChange={(e) => setMail(e.target.value)}
                            className="login-input"
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <div className="password-input-wrapper">
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                value={pass}
                                onChange={(e) => setPass(e.target.value)}
                                className="login-input"
                                required
                            />
                            <span
                                className="password-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? '👁️' : '👁️‍🗨️'}
                            </span>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="login-btn"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <div className="loader"></div>
                        ) : (
                            <>
                                <span className="btn-text">Sign In</span>
                                <span className="btn-arrow">→</span>
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LandingLR;