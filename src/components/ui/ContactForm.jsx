import React, { useState } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import emailjs from "@emailjs/browser";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);


    console.log("Form submission data:", formData);


    emailjs
      .send(
        "service_uohwufk",
        "template_m6cfmqb",
        {
          user_name: formData.name,
          user_email: formData.email,
          message: formData.message,
        },
        "-F16qdkvZ8HUMiZQq"
      )
      .then(
        (result) => {
          console.log("Email successfully sent!", result.text);

          setTimeout(() => {
            setIsSubmitting(false);
            setIsSubmitted(true);
            setFormData({ name: "", email: "", message: "" });

            setTimeout(() => {
              setIsSubmitted(false);
            }, 3000);
          }, 1500);
        },
        (error) => {
          console.error("Error sending email:", error.text);
          alert("Failed to send message. Please try again.");
          setIsSubmitting(false);
        }
      );
  };

  return (
    <div className="min-h-screen font-about relative z-0 flex items-center justify-center px-4 py-12 md:px-8 lg:px-16 xl:px-24">

      <div className="max-w-6xl w-full overflow-hidden flex flex-col md:flex-row">
        {/* Form Section */}
        <div className="w-full md:w-1/2 p-8 bg-black">
          <div className="space-y-6">
            <div className="relative">
              <h1 className="text-4xl font-garamond bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent font-bold  mb-2">Contact Us</h1>
              <div className="h-1 w-12 bg-indigo-500 rounded-full"></div>
            </div>

            <div className="text-gray-400 space-y-2">
              <div className="flex items-center">
                <div className="mr-2 text-indigo-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <a href="mailto:acmvnrvjiet@gmail.com" className="hover:text-indigo-400 transition-colors">acmvnrvjiet@gmail.com</a>
              </div>

              <div className="flex items-center">
                <div className="mr-2 text-indigo-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </div>
                <a href="tel:8897642106" className="hover:text-indigo-400 transition-colors">+91 9892417444</a>
              </div>
            </div>

            {isSubmitted ? (
              <div className="bg-indigo-900/30 p-6 rounded-xl border border-indigo-500/50 text-center animate-pulse">
                <svg className="w-16 h-16 text-indigo-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <h3 className="text-xl font-medium text-white">Message Sent!</h3>
                <p className="text-gray-400 mt-2">We'll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-gray-300 text-sm font-medium">
                    Name <span className="text-indigo-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                      </svg>
                    </div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-gray-900 text-white rounded-lg pl-10 pr-4 py-3 border border-gray-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 focus:outline-none transition-all duration-300"
                      placeholder="Your Name"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-gray-300 text-sm font-medium">
                    Email <span className="text-indigo-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                      </svg>
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-gray-900 text-white rounded-lg pl-10 pr-4 py-3 border border-gray-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 focus:outline-none transition-all duration-300"
                      placeholder="Your Email"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-gray-300 text-sm font-medium">
                    Message <span className="text-indigo-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute top-3 left-3 pointer-events-none">
                      <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path>
                      </svg>
                    </div>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="4"
                      className="w-full bg-gray-900 text-white rounded-lg pl-10 pr-4 py-3 border border-gray-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 focus:outline-none transition-all duration-300"
                      placeholder="Your Message"
                    ></textarea>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full flex items-center justify-center py-3 px-4 rounded-lg text-white font-medium focus:outline-none transition-all duration-300 ${isSubmitting ? 'bg-indigo-600 cursor-wait' : 'bg-indigo-600 hover:bg-indigo-700 focus:ring-1 focus:ring-indigo-500/50'
                    }`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    'Submit'
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
        {/* Animation content */}
        <div className="w-full md:w-1/2 flex items-center justify-center bg-black">
  <DotLottieReact
    src="https://lottie.host/133d0d0c-c121-4133-9eb8-7061d353fb6a/NyDPUJIFpJ.lottie"
    loop
    autoplay
    className="w-4/5 h-4/5 md:w-full md:h-full lg:w-[80%] lg:h-[80%]"
  />
</div>

      </div>
    </div>
  );
};

export default ContactForm;