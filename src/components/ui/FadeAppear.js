import { useSprings, animated } from "@react-spring/web";
import { useEffect, useState } from "react";

const WebathonTitle = ({ onComplete }) => {
  const text = "WEBATHON 3.0";
  const letters = text.split("");

  const [triggerAnimation, setTriggerAnimation] = useState(false);

  useEffect(() => {
    setTriggerAnimation(true);
  }, []);

  const springs = useSprings(
    letters.length,
    letters.map((_, i) => ({
      from: { opacity: 0, transform: "translateY(20px)" },
      to: triggerAnimation
        ? { opacity: 1, transform: "translateY(0px)" }
        : { opacity: 0, transform: "translateY(20px)" },
      delay: i * 100,
      config: { tension: 200, friction: 20 },
      onRest: () => {
        if (i === letters.length - 1 && onComplete) {
          onComplete();
        }
      },
    }))
  );

  return (
    <div className="font-bold text-center text-[clamp(3rem, 8vw, 10rem)]">

      {letters.map((letter, index) => (
        <animated.span
          key={index}
          style={springs[index]}
          className={letter === "3" || letter === "." || letter === "0" ? "text-blue-500" : ""}
        >
          {letter}
        </animated.span>
      ))}
    </div>
  );
};

export default WebathonTitle;
