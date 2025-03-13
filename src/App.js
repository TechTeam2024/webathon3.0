import React from "react";
import { BackgroundLines } from "./components/ui/background-lines";
import { cn } from "./lib/utils";
import CircularText from "./components/ui/circular-text";
import SplitText from "./components/ui/SplitText"; // Import SplitText
import Navbar from "./components/ui/navbar";
const handleAnimationComplete = () => {
  console.log("All letters have animated!");
};

function App() {
  return (
    <div className="relative flex items-center justify-center h-screen w-full bg-black text-white overflow-hidden">
      <BackgroundLines />
      <img
        src="/acm.png" // Replace with the actual image name
        alt="Logo"
        className="absolute top-5 left-5 w-28 h-auto" // Adjust size and position
      />
       <Navbar />
      {/* CircularText Animation - Always in Top-Right Corner */}
      <div className="absolute top-5 right-5">
        <CircularText text="ACM . Webathon ." spinDuration={10} />
      </div>

      {/* Centered Animated Heading */}
      <SplitText
        text="WEBATHON 4.0"
        className="absolute z-10 text-9xl font-bold text-center mt-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        delay={100}
        animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
        animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
        easing="easeOutCubic"
        threshold={0.2}
        rootMargin="-50px"
        onLetterAnimationComplete={handleAnimationComplete}
      />
    </div>
  );
}

export default App;
