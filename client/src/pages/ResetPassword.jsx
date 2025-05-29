import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AppContent } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../styles/ResetPassword.css';

const ResetPassword = () => {
  const { backendUrl } = useContext(AppContent);
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);

  const inputRefs = React.useRef([]);

  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData('text');
    const pasteArray = paste.split('');
    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });
  };

  const onSubmitEmail = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${backendUrl}/api/auth/send-reset-otp`, { email });
      if (data.success) {
        toast.success("OTP sent to email!");
        setIsEmailSent(true);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const onSubmitOTP = async (e) => {
    e.preventDefault();
    const otpArray = inputRefs.current.map(e => e.value);
    setOtp(otpArray.join(''));
    setIsOtpSubmitted(true);
  };

  const onSubmitNewPassword = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${backendUrl}/api/auth/reset-password`, {
        email,
        otp,
        newPassword
      });
      if (data.success) {
        toast.success(data.message);
        navigate('/login');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="reset-container">
      <Link to="/" className="logo-link">
        <h1 className="logo">RequestHub</h1>
      </Link>

      <div className="reset-card">
        {/* Email input */}
        {!isEmailSent && (
          <form onSubmit={onSubmitEmail} className="reset-form">
            <h1 className="reset-title">Reset Password</h1>
            <p className="reset-subtitle">Enter your registered email address</p>

            <div className="reset-input-group">
              <input 
                type="email" 
                placeholder="Email ID" 
                value={email} 
                required
                className="reset-input"
                onChange={(e) => setEmail(e.target.value)} 
              />
            </div>
            <button type="submit" className="reset-submit-button">Continue</button>
          </form>
        )}

        {/* OTP input */}
        {isEmailSent && !isOtpSubmitted && (
          <form onSubmit={onSubmitOTP} className="reset-form">
            <h1 className="reset-title">Enter OTP</h1>
            <p className="reset-subtitle">Check your email for the 6-digit code</p>

            <div className="reset-otp-container" onPaste={handlePaste}>
              {Array(6).fill(0).map((_, index) => (
                <input
                  type="text"
                  maxLength="1"
                  key={index}
                  required
                  className="reset-otp-input"
                  ref={el => inputRefs.current[index] = el}
                  onInput={(e) => handleInput(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                />
              ))}
            </div>
            <button type="submit" className="reset-submit-button">Verify</button>
          </form>
        )}

        {/* New password */}
        {isOtpSubmitted && isEmailSent && (
          <form onSubmit={onSubmitNewPassword} className="reset-form">
            <h1 className="reset-title">New Password</h1>
            <p className="reset-subtitle">Create your new password</p>

            <div className="reset-input-group">
              <input 
                type="password" 
                placeholder="New Password" 
                value={newPassword} 
                required
                className="reset-input"
                onChange={(e) => setNewPassword(e.target.value)} 
              />
            </div>
            <button type="submit" className="reset-submit-button">Reset Password</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;