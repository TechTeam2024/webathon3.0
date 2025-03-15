import { useTrail, animated } from "@react-spring/web";
import { useEffect, useRef, useState } from "react";

const SplitText = ({
  text = "WEBATHON 3.0",
  className = "",
  animationFrom = { opacity: 0, transform: "translate3d(0,40px,0)" },
  animationTo = { opacity: 1, transform: "translate3d(0,0,0)" },
  threshold = 0.1,
  rootMargin = "-100px",
}) => {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(ref.current);
        }
      },
      { threshold, rootMargin }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  // Split "WEBATHON" into individual letters, and keep "3.0" as a single unit
  const letters = [..."WEBATHON", "\u00A0", "3.0"]; // "\u00A0" adds a visible space

  const trail = useTrail(letters.length, {
    from: animationFrom,
    to: inView ? animationTo : animationFrom,
    config: { tension: 100, friction: 20 },
    delay: (index) => index * 50, // Stagger animation per letter
    immediate: !inView,
  });

  return (
    <p ref={ref} className={`overflow-hidden inline-flex ${className}`}>
      {trail.map((style, index) => (
        <animated.span
          key={index}
          style={style}
          className={letters[index] === "3.0" ? 
            "bg-gradient-to-r from-violet-600 to-pink-600 text-transparent bg-clip-text" 
            : ""}
        >
          {letters[index]}
        </animated.span>
      ))}
    </p>
  );
};

export default SplitText;
