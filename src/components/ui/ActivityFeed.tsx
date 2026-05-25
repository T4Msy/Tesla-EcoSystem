import { motion } from 'framer-motion';
import { Car, Leaf, Wallet, Star, Brain, Zap } from 'lucide-react';

interface Activity {
  id: string;
  icon: React.ReactNode;
  title: string;
  sub: string;
  time: string;
  value?: string;
  valueColor?: string;
}

const activities: Activity[] = [
  {
    id: 'a1',
    icon: <Car className="h-4 w-4 text-tesla-red" />,
    title: 'Viagem concluída',
    sub: 'Tesla Center — Itaim Bibi',
    time: 'Hoje, 22:18',
    value: 'R$ 42,90',
    valueColor: 'text-white'
  },
  {
    id: 'a2',
    icon: <Leaf className="h-4 w-4 text-emerald-300" />,
    title: '1,8 kg CO₂ evitado',
    sub: 'Contribuição sustentável #142',
    time: 'Hoje, 22:19',
    value: '+1,8 kg',
    valueColor: 'text-emerald-300'
  },
  {
    id: 'a3',
    icon: <Wallet className="h-4 w-4 text-amber-300" />,
    title: 'Cashback creditado',
    sub: 'Tesla Pay — automático',
    time: 'Hoje, 22:19',
    value: '+R$ 4,30',
    valueColor: 'text-emerald-300'
  },
  {
    id: 'a4',
    icon: <Star className="h-4 w-4 text-amber-300" />,
    title: 'Avaliação recebida',
    sub: 'Camila Andrade deu 5 estrelas',
    time: 'Hoje, 22:20',
    value: '5 ★',
    valueColor: 'text-amber-300'
  },
  {
    id: 'a5',
    icon: <Brain className="h-4 w-4 text-sky-300" />,
    title: 'Dados FSD coletados',
    sub: '18 min de treino Dojo',
    time: 'Hoje, 22:36',
    value: '+18 min',
    valueColor: 'text-sky-300'
  },
  {
    id: 'a6',
    icon: <Zap className="h-4 w-4 text-tesla-red" />,
    title: 'Tesla Model 3 • #rd8421',
    sub: 'Placa TSL 9K21 • 7,4 km',
    time: 'Hoje, 22:18'
  }
];

export default function ActivityFeed() {
  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-5 top-5 bottom-5 w-[1.5px] bg-gradient-to-b from-tesla-red/50 via-white/10 to-transparent" />
      <div className="space-y-0">
        {activities.map((a, i) => (
          <motion.div
            key={a.id}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.07 }}
            className="relative flex items-start gap-3 pl-5 pr-1 py-2.5"
          >
            {/* Dot on timeline */}
            <div className="absolute left-[15px] top-1/2 -translate-y-1/2 h-3.5 w-3.5 rounded-full bg-tesla-panel border border-white/15 grid place-items-center shrink-0 z-10">
              <div className="h-1.5 w-1.5 rounded-full bg-tesla-red" />
            </div>
            <div className="w-9 shrink-0" />
            <div className="h-8 w-8 rounded-xl bg-white/8 grid place-items-center shrink-0">
              {a.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-medium">{a.title}</div>
              <div className="text-[11px] text-white/50 truncate">{a.sub}</div>
            </div>
            <div className="text-right shrink-0">
              {a.value && (
                <div className={['text-[12px] font-semibold', a.valueColor || ''].join(' ')}>
                  {a.value}
                </div>
              )}
              <div className="text-[9px] text-white/35">{a.time}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
