import { motion } from 'framer-motion';
import { Wallet, Zap, Droplet, TrendingDown } from 'lucide-react';
import TopBar from '../components/ui/TopBar';
import Card from '../components/ui/Card';
import AnimatedNumber from '../components/ui/AnimatedNumber';
import LineCompare from '../components/charts/LineCompare';
import BarChart from '../components/charts/BarChart';
import { monthlyEconomy, weeklyRides, userImpact } from '../mock/metrics';
import Pill from '../components/ui/Pill';

export default function EconomyDashboardPage() {
  const saved = monthlyEconomy.reduce((a, m) => a + (m.gas - m.ev), 0);
  return (
    <div className="min-h-[100dvh]">
      <TopBar title="Economia" subtitle="Quanto você economiza com Tesla" />

      <div className="px-4 mt-3 space-y-3">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative rounded-3xl p-5 overflow-hidden border bg-gradient-to-br from-emerald-500/20 via-emerald-500/5 to-transparent border-emerald-500/30"
        >
          <div className="absolute -right-10 -bottom-10 h-44 w-44 rounded-full bg-emerald-400/15 blur-3xl" />
          <div className="relative">
            <div className="flex items-center gap-2">
              <Wallet className="h-4 w-4 text-emerald-300" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-emerald-300">Total economizado</span>
            </div>
            <div className="text-5xl font-semibold tracking-tight mt-2 tabular-nums">
              <AnimatedNumber value={saved} prefix="R$ " />
            </div>
            <div className="text-[12px] text-white/65 mt-1 flex items-center gap-1">
              <TrendingDown className="h-3 w-3 text-emerald-300" />
              vs. veículos a combustão • últimos 5 meses
            </div>
          </div>
        </motion.div>

        {/* Comparison line */}
        <Card>
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-[15px] font-semibold">Gasolina vs Elétrico</div>
              <div className="text-[11px] text-white/55">Custo médio mensal</div>
            </div>
            <Pill tone="green">−69%</Pill>
          </div>
          <LineCompare
            labels={monthlyEconomy.map((m) => m.month)}
            series={[
              { label: 'Gasolina', color: '#FF6B6F', data: monthlyEconomy.map((m) => m.gas) },
              { label: 'Tesla EV', color: '#34D399', data: monthlyEconomy.map((m) => m.ev) }
            ]}
            yFormat={(v) => `R$ ${v}`}
          />
        </Card>

        {/* Weekly rides */}
        <Card>
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-[15px] font-semibold">Viagens da semana</div>
              <div className="text-[11px] text-white/55">{userImpact.ridesThisMonth} viagens • {userImpact.kmDriven} km mês</div>
            </div>
            <Pill>Semana 21</Pill>
          </div>
          <BarChart
            data={weeklyRides.map((d) => ({ label: d.day, value: d.rides }))}
            highlight="Sáb"
            format={(v) => `${v}`}
          />
        </Card>

        {/* Numbers */}
        <div className="grid grid-cols-3 gap-2">
          <Mini label="Litros evitados" value={userImpact.litersGasolineAvoided} suffix=" L" icon={<Droplet className="h-4 w-4 text-sky-300" />} />
          <Mini label="kWh consumidos" value={userImpact.energyConsumedKWh} suffix=" kWh" icon={<Zap className="h-4 w-4 text-amber-300" />} />
          <Mini label="Cashback Tesla" value={48.5} prefix="R$ " icon={<Wallet className="h-4 w-4 text-emerald-300" />} />
        </div>

        {/* Goal */}
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[15px] font-semibold">Meta de economia 2026</div>
              <div className="text-[11px] text-white/55">R$ 4.000 economizados em 12 meses</div>
            </div>
            <Pill tone="red">62%</Pill>
          </div>
          <div className="mt-3 h-2 rounded-full bg-white/8 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '62%' }}
              transition={{ duration: 1.1 }}
              className="h-full bg-gradient-to-r from-tesla-red to-emerald-400 shadow-glow"
            />
          </div>
          <div className="mt-2 flex justify-between text-[10px] text-white/45">
            <span>R$ 2.480 / R$ 4.000</span>
            <span>faltam R$ 1.520</span>
          </div>
        </Card>
      </div>
    </div>
  );
}

function Mini({ label, value, suffix, prefix, icon }: { label: string; value: number; suffix?: string; prefix?: string; icon: React.ReactNode }) {
  return (
    <Card className="!p-3">
      <div className="h-8 w-8 rounded-lg bg-white/8 grid place-items-center mb-1">{icon}</div>
      <div className="text-[10px] text-white/45 uppercase tracking-widest">{label}</div>
      <div className="text-[14px] font-semibold tabular-nums">
        <AnimatedNumber value={value} decimals={value < 100 ? 1 : 0} prefix={prefix} suffix={suffix} />
      </div>
    </Card>
  );
}
