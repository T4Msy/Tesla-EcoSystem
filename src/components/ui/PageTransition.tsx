import { motion } from 'framer-motion';
import { pageVariants } from '../../animations/variants';

interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function PageTransition({ children, className = '' }: Props) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="enter"
      exit="exit"
      className={['min-h-[100dvh] w-full', className].join(' ')}
    >
      {children}
    </motion.div>
  );
}
