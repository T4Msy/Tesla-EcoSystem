import { motion } from 'framer-motion';

interface Series {
  label: string;
  color: string;
  data: number[];
}

interface Props {
  labels: string[];
  series: Series[];
  height?: number;
  yFormat?: (v: number) => string;
}

export default function LineCompare({ labels, series, height = 160, yFormat = (v) => `${v}` }: Props) {
  const w = 320;
  const padX = 22;
  const padY = 16;
  const max = Math.max(...series.flatMap((s) => s.data));
  const min = 0;

  const toX = (i: number) =>
    padX + (i / Math.max(1, labels.length - 1)) * (w - padX * 2);
  const toY = (v: number) =>
    height - padY - ((v - min) / (max - min || 1)) * (height - padY * 2);

  return (
    <div>
      <svg viewBox={`0 0 ${w} ${height}`} className="w-full">
        {/* grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((t) => (
          <line
            key={t}
            x1={padX}
            x2={w - padX}
            y1={padY + t * (height - padY * 2)}
            y2={padY + t * (height - padY * 2)}
            stroke="rgba(255,255,255,0.05)"
            strokeDasharray="2 4"
          />
        ))}

        {series.map((s, idx) => {
          const d = s.data
            .map((v, i) => `${i === 0 ? 'M' : 'L'} ${toX(i)} ${toY(v)}`)
            .join(' ');
          const area =
            d +
            ` L ${toX(s.data.length - 1)} ${height - padY} L ${toX(0)} ${height - padY} Z`;
          return (
            <g key={s.label}>
              <motion.path
                d={area}
                fill={s.color}
                opacity={0.12}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.16 }}
                transition={{ duration: 0.8, delay: idx * 0.15 }}
              />
              <motion.path
                d={d}
                stroke={s.color}
                strokeWidth={2.4}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, ease: 'easeOut', delay: idx * 0.15 }}
              />
              {s.data.map((v, i) => (
                <circle key={i} cx={toX(i)} cy={toY(v)} r="2.6" fill={s.color} />
              ))}
            </g>
          );
        })}
      </svg>
      <div className="flex items-center justify-between text-[10px] text-white/40 px-2">
        {labels.map((l) => (
          <span key={l}>{l}</span>
        ))}
      </div>
      <div className="flex items-center gap-3 mt-2 text-[11px]">
        {series.map((s) => (
          <span key={s.label} className="flex items-center gap-1.5 text-white/70">
            <span className="h-2 w-2 rounded-full" style={{ background: s.color }} />
            {s.label}
          </span>
        ))}
      </div>
    </div>
  );
}
