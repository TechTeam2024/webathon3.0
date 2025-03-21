import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { div } from 'framer-motion/client';

const LoginPage = () => {
  const [accessKey, setAccessKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(""); 
  const inputRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      setShowAnimation(true);

    }, 100);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setShowAnimation(true);
    }, 100);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(""); // Clear previous errors

    try {
      const response = await fetch("https://webathon-login.vercel.app/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ accessKey }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("jury_no", data.jury_no);
        console.log(data);
        window.location.replace("/dashboard");
      } else {
        setErrorMessage("Invalid access key");
      }
    } catch (error) {
      console.error("Login failed", error);
      setErrorMessage("Server error. Please try again.");
    }

    setIsLoading(false);
  };
  return (
    <div className="min-h-screen bg-black flex justify-center items-center p-4">
      <div className="w-full max-w-4xl bg-black rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
        {/* Left content (Form) */}
        <div className="md:w-1/2 p-8 md:p-12">
          <div className={`mb-8 transition-all duration-700 delay-300 transform ${showAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
            <h3 className=" bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent font-medium">WEBATHON 3.0</h3>
            <h1 className="text-slate-100 text-3xl font-bold mt-2">Welcome Jury</h1>
            <p className="text-slate-300 mt-2">Sign in to continue to your dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className={`transition-all duration-700 delay-500 transform ${showAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <label htmlFor="accessKey" className="block text-sm font-medium text-slate-300 mb-1">
                Access Key
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"></path>
                  </svg>
                </div>
                <input
                  ref={inputRef}
                  id="accessKey"
                  name="accessKey"
                  type="password"
                  required
                  value={accessKey}
                  onChange={(e) => setAccessKey(e.target.value)}
                  className="pl-10 w-full bg-[#2a3a4d] border border-slate-600 rounded-lg py-3 px-4 text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                  placeholder="Enter your access key"
                />
              </div>
            </div>
            {errorMessage && (
              <div className="px-3 py-2  text-sm text-red-300 bg-red-900 bg-opacity-50 border border-red-700 rounded-md shadow-md">
                <p className="font-medium">Invalid Key</p>
              </div>
            )}
            <div className={`transition-all duration-700 delay-700 transform ${showAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3 px-4 rounded-lg shadow-md transition duration-300 flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  'Sign in'
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Right content (Image) */}
        <div className="md:w-1/2 p-6 flex items-center justify-center bg-black">
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/evaluation-of-company-regulations-illustration-download-in-svg-png-gif-file-formats--business-growth-strategies-rulebook-entrepreneurial-expansion-guidelines-corporate-development-principles-studying-rules-pack-illustrations-8401294.png?f=webp"
            alt="Rules illustration"
            className={`max-w-full h-auto transition-all duration-1000 delay-500 transform ${showAnimation ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/api/placeholder/600/400";
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;