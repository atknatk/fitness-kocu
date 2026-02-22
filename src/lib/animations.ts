import type { Variants } from "framer-motion";

export const pageTransition: Variants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.2 } },
};

export const staggerContainer: Variants = {
  animate: {
    transition: { staggerChildren: 0.06 },
  },
};

export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
};

export const scaleIn: Variants = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.25, ease: "easeOut" } },
};

export const checkComplete = {
  scale: [1, 1.3, 1],
  transition: { duration: 0.3 },
};

export const cardTap = {
  scale: 0.97,
  transition: { duration: 0.1 },
};

export const slideInLeft: Variants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.3 } },
};

export const slideInRight: Variants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.3 } },
};

export const progressBar = {
  initial: { width: "0%" },
  animate: (pct: number) => ({
    width: `${pct}%`,
    transition: { duration: 0.8, ease: "easeOut", delay: 0.2 },
  }),
};

export const countUp = {
  duration: 0.8,
  ease: "easeOut" as const,
};

export const waterDrop: Variants = {
  initial: { scale: 0, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 15 },
  },
};

export const confettiBurst: Variants = {
  initial: { scale: 0 },
  animate: {
    scale: [0, 1.2, 1],
    transition: { duration: 0.5, ease: "easeOut" },
  },
};
