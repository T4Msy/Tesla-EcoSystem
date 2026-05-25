import { motion, type HTMLMotionProps } from 'framer-motion';

interface Props extends HTMLMotionProps<'div'> {
  glass?: boolean;
  interactive?: boolean;
  children: React.ReactNode;
}

export default function Card({
  glass = true,
  interactive,
  className = '',
  children,
  ...rest
}: Props) {
  return (
    <motion.div
      whileTap={interactive ? { scale: 0.985 } : undefined}
      className={[
        'rounded-3xl p-4',
        glass ? 'glass' : 'bg-tesla-panel border border-tesla-border',
        interactive ? 'cursor-pointer' : '',
        className
      ].join(' ')}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
