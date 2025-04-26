import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const VerificationPage = () => {
    const navigate=useNavigate();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return; // Allow only numbers
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move focus
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async () => {
    const code = otp.join('');

    if (code.length < 6) {
      setError('Please enter the full 6-digit code.');
      return;
    }

    try {
      const response = await axios.post('https://car-rental-backend-black.vercel.app/users/verify-email', { code });
      console.log(response);
      setSuccess(response.data.message);
      if(response.ok){
        navigate("/login");
      }
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Verification failed.');
      setSuccess(null);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#121212] text-white p-4">
      <div className="bg-[#1A1A1A] p-8 rounded-xl shadow-lg w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-[#1ecb15] mb-6">Verify Your Account</h1>
        <p className="text-gray-400 mb-4">Enter the 6-digit code sent to your email</p>

        <div className="flex justify-center gap-3 mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              ref={(el) => (inputRefs.current[index] = el)}
              className="w-12 h-12 text-center text-lg border border-[#1ecb15] bg-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-[#1ecb15]"
            />
          ))}
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {success && <p className="text-green-400 text-sm mb-4">{success}</p>}

        <button
          onClick={handleSubmit}
          className="bg-[#1ecb15] text-black px-6 py-2 rounded hover:bg-green-500 transition"
        >
          Verify
        </button>
      </div>
    </div>
  );
};

export default VerificationPage;
