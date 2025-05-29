import axios from 'axios';
import React, { useContext, useEffect } from 'react'
import { AppContent } from '../context/AppContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import '../styles/EmailVerify.css'

const EmailVerify = () => {
  axios.defaults.withCredentials = true;
  const { backendUrl, isLoggedin, userData, getUserData } = useContext(AppContent)
  const navigate = useNavigate()
  const inputRefs = React.useRef([])

  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  }

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  }

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData('text')
    const pasteArray = paste.split('')
    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    })
  }

  const handleResendCode = async () => {
    try {
      const { data } = await axios.post(backendUrl + '/api/auth/resend-verification', {
        userId: userData._id
      });
      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const otpArray = inputRefs.current.map(e => e.value)
      const otp = otpArray.join('');

      const { data } = await axios.post(backendUrl + '/api/auth/verify-account', {
        userId: userData._id, otp
      })

      if (data.success) {
        toast.success("Verified && Now Access Dashboard")
        getUserData()
        navigate('/')
      }
      else {
        toast.error(data.message)
      }
    }
    catch (error) {
      toast.error(error.message)
    }
  }

  const sendVerificationOtp = async () => {
    try {
      const { data } = await axios.post(backendUrl + '/api/auth/send-verify-otp', {}, {
        withCredentials: true
      });

      if (data.success) {
        navigate('/email-verify');
        toast.success('OTP SENT AGAIN!');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    isLoggedin && userData && userData.isAccountVerified && navigate('/')
  }, [isLoggedin, userData])

  return (
    <div className="verify-page">
      <header className="verify-header">
        <div className="logo" onClick={() => navigate('/')}>RequestHub</div>
      </header>

      <div className="verify-container">
        <div className="verify-card">
          <div className="verify-card-header">
            <h2>Verify Your Email</h2>
            <p>Enter the 6-digit code sent to {userData?.email || 'email'}</p>
          </div>

          <form onSubmit={onSubmitHandler} className="verify-form">
            <div className="otp-inputs" onPaste={handlePaste}>
              {Array(6).fill(0).map((_, index) => (
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength="1"
                  key={index}
                  required
                  ref={e => inputRefs.current[index] = e}
                  onInput={(e) => handleInput(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="otp-input"
                />
              ))}
            </div>
            <button type="submit" className="verify-button">
              Verify Account
            </button>
          </form>

          <div className="verify-footer">
            <p>
              Didn't receive code? {' '}
              <button className="resend-button" onClick={sendVerificationOtp}>
                Resend Code
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmailVerify