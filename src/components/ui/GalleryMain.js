import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Carousel1 from "./Crsl1";
import Carousel2 from "./Crsl2";
import GalleryPreloader from "./GalleryPreloader2";

const allImages = [
  { id: 1, url: "https://i.ibb.co/fVvw0PQH/IMG-20250317-WA0006.webp", alt: "Abstract art" },
  { id: 2, url: "https://i.postimg.cc/HxxW0rTp/2.jpg", alt: "Mountain landscape" },
  { id: 12, url: "https://i.postimg.cc/1tVWDG70/IMG-20240324-WA0020.jpg", alt: "Architectural detail" },
  { id: 3, url: "https://i.postimg.cc/fyb1VdjN/3.jpg", alt: "Abstract art" },
  { id: 8, url: "https://i.postimg.cc/hv1TWv3Q/1.jpg", alt: "Architectural detail" },
  { id: 4, url: "https://i.postimg.cc/L8fPcbdc/4.jpg", alt: "Urban scene" },
  { id: 7, url: "https://i.postimg.cc/bYSWfWHW/IMG-20250317-WA0014.webp", alt: "Architectural detail" },
  { id: 5, url: "https://i.postimg.cc/L5C7MsP8/5.jpg", alt: "City skyline" },
  { id: 6, url: "https://i.postimg.cc/K8Hczb6K/6.jpg", alt: "Nature close-up" }
];

const Gallery = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [images, setImages] = useState(allImages);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedImages, setLoadedImages] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (windowWidth < 640) {
      setImages(allImages.slice(0, 9));
    } else {
      setImages(allImages);
    }
  }, [windowWidth]);

  // Track when all images are loaded
  useEffect(() => {
    if (loadedImages === images.length) {
      setIsLoading(false);
    }
  }, [loadedImages, images.length]);

  const handleImageLoad = () => {
    setLoadedImages((prev) => prev + 1);
  };

  return (
    <>
      {isLoading && <GalleryPreloader />}

      <motion.section 
        className="w-full mt-10 py-16 bg-black text-white overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container overflow-hidden mx-auto px-8">
          {windowWidth < 640 ? (
            <>
              <h1 className="text-center text-3xl md:text-5xl mt-10 lg:text-7xl font-bold mb-4">WEBATHON 3.0</h1>
              <div className="mb-10 w-auto">
                <Carousel2 />
              </div>
            </>
          ) : (
            <div className="grid lg:grid-cols-2 gap-8 sm:grid-cols-1">
              <div className="mb-10 w-auto">
                <Carousel1 />
              </div>
              <div className="max-w-3xl text-center p-20">
                <h1 className="text-center text-2xl md:text-5xl sm:mt-10 lg:text-4xl font-bold mb-4">                Relive the past WEBATHON editions!</h1>
                <p className="md:text-lg text-center text-gray-300">
                Explore the journey of participants as they design, develop, and deploy groundbreaking solutions under expert mentorship. Take a glimpse at the energy, teamwork, and innovation that make WEBATHON an unforgettable experience!

                </p>
              </div>
            </div>
          )}

          {/* Responsive Image Grid */}
          <div className="columns-2 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
            {images.map((image) => (
              <motion.div
                key={image.id}
                className="break-inside-avoid mb-4 overflow-hidden"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                <img
                  src={image.url}
                  alt={image.alt}
                  className="w-full h-auto shadow-md mb-1"
                  loading="lazy"
                  onLoad={handleImageLoad}
                  onError={(e) => {
                    console.error(`Failed to load image: ${image.url}`);
                    e.target.src = "/fallback-image.jpg"; 
                  }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </>
  );
};

export default Gallery;
