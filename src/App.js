import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { BackgroundLines } from "./components/ui/background-lines";
import CircularText from "./components/ui/circular-text";
import DockNav from "./components/ui/nav3";
import Gallery from "./components/ui/GalleryMain";
import HeaderAnimation from "./components/ui/HeaderAnimation";
import Tagline from "./components/ui/Tagline";
import SlantedCard from "./components/ui/cardHover";
import { TextGenerateEffect } from "./components/ui/TextGenerateEffect";
import TestimonialCarousel from "./components/ui/TestimonalCarousel";
import ContactForm from "./components/ui/ContactForm";
import SpsModify from "./components/ui/SpsModify";
import PrevEditions from "./components/ui/PrevEditions";
import Dashboard from "./components/Dashboard";
import LoginPage from "./components/ui/JuryLogin";
import Footer from "./components/ui/Footer";

function Home() {
  const [animateText, setAnimateText] = useState(false);
  const textSectionRef = useRef(null);


  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setAnimateText(entry.isIntersecting),
      { threshold: 0.1 }
    );

    if (textSectionRef.current) observer.observe(textSectionRef.current);

    return () => {
      if (textSectionRef.current) observer.unobserve(textSectionRef.current);
    };
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-black m-0 text-white flex flex-col overflow-hidden">
      <BackgroundLines className={"fixed w-screen bg-black inset-0 "} />

      <div className="circular-logo hidden sm:block fixed top-5 right-5 sm:top-8 sm:right-8 z-10">
  <CircularText text="ACM . VNRVJIET . WEBATHON . " spinDuration={10} imageSrc="/ACMlogo.png" />
</div>


      {/* Hero Section */}
      <div className="relative z-0 w-full min-h-screen flex flex-col items-center justify-center text-center p-5 sm:mt-20 md:mt-32 lg:mt-10">


        <HeaderAnimation
          text="WEBATHON 3.0"
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl w-full bg-black sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-webathon font-bold"
          delay={100}
          animationFrom={{ opacity: 0, transform: "translate3d(0,20px,0)" }}
          animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
          easing="easeOutCubic"
        />
        <div className="mt-10 w-full bg-black flex flex-col md:flex-row items-center justify-center space-y-3 md:space-y-0 gap-x-2 md:gap-x-5">
          <h1 className="font-tagline text-[clamp(1.5rem,5vw,3rem)] font-semibold">Where You</h1>
          <button className="relative flex items-center justify-center px-6 md:px-10 py-3 min-w-[250px] md:w-full lg:w-auto rounded-full shadow-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold transition-all">
            <Tagline texts={["Design", "Develop", "Deploy"]} className="text-[clamp(1.5rem,5vw,3rem)] font-tagline text-center w-full" />
          </button>
        </div>
      </div>

      {/* Previous Editions */}
      <div id="previous-editions" className="relative z-0 flex flex-col pt-20 mt-10 justify-center items-center h-auto py-10 sm:py-6 px-4 sm:px-3 md:px-8">
        <h1 className="bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent font-garamond text-[clamp(1.5rem,5vw,3rem)] font-semibold text-center mb-6 sm:mb-4">
          Past Editions
        </h1>
        <PrevEditions />
      </div>

      {/* About Us */}
      <div id="about" className="relative z-0 flex pt-20 flex-col items-center justify-center text-center mt-80 mx-auto px-4 sm:px-3 md:px-8 w-full max-w-screen-md">
        <h1 className="bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent font-garamond text-[clamp(1.5rem,5vw,3rem)] font-semibold mb-6 sm:mb-4">
          About Webathon
        </h1>
        <p className="text-center font-about text-[clamp(0.875rem,3vw,1.25rem)] leading-relaxed">
          WEBATHON is designed to equip participants for industry-level recruitment drives involving hackathons. With expert mentors guiding teams at every stage, participants gain valuable insights and enhance their development expertise. WEBATHON 3.0, our latest edition, is bigger and better than ever! Centered around the theme 'Design, Develop, Deploy,' it serves as the ultimate platform for encouraging creativity, collaboration, and technical excellence in a dynamic, high-energy environment.
        </p>
        <img className="mt-7 w-1/2" src="/poster1.svg" alt="poster" />
        <button
           onClick={() => window.open("https://vnrvjiet.ac.in/", "_blank")}
          className="ml-4 mt-7 font-about px-5 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-semibold text-lg transition transform hover:scale-105 shadow-lg"
        >
          Register Now
        </button>
      </div>


      {/* <SpsModify className="relative z-0 " /> */}
      <div id="Testimonials"><TestimonialCarousel className=" relative z-0" /></div>
      <div id="contact"><ContactForm /></div>

    </div>


  );
}


function App() {
  return (
    <Router>
      <div className="relative w-screen m-0 p-0 min-h-screen bg-black text-white overflow-hidden">
        {/* Background Lines stays behind all content */}
        <BackgroundLines className="fixed inset-0 -z-10" />

        {/* Invisible Boundary to Prevent Content from Moving Above */}
        <div className="absolute top-[90px] w-full h-[1px] bg-transparent z-20 pointer-events-none"></div>

        {/* Main Content */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/jury" element={<LoginPage />} />
        </Routes>

        {/* Footer and Navigation stay on top */}
        <Footer className="w-full" />
        <DockNav />
      </div>
    </Router>
  );
}


export default App;