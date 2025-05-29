import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/HackathonTable.css";
import { useContext } from "react";
import { AppContent } from "../context/AppContext";

function UserHackthonRejected() {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    const { userData } = useContext(AppContent);


    useEffect(() => {
        if (userData) {
            fetchApplications();
        }
    }, [userData]);

    const fetchApplications = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/applications2Rejected");
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();

            // Handle both possible response structures
            const allApplications = Array.isArray(result) ? result :
                (Array.isArray(result.applications) ? result.applications : []);

            // Filter applications by current user's rollNumber
            const userApplications = allApplications.filter(app =>
                app.rollNumber === userData?.rollNumber
            );

            setApplications(userApplications);
        } catch (error) {
            console.error("Error fetching applications:", error);
            toast.error("Failed to fetch applications");
            setApplications([]);
        } finally {
            setLoading(false);
        }
    };

    const filteredApplications = applications.filter(app => {
        if (!app) return false;
        const searchLower = searchTerm.toLowerCase();
        return (
            (app.name?.toLowerCase().includes(searchLower)) ||
            (app.rollNumber?.toLowerCase().includes(searchLower)) ||
            (app.college?.toLowerCase().includes(searchLower)) ||
            (app.hackathonInstitute?.toLowerCase().includes(searchLower)) ||
            (app.status?.toLowerCase().includes(searchLower))
        );
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredApplications.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredApplications.length / itemsPerPage);


    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this application?")) {
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/api/delete-application2/${id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                toast.success("Application deleted successfully");
                fetchApplications();
            } else {
                const errorData = await response.json();
                toast.error(errorData.message || "Failed to delete application");
            }
        } catch (error) {
            console.error("Error deleting application:", error);
            toast.error("Failed to delete application");
        }
    };

    const handleDownload = (filePath, fileName) => {
        if (filePath) {
            // Remove any backslashes if present and ensure it starts with a forward slash
            const cleanPath = filePath.replace(/\\/g, '/');
            // Add a forward slash between the base URL and the path if not already present
            const fullUrl = `http://localhost:5000${cleanPath.startsWith('/') ? '' : '/'}${cleanPath}`;
            window.open(fullUrl, "_blank");
        } else {
            toast.warning("No file available for download");
        }
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleItemsPerPageChange = (e) => {
        setItemsPerPage(Number(e.target.value));
        setCurrentPage(1);
    };

    return (
        <div className="admin-container">
            <ToastContainer position="top-right" autoClose={2000} closeButton={false} />
            <div className="admin-content">
                <h1 className="admin-heading">Rejected Hackathon</h1>

                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search by name, roll number, etc..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                </div>

                <div className="table-controls">
                    <div className="items-per-page">
                        <label>Show:</label>
                        <select
                            value={itemsPerPage}
                            onChange={handleItemsPerPageChange}
                            className="items-per-page-select"
                        >
                            {[5, 10, 20, 50].map(num => (
                                <option key={num} value={num}>{num}</option>
                            ))}
                        </select>
                        <span>entries</span>
                    </div>

                    {filteredApplications.length > itemsPerPage && (
                        <div className="pagination">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="pagination-button prev-next"
                            >
                                Previous
                            </button>
                            <div className="page-numbers">
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                                    <button
                                        key={number}
                                        onClick={() => handlePageChange(number)}
                                        className={`pagination-button ${currentPage === number ? 'active' : ''}`}
                                    >
                                        {number}
                                    </button>
                                ))}
                            </div>
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="pagination-button prev-next"
                            >
                                Next
                            </button>
                        </div>
                    )}
                </div>

                {loading ? (
                    <div className="loading-spinner">Loading applications...</div>
                ) : applications.length === 0 ? (
                    <div className="no-applications">No applications found</div>
                ) : (
                    <div className="applications-table-container">
                        <table className="applications-table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Roll No.</th>
                                    <th>College</th>
                                    <th>Institute</th>
                                    <th className="date-col">Dates</th>
                                    <th>Status</th>
                                    <th className="action-col">Del</th>
                                    <th className="action-col">PDF</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map((app) => (
                                    <tr key={app._id}>
                                        <td>{app.name || '-'}</td>
                                        <td>{app.rollNumber || '-'}</td>
                                        <td>{app.college || '-'}</td>
                                        <td>{app.hackathonInstitute || '-'}</td>
                                        <td className="date-col">
                                            {app.startDate ? new Date(app.startDate).toLocaleDateString() : '-'} -{' '}
                                            {app.endDate ? new Date(app.endDate).toLocaleDateString() : '-'}
                                        </td>
                                        <td>
                                            <span className={`status-badge ${app.status?.toLowerCase() || 'pending'}`}>
                                                {app.status || 'Pending'}
                                            </span>
                                        </td>


                                        <td className="action-col">
                                            <button
                                                className="action-btn delete-btn"
                                                onClick={() => handleDelete(app._id)}
                                                disabled={loading}
                                            >
                                                Del
                                            </button>
                                        </td>
                                        <td className="action-col">
                                            <button
                                                className="action-btn download-btn"
                                                onClick={() => handleDownload(
                                                    app.hackathonCertificatePath,
                                                    `${app.name || 'application'}_hackathon_certificate.pdf`
                                                )}
                                                disabled={!app.hackathonCertificatePath}
                                            >
                                                Dow
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

export default UserHackthonRejected;