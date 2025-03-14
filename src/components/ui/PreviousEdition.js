import React from "react";
import AnimatedTestimonials from "./AnimatedTestimonials"; // Ensure the correct path

const PreviousEditions = () => {
  const testimonials = [
    {
      src: "/poster.png",
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
    <div className="flex flex-col items-center justify-center text-center font-tagline px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 w-full">
      <h1 className="text-[clamp(1.5rem,5vw,3rem)] font-semibold mb-6">Previous Editions</h1>
      <div className="w-full max-w-4xl">
        <AnimatedTestimonials testimonials={testimonials} autoplay={true} />
      </div>
    </div>
  );
};

export default PreviousEditions;
