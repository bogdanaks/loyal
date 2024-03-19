import { motion } from "framer-motion";
import { PropsWithChildren } from "react";

export const AnimationContainer = ({ children }: PropsWithChildren) => {
  return (
    <motion.div
      layout
      transition={{ type: "just", delay: 0, duration: 0.2 }}
      initial={{ x: "100vw", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "100vw", opacity: 0 }}
    >
      {children}
    </motion.div>
  );
};
