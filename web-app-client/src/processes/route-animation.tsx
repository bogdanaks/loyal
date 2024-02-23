import { motion } from "framer-motion";
import { Outlet, useLocation } from "react-router-dom";

const routeVariants = {
  initial: {
    y: "100vh",
  },
  final: {
    y: "0vh",
    transition: {
      type: "spring",
      mass: 0.4,
    },
  },
};

export const RouteAnimation = () => {
  const location = useLocation();
  return (
    <motion.div variants={routeVariants} initial="initial" animate="final" key={location.key}>
      <Outlet />
    </motion.div>
  );
};
