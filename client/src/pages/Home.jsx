import React, { useRef, useEffect, useContext } from 'react';
import { FaUserTie, FaIdCard, FaCode, FaCalendarAlt, FaChevronRight } from 'react-icons/fa';
import '../styles/Home.css';
import Navbar from '../components/Navbar';
import { AppContent } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Footer from './Footer';

const Home = () => {

    const navigate = useNavigate()

    const processNodes = useRef([]);
    const processConnectors = useRef([]);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        });

        processNodes.current.forEach(node => observer.observe(node));
        processConnectors.current.forEach(connector => observer.observe(connector));

        return () => {
            processNodes.current.forEach(node => observer.unobserve(node));
            processConnectors.current.forEach(connector => observer.unobserve(connector));
        };
    }, []);

    const addToNodesRef = (el) => {
        if (el && !processNodes.current.includes(el)) {
            processNodes.current.push(el);
        }
    };

    const addToConnectorsRef = (el) => {
        if (el && !processConnectors.current.includes(el)) {
            processConnectors.current.push(el);
        }
    }

    const { userData } = useContext(AppContent)

    const theStudentLogin = () => {
        toast.info('Login / Register First')
        navigate('/login')
    }

    const theStudentDashboard = () => {
        toast.success(`Welcome ${userData.name} !`)
        navigate('/sdashboard')
    }

    return (
        <div className="zara-portal">
            <Navbar />

            {/* Hero Section */}
            <section className="zara-hero">
                <div className="hero-content">
                    <h1>{userData?.name ? `Hi ${userData.name}!` : 'RequestHub'}</h1>
                    <p className="hero-subtitle">Academic services reimagined</p>
                    <div className="hero-line"></div>
                    <p className="hero-description">
                        Streamlined processes for modern academic needs.
                        Minimal design, maximum efficiency.
                    </p>
                </div>
            </section>

            {/* Services Grid */}
            <section className="services-section">
                <div className="section-header">
                    <h2>Academic Services</h2>
                    <p>Services We Provide  </p>
                </div>

                <div className="services-grid">
                    <ServiceCard
                        icon={<FaUserTie />}
                        title="Internship"
                        description="Permission for internship applications"
                    // color="#4A6FA5"
                    />
                    <ServiceCard
                        icon={<FaIdCard />}
                        title="ID Card"
                        description="Request new or replacement IDs"
                    // color="#7D8CA3"
                    />
                    <ServiceCard
                        icon={<FaCode />}
                        title="Hackathon"
                        description="Register for hackathon & competitions"
                    // color="#5C8D89"
                    />
                    <ServiceCard
                        icon={<FaCalendarAlt />}
                        title="Leave"
                        description="Apply for academic leave"
                    // color="#9B6A6C"
                    />
                </div>
            </section>

            {/* Process Section - Updated to Visual Map */}
            <section className="process-section">
                <div className="section-header dark">
                    <h2>How It Works</h2>
                    <p>Simple steps to get what you need</p>
                </div>

                <div className="process-map">
                    <div className="process-node first" ref={addToNodesRef}>
                        <div className="node-circle">1</div>
                        <div className="node-content">
                            <h4>Authenticate</h4>
                            <p>Register/Login with your institutional credentials</p>
                        </div>
                    </div>

                    <div className="process-connector" ref={addToConnectorsRef}>
                        <div className="connector-line"></div>
                        <div className="connector-arrow"></div>
                    </div>

                    <div className="process-node" ref={addToNodesRef}>
                        <div className="node-circle">2</div>
                        <div className="node-content">
                            <h4>Verify Mail Then</h4>
                            <p>Enter OTP sent to your mail</p>
                        </div>
                    </div>

                    <div className="process-connector" ref={addToConnectorsRef}>
                        <div className="connector-line"></div>
                        <div className="connector-arrow"></div>
                    </div>

                    <div className="process-node" ref={addToNodesRef}>
                        <div className="node-circle">3</div>
                        <div className="node-content">
                            <h4>Select Service in dashboard</h4>
                            <p>Choose from our curated service offerings</p>
                        </div>
                    </div>

                    <div className="process-connector" ref={addToConnectorsRef}>
                        <div className="connector-line"></div>
                        <div className="connector-arrow"></div>
                    </div>

                    <div className="process-node" ref={addToNodesRef}>
                        <div className="node-circle">4</div>
                        <div className="node-content">
                            <h4>Complete Form</h4>
                            <p>Fill in the required details</p>
                        </div>
                    </div>

                    <div className="process-connector" ref={addToConnectorsRef}>
                        <div className="connector-line"></div>
                        <div className="connector-arrow"></div>
                    </div>

                    <div className="process-node last" ref={addToNodesRef}>
                        <div className="node-circle">5</div>
                        <div className="node-content">
                            <h4>Submit & Track</h4>
                            <p>Send your request and monitor progress</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="cta-content">
                    {userData ? (
                        <>
                            <h3>Welcome back, {userData.name}!</h3>
                            <p>Access your dashboard to manage your requests</p>
                            {/* <button
                                className="zara-button"
                                onClick={() => theStudentDashboard()}
                            >
                                Go to Dashboard <FaChevronRight className="button-icon" />
                            </button> */}
                        </>
                    ) : (
                        <>
                            <h3>Ready to begin?</h3>
                            <p>Access the portal with your institutional credentials</p>
                            <button className="zara-button" onClick={theStudentLogin}>
                                Login <FaChevronRight className="button-icon" />
                            </button>
                        </>
                    )}
                </div>
            </section>
            <Footer />
        </div>
    );
};

const ServiceCard = ({ icon, title, description, color }) => {
    return (
        <div className="service-card" style={{ '--hover-color': color }}>
            <div className="card-icon" style={{ color }}>
                {icon}
            </div>
            <h3>{title}</h3>
            <p>{description}</p>
            <div className="card-hover-indicator"></div>
        </div>
    );

};

export default Home;