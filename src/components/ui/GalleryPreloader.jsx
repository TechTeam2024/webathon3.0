import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// const GalleryPreloader = ({ onLoadComplete }) => {
//   const [progress, setProgress] = useState(0);
//   const [isComplete, setIsComplete] = useState(false);

//   useEffect(() => {
//     // Simulate loading process
//     const timer = setTimeout(() => {
//       const interval = setInterval(() => {
//         setProgress(prevProgress => {
//           const newProgress = prevProgress + 1;
//           if (newProgress >= 100) {
//             clearInterval(interval);
//             setTimeout(() => {
//               setIsComplete(true);
//               if (onLoadComplete) onLoadComplete();
//             }, 500);
//             return 100;
//           }
//           return newProgress;
//         });
//       }, 20);
      
//       return () => clearInterval(interval);
//     }, 300);
    
//     return () => clearTimeout(timer);
//   }, [onLoadComplete]);

//   return (
//     <motion.div 
//       className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50"
//       animate={isComplete ? { opacity: 0, transition: { duration: 0.8 } } : { opacity: 1 }}
//       onAnimationComplete={() => {
//         if (isComplete) {
//           document.body.style.overflow = "auto";
//         }
//       }}
//     >
//       <motion.div 
//         className="relative mb-8"
//         initial={{ scale: 0.8, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         transition={{ duration: 0.5 }}
//       >
//         {/* Animated dots */}
//         <div className="flex space-x-3">
//           {[...Array(5)].map((_, i) => (
//             <motion.div
//               key={i}
//               className="w-4 h-4 rounded-full bg-white"
//               animate={{
//                 y: [0, -15, 0],
//                 opacity: [0.5, 1, 0.5],
//               }}
//               transition={{
//                 duration: 1.5,
//                 repeat: Infinity,
//                 delay: i * 0.1,
//                 ease: "easeInOut"
//               }}
//             />
//           ))}
//         </div>
//       </motion.div>
      
//       {/* Circular progress */}
//       <div className="relative w-24 h-24 mb-8">
//         <svg className="w-full h-full" viewBox="0 0 100 100">
//           <motion.circle
//             cx="50"
//             cy="50"
//             r="45"
//             fill="none"
//             stroke="#333"
//             strokeWidth="8"
//           />
//           <motion.circle
//             cx="50"
//             cy="50"
//             r="45"
//             fill="none"
//             stroke="white"
//             strokeWidth="8"
//             strokeLinecap="round"
//             initial={{ pathLength: 0 }}
//             animate={{ pathLength: progress / 100 }}
//             transition={{ duration: 0.2, ease: "easeOut" }}
//             style={{
//               strokeDasharray: 283,
//               strokeDashoffset: 283 * (1 - progress / 100)
//             }}
//           />
//         </svg>
//         <div className="absolute inset-0 flex items-center justify-center">
//           <span className="text-white text-xl font-semibold">{Math.round(progress)}%</span>
//         </div>
//       </div>
      
//       <motion.div
//         className="text-white text-xl font-light"
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.3, duration: 0.5 }}
//       >
//         Loading Gallery
//       </motion.div>
//     </motion.div>
//   );
// };


// const GalleryPreloader = ({ onLoadComplete }) => {
//     const [progress, setProgress] = useState(0);
//     const [isComplete, setIsComplete] = useState(false);
  
//     useEffect(() => {
//       const timer = setTimeout(() => {
//         const interval = setInterval(() => {
//           setProgress(prevProgress => {
//             const newProgress = prevProgress + 1;
//             if (newProgress >= 100) {
//               clearInterval(interval);
//               setTimeout(() => {
//                 setIsComplete(true);
//                 if (onLoadComplete) onLoadComplete();
//               }, 500);
//               return 100;
//             }
//             return newProgress;
//           });
//         }, 20);
        
//         return () => clearInterval(interval);
//       }, 300);
      
//       return () => clearTimeout(timer);
//     }, [onLoadComplete]);
  
//     const circleRadius = 45;
//     const circumference = 2 * Math.PI * circleRadius;
  
//     return (
//       <motion.div 
//         className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50"
//         animate={isComplete ? { opacity: 0, transition: { duration: 0.8 } } : { opacity: 1 }}
//         onAnimationComplete={() => {
//           if (isComplete) {
//             document.body.style.overflow = "auto";
//           }
//         }}
//       >
//         <div className="relative w-56 h-56">
//           <svg className="w-full h-full" viewBox="0 0 100 100">
//             <motion.circle
//               cx="50"
//               cy="50"
//               r={circleRadius}
//               fill="none"
//               stroke="#222"
//               strokeWidth="4"
//             />
//             <motion.circle
//               cx="50"
//               cy="50"
//               r={circleRadius}
//               fill="none"
//               stroke="white"
//               strokeWidth="4"
//               strokeLinecap="round"
//               strokeDasharray={circumference}
//               strokeDashoffset={circumference * (1 - progress / 100)}
//               transform="rotate(-90 50 50)"
//               initial={{ strokeDashoffset: circumference }}
//               animate={{ strokeDashoffset: circumference * (1 - progress / 100) }}
//               transition={{ duration: 0.2 }}
//             />
//           </svg>
          
//           <motion.div
//             className="absolute inset-0 flex flex-col items-center justify-center"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.3 }}
//           >
//             <div className="text-white text-3xl font-bold">{Math.round(progress)}%</div>
//             <div className="text-white text-sm mt-1 font-light tracking-widest opacity-70">LOADING</div>
//           </motion.div>
//         </div>
        
//         <motion.div
//           className="text-white text-lg mt-8 font-light"
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: 0.7, y: 0 }}
//           transition={{ delay: 0.5 }}
//         >
//           PREPARING GALLERY
//         </motion.div>
//       </motion.div>
//     );
//   };

  
  
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