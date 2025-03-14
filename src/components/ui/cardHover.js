import { useState } from "react";
import { motion } from "framer-motion";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const CardHover = ({ imageSrc, isActive, isHovered }) => {
  return (
    <motion.div
  className={`absolute w-80 h-96 rounded-md shadow-2xl overflow-hidden cursor-pointer`}
  initial={{
    rotateX: 35,
    rotateY: 4,
    rotateZ: -30,
    opacity: isActive ? 1 : 0,
  }}
  animate={{
    rotateX: isHovered || isActive ? 0 : 35,
    rotateY: isHovered || isActive ? 0 : 4,
    rotateZ: isHovered || isActive ? 0 : -30,
    opacity: isActive ? 1 : 0,
  }}
  transition={{
    duration: 1.5,
    ease: [0.25, 0.1, 0.25, 1], // Using a cubic-bezier for smoother acceleration and deceleration
    opacity: { duration: 0.3 }, // Decreased opacity transition duration for faster fade-in
    rotateX: { duration: 1.5 }, // Keeping other durations unchanged
    rotateY: { duration: 1.5 },
    rotateZ: { duration: 1.5 },
  }}
  style={{ zIndex: isActive ? 2 : 1 }}
>
  <img src={imageSrc} alt="Card" className="w-full h-full object-cover" />
</motion.div>


  );
};

const CardHoverStack = () => {
  const [cards] = useState(["/poster1.png", "/poster2.png"]); // Ensure correct paths
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null); // Track hovered card index

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-20 flex flex-row items-center justify-between">
      {/* Left side - Image Cards */}
      <div className="relative w-1/2 flex justify-center">
        <div className="relative w-80 h-96">
          {cards.map((src, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoveredIndex(index)} // Set hovered index on mouse enter
              onMouseLeave={() => setHoveredIndex(null)} // Reset hovered index on mouse leave
            >
              <CardHover imageSrc={src} isActive={index === currentIndex} isHovered={hoveredIndex === index} />
            </div>
          ))}
        </div>
      </div>

      {/* Right side - Description */}
      <div className="w-1/2 text-white font-tagline pl-10 text-left">
        <motion.div className="mb-4">
          <h3 className="text-3xl font-bold">{currentIndex === 0 ? "Webathon 1.0" : "Webathon 2.0"}</h3>
          <p className="text-base text-gray-400">
            {currentIndex === 0
              ? "The first edition of Webathon focused on fostering innovation and collaboration among developers. Participants built web-based solutions, showcasing their creativity and problem-solving skills."
              : "An upgraded version with new challenges, advanced tech stacks, and interactive sessions. Webathon 2.0 introduced real-world problem statements, pushing participants to develop impactful and scalable web solutions."}
          </p>
        </motion.div>

        {/* Navigation Buttons */}
        <div className="flex gap-4 pt-4">
          <button
            onClick={handlePrev}
            className="h-12 w-12 rounded-full bg-gray-200 dark:bg-neutral-800 flex items-center justify-center text-black dark:text-white shadow-lg hover:bg-gray-300 dark:hover:bg-neutral-700 transition duration-200 z-10"
          >
            <FaArrowLeft size={20} />
          </button>
          <button
            onClick={handleNext}
            className="h-12 w-12 rounded-full bg-gray-200 dark:bg-neutral-800 flex items-center justify-center text-black dark:text-white shadow-lg hover:bg-gray-300 dark:hover:bg-neutral-700 transition duration-200 z-10"
          >
            <FaArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardHoverStack;
