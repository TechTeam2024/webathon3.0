"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useState,
} from "react";
import { motion, AnimatePresence } from "framer-motion";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

const RotatingText = forwardRef((props, ref) => {
  const {
    texts,
    transition = { type: "spring", damping: 25, stiffness: 300 },
    initial = { y: "100%", opacity: 0 },
    animate = { y: 0, opacity: 1 },
    exit = { y: "-120%", opacity: 0 },
    animatePresenceMode = "wait",
    animatePresenceInitial = false,
    rotationInterval = 2000,
    auto = true,
    onNext,
    mainClassName,
    ...rest
  } = props;

  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  const handleIndexChange = useCallback(
    (newIndex) => {
      setCurrentTextIndex(newIndex);
      if (onNext) onNext(newIndex);
    },
    [onNext]
  );

  useEffect(() => {
    if (!auto) return;
    const intervalId = setInterval(() => {
      const nextIndex = (currentTextIndex + 1) % texts.length;
      handleIndexChange(nextIndex);
    }, rotationInterval);
    return () => clearInterval(intervalId);
  }, [currentTextIndex, texts.length, rotationInterval, auto, handleIndexChange]);

  return (
    <div className="relative w-full flex justify-center items-center">
      <button
        className={cn(
          "px-[clamp(1rem, 5vw, 3rem)] py-[clamp(0.5rem, 2vw, 1.5rem)]",
          "text-white font-bold rounded-full shadow-lg",
          "bg-gradient-to-r from-blue-500 to-purple-600",
          "transition-all duration-300 transform hover:scale-105",
          mainClassName
        )}
        {...rest}
      >
        <AnimatePresence mode={animatePresenceMode} initial={animatePresenceInitial}>
          <motion.span
            key={currentTextIndex}
            initial={initial}
            animate={animate}
            exit={exit}
            transition={transition}
            className="block text-center w-full"
            style={{
              fontSize: "clamp(1.5rem, 4vw, 3rem)", // Dynamically scaling font size
            }}
          >
            {texts[currentTextIndex]}
          </motion.span>
        </AnimatePresence>
      </button>
    </div>
  );
});

RotatingText.displayName = "RotatingText";
export default RotatingText;
