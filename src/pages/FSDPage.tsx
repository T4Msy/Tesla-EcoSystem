import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Cpu, Eye, Activity, Sparkles, Zap, ChevronRight } from 'lucide-react';
import TopBar from '../components/ui/TopBar';
import Card from '../components/ui/Card';
import AnimatedNumber from '../components/ui/AnimatedNumber';
import Pill from '../components/ui/Pill';
import { userImpact, fleetMetrics } from '../mock/metrics';
import Button from '../components/ui/Button';

export default function FSDPage() {
  return (
    <div className="min-h-[100dvh]">
      <TopBar
        title="Full Self Driving"
        subtitle="Beta v13 • Supervisionado"
        right={<Pill tone="red">AI</Pill>}
      />

      <div className="px-4 mt-3 space-y-3">
        {/* HUD Hero */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative rounded-3xl p-5 overflow-hidden border bg-gradient-to-br from-tesla-red/25 via-tesla-red/5 to-transparent border-tesla-red/30"
        >
          <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
          <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-tesla-red to-transparent animate-scan" />
          <div className="absolute -right-10 -top-10 h-44 w-44 rounded-full bg-tesla-red/15 blur-3xl" />
          <div className="relative flex items-center gap-4">
            <NeuralOrb />
            <div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-tesla-red">Tesla AI Cluster</div>
              <div className="text-3xl font-semibold mt-0.5 tracking-tight">
                Dojo v3.2
              </div>
              <div className="text-[12px] text-white/65 mt-1">
                Treinando com <AnimatedNumber value={fleetMetrics.fsdMilesLearned} suffix=" mi" /> de dados reais
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contribution */}
        <Card>
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 rounded-xl bg-tesla-red/15 grid place-items-center">
              <Brain className="h-5 w-5 text-tesla-red" />
            </div>
            <div>
              <div className="text-[15px] font-semibold">Sua contribuição</div>
              <div className="text-[11px] text-white/55">Quanto você ajudou a treinar a IA Tesla</div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 mt-3 text-center">
            <Contrib label="Minutos" value={userImpact.fsdDataMinutes} />
            <Contrib label="km" value={userImpact.kmDriven} />
            <Contrib label="Viagens" value={userImpact.ridesTotal} />
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between text-[10px] text-white/55 mb-1 uppercase tracking-widest">
              <span>Próximo marco</span>
              <span>500 min</span>
            </div>
            <div className="h-2 rounded-full bg-white/8 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(userImpact.fsdDataMinutes / 500) * 100}%` }}
                transition={{ duration: 1.2 }}
                className="h-full bg-gradient-to-r from-tesla-red to-tesla-red-soft shadow-glow"
              />
            </div>
          </div>
        </Card>

        {/* HUD Sensors */}
        <Card>
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="h-4 w-4 text-tesla-red" />
            <div className="text-[15px] font-semibold">Sensores ativos</div>
            <Pill tone="green" className="ml-auto">8/8 OK</Pill>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Sensor name="Câmeras 360°" status="ON" tone="green" icon={<Eye className="h-3.5 w-3.5" />} />
            <Sensor name="Radar HD" status="ON" tone="green" icon={<Activity className="h-3.5 w-3.5" />} />
            <Sensor name="GPU on-board" status="98%" tone="green" icon={<Cpu className="h-3.5 w-3.5" />} />
            <Sensor name="Neural Net" status="LIVE" tone="red" icon={<Brain className="h-3.5 w-3.5" />} />
          </div>
        </Card>

        {/* Roadmap */}
        <Card>
          <div className="text-[15px] font-semibold mb-2">Roadmap FSD UrbanRide</div>
          <ol className="space-y-3">
            <Step state="done" title="Coleta urbana — São Paulo, Rio, BH" subtitle="2025 — concluído" />
            <Step state="active" title="Treinamento supervisionado v13" subtitle="2026 — em andamento" />
            <Step state="next" title="Modo autônomo opcional (Beta)" subtitle="Q3 2026" />
            <Step state="next" title="Frota 100% autônoma" subtitle="2027 — esperado" last />
          </ol>
        </Card>

        <Card className="bg-gradient-to-br from-tesla-red/15 to-transparent border-tesla-red/20">
          <div className="flex items-center gap-3">
            <Zap className="h-5 w-5 text-tesla-red" />
            <div className="flex-1">
              <div className="text-[14px] font-semibold">Experimente FSD agora</div>
              <div className="text-[11px] text-white/55">UrbanRide FSD em rotas selecionadas</div>
            </div>
            <ChevronRight className="h-4 w-4 text-white/40" />
          </div>
          <Button block size="lg" className="mt-3">
            Reservar viagem FSD
          </Button>
        </Card>
      </div>
    </div>
  );
}

function Contrib({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="text-xl font-semibold tabular-nums">
        <AnimatedNumber value={value} />
      </div>
      <div className="text-[10px] text-white/50">{label}</div>
    </div>
  );
}

function Sensor({ name, status, tone, icon }: { name: string; status: string; tone: 'green' | 'red'; icon: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/4">
      <div className={['h-7 w-7 rounded-lg grid place-items-center',
        tone === 'green' ? 'bg-emerald-500/15 text-emerald-300' : 'bg-tesla-red/15 text-tesla-red'
      ].join(' ')}>
        {icon}
      </div>
      <div className="flex-1">
        <div className="text-[12px] font-medium">{name}</div>
        <div className="text-[10px] text-white/45">{status}</div>
      </div>
      <span className={['h-2 w-2 rounded-full animate-pulse',
        tone === 'green' ? 'bg-emerald-400' : 'bg-tesla-red'
      ].join(' ')} />
    </div>
  );
}

function Step({ state, title, subtitle, last }: { state: 'done' | 'active' | 'next'; title: string; subtitle: string; last?: boolean }) {
  return (
    <li className="relative pl-7">
      <span
        className={[
          'absolute left-0 top-1 h-3.5 w-3.5 rounded-full ring-4',
          state === 'done' ? 'bg-emerald-400 ring-emerald-400/20' :
          state === 'active' ? 'bg-tesla-red ring-tesla-red/30 animate-pulse' :
          'bg-white/20 ring-white/5'
        ].join(' ')}
      />
      {!last && <span className="absolute left-[6.5px] top-5 bottom-[-12px] w-[1.5px] bg-white/10" />}
      <div className="text-[13px] font-semibold">{title}</div>
      <div className="text-[11px] text-white/50">{subtitle}</div>
    </li>
  );
}

function NeuralOrb() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1500);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="relative h-24 w-24 grid place-items-center">
      <div className="absolute inset-0 rounded-full bg-tesla-red/25 blur-2xl animate-pulse" />
      <svg viewBox="0 0 100 100" className="absolute inset-0 animate-spin-slow opacity-70">
        <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(232,33,39,0.4)" strokeDasharray="3 5" />
        <circle cx="50" cy="50" r="36" fill="none" stroke="rgba(232,33,39,0.25)" strokeDasharray="2 6" />
      </svg>
      <div className="h-12 w-12 rounded-full glass-strong grid place-items-center ring-tesla">
        <Brain className="h-5 w-5 text-tesla-red" />
      </div>
      <span key={tick} className="absolute -top-1 right-1 h-1.5 w-1.5 rounded-full bg-tesla-red animate-ping" />
    </div>
  );
}
