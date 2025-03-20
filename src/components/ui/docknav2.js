"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  Children,
  cloneElement,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Home, Image, Users, Mail, BookOpen, Info } from "lucide-react";
import ShinyText from "./ShinyText";

function DockItem({
  children,
  className = "",
  onClick,
  mouseX,
  spring,
  distance,
  magnification,
  baseItemSize,
}) {
  const ref = useRef(null);
  const isHovered = useMotionValue(0);

  const mouseDistance = useTransform(mouseX, (val) => {
    const rect = ref.current?.getBoundingClientRect() ?? {
      x: 0,
      width: baseItemSize,
    };
    return val - rect.x - baseItemSize / 2;
  });

  const targetSize = useTransform(
    mouseDistance,
    [-distance, 0, distance],
    [baseItemSize, magnification, baseItemSize]
  );
  const size = useSpring(targetSize, spring);

  return (
    <motion.div
      ref={ref}
      style={{ width: size, height: size }}
      onHoverStart={() => isHovered.set(1)}
      onHoverEnd={() => isHovered.set(0)}
      onFocus={() => isHovered.set(1)}
      onBlur={() => isHovered.set(0)}
      onClick={onClick}
      className={`relative inline-flex items-center justify-center rounded-full bg-[#060606] border-neutral-700 border-2 shadow-md ${className}`}
      tabIndex={0}
      role="button"
      aria-haspopup="true"
    >
      {Children.map(children, (child) =>
        cloneElement(child, { isHovered })
      )}
    </motion.div>
  );
}

function DockLabel({ children, className = "", ...rest }) {
  const { isHovered } = rest;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = isHovered.on("change", (latest) => {
      setIsVisible(latest === 1);
    });
    return () => unsubscribe();
  }, [isHovered]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 18 }} // Moves text DOWN
          exit={{ opacity: 0, y: 0 }}
          transition={{ duration: 0.2 }}
          className={`${className} absolute top-full mt-1 left-1/2 w-fit whitespace-pre rounded-md border border-neutral-700 bg-[#060606] px-2 py-0.5 text-xs text-white`}
          role="tooltip"
          style={{ x: "-50%" }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function DockIcon({ children, className = "" }) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      {children}
    </div>
  );
}

export default function DockNav({
  registerButton = false,
  className = "",
  spring = { mass: 0.1, stiffness: 150, damping: 12 },
  magnification = 100,
  distance = 250,
  panelHeight = 120,
  dockHeight = 300,
  baseItemSize = 70,
}) {
  const mouseX = useMotionValue(Infinity);
  const isHovered = useMotionValue(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const maxHeight = useMemo(
    () => Math.max(dockHeight, magnification + magnification / 2 + 10),
    [magnification, dockHeight]
  );

  const heightRow = useTransform(isHovered, [0, 1], [panelHeight, maxHeight]);
  const height = useSpring(heightRow, spring);

  // Full Dock items for Laptop
  const fullDockItems = [
    { icon: <Home />, label: "Home", onClick: () => console.log("Home clicked") },
    { icon: <BookOpen />, label: "Previous Edition", onClick: () => console.log("Previous Edition clicked") },
    { icon: <Info />, label: "About Us", onClick: () => console.log("About Us clicked") },
    { icon: <Mail />, label: "Contact", onClick: () => console.log("Contact clicked") },
    { icon: <Image />, label: "Gallery", onClick: () => console.log("Gallery clicked") },
    { icon: <Users />, label: "Jury Evaluation", onClick: () => console.log("Jury clicked") },
  ];

  // Limited Dock items for Mobile
  const mobileDockItems = [
    { icon: <Home />, label: "Home", onClick: () => console.log("Home clicked") },
    { icon: <Image />, label: "Gallery", onClick: () => console.log("Gallery clicked") },
    { icon: <Users />, label: "Jury Evaluation", onClick: () => console.log("Jury clicked") },
  ];

  // Choose the correct items based on screen size
  const dockItems = isMobile ? mobileDockItems : fullDockItems;

  return (
    <motion.div
      style={{ height, scrollbarWidth: "none" }}
      className={`mx-2 flex max-w-full items-center ${isMobile ? "fixed bottom-0 w-full bg-black py-3" : ""}`}
    >
      <motion.div
        onMouseMove={({ pageX }) => {
          isHovered.set(1);
          mouseX.set(pageX);
        }}
        onMouseLeave={() => {
          isHovered.set(0);
          mouseX.set(Infinity);
        }}
        className={`${className} ${isMobile ? "fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-[#1e1e1e] w-[90%] py-2 rounded-md" : "absolute top-5 left-1/2 transform -translate-x-1/2 w-[700px]"} 
              flex items-center justify-center gap-4 rounded-2xl 
              border-neutral-700 border-2 pb-2 px-4`}
        style={{ height: panelHeight }}
        role="toolbar"
        aria-label="Application dock"
      >
        {/* Dock Icons */}
        {dockItems.map((item, index) => (
          <DockItem
            key={index}
            onClick={item.onClick}
            className={item.className}
            mouseX={mouseX}
            spring={spring}
            distance={distance}
            magnification={magnification}
            baseItemSize={baseItemSize}
          >
            <DockIcon>{item.icon}</DockIcon>
            <DockLabel>{item.label}</DockLabel>
          </DockItem>
        ))}

        {/* Register Button on Both Mobile & Fullscreen */}
        {registerButton && (
          <button className="ml-4 px-4 py-2 bg-[#1e1e1e] border border-neutral-700 rounded-md shadow-md hover:bg-[#292929] transition">
            <ShinyText text="Register" speed={3} className="text-lg font-semibold" />
          </button>
        )}
      </motion.div>
    </motion.div>
  );
}
