import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

const CircularText = ({
  text,
  spinDuration = 20,
  className = "",
  imageSrc,
  imageSize = 80,
}) => {
  const [scaleFactor, setScaleFactor] = useState(1); // Default scale at 100%
  const [radius, setRadius] = useState(70); // State for base radius
  const letters = Array.from(text);
  const controls = useAnimation();

  useEffect(() => {
    const updateSize = () => {
      const zoomLevel = window.devicePixelRatio; // Detects zoom
      if (zoomLevel > 1.5) {
        setScaleFactor(0.75); // Reduce to 75% size if zoom > 150%
      } else {
        setScaleFactor(1); // Keep normal size otherwise
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    controls.start({
      rotate: 360,
      transition: {
        ease: "linear",
        duration: spinDuration,
        repeat: Infinity,
      },
    });
  }, [spinDuration, controls]);

  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth;

      if (width > 1300){
        setRadius(45 * (width/1000));
      }else{
        setRadius(60)
      }
      ; // Adjust radius dynamically
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  return (
    <div
      className={`relative mx-auto ${className}`}
      style={{
        width: `${180 * scaleFactor}px`,
        height: `${180 * scaleFactor}px`,
      }}
    >
      {/* Centered Logo */}
      {imageSrc && (
        <img
          src={imageSrc}
          alt="ACM Logo"
          className="absolute inset-0 m-auto"
          style={{
            width: `${imageSize * scaleFactor}px`,
            height: `${imageSize * scaleFactor}px`,
          }}
        />
      )}

      {/* Rotating Text */}
      <motion.div animate={controls} className="absolute inset-0 flex items-center justify-center">
        {letters.map((letter, i) => {
          const angle = (360 / letters.length) * i;
          const radian = (Math.PI / 180) * angle;
          const x = Math.cos(radian) * radius * scaleFactor;
          const y = Math.sin(radian) * radius * scaleFactor;

          return (
            <span
              key={i}
              className="absolute font-bold"
              style={{
                fontSize: `${16 * scaleFactor}px`,
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
