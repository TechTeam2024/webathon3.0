"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function DockNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const [filteredItems, setFilteredItems] = useState([]);
  const [screenSize, setScreenSize] = useState("desktop");

  const items = [
    { label: "Home", link: "/" },
    { label: "Past Editions", link: "/#previous-editions" },
    { label: "About", link: "/#about" },
    { label: "Contact Us", link: "/#contact" },
    { label: "Gallery", link: "/gallery" },
    { label: "Jury", link: "/jury" }, // Changed "Jury Evaluation" to "Jury"
  ];

  useEffect(() => {
    const updateSize = () => {
      if (window.innerWidth < 1024) {
        setScreenSize("mobile");
        setFilteredItems(items.filter(item => ["Home", "Gallery", "Jury"].includes(item.label)));
      } else {
        setScreenSize("desktop");
        setFilteredItems(items);
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const handleNavigation = (item) => {
    if (item.label === "Home") {
      navigate("/");
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 100);
    } else if (item.link.startsWith("/#")) {
      const targetId = item.link.replace("/#", "");
      const scrollToSection = () => {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80, // Adjust for fixed nav offset
            behavior: "smooth",
          });
        }
      };

      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(scrollToSection, 300); // Ensure homepage loads before scrolling
      } else {
        scrollToSection();
      }
    } else {
      navigate(item.link);
    }
  };

  return (
    <div className="fixed nav-text nav-container top-5 left-1/2 transform -translate-x-1/2 z-40">
      <motion.div
        className="flex items-center gap-2.5 md:gap-6 px-5 md:px-6 py-3 font-tagline bg-black border border-gray-600 rounded-full shadow-md backdrop-blur-lg"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {filteredItems.map((item, index) => (
          <button
            key={index}
            className="relative text-white text-sm md:text-lg font-medium transition group"
            onClick={() => handleNavigation(item)}
          >
            {item.label}
            {/* Light Effect on Hover */}
            <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-1 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </button>
        ))}

        {/* Register Button (Always Visible) */}
        <button
           onClick={() => window.open("https://tinyurl.com/WebathonRegistrationForm", "_blank")}
          className="ml-4 px-5 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-semibold text-sm md:text-lg transition transform hover:scale-105 shadow-lg"
        >
          Register
        </button>
      </motion.div>
    </div>
  );
}
