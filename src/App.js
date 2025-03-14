import React, { useState } from "react";
import { BackgroundLines } from "./components/ui/background-lines";
import CircularText from "./components/ui/circular-text";
import SplitText from "./components/ui/SplitText";
import DockNav from "./components/ui/docknav2"; 
import { Home, Image, Users, Mail, BookOpen, Info } from "lucide-react";
import Tagline from "./components/ui/Tagline";
import Gallery from "./components/ui/Gallery"; // Import the Gallery component
import HeaderAnimation from "./components/ui/HeaderAnimation";
function App() {
  const [showVersion, setShowVersion] = useState(false);
  const [activeView, setActiveView] = useState("home"); // State to track which view to show

  const handleAnimationComplete = () => {
    console.log("All letters have animated!");
    setTimeout(() => setShowVersion(true), 500);
  };

  return (
    <div className="relative flex items-center justify-center h-screen w-full bg-black text-white overflow-hidden">
      <BackgroundLines />

      {/* ✅ Always Visible CircularText (Ensured Higher z-index) */}
      <div className="absolute top-5 left-1/2 transform -translate-x-1/2 sm:top-5 sm:right-5 sm:left-auto sm:translate-x-0 z-50">
        <CircularText text="ACM . VNRVJIET ." spinDuration={10} imageSrc="/ACMlogo.png" />
      </div>

      {/* ✅ Conditionally Render Home or Gallery */}
      <div className="absolute inset-0 flex justify-center items-center w-full h-full">
        {activeView === "home" ? (
          <>
            {/* Centered Animated Heading */}
            <div className="absolute z-10 font-bold text-center mt-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center">
            {/* <SplitText
            text="WEBATHON 3.0"
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-webathon font-bold"
            delay={100}
            animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
            animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
            easing="easeOutCubic"
            threshold={0.2}
            rootMargin="-50px"
            onLetterAnimationComplete={handleAnimationComplete}
          /> */}
          <HeaderAnimation
            text="WEBATHON 3.0"
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-webathon font-bold"
            delay={100}
            animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
            animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
            easing="easeOutCubic"
            threshold={0.2}
            rootMargin="-50px"
            onLetterAnimationComplete={handleAnimationComplete}
          />

            </div>

            {/* Responsive Tagline Section */}
            <div className="absolute font-tagline mt-20 top-[50%] left-1/2 transform -translate-x-1/2 
                flex flex-col md:flex-row items-center justify-center text-center 
                space-y-3 md:space-y-0 gap-x-2 md:gap-x-5">
            <h1 className="text-[clamp(1.5rem,5vw,3rem)] font-semibold">Where You</h1>
            <Tagline texts={["Design", "Develop", "Deploy"]} className="text-[clamp(1.5rem,5vw,3rem)]" />
          </div>

          </>
        ) : (
          <Gallery /> // Show the Gallery when activeView is "gallery"
        )}
      </div>

      {/* Sticky DockNav at the bottom */}
      <DockNav
        items={[
          { icon: <Home />, label: "Home", onClick: () => setActiveView("home") },
          { icon: <BookOpen />, label: "Previous Edition", onClick: () => console.log("Previous Edition clicked") }, 
          { icon: <Info />, label: "About Us", onClick: () => console.log("About Us clicked") }, 
          { icon: <Mail />, label: "Contact", onClick: () => console.log("Contact clicked") }, 
          { icon: <Image />, label: "Gallery", onClick: () => setActiveView("gallery") },
          { icon: <Users />, label: "Jury Evaluation", onClick: () => console.log("Jury clicked") },
          
        ]}
        registerButton={true} // 👈 Added a prop for the Register Button
      />

    </div>
  );
}

export default App;
