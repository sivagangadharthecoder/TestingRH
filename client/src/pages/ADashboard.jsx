import React, { useState } from 'react';
import '../styles/ADashboard.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from "sweetalert2";
import UserPage from '../pages/UserPage'

import InternshipTable from '../components/InternshipTable';
import HackathonTable from '../components/HackathonTable';
import LeaveTable from '../components/LeaveTable';
import AdminIdRequests from '../components/AdminIdRequests';

const ADashboard = () => {
    const navigate = useNavigate()
    const [activeLink, setActiveLink] = useState('profile');
    const [openSubmenu, setOpenSubmenu] = useState(null);
    const [openRequestSubmenu, setOpenRequestSubmenu] = useState(null);

    const toggleSubmenu = (menu) => {
        if (openSubmenu === menu) {
            setOpenSubmenu(null);
        } else {
            setOpenSubmenu(menu);
        }
    };

    const toggleRequestSubmenu = (menu) => {
        if (openRequestSubmenu === menu) {
            setOpenRequestSubmenu(null);
        } else {
            setOpenRequestSubmenu(menu);
        }
    };

    const renderContent = () => {
        // Split the activeLink to determine the type and status
        const parts = activeLink.split('-');

        if (parts.length === 3) {
            // This is a request with status (e.g., "internship-requests-approved")
            const type = parts[0];
            const status = parts[2];
            return <RequestList type={type} status={status} />;
        } else if (parts.length === 2 && parts[1] === 'requests') {
            // This is just the request type without status (e.g., "internship-requests")
            const type = parts[0];
            return <RequestList type={type} />;
        }

        switch (activeLink) {
            case 'internship-form':
                return <InternshipTable />;
            case 'id-form':
                return <AdminIdRequests />;
            case 'leave-form':
                return <LeaveTable />;
            case 'hackathon-form':
                return <HackathonTable />;
            default:
                return <UserPage />;
        }
    };

    const adminLogout = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "Do you want to logout?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, logout!",
            cancelButtonText: "Cancel",
            background: "#fff",
            color: "#000",
            confirmButtonColor: "#4CAF50",
            cancelButtonColor: "#F44336",
            buttonsStyling: true,
            customClass: {
                title: 'swal2-title-custom',
                content: 'swal2-content-custom',
                confirmButton: 'swal2-confirm-custom',
                cancelButton: 'swal2-cancel-custom'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                toast.success("Logout Success!");
                navigate("/");
            }
        });
    };

    return (
        <>
            <div className="dashboard-container">
                <div className="sidebar">
                    <div className="sidebar-header">
                        <h2>Admin Dashboard</h2>
                    </div>

                    <ul className="sidebar-menu">
                        <li className={`menu-item ${openSubmenu === 'forms' ? 'open' : ''}`}>
                            <div className="menu-title" onClick={() => toggleSubmenu('forms')}>
                                <span>1. All Forms</span>
                                <span className="arrow">{openSubmenu === 'forms' ? '▼' : '▶'}</span>
                            </div>
                            {openSubmenu === 'forms' && (
                                <ul className="submenu">
                                    <li
                                        className={`submenu-item ${activeLink === 'internship-form' ? 'active' : ''}`}
                                        onClick={() => setActiveLink('internship-form')}
                                    >
                                        1.1 Internship
                                    </li>
                                    <li
                                        className={`submenu-item ${activeLink === 'id-form' ? 'active' : ''}`}
                                        onClick={() => setActiveLink('id-form')}
                                    >
                                        1.2 ID
                                    </li>
                                    <li
                                        className={`submenu-item ${activeLink === 'leave-form' ? 'active' : ''}`}
                                        onClick={() => setActiveLink('leave-form')}
                                    >
                                        1.3 Leave
                                    </li>
                                    <li
                                        className={`submenu-item ${activeLink === 'hackathon-form' ? 'active' : ''}`}
                                        onClick={() => setActiveLink('hackathon-form')}
                                    >
                                        1.4 Hackathon
                                    </li>
                                </ul>
                            )}
                        </li>

                        <li className={`menu-item ${openSubmenu === 'requests' ? 'open' : ''}`}>
                            <div className="menu-title" onClick={() => toggleSubmenu('requests')}>
                                <span>2. Forms Status</span>
                                <span className="arrow">{openSubmenu === 'requests' ? '▼' : '▶'}</span>
                            </div>
                            {openSubmenu === 'requests' && (
                                <ul className="submenu">
                                    <li className={`submenu-item ${openRequestSubmenu === 'internship' ? 'open' : ''}`}>
                                        <div className="menu-title" onClick={() => toggleRequestSubmenu('internship')}>
                                            <span>2.1 Internship</span>
                                            <span className="arrow">{openRequestSubmenu === 'internship' ? '▼' : '▶'}</span>
                                        </div>
                                        {openRequestSubmenu === 'internship' && (
                                            <ul className="sub-submenu" style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px' }}>
                                                <li
                                                    className={`sub-submenu-item ${activeLink === 'internship-requests-approved' ? 'active' : ''}`}
                                                    style={{
                                                        cursor: 'pointer',
                                                        marginBottom: '10px',
                                                        borderRadius: '6px',
                                                        backgroundColor: activeLink === 'internship-requests-approved' ? '#4CAF50' : '',
                                                        color: activeLink === 'internship-requests-approved' ? 'white' : 'white',
                                                        fontWeight: activeLink === 'internship-requests-approved' ? 'bold' : 'normal'
                                                    }}
                                                    onClick={() => setActiveLink('internship-requests-approved')}
                                                >
                                                    2.1.1 Approved
                                                </li>
                                                <li
                                                    className={`sub-submenu-item ${activeLink === 'internship-requests-rejected' ? 'active' : ''}`}
                                                    style={{
                                                        cursor: 'pointer',
                                                        marginBottom: '10px',
                                                        borderRadius: '6px',
                                                        backgroundColor: activeLink === 'internship-requests-rejected' ? '#4CAF50' : '',
                                                        color: activeLink === 'internship-requests-rejected' ? 'white' : 'white',
                                                        fontWeight: activeLink === 'internship-requests-rejected' ? 'bold' : 'normal'
                                                    }}
                                                    onClick={() => setActiveLink('internship-requests-rejected')}
                                                >
                                                    2.1.2 Rejected
                                                </li>
                                                <li
                                                    className={`sub-submenu-item ${activeLink === 'internship-requests-pending' ? 'active' : ''}`}
                                                    style={{
                                                        cursor: 'pointer',
                                                        marginBottom: '10px',
                                                        borderRadius: '6px',
                                                        backgroundColor: activeLink === 'internship-requests-pending' ? '#4CAF50' : '',
                                                        color: activeLink === 'internship-requests-pending' ? 'white' : 'white',
                                                        fontWeight: activeLink === 'internship-requests-pending' ? 'bold' : 'normal'
                                                    }}
                                                    onClick={() => setActiveLink('internship-requests-pending')}
                                                >
                                                    2.1.3 Pending
                                                </li>
                                            </ul>
                                        )}
                                    </li>
                                    <li className={`submenu-item ${openRequestSubmenu === 'id' ? 'open' : ''}`}>
                                        <div className="menu-title" onClick={() => toggleRequestSubmenu('id')}>
                                            <span>2.2 ID</span>
                                            <span className="arrow">{openRequestSubmenu === 'id' ? '▼' : '▶'}</span>
                                        </div>
                                        {openRequestSubmenu === 'id' && (
                                            <ul className="sub-submenu" style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px' }}>
                                                <li
                                                    className={`sub-submenu-item ${activeLink === 'id-requests-approved' ? 'active' : ''}`}
                                                    style={{
                                                        cursor: 'pointer',
                                                        marginBottom: '10px',
                                                        borderRadius: '6px',
                                                        backgroundColor: activeLink === 'id-requests-approved' ? '#4CAF50' : '',
                                                        color: activeLink === 'id-requests-approved' ? 'white' : 'white',
                                                        fontWeight: activeLink === 'id-requests-approved' ? 'bold' : 'normal'
                                                    }}
                                                    onClick={() => setActiveLink('id-requests-approved')}
                                                >
                                                    2.2.1 Approved
                                                </li>
                                                <li
                                                    className={`sub-submenu-item ${activeLink === 'id-requests-rejected' ? 'active' : ''}`}
                                                    style={{
                                                        cursor: 'pointer',
                                                        marginBottom: '10px',
                                                        borderRadius: '6px',
                                                        backgroundColor: activeLink === 'id-requests-rejected' ? '#4CAF50' : '',
                                                        color: activeLink === 'id-requests-rejected' ? 'white' : 'white',
                                                        fontWeight: activeLink === 'id-requests-rejected' ? 'bold' : 'normal'
                                                    }}
                                                    onClick={() => setActiveLink('id-requests-rejected')}
                                                >
                                                    2.2.2 Rejected
                                                </li>
                                                <li
                                                    className={`sub-submenu-item ${activeLink === 'id-requests-pending' ? 'active' : ''}`}
                                                    style={{
                                                        cursor: 'pointer',
                                                        marginBottom: '10px',
                                                        borderRadius: '6px',
                                                        backgroundColor: activeLink === 'id-requests-pending' ? '#4CAF50' : '',
                                                        color: activeLink === 'id-requests-pending' ? 'white' : 'white',
                                                        fontWeight: activeLink === 'id-requests-pending' ? 'bold' : 'normal'
                                                    }}
                                                    onClick={() => setActiveLink('id-requests-pending')}
                                                >
                                                    2.2.3 Pending
                                                </li>
                                            </ul>
                                        )}
                                    </li>
                                    <li className={`submenu-item ${openRequestSubmenu === 'leave' ? 'open' : ''}`}>
                                        <div className="menu-title" onClick={() => toggleRequestSubmenu('leave')}>
                                            <span>2.3 Leave</span>
                                            <span className="arrow">{openRequestSubmenu === 'leave' ? '▼' : '▶'}</span>
                                        </div>
                                        {openRequestSubmenu === 'leave' && (
                                            <ul className="sub-submenu" style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px' }}>
                                                <li
                                                    className={`sub-submenu-item ${activeLink === 'leave-requests-approved' ? 'active' : ''}`}
                                                    style={{
                                                        cursor: 'pointer',
                                                        marginBottom: '10px',
                                                        borderRadius: '6px',
                                                        backgroundColor: activeLink === 'leave-requests-approved' ? '#4CAF50' : '',
                                                        color: activeLink === 'leave-requests-approved' ? 'white' : 'white',
                                                        fontWeight: activeLink === 'leave-requests-approved' ? 'bold' : 'normal'
                                                    }}
                                                    onClick={() => setActiveLink('leave-requests-approved')}
                                                >
                                                    2.3.1 Approved
                                                </li>
                                                <li
                                                    className={`sub-submenu-item ${activeLink === 'leave-requests-rejected' ? 'active' : ''}`}
                                                    style={{
                                                        cursor: 'pointer',
                                                        marginBottom: '10px',
                                                        borderRadius: '6px',
                                                        backgroundColor: activeLink === 'leave-requests-rejected' ? '#4CAF50' : '',
                                                        color: activeLink === 'leave-requests-rejected' ? 'white' : 'white',
                                                        fontWeight: activeLink === 'leave-requests-rejected' ? 'bold' : 'normal'
                                                    }}
                                                    onClick={() => setActiveLink('leave-requests-rejected')}
                                                >
                                                    2.3.2 Rejected
                                                </li>
                                                <li
                                                    className={`sub-submenu-item ${activeLink === 'leave-requests-pending' ? 'active' : ''}`}
                                                    style={{
                                                        cursor: 'pointer',
                                                        marginBottom: '10px',
                                                        borderRadius: '6px',
                                                        backgroundColor: activeLink === 'leave-requests-pending' ? '#4CAF50' : '',
                                                        color: activeLink === 'leave-requests-pending' ? 'white' : 'white',
                                                        fontWeight: activeLink === 'leave-requests-pending' ? 'bold' : 'normal'
                                                    }}
                                                    onClick={() => setActiveLink('leave-requests-pending')}
                                                >
                                                    2.3.3 Pending
                                                </li>
                                            </ul>
                                        )}
                                    </li>
                                    <li className={`submenu-item ${openRequestSubmenu === 'hackathon' ? 'open' : ''}`}>
                                        <div className="menu-title" onClick={() => toggleRequestSubmenu('hackathon')}>
                                            <span>2.4 Hackathon</span>
                                            <span className="arrow">{openRequestSubmenu === 'hackathon' ? '▼' : '▶'}</span>
                                        </div>
                                        {openRequestSubmenu === 'hackathon' && (
                                            <ul className="sub-submenu" style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px' }}>
                                                <li
                                                    className={`sub-submenu-item ${activeLink === 'hackathon-requests-approved' ? 'active' : ''}`}
                                                    style={{
                                                        cursor: 'pointer',
                                                        marginBottom: '10px',
                                                        borderRadius: '6px',
                                                        backgroundColor: activeLink === 'hackathon-requests-approved' ? '#4CAF50' : '',
                                                        color: activeLink === 'hackathon-requests-approved' ? 'white' : 'white',
                                                        fontWeight: activeLink === 'hackathon-requests-approved' ? 'bold' : 'normal'
                                                    }}
                                                    onClick={() => setActiveLink('hackathon-requests-approved')}
                                                >
                                                    2.4.1 Approved
                                                </li>
                                                <li
                                                    className={`sub-submenu-item ${activeLink === 'hackathon-requests-rejected' ? 'active' : ''}`}
                                                    style={{
                                                        cursor: 'pointer',
                                                        marginBottom: '10px',
                                                        borderRadius: '6px',
                                                        backgroundColor: activeLink === 'hackathon-requests-rejected' ? '#4CAF50' : '',
                                                        color: activeLink === 'hackathon-requests-rejected' ? 'white' : 'white',
                                                        fontWeight: activeLink === 'hackathon-requests-rejected' ? 'bold' : 'normal'
                                                    }}
                                                    onClick={() => setActiveLink('hackathon-requests-rejected')}
                                                >
                                                    2.4.2 Rejected
                                                </li>
                                                <li
                                                    className={`sub-submenu-item ${activeLink === 'hackathon-requests-pending' ? 'active' : ''}`}
                                                    style={{
                                                        cursor: 'pointer',
                                                        marginBottom: '10px',
                                                        borderRadius: '6px',
                                                        backgroundColor: activeLink === 'hackathon-requests-pending' ? '#4CAF50' : '',
                                                        color: activeLink === 'hackathon-requests-pending' ? 'white' : 'white',
                                                        fontWeight: activeLink === 'hackathon-requests-pending' ? 'bold' : 'normal'
                                                    }}
                                                    onClick={() => setActiveLink('hackathon-requests-pending')}
                                                >
                                                    2.4.3 Pending
                                                </li>
                                            </ul>
                                        )}
                                    </li>
                                </ul>
                            )}
                        </li>
                        <li
                            className='menu-item'
                            onClick={() => adminLogout()}
                        >
                            &gt; Logout
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


const RequestList = ({ type, status }) => {
    // If status is provided, show only that one; otherwise, show all three
    const statuses = status ? [status] : ['approved', 'rejected', 'pending'];

    return (
        <div className="content-box">
            <h2>
                {type.charAt(0).toUpperCase() + type.slice(1)} Requests{" "}
                {status && `- ${status.charAt(0).toUpperCase() + status.slice(1)}`}
            </h2>

            {statuses.map((s, index) => (
                <div key={s} className="request-status-block">
                    <h3>{s.charAt(0).toUpperCase() + s.slice(1)}</h3>
                    <p>Click logic or display logic will go here for <strong>{s}</strong> {type} requests.</p>

                    {/* Divider between sections */}
                    {index < statuses.length - 1 && (
                        <div className="request-divider">
                            <span>OR</span>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};


export default ADashboard;