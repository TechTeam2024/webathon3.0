"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "../../lib/utils"; // Ensure this utility exists

const GlowingEffect = ({
  color = "rgba(255, 0, 150, 0.6)", // Default glow color
  spread = 40, // How far the glow spreads
  proximity = 100, // Activation distance
  className,
}) => {
  const containerRef = useRef(null);
  const [glowStyle, setGlowStyle] = useState({ opacity: 0 });

  useEffect(() => {
    const handleMove = (e) => {
      if (!containerRef.current) return;

      const element = containerRef.current.getBoundingClientRect();
      const { clientX: mouseX, clientY: mouseY } = e;

      const centerX = element.left + element.width / 2;
      const centerY = element.top + element.height / 2;
      const distance = Math.hypot(mouseX - centerX, mouseY - centerY);

      const isActive = distance < proximity;

      setGlowStyle({
        opacity: isActive ? 1 : 0,
        boxShadow: isActive
          ? `0 0 ${spread}px ${color}`
          : "0 0 0px transparent",
      });
    };

    document.addEventListener("mousemove", handleMove);
    return () => document.removeEventListener("mousemove", handleMove);
  }, [spread, proximity, color]);

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <div
        className="absolute inset-0 rounded-lg transition-all duration-300"
        style={glowStyle}
      ></div>
      {/* Child content goes here */}
    </div>
  );
};

export { GlowingEffect };
