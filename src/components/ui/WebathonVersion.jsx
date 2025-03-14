import { motion } from "framer-motion";

const WebathonVersion = () => {
  return (
    <motion.span
      className="ml-2 text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-blue-400"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      3.0
    </motion.span>
  );
};

export default WebathonVersion;
