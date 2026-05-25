import { motion } from 'framer-motion';

interface Slice {
  label: string;
  value: number;
  color: string;
}

interface Props {
  slices: Slice[];
  size?: number;
  thickness?: number;
  centerLabel?: string;
  centerValue?: string;
}

export default function Donut({
  slices,
  size = 160,
  thickness = 16,
  centerLabel,
  centerValue
}: Props) {
  const total = slices.reduce((acc, s) => acc + s.value, 0);
  const r = (size - thickness) / 2;
  const circumference = 2 * Math.PI * r;
  let acc = 0;

  return (
    <div className="flex items-center gap-4">
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={thickness}
          fill="none"
        />
        {slices.map((s) => {
          const pct = s.value / total;
          const dash = pct * circumference;
          const offset = (acc / total) * circumference;
          acc += s.value;
          return (
            <motion.circle
              key={s.label}
              cx={size / 2}
              cy={size / 2}
              r={r}
              stroke={s.color}
              strokeWidth={thickness}
              strokeLinecap="round"
              fill="none"
              strokeDasharray={`${dash} ${circumference - dash}`}
              initial={{ strokeDashoffset: -circumference }}
              animate={{ strokeDashoffset: -offset }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />
          );
        })}
      </svg>
      <div>
        {centerValue && <div className="text-2xl font-semibold tracking-tight">{centerValue}</div>}
        {centerLabel && <div className="text-xs text-white/50 mb-2">{centerLabel}</div>}
        <ul className="space-y-1.5">
          {slices.map((s) => (
            <li key={s.label} className="flex items-center gap-2 text-[12px]">
              <span className="h-2 w-2 rounded-full" style={{ background: s.color }} />
              <span className="text-white/70">{s.label}</span>
              <span className="ml-auto text-white/90 tabular-nums">{s.value}%</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
