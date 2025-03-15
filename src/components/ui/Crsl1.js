import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const images = [
  "https://t4.ftcdn.net/jpg/04/39/89/01/360_F_439890152_sYbPxa1ANTSKcZuUsKzRAf9O7bJ1Tx5B.jpg",
  "https://i.pinimg.com/736x/69/60/b1/6960b13a890d098b33ded139169f233e.jpg",
  "https://www.shutterstock.com/shutterstock/videos/1094514863/thumb/1.jpg?ip=x480",
  "https://preview.redd.it/g1suljqucih61.jpg?width=640&crop=smart&auto=webp&s=5e5c5e8cf52db2b4c399af269c25251db9c7f4c1",
  "https://comicbook.com/wp-content/uploads/sites/4/2024/04/9d93e8f2-9e48-408c-894f-9d7182489a57.jpg"
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
