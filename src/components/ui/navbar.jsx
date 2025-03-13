import React from "react";

const Navbar = () => {
  return (
    <nav className="absolute top-5 right-[13rem] flex space-x-6 text-2xl font-semibold">
      <a href="#home" className="hover:text-gray-400">Home</a>
      <a href="#edition" className="hover:text-gray-400">Edition</a>
      <a href="#testimonials" className="hover:text-gray-400">Testimonials</a>
      <a href="#contact" className="hover:text-gray-400">Contact</a>
    </nav>
  );
};

export default Navbar;
