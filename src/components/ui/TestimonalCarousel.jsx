import React, { useRef, useEffect, useState } from 'react';
import TestimonialCard from '../ui/TestimonalCard';

const TestimonialCarousel = () => {
  const scrollRef = useRef(null);
  const [middleCardIndex, setMiddleCardIndex] = useState(-1);
  const [isMobile, setIsMobile] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);

  const testimonials = [
    {
      name: "N. Mangathayaru",
      designation: "Head of department, IT",
      content: "I commend ACM VNRVJIET for creating such an excellent initiative that provides participants with the skills and confidence needed to excel in industry-level hackathons. I encourage students to utilise this opportunity to enhance their technical expertise."
    },
    {
      name: "Pavani",
      designation: "Participant",
      content: "I learnt some new concepts from the problem statement given to me. I understood how real-world challenges faced by startups can be solved through innovative solutions."
    },
    {
      name: "Sai charan",
      designation: "Participant",
      content: "Team ACM has done a Magnum opus task. All the aspects of the event were executed properly and the mentors helped in further development of my idea."
    },
    {
      name: "Sreenidhi",
      designation: "Participant",
      content: "The hackathon was organised well. The mentors they provided were very interactive and they helped us in providing inputs and improving the project in a better way."
    }
  ];

  // Duplicating the testimonials to ensure seamless looping
  const extendedTestimonials = [...testimonials, ...testimonials, ...testimonials];

  // Set up responsive behavior
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

  // Handle auto-scrolling
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId;
    let lastTimestamp = 0;
    const scrollSpeed = isMobile ? 0.05 : 0.1; // Further decreased scroll speed

    // Calculate dimensions
    const cardWidth = isMobile ? 220 : 280;
    const cardGap = isMobile ? 3 : 7;
    const itemWidth = cardWidth + cardGap;

    // We'll use this as our loop point - once scrolled past this mark, we'll reset
    const fullSetWidth = testimonials.length * itemWidth;

    // Start in the middle of the first copy of the testimonials set
    const initialPosition = fullSetWidth;
    scrollContainer.scrollLeft = initialPosition;

    const animate = (timestamp) => {
      if (!lastTimestamp) lastTimestamp = timestamp;
      const elapsed = timestamp - lastTimestamp;
      lastTimestamp = timestamp;

      const currentScroll = scrollContainer.scrollLeft;
      const newPosition = currentScroll + (scrollSpeed * Math.min(elapsed, 20));
      scrollContainer.scrollLeft = newPosition;

      // Check if we've scrolled past the first copy and into the second
      // if (newPosition >= initialPosition + fullSetWidth) {
      //   // Jump back one set length (to maintain same visual position)
      //   scrollContainer.scrollLeft = initialPosition;
      // }

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    // Add pause on hover functionality
    const handleMouseEnter = () => {
      if (!isMobile) {
        cancelAnimationFrame(animationId);
      }
    };

    const handleMouseLeave = () => {
      if (!isMobile) {
        lastTimestamp = 0; // Reset time tracking
        animationId = requestAnimationFrame(animate);
      }
    };

    // Touch events for mobile
    const handleTouchStart = () => {
      cancelAnimationFrame(animationId);
    };

    const handleTouchEnd = () => {
      lastTimestamp = 0; // Reset time tracking
      animationId = requestAnimationFrame(animate);
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

  // Update middle card and opacity effects
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
    setTimeout(handleScroll, 100); // Small delay to ensure DOM is ready

    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
    };
  }, [testimonials.length]);

  return (
    <div className="w-full mt-80 mb-20 relative bg-black text-white flex items-center justify-center py-8 sm:py-12">
      <div className="w-full max-w-4xl mx-auto px-2 sm:px-4">
        <h2 className="text-lg sm:text-2xl md:text-3xl font-garamond font-bold text-center mb-2 sm:mb-4 bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">Why Webathon? Hear It from the Experts!</h2>
        <div className="relative overflow-hidden w-full max-w-[90vw] mt-4 md:mt-8">
          {/* Fade left edge */}
          <div className="absolute left-0 top-0 w-16 md:w-32 h-full bg-gradient-to-r from-black to-transparent z-10"></div>

          {/* Testimonial container */}
          <div
            ref={scrollRef}
            className="flex gap-3 sm:gap-5 md:gap-7 overflow-x-hidden cursor-grab pb-4 justify-start items-center"
            style={{
              paddingTop: '20px',
              scrollBehavior: 'auto',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
          >
            {extendedTestimonials.map((testimonial, index) => (
              <div
                key={`testimonial-${index}`}
                className={`flex-shrink-0 transition-all duration-300 ${
                  index % testimonials.length === middleCardIndex ? 'z-20 scale-105' : ''
                }`}
                style={{
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
