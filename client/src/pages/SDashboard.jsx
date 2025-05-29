import React, { useState } from 'react';
import '../styles/SDashboard.css';
import Navbar from '../components/Navbar';

const SDashboard = () => {
    const [activeLink, setActiveLink] = useState('profile');
    const [openSubmenu, setOpenSubmenu] = useState(null);

    const toggleSubmenu = (menu) => {
        if (openSubmenu === menu) {
            setOpenSubmenu(null);
        } else {
            setOpenSubmenu(menu);
        }
    };

    const renderContent = () => {
        switch (activeLink) {
            case 'profile':
                return <ProfileContent />;
            case 'internship-form':
                return <InternshipForm />;
            case 'id-form':
                return <IDForm />;
            case 'leave-form':
                return <LeaveForm />;
            case 'hackathon-form':
                return <HackathonForm />;
            case 'internship-requests':
                return <RequestList type="internship" />;
            case 'id-requests':
                return <RequestList type="ID" />;
            case 'leave-requests':
                return <RequestList type="leave" />;
            case 'hackathon-requests':
                return <RequestList type="hackathon" />;
            default:
                return <ProfileContent />;
        }
    };

    return (
        <>
        <Navbar />
            <div className="dashboard-container">
                <div className="sidebar">
                    <div className="sidebar-header">
                        <h2>Student Dashboard</h2>
                    </div>

                    <ul className="sidebar-menu">
                        <li
                            className={`menu-item ${activeLink === 'profile' ? 'active' : ''}`}
                            onClick={() => setActiveLink('profile')}
                        >
                            <span>1. Profile</span>
                        </li>

                        <li className={`menu-item ${openSubmenu === 'forms' ? 'open' : ''}`}>
                            <div className="menu-title" onClick={() => toggleSubmenu('forms')}>
                                <span>2. Forms</span>
                                <span className="arrow">{openSubmenu === 'forms' ? '▼' : '▶'}</span>
                            </div>
                            {openSubmenu === 'forms' && (
                                <ul className="submenu">
                                    <li
                                        className={`submenu-item ${activeLink === 'internship-form' ? 'active' : ''}`}
                                        onClick={() => setActiveLink('internship-form')}
                                    >
                                        2.1 Internship
                                    </li>
                                    <li
                                        className={`submenu-item ${activeLink === 'id-form' ? 'active' : ''}`}
                                        onClick={() => setActiveLink('id-form')}
                                    >
                                        2.2 ID
                                    </li>
                                    <li
                                        className={`submenu-item ${activeLink === 'leave-form' ? 'active' : ''}`}
                                        onClick={() => setActiveLink('leave-form')}
                                    >
                                        2.3 Leave
                                    </li>
                                    <li
                                        className={`submenu-item ${activeLink === 'hackathon-form' ? 'active' : ''}`}
                                        onClick={() => setActiveLink('hackathon-form')}
                                    >
                                        2.4 Hackathon
                                    </li>
                                </ul>
                            )}
                        </li>

                        <li className={`menu-item ${openSubmenu === 'requests' ? 'open' : ''}`}>
                            <div className="menu-title" onClick={() => toggleSubmenu('requests')}>
                                <span>3. Requested</span>
                                <span className="arrow">{openSubmenu === 'requests' ? '▼' : '▶'}</span>
                            </div>
                            {openSubmenu === 'requests' && (
                                <ul className="submenu">
                                    <li
                                        className={`submenu-item ${activeLink === 'internship-requests' ? 'active' : ''}`}
                                        onClick={() => setActiveLink('internship-requests')}
                                    >
                                        3.1 Internship
                                    </li>
                                    <li
                                        className={`submenu-item ${activeLink === 'id-requests' ? 'active' : ''}`}
                                        onClick={() => setActiveLink('id-requests')}
                                    >
                                        3.2 ID
                                    </li>
                                    <li
                                        className={`submenu-item ${activeLink === 'leave-requests' ? 'active' : ''}`}
                                        onClick={() => setActiveLink('leave-requests')}
                                    >
                                        3.3 Leave
                                    </li>
                                    <li
                                        className={`submenu-item ${activeLink === 'hackathon-requests' ? 'active' : ''}`}
                                        onClick={() => setActiveLink('hackathon-requests')}
                                    >
                                        3.4 Hackathon
                                    </li>
                                </ul>
                            )}
                        </li>
                    </ul>
                </div>

                <div className="main-content">
                    {renderContent()}
                </div>
            </div>
        </>
    );
};

// Placeholder components for content areas
const ProfileContent = () => (
    <div className="content-box">
        <h2>Profile Information</h2>
        <p>This is where student profile information would be displayed.</p>
    </div>
);

const InternshipForm = () => (
    <div className="content-box">
        <h2>Internship Application Form</h2>
        <p>Form fields for internship application would go here.</p>
    </div>
);

const IDForm = () => (
    <div className="content-box">
        <h2>ID Application Form</h2>
        <p>Form fields for ID application would go here.</p>
    </div>
);

const LeaveForm = () => (
    <div className="content-box">
        <h2>Leave Application Form</h2>
        <p>Form fields for leave application would go here.</p>
    </div>
);

const HackathonForm = () => (
    <div className="content-box">
        <h2>Hackathon Registration Form</h2>
        <p>Form fields for hackathon registration would go here.</p>
    </div>
);

const RequestList = ({ type }) => {
    const statuses = ['approved', 'rejected', 'pending'];

    return (
        <div className="content-box">
            <h2>{type.charAt(0).toUpperCase() + type.slice(1)} Requests</h2>
            <div className="request-grid">
                {statuses.map(status => (
                    <div key={status} className="request-card">
                        <h3>{status.charAt(0).toUpperCase() + status.slice(1)}</h3>
                        <div className="request-list">
                            {/* Sample request items */}
                            <div className="request-item">
                                <span>Request #{Math.floor(Math.random() * 1000)}</span>
                                <span className={`status-badge ${status}`}>{status}</span>
                            </div>
                            <div className="request-item">
                                <span>Request #{Math.floor(Math.random() * 1000)}</span>
                                <span className={`status-badge ${status}`}>{status}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SDashboard;