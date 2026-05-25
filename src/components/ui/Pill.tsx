interface Props {
  children: React.ReactNode;
  tone?: 'default' | 'red' | 'green' | 'blue' | 'amber';
  icon?: React.ReactNode;
  className?: string;
}
const tones = {
  default: 'bg-white/8 text-white/80 border-white/10',
  red: 'bg-tesla-red/15 text-tesla-red border-tesla-red/30',
  green: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
  blue: 'bg-sky-500/15 text-sky-300 border-sky-500/30',
  amber: 'bg-amber-500/15 text-amber-300 border-amber-500/30'
};
export default function Pill({ children, tone = 'default', icon, className = '' }: Props) {
  return (
    <span
      className={[
        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border',
        tones[tone],
        className
      ].join(' ')}
    >
      {icon}
      {children}
    </span>
  );
}
