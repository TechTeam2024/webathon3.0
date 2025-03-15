import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const images = [
  "/WEB9.png",
  "/WEB10.png",
  "/WEB8.png",
  "/WEB7.png",
];



export default function SmoothCarousel() {
  const [index, setIndex] = useState(0);
 
  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000); // Slide every 2 seconds

    return () => clearInterval(interval);
  }, [index]);

  return (
    <div className="relative w-full max-w-3xl mx-auto overflow-hidden rounded-xl shadow-lg">
      <div className="relative w-full h-[400px] overflow-hidden">
        <motion.div
          className="flex w-full h-full"
          animate={{ x: `-${index * 100}%` }} // Move the whole row
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {images.map((img, i) => (
            <img
              key={i}
              src={img}
              className="w-full h-full object-cover flex-shrink-0"
            />
          ))}
        </motion.div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-black/70 transition"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-black/70 transition"
      >
        <ChevronRight size={24} />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {images.map((_, Index) => (
            <button
              key={Index}
              onClick={() => setIndex(Index)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                Index === index ? 'bg-white w-4' : 'bg-white/50'
              }`}
              aria-label={`Go to slide ${Index + 1}`}
            />
          ))}
        </div>
    </div>
  );
}
