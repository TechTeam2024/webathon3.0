import React, { useEffect } from "react";

const GalleryPreloader = ({ onLoadComplete }) => {
  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      onLoadComplete(); // Notify parent when loading is done
    }, 2000); // Adjust delay as needed

    return () => clearTimeout(timer);
  }, [onLoadComplete]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black z-50 w-full h-full">
      <div className="max-w-screen w-full h-full flex items-center justify-center">
        <img src="/preloader.gif" alt="Loading..." className="max-w-full h-auto" />
      </div>
    </div>
  );
};

export default GalleryPreloader;
