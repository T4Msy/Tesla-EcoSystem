import { useCountUp } from '../../hooks/useCountUp';

interface Props {
  value: number;
  decimals?: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export default function AnimatedNumber({
  value,
  decimals = 0,
  duration = 1300,
  prefix = '',
  suffix = '',
  className = ''
}: Props) {
  const v = useCountUp(value, duration, decimals);
  const formatted = v.toLocaleString('pt-BR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });
  return (
    <span className={['tabular-nums', className].join(' ')}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
