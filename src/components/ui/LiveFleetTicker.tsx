import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Car, Zap, Users, TrendingUp } from 'lucide-react';

interface Stat {
  icon: React.ReactNode;
  label: string;
  value: string;
  trend?: string;
}

function buildStats(seed: number): Stat[] {
  const rides = 18420 + seed * 3;
  const online = 1842 + (seed % 7);
  const charge = 84 + (seed % 5);
  return [
    {
      icon: <Car className="h-3.5 w-3.5 text-tesla-red" />,
      label: 'Teslas online',
      value: online.toLocaleString('pt-BR'),
      trend: '+12 min.'
    },
    {
      icon: <Users className="h-3.5 w-3.5 text-emerald-300" />,
      label: 'Viagens hoje',
      value: rides.toLocaleString('pt-BR'),
      trend: '↑ 3/s'
    },
    {
      icon: <Zap className="h-3.5 w-3.5 text-amber-300" />,
      label: 'Bateria média',
      value: `${charge}%`,
      trend: '▲ frota'
    },
    {
      icon: <TrendingUp className="h-3.5 w-3.5 text-sky-300" />,
      label: 'Uptime frota',
      value: '99.97%',
      trend: 'SLA OK'
    }
  ];
}

export default function LiveFleetTicker() {
  const [seed, setSeed] = useState(0);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setSeed((s) => s + 1), 4000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setActiveIdx((i) => (i + 1) % 4), 3200);
    return () => clearInterval(id);
  }, []);

  const stats = buildStats(seed);
  const stat = stats[activeIdx];

  return (
    <div className="glass-strong rounded-2xl px-3 py-2.5 flex items-center gap-2.5">
      <div className="relative h-8 w-8 grid place-items-center">
        <span className="absolute inset-0 rounded-full bg-tesla-red/20 animate-ping-slow" />
        <div className="h-8 w-8 rounded-xl bg-tesla-red/20 grid place-items-center relative">
          {stat.icon}
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIdx}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.35 }}
          >
            <div className="text-[10px] text-white/50 uppercase tracking-widest">{stat.label}</div>
            <div className="text-[14px] font-semibold tabular-nums leading-tight">{stat.value}</div>
          </motion.div>
        </AnimatePresence>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIdx}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="text-[10px] text-white/50 font-mono bg-white/5 rounded-lg px-1.5 py-0.5"
        >
          {stat.trend}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
