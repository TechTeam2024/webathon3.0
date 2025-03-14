import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

const CircularText = ({
  text,
  spinDuration = 20,
  className = "",
  imageSrc,
  imageSize = 80,
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const letters = Array.from(text);
  const controls = useAnimation();
  const radius = 70; // Distance from center

  useEffect(() => {
    const updateSize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    if (!isMobile) {
      controls.start({
        rotate: 360,
        transition: {
          from: 0,
          to: 360,
          ease: "linear",
          duration: spinDuration,
          repeat: Infinity,
        },
      });
    }
  }, [spinDuration, controls, isMobile]);

  if (isMobile) return null; // Hide component on mobile screens

  return (
    <div className={`relative mx-auto w-[180px] h-[180px] ${className}`}>
      {/* Fixed Centered Image */}
      {imageSrc && (
        <img
          src={imageSrc}
          alt="Center Logo"
          className="absolute inset-0 m-auto"
          style={{ width: imageSize, height: imageSize }}
        />
      )}

      {/* Rotating Text Container */}
      <motion.div
        animate={controls}
        className="absolute inset-0 flex items-center justify-center"
      >
        {letters.map((letter, i) => {
          const angle = (360 / letters.length) * i; // Angle for each letter
          const radian = (Math.PI / 180) * angle;
          const x = Math.cos(radian) * radius;
          const y = Math.sin(radian) * radius;

          return (
            <span
              key={i}
              className="absolute text-lg font-bold"
              style={{
                transform: `translate(${x}px, ${y}px) rotate(${angle + 90}deg)`, 
                transformOrigin: "center",
                whiteSpace: "nowrap",
              }}
            >
              {letter}
            </span>
          );
        })}
      </motion.div>
    </div>
  );
};

export default CircularText;