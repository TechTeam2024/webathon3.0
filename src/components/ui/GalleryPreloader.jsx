import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
  
  
  const GalleryPreloader = ({ onLoadComplete }) => {
    const [progress, setProgress] = useState(0);
    const [isComplete, setIsComplete] = useState(false);
  
    useEffect(() => {
      const timer = setTimeout(() => {
        const interval = setInterval(() => {
          setProgress(prevProgress => {
            const newProgress = prevProgress + 1;
            if (newProgress >= 100) {
              clearInterval(interval);
              setTimeout(() => {
                setIsComplete(true);
                if (onLoadComplete) onLoadComplete();
              }, 500);
              return 100;
            }
            return newProgress;
          });
        }, 20);
        
        return () => clearInterval(interval);
      }, 300);
      
      return () => clearTimeout(timer);
    }, [onLoadComplete]);
  
    // Create particles
    const particleCount = 12;
    const particles = Array.from({ length: particleCount });
  
    return (
      <motion.div 
        className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50"
        animate={isComplete ? { opacity: 0, transition: { duration: 0.8 } } : { opacity: 1 }}
        onAnimationComplete={() => {
          if (isComplete) {
            document.body.style.overflow = "auto";
          }
        }}
      >
        <div className="relative w-64 h-64 mb-8">
          {particles.map((_, i) => {
            const angle = (i / particleCount) * 2 * Math.PI;
            const x = Math.cos(angle);
            const y = Math.sin(angle);
            
            return (
              <motion.div
                key={i}
                className="absolute top-1/2 left-1/2 w-3 h-3 bg-white rounded-full"
                style={{
                  x: x * 80,
                  y: y * 80,
                  translateX: "-50%",
                  translateY: "-50%"
                }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.2, 1, 0.2]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.15,
                  ease: "easeInOut"
                }}
              />
            );
          })}
          
          <motion.div
            className="absolute inset-0 flex items-center justify-center text-white text-5xl font-bold"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {Math.round(progress)}
          </motion.div>
        </div>
        
        <motion.div
          className="w-64 h-1 bg-white bg-opacity-20 mb-4"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "16rem", opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <motion.div
            className="h-full bg-white"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
          />
        </motion.div>
        
        <motion.div
          className="text-white text-lg tracking-widest opacity-70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 0.5 }}
        >
          LOADING GALLERY
        </motion.div>
      </motion.div>
    );
  };
  

export default GalleryPreloader;