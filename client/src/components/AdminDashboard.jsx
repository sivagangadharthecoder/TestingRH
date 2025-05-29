import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import '../styles/AdminDashboard.css';
import Swal from "sweetalert2";
import { toast } from 'react-toastify';

const AdminDashboard = () => {
    const navigate = useNavigate();

    const handleAdminLogout = () => {
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
                toast.success("Admin Logout Success!");
                navigate('/');
            }
        });
    };

    return (
        <div className="admindash-container">
            <div className="admindash-sidepanel">
                <div className="admindash-brand">Admin Portal</div>
                <nav className="admindash-navigation">
                    <ul className="admindash-menulist">

                        {/* All Forms Section */}
                        <li className="admindash-menuitem">
                            <details className="admindash-dropdown">
                                <summary className="admindash-menuheader">
                                    All Forms
                                    <span className="admindash-arrowicon">▼</span>
                                </summary>
                                <ul className="admindash-submenulist">
                                    <li><Link to="internship-table" className="admindash-sublink">Internship</Link></li>
                                    <li><Link to="id-table" className="admindash-sublink">ID</Link></li>
                                    <li><Link to="leave-table" className="admindash-sublink">Leave</Link></li>
                                    <li><Link to="hackathon-table" className="admindash-sublink">Hackathon</Link></li>
                                </ul>
                            </details>
                        </li>

                        {/* Forms Status Section */}
                        <li className="admindash-menuitem">
                            <details className="admindash-dropdown">
                                <summary className="admindash-menuheader">
                                    Forms Status
                                    <span className="admindash-arrowicon">▼</span>
                                </summary>
                                <ul className="admindash-submenulist">

                                    {/* Internship Status */}
                                    <li>
                                        <details className="admindash-nesteddropdown">
                                            <summary className="admindash-sublink">Internship Status</summary>
                                            <ul className="admindash-nestedsublist">
                                                <li><Link to="internship-table-approved" className="admindash-nestedsublink">Approved</Link></li>
                                                <li><Link to="internship-table-rejected" className="admindash-nestedsublink">Rejected</Link></li>
                                                <li><Link to="internship-table-pending" className="admindash-nestedsublink">Pending</Link></li>
                                            </ul>
                                        </details>
                                    </li>

                                    {/* ID Status */}
                                    <li>
                                        <details className="admindash-nesteddropdown">
                                            <summary className="admindash-sublink">ID Status</summary>
                                            <ul className="admindash-nestedsublist">
                                                <li><Link to="id-table-approved" className="admindash-nestedsublink">Approved</Link></li>
                                                <li><Link to="id-table-rejected" className="admindash-nestedsublink">Rejected</Link></li>
                                                <li><Link to="id-table-pending" className="admindash-nestedsublink">Pending</Link></li>
                                            </ul>
                                        </details>
                                    </li>

                                    {/* Leave Status */}
                                    <li>
                                        <details className="admindash-nesteddropdown">
                                            <summary className="admindash-sublink">Leave Status</summary>
                                            <ul className="admindash-nestedsublist">
                                                <li><Link to="leave-table-approved" className="admindash-nestedsublink">Approved</Link></li>
                                                <li><Link to="leave-table-rejected" className="admindash-nestedsublink">Rejected</Link></li>
                                                <li><Link to="leave-table-pending" className="admindash-nestedsublink">Pending</Link></li>
                                            </ul>
                                        </details>
                                    </li>

                                    {/* Hackathon Status */}
                                    <li>
                                        <details className="admindash-nesteddropdown">
                                            <summary className="admindash-sublink">Hackathon Status</summary>
                                            <ul className="admindash-nestedsublist">
                                                <li><Link to="hackathon-table-approved" className="admindash-nestedsublink">Approved</Link></li>
                                                <li><Link to="hackathon-table-rejected" className="admindash-nestedsublink">Rejected</Link></li>
                                                <li><Link to="hackathon-table-pending" className="admindash-nestedsublink">Pending</Link></li>
                                            </ul>
                                        </details>
                                    </li>
                                </ul>
                            </details>
                        </li>

                        {/* Logout Option */}
                        <li className="admindash-menuitem">
                            <div
                                className="admindash-menuheader admindash-logoutbtn"
                                onClick={handleAdminLogout}
                            >
                                Logout
                                {/* <span className="admindash-logouticon">⎋</span> */}
                            </div>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className="admindash-contentarea">
                <Outlet />
            </div>
        </div>
    );
};

export default AdminDashboard;