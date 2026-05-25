import { useState } from 'react';
import { motion } from 'framer-motion';
import { Power, Star, Battery, MapPin, TrendingUp, Brain, ShieldCheck, Zap } from 'lucide-react';
import TopBar from '../components/ui/TopBar';
import Card from '../components/ui/Card';
import AnimatedNumber from '../components/ui/AnimatedNumber';
import Pill from '../components/ui/Pill';
import BarChart from '../components/charts/BarChart';
import CarSilhouette from '../components/map/CarSilhouette';
import { driverEarnings, fleetMetrics } from '../mock/metrics';

export default function DriverDashboardPage() {
  const [online, setOnline] = useState(true);
  const today = driverEarnings[driverEarnings.length - 1].earn;

  return (
    <div className="min-h-[100dvh]">
      <TopBar title="Driver Hub" subtitle="Tesla Mobility Partner" />

      <div className="px-4 mt-3 space-y-3">
        {/* Online toggle hero */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className={[
            'relative rounded-3xl p-5 overflow-hidden border',
            online
              ? 'bg-gradient-to-br from-emerald-500/20 via-emerald-500/5 to-transparent border-emerald-500/30'
              : 'bg-tesla-panel border-tesla-border'
          ].join(' ')}
        >
          <div className="absolute -right-10 -top-10 h-44 w-44 rounded-full bg-emerald-400/10 blur-3xl" />
          <div className="relative flex items-center gap-4">
            <button
              onClick={() => setOnline((o) => !o)}
              className={[
                'h-20 w-20 rounded-full grid place-items-center transition-all',
                online
                  ? 'bg-emerald-500 text-white shadow-[0_0_40px_rgba(16,185,129,0.5)]'
                  : 'bg-white/8 text-white/60'
              ].join(' ')}
            >
              <Power className="h-7 w-7" />
            </button>
            <div className="flex-1">
              <div className="text-[10px] uppercase tracking-[0.3em] text-white/55">Status</div>
              <div className="text-2xl font-semibold mt-0.5">
                {online ? 'Online' : 'Offline'}
              </div>
              <div className="text-[12px] text-white/55 mt-1">
                {online ? 'Aceitando viagens nas proximidades' : 'Toque para começar a dirigir'}
              </div>
            </div>
            <CarSilhouette type="model3" className="w-20 opacity-60" />
          </div>
        </motion.div>

        {/* Earnings today */}
        <div className="grid grid-cols-2 gap-3">
          <Card>
            <div className="text-[11px] uppercase tracking-widest text-white/45">Hoje</div>
            <div className="text-3xl font-semibold tabular-nums mt-1">
              <AnimatedNumber value={today} decimals={0} prefix="R$ " />
            </div>
            <div className="text-[11px] text-emerald-300 mt-1 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" /> +18% vs ontem
            </div>
          </Card>
          <Card>
            <div className="text-[11px] uppercase tracking-widest text-white/45">Viagens</div>
            <div className="text-3xl font-semibold tabular-nums mt-1">
              <AnimatedNumber value={14} />
            </div>
            <div className="text-[11px] text-amber-300 mt-1 flex items-center gap-1">
              <Star className="h-3 w-3 fill-amber-300" /> 4.98 média
            </div>
          </Card>
        </div>

        {/* Weekly chart */}
        <Card>
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-[15px] font-semibold">Ganhos da semana</div>
              <div className="text-[11px] text-white/55">Total R$ {driverEarnings.reduce((a, b) => a + b.earn, 0).toLocaleString('pt-BR')}</div>
            </div>
            <Pill tone="green">+12% mês</Pill>
          </div>
          <BarChart
            data={driverEarnings.map((d) => ({ label: d.day, value: d.earn }))}
            highlight="Dom"
            format={(v) => `R$ ${v}`}
          />
        </Card>

        {/* Vehicle status */}
        <Card>
          <div className="text-[15px] font-semibold mb-3">Veículo Tesla</div>
          <div className="flex items-center gap-3">
            <CarSilhouette type="modelY" className="w-24" />
            <div className="flex-1">
              <div className="text-[14px] font-semibold">Model Y Long Range</div>
              <div className="text-[11px] text-white/55">TSL 9K21 • 2025</div>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <Mini label="Bateria" value="87%" tone="emerald" icon={<Battery className="h-3 w-3" />} />
                <Mini label="Autonomia" value="438 km" tone="white" icon={<Zap className="h-3 w-3" />} />
              </div>
            </div>
          </div>
          <div className="mt-3 h-2 rounded-full bg-white/8 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '87%' }}
              transition={{ duration: 1 }}
              className="h-full bg-gradient-to-r from-emerald-400 to-emerald-300"
            />
          </div>
        </Card>

        {/* Achievements */}
        <Card>
          <div className="text-[15px] font-semibold mb-3">Conquistas</div>
          <div className="grid grid-cols-3 gap-2">
            <Badge icon={<ShieldCheck className="h-5 w-5 text-emerald-300" />} label="Direção Segura" value="98%" />
            <Badge icon={<Brain className="h-5 w-5 text-sky-300" />} label="Dados FSD" value="412 min" />
            <Badge icon={<MapPin className="h-5 w-5 text-tesla-red" />} label="Zonas premium" value="32" />
          </div>
        </Card>

        {/* Fleet pulse */}
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[15px] font-semibold">Frota Tesla — agora</div>
              <div className="text-[11px] text-white/55">São Paulo • atualizado em tempo real</div>
            </div>
            <Pill tone="green">Live</Pill>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-3 text-center">
            <FleetStat label="Veículos online" value={fleetMetrics.vehiclesOnline} />
            <FleetStat label="Viagens hoje" value={fleetMetrics.ridesToday} />
            <FleetStat label="Uptime" value={fleetMetrics.uptime} suffix="%" decimals={2} />
          </div>
        </Card>
      </div>
    </div>
  );
}

function Mini({ label, value, tone, icon }: { label: string; value: string; tone: 'emerald' | 'white'; icon: React.ReactNode }) {
  return (
    <div className="rounded-xl bg-white/4 px-2.5 py-2 flex items-center gap-2">
      <span className={tone === 'emerald' ? 'text-emerald-300' : 'text-white'}>{icon}</span>
      <div>
        <div className="text-[10px] uppercase tracking-widest text-white/45">{label}</div>
        <div className="text-[12px] font-semibold">{value}</div>
      </div>
    </div>
  );
}

function Badge({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-xl bg-white/5 p-3 text-center">
      <div className="h-9 w-9 rounded-xl bg-white/8 mx-auto grid place-items-center">{icon}</div>
      <div className="mt-1 text-[11px] text-white/55">{label}</div>
      <div className="text-[13px] font-semibold">{value}</div>
    </div>
  );
}

function FleetStat({ label, value, suffix, decimals }: { label: string; value: number; suffix?: string; decimals?: number }) {
  return (
    <div>
      <div className="text-xl font-semibold tabular-nums">
        <AnimatedNumber value={value} decimals={decimals} suffix={suffix} />
      </div>
      <div className="text-[10px] text-white/50 mt-0.5">{label}</div>
    </div>
  );
}
