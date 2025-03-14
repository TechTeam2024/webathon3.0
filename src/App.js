import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter } from "react-router-dom";
import { BackgroundLines } from "./components/ui/background-lines";
import CircularText from "./components/ui/circular-text";
import DockNav from "./components/ui/nav3";
import Gallery from "./components/ui/Gallery";
import HeaderAnimation from "./components/ui/HeaderAnimation";
import Tagline from "./components/ui/Tagline";
import SlantedCard from "./components/ui/cardHover";
import { TextGenerateEffect } from "./components/ui/TextGenerateEffect"; // Import your TextGenerateEffect component

function App() {
  const [activeView, setActiveView] = useState("home");
  const [animateText, setAnimateText] = useState(false);
  const textSectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimateText(true);
        } else {
          setAnimateText(false); // Optional: reset animation when out of view
        }
      },
      {
        threshold: 0.1, // Trigger when 10% of the element is visible
      }
    );

    if (textSectionRef.current) {
      observer.observe(textSectionRef.current);
    }

    return () => {
      if (textSectionRef.current) {
        observer.unobserve(textSectionRef.current);
      }
    };
  }, [textSectionRef]);

  return (
    <BrowserRouter>
      <div className="relative w-full bg-black text-white overflow-hidden">
        {/* Background Animated Lines */}
        <BackgroundLines />

        {/* Circular Text (Always Visible) */}
        <div className="absolute top-5 right-5 sm:top-8 sm:right-8 z-10">
          <CircularText text="ACM . VNRVJIET . WEBATHON . " spinDuration={10} imageSrc="/ACMlogo.png" />
        </div>

        {/* Conditional Rendering for Different Views */}
        {activeView === "gallery" ? (
          <div className="w-full h-screen flex items-center justify-center bg-black">
            <Gallery />
          </div>
        ) : (
          <>
            {/* Hero Section */}
            <div className="absolute top-0 left-0 w-full h-[70vh] flex flex-col items-center justify-center text-center p-0 m-0 sm:mt-20 md:mt-32">
              <div className="z-10 font-bold">
                <HeaderAnimation
                  text="WEBATHON 3.0"
                  className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-webathon font-bold"
                  delay={100}
                  animationFrom={{ opacity: 0, transform: "translate3d(0,20px,0)" }}
                  animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
                  easing="easeOutCubic"
                />
              </div>

              <div className="mt-10 flex flex-col md:flex-row items-center justify-center space-y-3 md:space-y-0 gap-x-2 md:gap-x-5">
                <h1 className="font-tagline text-[clamp(1.5rem,5vw,3rem)] font-semibold">Where You</h1>
                <Tagline texts={["Design", "Develop", "Deploy"]} className="text-[clamp(1.5rem,5vw,3rem)] font-tagline" />
              </div>
            </div>

            {/* Previous Editions Section */}
            <div id="previous-editions" className="flex flex-col justify-center items-center h-screen">
              <h1 className="font-tagline text-[clamp(1.5rem,5vw,3rem)] font-semibold text-center mb-6">
                Previous Editions
              </h1>
              <SlantedCard />
            </div>
          </>
        )}

        {/* Text Generate Effect Section */}
        
    <div ref={textSectionRef} className="flex flex-col mb-20 font-tagline justify-center items-center h-[20vh] mx-auto w-[50vw]">
      <h1 id="about" className="font-tagline text-[clamp(1.5rem,5vw,3rem)] font-semibold text-center mb-6">About us</h1>
      <TextGenerateEffect 
        words='" Webathon, organized by ACM, is an immersive event that fosters collaboration and innovation in web development. Participants gain hands-on experience, learn from industry experts, and enhance their skills through real-world projects. This opportunity not only boosts confidence but also equips aspiring developers with essential tools for success in the tech industry. "'
        className="text-center font-about" 
        duration={0.5} 
        playAnimation={animateText} // Pass the animation state
      />
    </div>


        {/* Navigation Bar (Always Visible) */}
        <DockNav
          items={[
            { label: "Home", link: "/", onClick: () => setActiveView("home") },
            { label: "Past Editions", link: "/past-editions", onClick: () => setActiveView("previous-editions") },
            { label: "About", link: "/about", onClick: () => console.log("About clicked") },
            { label: "Contact Us", link: "/contact", onClick: () => console.log("Contact Us clicked") },
            { label: "Gallery", link: "/gallery", onClick: () => setActiveView("gallery") },
            { label: "Jury Evaluation", link: "/jury", onClick: () => console.log("Jury Evaluation clicked") },
          ]}
          registerButton={true}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
