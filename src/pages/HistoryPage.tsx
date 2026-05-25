import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Leaf, Search, Filter } from 'lucide-react';
import TopBar from '../components/ui/TopBar';
import Card from '../components/ui/Card';
import Pill from '../components/ui/Pill';
import AnimatedNumber from '../components/ui/AnimatedNumber';
import { pastRides } from '../mock/rides';

type Tab = 'all' | 'urban' | 'comfort' | 'black' | 'fsd';

export default function HistoryPage() {
  const [tab, setTab] = useState<Tab>('all');
  const filtered = pastRides.filter((r) => {
    if (tab === 'all') return true;
    return r.category.toLowerCase().includes(tab);
  });

  const totalKm = pastRides.reduce((a, r) => a + r.km, 0);
  const totalCo2 = pastRides.reduce((a, r) => a + r.co2SavedKg, 0);

  return (
    <div className="min-h-[100dvh]">
      <TopBar title="Suas viagens" subtitle={`${pastRides.length} viagens • Últimos 30 dias`} />

      <div className="px-4 mt-3 space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <Card>
            <div className="text-[11px] uppercase tracking-widest text-white/45">Distância</div>
            <div className="text-2xl font-semibold mt-1">
              <AnimatedNumber value={totalKm} decimals={1} suffix=" km" />
            </div>
          </Card>
          <Card className="border-emerald-500/20 bg-emerald-500/10">
            <div className="text-[11px] uppercase tracking-widest text-emerald-300 flex items-center gap-1">
              <Leaf className="h-3 w-3" /> CO₂ evitado
            </div>
            <div className="text-2xl font-semibold mt-1">
              <AnimatedNumber value={totalCo2} decimals={1} suffix=" kg" />
            </div>
          </Card>
        </div>

        {/* Search bar */}
        <div className="glass rounded-2xl h-12 px-3 flex items-center gap-2">
          <Search className="h-4 w-4 text-white/50" />
          <input placeholder="Buscar viagens" className="flex-1 bg-transparent outline-none text-[14px] placeholder:text-white/30" />
          <button className="h-8 w-8 rounded-lg bg-white/5 grid place-items-center"><Filter className="h-4 w-4" /></button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 no-scrollbar">
          {(['all', 'urban', 'comfort', 'black', 'fsd'] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={[
                'px-3 h-8 rounded-full text-[12px] font-medium border whitespace-nowrap transition',
                tab === t
                  ? 'bg-tesla-red text-white border-tesla-red shadow-glow'
                  : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
              ].join(' ')}
            >
              {labelOfTab(t)}
            </button>
          ))}
        </div>

        {/* List */}
        <div className="space-y-2.5">
          {filtered.map((r, idx) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <Card interactive>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="text-[11px] uppercase tracking-widest text-white/50">
                    {formatDate(r.date)}
                  </div>
                  <Pill tone="default">{r.category}</Pill>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex flex-col items-center pt-1">
                    <div className="h-2 w-2 rounded-full bg-emerald-400" />
                    <div className="h-6 w-[2px] bg-white/15" />
                    <div className="h-2 w-2 rounded-full bg-tesla-red" />
                  </div>
                  <div className="flex-1 space-y-2 min-w-0">
                    <div className="text-[13px] truncate">{r.from}</div>
                    <div className="text-[13px] truncate font-semibold">{r.to}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[14px] font-semibold tabular-nums">
                      R$ {r.fare.toFixed(2).replace('.', ',')}
                    </div>
                    <div className="text-[10px] text-white/50 tabular-nums">{r.km.toFixed(1)} km</div>
                  </div>
                </div>
                <hr className="border-white/8 my-3" />
                <div className="flex items-center justify-between text-[11px] text-white/60">
                  <span className="truncate">com {r.driver}</span>
                  <span className="flex items-center gap-2">
                    <span className="flex items-center gap-1 text-amber-300">
                      <Star className="h-3 w-3 fill-amber-300" />
                      {r.rating}.0
                    </span>
                    <span className="flex items-center gap-1 text-emerald-300">
                      <Leaf className="h-3 w-3" />
                      {r.co2SavedKg} kg
                    </span>
                  </span>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function labelOfTab(t: Tab) {
  switch (t) {
    case 'all': return 'Todas';
    case 'urban': return 'UrbanRide';
    case 'comfort': return 'Comfort';
    case 'black': return 'Black';
    case 'fsd': return 'FSD';
  }
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleString('pt-BR', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit'
  });
}
