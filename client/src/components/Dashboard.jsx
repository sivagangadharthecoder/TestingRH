import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import '../styles/Dashboard.css';
import Navbar from '../components/Navbar'

const Dashboard = () => {
  return (
    <>
      <Navbar />

      <div className="dashboard-container">
        <div className="dashboard-sidebar">
          <div className="dashboard-logo">Dashboard</div>
          <nav className="dashboard-nav">
            <ul className="dashboard-menu">

              {/* Forms Section */}
              <li className="dashboard-menu-item">
                <details>
                  <summary className="dashboard-menu-header">
                    Forms
                    <span className="dashboard-menu-arrow">▼</span>
                  </summary>
                  <ul className="dashboard-submenu">
                    <li><Link to="internship-form">Internship</Link></li>
                    <li><Link to="id-form">ID</Link></li>
                    <li><Link to="leave-form">Leave</Link></li>
                    <li><Link to="hackathon-form">Hackathon</Link></li>
                  </ul>
                </details>
              </li>

              {/* All Forms Section */}
              <li className="dashboard-menu-item">
                <details>
                  <summary className="dashboard-menu-header">
                    All Forms
                    <span className="dashboard-menu-arrow">▼</span>
                  </summary>
                  <ul className="dashboard-submenu">
                    <li><Link to="internship-table-user">Internship</Link></li>
                    <li><Link to="id-table-user">ID</Link></li>
                    <li><Link to="leave-table-user">Leave</Link></li>
                    <li><Link to="hackathon-table-user">Hackathon</Link></li>
                  </ul>
                </details>
              </li>

              {/* Forms Status Section */}
              <li className="dashboard-menu-item">
                <details>
                  <summary className="dashboard-menu-header">
                    Forms Status
                    <span className="dashboard-menu-arrow">▼</span>
                  </summary>
                  <ul className="dashboard-submenu">

                    {/* Internship Status */}
                    <li>
                      <details className="dashboard-nested-dropdown">
                        <summary className="dashboard-submenu-header">Internship</summary>
                        <ul className="dashboard-nested-submenu">
                          <li><Link to="internship-table-user-approved">Approved</Link></li>
                          <li><Link to="internship-table-user-rejected">Rejected</Link></li>
                          <li><Link to="internship-table-user-pending">Pending</Link></li>
                        </ul>
                      </details>
                    </li>

                    {/* ID Status */}
                    <li>
                      <details className="dashboard-nested-dropdown">
                        <summary className="dashboard-submenu-header">ID</summary>
                        <ul className="dashboard-nested-submenu">
                          <li><Link to="id-table-user-approved">Approved</Link></li>
                          <li><Link to="id-table-user-rejected">Rejected</Link></li>
                          <li><Link to="id-table-user-pending">Pending</Link></li>
                        </ul>
                      </details>
                    </li>

                    {/* Leave Status */}
                    <li>
                      <details className="dashboard-nested-dropdown">
                        <summary className="dashboard-submenu-header">Leave</summary>
                        <ul className="dashboard-nested-submenu">
                          <li><Link to="leave-table-user-approved">Approved</Link></li>
                          <li><Link to="leave-table-user-rejected">Rejected</Link></li>
                          <li><Link to="leave-table-user-pending">Pending</Link></li>
                        </ul>
                      </details>
                    </li>

                    {/* Hackathon Status */}
                    <li>
                      <details className="dashboard-nested-dropdown">
                        <summary className="dashboard-submenu-header">Hackathon</summary>
                        <ul className="dashboard-nested-submenu">
                          <li><Link to="hackathon-table-user-approved">Approved</Link></li>
                          <li><Link to="hackathon-table-user-rejected">Rejected</Link></li>
                          <li><Link to="hackathon-table-user-pending">Pending</Link></li>
                        </ul>
                      </details>
                    </li>
                  </ul>
                </details>
              </li>
            </ul>
          </nav>
        </div>
        <div className="dashboard-content">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Dashboard;