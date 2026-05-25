import { motion } from 'framer-motion';

interface Datum {
  label: string;
  value: number;
}

interface Props {
  data: Datum[];
  highlight?: string;
  format?: (v: number) => string;
  color?: string;
  className?: string;
}

export default function BarChart({
  data,
  highlight,
  format = (v) => String(v),
  color = '#E82127',
  className = ''
}: Props) {
  const max = Math.max(...data.map((d) => d.value));
  return (
    <div className={['w-full', className].join(' ')}>
      <div className="flex items-end gap-2 h-32">
        {data.map((d, i) => {
          const pct = max === 0 ? 0 : (d.value / max) * 100;
          const isHighlight = d.label === highlight;
          return (
            <div key={d.label} className="flex-1 flex flex-col items-center gap-1">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${pct}%` }}
                transition={{ duration: 0.7, delay: i * 0.07, ease: [0.25, 1, 0.5, 1] }}
                className="w-full rounded-t-lg relative overflow-hidden"
                style={{
                  background: isHighlight
                    ? `linear-gradient(180deg, ${color}, rgba(232,33,39,0.4))`
                    : 'linear-gradient(180deg, rgba(255,255,255,0.18), rgba(255,255,255,0.04))',
                  boxShadow: isHighlight ? '0 0 18px rgba(232,33,39,0.45)' : undefined
                }}
              >
                <span className="absolute inset-0 shimmer animate-shimmer opacity-40" />
              </motion.div>
              <span className="text-[10px] text-white/55">{d.label}</span>
            </div>
          );
        })}
      </div>
      <div className="mt-2 flex justify-between text-[10px] text-white/40">
        <span>0</span>
        <span>{format(max)}</span>
      </div>
    </div>
  );
}
