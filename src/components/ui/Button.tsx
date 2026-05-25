import { motion, type HTMLMotionProps } from 'framer-motion';
import { useHaptic } from '../../hooks/useHaptic';

type Variant = 'primary' | 'secondary' | 'ghost' | 'glass' | 'danger';
type Size = 'sm' | 'md' | 'lg' | 'xl';

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: Variant;
  size?: Size;
  block?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-tesla-red text-white shadow-glow hover:bg-tesla-red-soft active:bg-tesla-red-deep',
  secondary:
    'bg-white text-tesla-black hover:bg-tesla-chrome active:bg-tesla-chrome',
  ghost:
    'bg-transparent text-white hover:bg-white/5 active:bg-white/10 border border-white/10',
  glass:
    'glass-strong text-white hover:bg-white/10',
  danger:
    'bg-red-600 text-white hover:bg-red-500'
};

const sizeClasses: Record<Size, string> = {
  sm: 'h-9 px-3 text-sm rounded-xl',
  md: 'h-11 px-4 text-[15px] rounded-2xl',
  lg: 'h-13 px-5 text-base rounded-2xl py-3.5',
  xl: 'h-16 px-6 text-lg rounded-3xl'
};

export default function Button({
  variant = 'primary',
  size = 'md',
  block,
  loading,
  icon,
  children,
  className = '',
  onClick,
  disabled,
  ...rest
}: ButtonProps) {
  const haptic = useHaptic();
  return (
    <motion.button
      whileTap={disabled ? undefined : { scale: 0.97 }}
      whileHover={disabled ? undefined : { y: -1 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      onClick={(e) => {
        if (!disabled) haptic(10);
        onClick?.(e);
      }}
      disabled={disabled || loading}
      className={[
        'relative inline-flex items-center justify-center gap-2 font-semibold no-select transition-colors',
        'disabled:opacity-50 disabled:cursor-not-allowed select-none',
        variantClasses[variant],
        sizeClasses[size],
        block ? 'w-full' : '',
        className
      ].join(' ')}
      {...rest}
    >
      {loading ? (
        <span className="inline-flex items-center gap-2">
          <span className="h-4 w-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
          <span>Carregando…</span>
        </span>
      ) : (
        <>
          {icon}
          {children}
        </>
      )}
    </motion.button>
  );
}
