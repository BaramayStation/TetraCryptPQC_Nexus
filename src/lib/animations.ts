
/**
 * Applies a staggered animation delay to children elements
 * @param startDelay Initial delay in ms
 * @param step Delay between each element in ms
 * @param count Number of elements
 * @returns Array of delay values in ms
 */
export const staggeredDelay = (startDelay = 0, step = 100, count = 1): number[] => {
  return Array.from({ length: count }, (_, i) => startDelay + i * step);
};

/**
 * Spring transition preset for Framer Motion
 */
export const springTransition = {
  type: "spring",
  stiffness: 400,
  damping: 30,
};

/**
 * Smooth transition preset for Framer Motion
 */
export const smoothTransition = {
  ease: [0.16, 1, 0.3, 1],
  duration: 0.6,
};

/**
 * Scale up animation for Framer Motion
 */
export const scaleUpAnimation = {
  initial: { scale: 0.96, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0.96, opacity: 0 },
  transition: smoothTransition,
};

/**
 * Fade in animation for Framer Motion
 */
export const fadeAnimation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.3 },
};

/**
 * Slide up animation for Framer Motion
 */
export const slideUpAnimation = {
  initial: { y: 20, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: -20, opacity: 0 },
  transition: smoothTransition,
};
