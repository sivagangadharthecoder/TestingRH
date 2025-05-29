import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AdminLogin.css';
import { toast } from 'react-toastify';

const AdminLogin = () => {
  // Correct way to access Vite environment variables
  const adminMail = import.meta.env.VITE_ADMIN_EMAIL;
  const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Check credentials
    if (email === adminMail && password === adminPassword) {
      toast.success('Welcome Admin !')
      navigate('/admin-dashboard');
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="admin-wrapper">
      <div className="admin-header">
        <h1 className="admin-brand" onClick={() => navigate('/')}>REQUESTHUB</h1>
      </div>

      <div className="admin-form-container">
        <form className="admin-form" onSubmit={handleSubmit}>
          <h2 className="admin-title">ADMIN PORTAL</h2>

          {error && <div className="admin-error">{error}</div>}

          <div className="admin-input-group">
            <input
              className="admin-input"
              type="email"
              placeholder=" "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label className="admin-label">Email</label>
          </div>

          <div className="admin-input-group">
            <input
              className="admin-input"
              type="password"
              placeholder=" "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label className="admin-label">Password</label>
          </div>

          <button className="admin-button" type="submit">SIGN IN</button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;