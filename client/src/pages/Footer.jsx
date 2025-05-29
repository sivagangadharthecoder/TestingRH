import React from 'react';
import { FaUsers, FaEnvelope, FaPhone, FaUniversity, FaInstagram, FaFacebookF, FaYoutube, FaTwitter, FaMapMarkerAlt } from 'react-icons/fa';
import '../styles/Footer.css';

const Footer = () => {

    const students = [
        {
            id: 1,
            name: 'Ravipati JayaSurya',
            email: '23a95a1210@aec.edu.in',
            phone: '+91 93917 11556',
            college: 'Aditya Engineering College',
            role: 'Backend Developer'
        },
        {
            id: 2,
            name: 'Pabolu Sudheer',
            email: "sudheerpabolu825@gmail.com",
            phone: "+91 76708 58825",
            college: 'Aditya College of Engineering and Technology',
            role: 'Frontend Developer'
        },
        {
            id: 3,
            name: 'Meena',
            email: '22A91A4457@aec.edu.in',
            phone: '+91 79813 77123',
            college: 'Aditya Engineering College',
            role: 'Frontend Developer'
        },
        {
            id: 4,
            name: 'Navya',
            email: '22A91A4459@aec.edu.in',
            phone: '+91 74167 69447',
            college: 'Aditya Engineering College',
            role: 'Frontend Developer'
        },
        {
            id: 5,
            name: 'Joshna',
            email: '22A91A05H6@aec.edu.in',
            phone: '+91 80749 43499',
            college: 'Aditya Engineering College',
            role: 'Backend Developer'
        },
        {
            id: 6,
            name: 'Siva Gangadhar',
            email: 'gsivagangadhar367@gmail.com',
            phone: '+91 8074943499',
            college: 'Aditya Engineering College',
            role: 'Backend Developer'
        }
    ];

    return (
        <footer
            className="portal-footer"
            style={{
                fontFamily: "'Lucidatypewriter', monospace",
                fontSize: "16px",
                // backgroundColor: "#f8f9fa",
                padding: "20px",
                textAlign: "center",
            }}
        >            <div className="container">
                <h2><b>Development Team</b></h2>
                <div className="student-grid">
                    {students.map((student) => (
                        <div className="student-card" key={student.id}>
                            <div className="student-avatar">
                                <FaUsers />
                            </div>
                            <h3>{student.name}</h3>
                            <div className="student-role">{student.role}</div>
                            <div className="student-info">
                                <p><FaEnvelope /> {student.email}</p>
                                <p><FaPhone /> {student.phone}</p>
                                <p><FaUniversity /> {student.college}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Social Media + Contact Section */}
                <div className="university-links">
                    <a href="#"><FaInstagram /></a>
                    <a href="#"><FaFacebookF /></a>
                    <a href="#"><FaYoutube /></a>
                    <a href="#"><FaTwitter /></a>
                    <a href="#"><FaMapMarkerAlt /></a>
                    <a href="tel:+12345678900"><FaPhone /></a>
                </div>

                <div className="footer-bottom">
                    © {new Date().getFullYear()} RequestHub Portal. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
