import { motion } from 'framer-motion';
import { Leaf, TreePine, Wind, Sun, Cloud } from 'lucide-react';
import TopBar from '../components/ui/TopBar';
import Card from '../components/ui/Card';
import Donut from '../components/charts/Donut';
import AnimatedNumber from '../components/ui/AnimatedNumber';
import Pill from '../components/ui/Pill';
import { energyMix, userImpact } from '../mock/metrics';

export default function SustainabilityPage() {
  return (
    <div className="min-h-[100dvh]">
      <TopBar title="Sustentabilidade" subtitle="Tesla Earth Initiative" />

      <div className="px-4 mt-3 space-y-3">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative rounded-3xl p-5 overflow-hidden border bg-gradient-to-br from-emerald-500/20 via-emerald-500/5 to-transparent border-emerald-500/30"
        >
          <div className="absolute -right-10 -bottom-10 h-44 w-44 rounded-full bg-emerald-400/15 blur-3xl" />
          <div className="relative">
            <div className="flex items-center gap-2">
              <Leaf className="h-4 w-4 text-emerald-300" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-emerald-300">Seu impacto</span>
            </div>
            <div className="text-5xl font-semibold tracking-tight mt-2 tabular-nums">
              <AnimatedNumber value={userImpact.co2SavedKg} decimals={1} suffix=" kg" />
            </div>
            <div className="text-[12px] text-white/65 mt-1">
              de CO₂ não emitidos na atmosfera • equivale a {userImpact.treesEquivalent} árvores plantadas
            </div>
          </div>
        </motion.div>

        {/* Metrics grid */}
        <div className="grid grid-cols-2 gap-3">
          <Card>
            <div className="flex items-center gap-2">
              <TreePine className="h-4 w-4 text-emerald-300" />
              <span className="text-[10px] uppercase tracking-widest text-white/45">Árvores eq.</span>
            </div>
            <div className="text-2xl font-semibold mt-1">
              <AnimatedNumber value={userImpact.treesEquivalent} />
            </div>
          </Card>
          <Card>
            <div className="flex items-center gap-2">
              <Cloud className="h-4 w-4 text-sky-300" />
              <span className="text-[10px] uppercase tracking-widest text-white/45">Litros evitados</span>
            </div>
            <div className="text-2xl font-semibold mt-1">
              <AnimatedNumber value={userImpact.litersGasolineAvoided} decimals={1} suffix=" L" />
            </div>
          </Card>
        </div>

        {/* Energy mix donut */}
        <Card>
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-[15px] font-semibold">Matriz energética</div>
              <div className="text-[11px] text-white/55">Energia que move sua viagem Tesla</div>
            </div>
            <Pill tone="green">100% limpa</Pill>
          </div>
          <Donut
            slices={energyMix}
            centerValue={`${userImpact.energyFromSolarPct}%`}
            centerLabel="solar"
          />
        </Card>

        {/* Sources */}
        <Card>
          <div className="text-[15px] font-semibold mb-3">Fontes que abastecem você</div>
          <div className="space-y-3">
            <Source icon={<Sun className="h-4 w-4 text-amber-300" />} label="Tesla Solar Roof" amount="48%" desc="14 km de painéis" />
            <Source icon={<Wind className="h-4 w-4 text-sky-300" />} label="Parques Eólicos Parceiros" amount="24%" desc="Bahia & Ceará" />
            <Source icon={<Leaf className="h-4 w-4 text-emerald-300" />} label="Hidrelétrica Verde" amount="18%" desc="Sul do Brasil" />
            <Source icon={<Cloud className="h-4 w-4 text-white/70" />} label="Grid Compensado" amount="10%" desc="Créditos de carbono" />
          </div>
        </Card>

        {/* Earth initiative */}
        <Card className="bg-gradient-to-br from-emerald-500/15 to-transparent border-emerald-500/20">
          <div className="text-[11px] uppercase tracking-[0.3em] text-emerald-300 mb-2">Tesla Earth</div>
          <div className="text-[15px] font-semibold text-balance">
            Em 2030, toda viagem Tesla será carbono negativa.
          </div>
          <div className="text-[12px] text-white/60 mt-2">
            Cada viagem UrbanRide já compensa 110% das emissões equivalentes a um veículo a combustão.
          </div>
        </Card>
      </div>
    </div>
  );
}

function Source({ icon, label, amount, desc }: { icon: React.ReactNode; label: string; amount: string; desc: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-9 w-9 rounded-xl bg-white/8 grid place-items-center">{icon}</div>
      <div className="flex-1">
        <div className="text-[13px] font-medium">{label}</div>
        <div className="text-[11px] text-white/55">{desc}</div>
      </div>
      <span className="text-[13px] font-semibold tabular-nums">{amount}</span>
    </div>
  );
}
