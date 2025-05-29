import React, { useState, useEffect, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/InternshipTable.css";
import { AppContent } from "../context/AppContext";

function UserInternshipRejected() {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    const { userData } = useContext(AppContent)

    useEffect(() => {
        if (userData) {
            fetchApplications();
        }
    }, [userData]);

    const fetchApplications = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/applicationsRejected");
            const data = await response.json();

            // Filter applications by rollNumber from context
            const filteredApplications = data.filter(app => app.rollNumber === userData.rollNumber);

            setApplications(filteredApplications);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching applications:", error);
            toast.error("Failed to fetch applications");
            setLoading(false);
        }
    };

    // Search functionality
    const filteredApplications = applications.filter(app => {
        const searchLower = searchTerm.toLowerCase();
        return (
            app.name.toLowerCase().includes(searchLower) ||
            app.rollNumber.toLowerCase().includes(searchLower) ||
            app.college.toLowerCase().includes(searchLower) ||
            app.internshipInstitute.toLowerCase().includes(searchLower) ||
            app.status.toLowerCase().includes(searchLower)
        );
    });

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredApplications.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredApplications.length / itemsPerPage);


    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this application?")) {
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/api/delete-application/${id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                toast.success("Application deleted successfully");
                fetchApplications();
            } else {
                toast.error("Failed to delete application");
            }
        } catch (error) {
            console.error("Error deleting application:", error);
            toast.error("Failed to delete application");
        }
    };

    const handleDownload = (filePath, fileName) => {
        if (filePath && filePath.endsWith(".pdf")) {
            window.open(`http://localhost:5000/${filePath}`, "_blank");
        } else {
            toast.warning("No PDF file available for download");
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
                <h1 className="admin-heading">Rejected Internship</h1>

                {/* Search Bar */}
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search Roll Number, name, college..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                </div>

                <div className="table-controls">
                    {/* Items per page selector */}
                    <div className="items-per-page">
                        <label className="items-per-page-label">Show:</label>
                        <select
                            value={itemsPerPage}
                            onChange={handleItemsPerPageChange}
                            className="items-per-page-select"
                        >
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={50}>50</option>
                        </select>
                        <span className="items-per-page-label">entries</span>
                    </div>

                    {/* Pagination */}
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
                                        className={`pagination-button number ${currentPage === number ? 'active' : ''}`}
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
                    <div className="loading-spinner">Loading...</div>
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
                                        <td>{app.name}</td>
                                        <td>{app.rollNumber}</td>
                                        <td>{app.college}</td>
                                        <td>{app.internshipInstitute}</td>
                                        <td className="date-col">
                                            {new Date(app.startDate).toLocaleDateString()} -{" "}
                                            {new Date(app.endDate).toLocaleDateString()}
                                        </td>
                                        <td>
                                            <span className={`status-badge ${app.status.toLowerCase()}`}>
                                                {app.status}
                                            </span>
                                        </td>

                                        <td className="action-col">
                                            <button
                                                className="action-btn delete-btn"
                                                onClick={() => handleDelete(app._id)}
                                            >
                                                Del
                                            </button>
                                        </td>
                                        <td className="action-col">
                                            <button
                                                className="action-btn download-btn"
                                                onClick={() => handleDownload(app.offerLetterPath, `${app.name}_offer_letter.pdf`)}
                                            >
                                                Dow.
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

export default UserInternshipRejected;