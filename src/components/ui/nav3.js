// nav3.js
"use client";

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { HashLink } from 'react-router-hash-link'; // Import HashLink
import { useEffect, useState } from "react";

export default function DockNav({ items, registerButton }) {
  const [filteredItems, setFilteredItems] = useState(items);
  const [screenSize, setScreenSize] = useState("desktop");

  useEffect(() => {
    const updateSize = () => {
      if (window.innerWidth < 640) {
        setScreenSize("mobile");
        setFilteredItems(items.filter(item => ["Home", "Gallery", "Jury"].includes(item.label)));
      } else if (window.innerWidth < 1024) {
        setScreenSize("tablet");
        setFilteredItems(items.filter(item => ["Home", "Gallery", "Jury"].includes(item.label)));
      } else {
        setScreenSize("desktop");
        setFilteredItems(items);
      }
    };
    
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, [items]);

  return (
    <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50">
      <motion.div
        className="flex items-center gap-6 px-8 py-3 font-tagline bg-black border border-gray-600 rounded-full shadow-md backdrop-blur-lg"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {filteredItems.map((item, index) => (
          item.label === "About" ? (
            <HashLink
              key={index}
              to="#about" // Use the ID for smooth scrolling
              scroll={el => el.scrollIntoView({ behavior: 'smooth' })} // Ensure smooth scroll
              className="text-white text-lg font-medium hover:opacity-80 transition relative"
            >
              {item.label}
            </HashLink>
          ) : item.label === "Past Editions" ? (
            <HashLink
              key={index}
              to="#previous-editions" // Use the ID for smooth scrolling
              scroll={el => el.scrollIntoView({ behavior: 'smooth' })} // Ensure smooth scroll
              className="text-white text-lg font-medium hover:opacity-80 transition relative"
            >
              {item.label}
            </HashLink>
          ) : (
            <Link
              key={index}
              to={item.link}
              className="text-white text-lg font-medium hover:opacity-80 transition relative"
              onClick={(e) => {
                e.preventDefault();
                if (item.onClick) {
                  item.onClick();
                }
              }}
            >
              {item.label}
            </Link>
          )
        ))}

        {registerButton && (
          <motion.button
            className="text-xl font-tagline font-medium text-white px-6 py-2 rounded-full hover:opacity-90 transition flex items-center justify-center relative"
            whileHover={{ scale: 1.1 }}
            style={{
              background: "linear-gradient(90deg,rgb(49, 82, 154),rgb(109, 12, 161))", // Violet to Pink gradient
              border: "2px solid transparent",
            }}
          >
            <span>Register</span>
          </motion.button>
        )}
      </motion.div>
    </div>
  );
}
