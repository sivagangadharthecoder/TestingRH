import React, { useContext, useState, useMemo } from 'react';
import '../styles/Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { AppContent } from '../context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import Swal from 'sweetalert2';

const Navbar = () => {
    const navigate = useNavigate();
    const { userData, backendUrl, setUserData, setIsLoggedin, loading } = useContext(AppContent);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);

    const userColor = useMemo(() => {
        const colors = [
            '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0',
            '#9966FF', '#FF9F40', '#8AC24A', '#607D8B'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }, [userData?.name]);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);

    const logout = async () => {
        // 1. First, show the confirmation dialog
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "Do you want to logout?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, logout!",
            cancelButtonText: "Cancel",
            background: "#fff",
            color: "#000",
            confirmButtonColor: "#4CAF50", // Green
            cancelButtonColor: "#F44336",  // Red
            buttonsStyling: true,
            customClass: {
                title: 'swal2-title-custom',
                content: 'swal2-content-custom',
                confirmButton: 'swal2-confirm-custom',
                cancelButton: 'swal2-cancel-custom'
            }
        });

        // 2. Only proceed if user confirms
        if (result.isConfirmed) {
            try {
                axios.defaults.withCredentials = true;
                const { data } = await axios.post(backendUrl + '/api/auth/logout');

                if (data.success) {
                    setIsLoggedin(false);
                    setUserData(false);
                    toast.success("Logged out successfully!");
                    navigate("/");
                }
            } catch (error) {
                toast.error(error.message);
            }
        }
    };

    const sendVerificationOtp = async () => {
        try {
            const { data } = await axios.post(backendUrl + '/api/auth/send-verify-otp', {}, {
                withCredentials: true
            });

            if (data.success) {
                navigate('/email-verify');
                toast.success(data.message);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    };

    const handleAdminLogin = async () => {
        try {
            toast.info("Login First!")
            navigate('/adminlogin');

            setIsAccountMenuOpen(false);
            setIsMenuOpen(false);
        } catch (error) {
            toast.error(error.message);
        }
    };

    if (loading) {
        return <div className="navbar-loading">Loading...</div>;
    }

    const theStudentLogin = () => {
        toast.info('Login / Register First')
        navigate('/login')
    }

    return (
        <nav className="navbar">
            <div className="navbar__container">
                <h1 className="navbar__logo" onClick={() => navigate('/')}>
                    <span className="navbar__logo-main">REQUEST</span>
                    <span className="navbar__logo-accent">HUB</span>
                </h1>

                <div className={`navbar__links ${isMenuOpen ? 'open' : ''}`}>
                    <Link to="/about" className="navbar__link" onClick={() => setIsMenuOpen(false)}>
                        <span className="navbar__link-text">ABOUT</span>
                        <div className="navbar__link-hover"></div>
                    </Link>
                    <Link to="/contact" className="navbar__link" onClick={() => setIsMenuOpen(false)}>
                        <span className="navbar__link-text">CONTACT</span>
                        <div className="navbar__link-hover"></div>
                    </Link>

                    {/* Show Dashboard link only if user is logged in and verified */}
                    {userData?.isAccountVerified && (
                        <Link to="/student-dashboard" className="navbar__link" onClick={() => setIsMenuOpen(false)}>
                            <span className="navbar__link-text">DASHBOARD</span>
                            <div className="navbar__link-hover"></div>
                        </Link>
                    )}

                    {userData ? (
                        <div className={`navbar__user-wrapper ${isMenuOpen ? 'mobile-view' : ''}`}>
                            <div
                                className="navbar__user-icon"
                                onClick={toggleUserMenu}
                                style={{ backgroundColor: userColor }}
                            >
                                {userData.name[0].toUpperCase()}
                            </div>
                            {isUserMenuOpen && (
                                <div className={`navbar__user-menu ${isMenuOpen ? 'mobile-position' : ''}`}>
                                    {!userData.isAccountVerified && (
                                        <div
                                            className="navbar__user-menu-item"
                                            onClick={() => sendVerificationOtp()}
                                        >
                                            Verify Account
                                        </div>
                                    )}
                                    <div
                                        className="navbar__user-menu-item"
                                        onClick={() => logout()}
                                    >
                                        Logout
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className={`navbar__account-wrapper ${isMenuOpen ? 'mobile-view' : ''}`}>
                            <div
                                className="navbar__link"
                                onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
                            >
                                <span className="navbar__link-text">ACCOUNT</span>
                                <div className="navbar__link-hover"></div>
                            </div>
                            {isAccountMenuOpen && (
                                <div className={`navbar__account-menu ${isMenuOpen ? 'mobile-position' : ''}`}>
                                    <div
                                        className="navbar__account-menu-item"
                                        onClick={() => {
                                            theStudentLogin();
                                            setIsAccountMenuOpen(false);
                                            setIsMenuOpen(false);
                                        }}
                                    >
                                        User
                                    </div>
                                    <div
                                        className="navbar__account-menu-item"
                                        onClick={handleAdminLogin}
                                    >
                                        Admin
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <div className="navbar__hamburger" onClick={toggleMenu}>
                    <div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
                    <div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
                    <div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;