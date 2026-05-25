import type { Variants } from 'framer-motion';

export const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];
export const easeOutQuart: [number, number, number, number] = [0.25, 1, 0.5, 1];

export const pageVariants: Variants = {
  initial: { opacity: 0, y: 12 },
  enter: { opacity: 1, y: 0, transition: { duration: 0.45, ease: easeOutExpo } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.25, ease: 'easeIn' } }
};

export const slideUpVariants: Variants = {
  initial: { opacity: 0, y: 24 },
  enter: { opacity: 1, y: 0, transition: { duration: 0.45, ease: easeOutExpo } },
  exit: { opacity: 0, y: 12, transition: { duration: 0.2 } }
};

export const fadeVariants: Variants = {
  initial: { opacity: 0 },
  enter: { opacity: 1, transition: { duration: 0.35, ease: easeOutExpo } },
  exit: { opacity: 0, transition: { duration: 0.2 } }
};

export const staggerContainer: Variants = {
  initial: {},
  enter: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 }
  }
};

export const staggerItem: Variants = {
  initial: { opacity: 0, y: 14 },
  enter: { opacity: 1, y: 0, transition: { duration: 0.45, ease: easeOutExpo } }
};

export const scaleIn: Variants = {
  initial: { opacity: 0, scale: 0.96 },
  enter: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: easeOutExpo } },
  exit: { opacity: 0, scale: 0.98, transition: { duration: 0.2 } }
};
