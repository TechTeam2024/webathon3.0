import { useSpring, animated } from "@react-spring/web";
import { useEffect, useRef, useState } from "react";

const SplitText = ({
  text = "",
  className = "",
  animationFrom = { opacity: 0, transform: "translate3d(0,40px,0)" },
  animationTo = { opacity: 1, transform: "translate3d(0,0,0)" },
  easing = "easeOutCubic",
  threshold = 0.1,
  rootMargin = "-100px",
  textAlign = "center",
  onAnimationComplete,
}) => {
  const [inView, setInView] = useState(false);
  const ref = useRef();

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

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const spring = useSpring({
    from: animationFrom,
    to: inView ? animationTo : animationFrom,
    config: { tension: 40, friction: 60 }, // Adjusted values for slower animation
    onRest: onAnimationComplete,
  });
  
  

  return (
    <animated.p
      ref={ref}
      style={spring}
      className={`overflow-hidden inline-flex ${className}`}
    >
      <span>
        WEBATHON{" "}
        <span className="bg-gradient-to-r from-violet-600 to-pink-600 text-transparent bg-clip-text">
          3.0
        </span>
      </span>
    </animated.p>
  );
};

export default SplitText;
