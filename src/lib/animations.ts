
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

/**
 * Tailwind CSS animation keyframes
 * These need to be added to the tailwind.config.js file
 */
export const tailwindAnimations = {
  keyframes: {
    "fade-in": {
      "0%": { opacity: "0" },
      "100%": { opacity: "1" },
    },
    "slide-up": {
      "0%": { transform: "translateY(20px)", opacity: "0" },
      "100%": { transform: "translateY(0)", opacity: "1" },
    },
    "slide-down": {
      "0%": { transform: "translateY(-20px)", opacity: "0" },
      "100%": { transform: "translateY(0)", opacity: "1" },
    },
    "slide-left": {
      "0%": { transform: "translateX(20px)", opacity: "0" },
      "100%": { transform: "translateX(0)", opacity: "1" },
    },
    "slide-right": {
      "0%": { transform: "translateX(-20px)", opacity: "0" },
      "100%": { transform: "translateX(0)", opacity: "1" },
    },
    "blur-in": {
      "0%": { filter: "blur(8px)", opacity: "0" },
      "100%": { filter: "blur(0)", opacity: "1" },
    },
  },
  animation: {
    "fade-in": "fade-in 0.5s ease-out forwards",
    "slide-up": "slide-up 0.5s ease-out forwards",
    "slide-down": "slide-down 0.5s ease-out forwards",
    "slide-left": "slide-left 0.5s ease-out forwards",
    "slide-right": "slide-right 0.5s ease-out forwards",
    "blur-in": "blur-in 0.5s ease-out forwards",
  },
};
