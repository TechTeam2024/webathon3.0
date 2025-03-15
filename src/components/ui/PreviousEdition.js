import React from "react";
import AnimatedTestimonials from "./AnimatedTestimonials"; // Ensure correct path

const PreviousEditions = () => {
  const testimonials = [
    {
      src: process.env.PUBLIC_URL +"/poster.png",
      name: "Webathon 1.0",
      quote: "A pioneering web development event focused on innovation, collaboration, and showcasing skills in creating impactful web solutions.",
    },
    {
      src: "/poster.png",
      name: "Webathon 2.0",
      quote: "An enhanced edition fostering creativity and teamwork, featuring advanced challenges, workshops, and networking opportunities for aspiring developers.",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center text-center font-tagline px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 w-full">
      {/* Animated Testimonials Component with Updated Layout */}
      <div className="w-full max-w-screen-md flex flex-col items-center">
        <AnimatedTestimonials testimonials={testimonials} autoplay={true} />
      </div>
    </div>
  );
};

export default PreviousEditions;
