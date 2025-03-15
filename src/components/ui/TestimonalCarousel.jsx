import React, { useRef, useEffect, useState } from 'react';
import TestimonialCard from '../ui/TestimonalCard';

const TestimonialCarousel = () => {
  const scrollRef = useRef(null);
  const [middleCardIndex, setMiddleCardIndex] = useState(-1);
  const [isMobile, setIsMobile] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);
  
  const testimonials = [
    {
        name: "Dr. Gibson",
        designation: "@Professor of Computer Science",
        content: "The WebSummit’s React workshop was a fantastic experience. Practical demos made complex topics easy to grasp for students."
    },
    {
        name: "Prof. Virag",
        designation: "@Head of Design Department",
        content: "This virtual hackathon platform enhances learning through structured project management and real-time collaboration."
    },
    {
        name: "Dr. Rui",
        designation: "@Senior Lecturer in Software Engineering",
        content: "An engaging developer conference! The sessions were insightful, and networking bridged the gap between academia and industry."
    },
    {
        name: "Prof. Vollhard",
        designation: "@HOD, Information Technology",
        content: "The event registration system was seamless, providing a smooth experience for both faculty and students attending the conference."
    },
    {
        name: "Dr. Aisha",
        designation: "@Associate Professor of Data Science",
        content: "The GraphQL workshop was interactive and engaging. Hands-on coding challenges kept students motivated throughout the session."
    },
    {
        name: "Prof. Marcus",
        designation: "@Director of Cloud Computing Research",
        content: "The virtual event space was innovative. Breakout rooms and networking lounges helped students and faculty connect with experts."
    },
    {
        name: "Dr. Sophia",
        designation: "@Assistant Professor of Backend Systems",
        content: "This web-based event offered an immersive learning experience. Interactive discussions made it valuable for academic growth."
    },
    {
        name: "Prof. Daniel",
        designation: "@Mobile Application Development Expert",
        content: "Live coding sessions and workshops provided practical insights. Students benefited from direct interaction with industry professionals."
    },
    {
        name: "Dr. Eleanor",
        designation: "@Professor of UI/UX Design",
        content: "A well-organized event with structured sessions. Every speaker shared valuable insights relevant to modern design trends."
    },
    {
        name: "Prof. James",
        designation: "@Principal & Full Stack Development Instructor",
        content: "The depth of knowledge in each presentation was remarkable. Live demos, discussions, and panels enriched the experience for all."
    }
];


  // Duplicate testimonials to create a smoother infinite scroll
  const extendedTestimonials = [...testimonials, ...testimonials, ...testimonials];
  
  // Check if screen is mobile and update container width
  useEffect(() => {
    const checkMobile = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setContainerWidth(width);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);
  
  // auto-scrolling effect
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId;
    let scrollAmount = 0;
    const scrollSpeed = isMobile ? 0.7 : 1.1; 
    
   
    const recalculateScroll = () => {
      const cardWidth = isMobile ? 220 : 280; 
      const middleSetStartIndex = testimonials.length;
      const initialScrollPosition = (middleSetStartIndex * cardWidth) - ((containerWidth - cardWidth) / 2);
      
      scrollContainer.scrollLeft = initialScrollPosition;
      scrollAmount = initialScrollPosition;
      
      return initialScrollPosition;
    };
    
  
    const initialScrollPosition = recalculateScroll();
    
    const scroll = () => {
      if (!scrollContainer) return;
      
      scrollAmount += scrollSpeed;
      scrollContainer.scrollLeft = scrollAmount;
      
  
      const middleSetWidth = testimonials.length * (isMobile ? 220 : 280);
      const maxScroll = initialScrollPosition + middleSetWidth;
      
      if (scrollAmount >= maxScroll) {
        
        scrollAmount = initialScrollPosition;
        scrollContainer.scrollLeft = scrollAmount;
      }
      
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);
    const handleMouseEnter = () => {
      if (!isMobile) {
        cancelAnimationFrame(animationId);
      }
    };
    
    const handleMouseLeave = () => {
      if (!isMobile) {
        animationId = requestAnimationFrame(scroll);
      }
    };
    
    // Touch events for mobile
    const handleTouchStart = () => {
      cancelAnimationFrame(animationId);
    };
    
    const handleTouchEnd = () => {
      animationId = requestAnimationFrame(scroll);
    };
    
    scrollContainer.addEventListener('mouseenter', handleMouseEnter);
    scrollContainer.addEventListener('mouseleave', handleMouseLeave);
    scrollContainer.addEventListener('touchstart', handleTouchStart);
    scrollContainer.addEventListener('touchend', handleTouchEnd);
    
    return () => {
      cancelAnimationFrame(animationId);
      if (scrollContainer) {
        scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
        scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
        scrollContainer.removeEventListener('touchstart', handleTouchStart);
        scrollContainer.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, [isMobile, containerWidth, testimonials.length]);

  // Function to get the middle index of visible cards
  const getMiddleCardIndex = (container) => {
    if (!container) return -1;
    const containerCenter = container.offsetWidth / 2;
    const cards = Array.from(container.children);
    
    for (let i = 0; i < cards.length; i++) {
      const card = cards[i];
      const cardLeft = card.offsetLeft - container.scrollLeft;
      const cardRight = cardLeft + card.offsetWidth;
      
      if (cardLeft <= containerCenter && cardRight >= containerCenter) {
        return i % testimonials.length; // Map to original index
      }
    }
    
    return -1;
  };

  // Update middle card state and card opacities
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;
    
    const handleScroll = () => {
      const absoluteMiddleIndex = getMiddleCardIndex(scrollContainer);
      const newMiddleIndex = absoluteMiddleIndex % testimonials.length;
      setMiddleCardIndex(newMiddleIndex);
      
      const cards = Array.from(scrollContainer.children);
      
      cards.forEach((card, index) => {
        // Get distance from center as percentage (0 = center, 1 = edge)
        const rect = card.getBoundingClientRect();
        const containerRect = scrollContainer.getBoundingClientRect();
        const containerCenter = containerRect.left + containerRect.width / 2;
        const cardCenter = rect.left + rect.width / 2;
        const distanceFromCenter = Math.abs(containerCenter - cardCenter) / (containerRect.width / 2);
        
        // Apply opacity based on distance from center (0.3 to 1.0)
        const opacity = Math.max(0.3, 1 - distanceFromCenter * 0.7);
        card.style.opacity = opacity.toString();
      });
    };
    
    scrollContainer.addEventListener('scroll', handleScroll);
    // Initial calculation
    handleScroll();
    
    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
    };
  }, [testimonials.length]);

  return (
    <div className="w-full relative bg-black text-white flex items-center justify-center py-8 sm:py-12">
      <div className="w-full max-w-4xl mx-auto px-2 sm:px-4">
        <h2 className="text-lg sm:text-2xl md:text-3xl font-garamond font-bold text-center mb-2 sm:mb-4">Why Webathon? Hear It from the Experts!</h2>
        <p className="text-base sm:text-lg md:text-xl font-tagline text-center mb-6 md:mb-12 font-['DM_Sans',sans-serif]">Real Stories, Real impact - be part of the Future!</p>
     
        <div className="relative overflow-hidden w-screen max-w-full mt-4 md:mt-8">
          {/* Fade left edge */}
          <div className="absolute left-0 top-0 w-16 md:w-32 h-full bg-gradient-to-r from-black to-transparent z-10"></div>
          
          {/* Testimonial container */}
          <div 
            ref={scrollRef}
            className="flex gap-3 sm:gap-5 md:gap-7 overflow-x-hidden cursor-grab pb-4 justify-start items-center"
            style={{ paddingTop: '20px', scrollBehavior: 'auto' }}
          >
            {extendedTestimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className={`flex-shrink-0 transition-all duration-300 ${
                  index % testimonials.length === middleCardIndex ? 'z-20 scale-105' : ''
                }`}
                style={{ 
                  // Removed margin-top and margin-bottom styling to keep cards in a straight line
                  width: isMobile ? '85vw' : 'auto',
                  maxWidth: isMobile ? '280px' : '530px',
                }}
              >
                <TestimonialCard 
                  {...testimonial} 
                  index={index % testimonials.length}
                  isMiddle={index % testimonials.length === middleCardIndex}
                />
              </div>
            ))}
          </div>
          
          {/* Fade right edge */}
          <div className="absolute right-0 top-0 w-16 md:w-32 h-full bg-gradient-to-l from-black to-transparent z-10"></div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCarousel;