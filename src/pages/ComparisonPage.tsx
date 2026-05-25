import { useState } from 'react';
import { motion } from 'framer-motion';
import { Fuel, Zap, Wrench, Leaf, Volume2, Sparkles } from 'lucide-react';
import TopBar from '../components/ui/TopBar';
import Card from '../components/ui/Card';
import AnimatedNumber from '../components/ui/AnimatedNumber';
import Pill from '../components/ui/Pill';
import LineCompare from '../components/charts/LineCompare';
import { monthlyEconomy } from '../mock/metrics';

export default function ComparisonPage() {
  const [km, setKm] = useState(1500);

  const gasolinePrice = 6.0;
  const consumptionGas = 12; // km/L
  const teslaConsumption = 0.17; // kWh/km
  const electricityPrice = 0.85; // R$/kWh

  const gasCost = (km / consumptionGas) * gasolinePrice;
  const evCost = km * teslaConsumption * electricityPrice;
  const saved = gasCost - evCost;
  const co2 = (km / consumptionGas) * 2.3;

  return (
    <div className="min-h-[100dvh]">
      <TopBar title="Gasolina vs Elétrico" subtitle="Compare e descubra" />

      <div className="px-4 mt-3 space-y-3">
        {/* Toggle versus */}
        <div className="grid grid-cols-2 gap-2">
          <Card className="text-center !p-4 border-amber-500/20 bg-amber-500/5">
            <div className="h-10 w-10 mx-auto rounded-xl bg-amber-500/15 grid place-items-center">
              <Fuel className="h-5 w-5 text-amber-300" />
            </div>
            <div className="text-[14px] font-semibold mt-2">Combustão</div>
            <div className="text-[10px] text-white/55">Sedan 1.6 Flex</div>
          </Card>
          <Card className="text-center !p-4 border-tesla-red/30 bg-tesla-red/8">
            <div className="h-10 w-10 mx-auto rounded-xl bg-tesla-red/20 grid place-items-center">
              <Zap className="h-5 w-5 text-tesla-red" />
            </div>
            <div className="text-[14px] font-semibold mt-2">Tesla Model 3</div>
            <div className="text-[10px] text-white/55">100% elétrico</div>
          </Card>
        </div>

        {/* Slider */}
        <Card>
          <div className="flex items-center justify-between mb-2">
            <div className="text-[15px] font-semibold">Sua rodagem mensal</div>
            <Pill tone="red">{km} km/mês</Pill>
          </div>
          <input
            type="range"
            min={200}
            max={4000}
            step={50}
            value={km}
            onChange={(e) => setKm(Number(e.target.value))}
            className="w-full accent-tesla-red"
          />
          <div className="flex justify-between text-[10px] text-white/45 mt-1">
            <span>200 km</span>
            <span>2000 km</span>
            <span>4000 km</span>
          </div>
        </Card>

        {/* Cost compare */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="!p-4">
            <div className="text-[10px] uppercase tracking-widest text-amber-300 flex items-center gap-1">
              <Fuel className="h-3 w-3" /> Gasolina
            </div>
            <div className="text-3xl font-semibold tabular-nums mt-1">
              <AnimatedNumber value={gasCost} decimals={0} prefix="R$ " />
            </div>
            <div className="text-[11px] text-white/55 mt-1">{(km / consumptionGas).toFixed(0)} litros</div>
          </Card>
          <Card className="!p-4 border-tesla-red/30 bg-tesla-red/8">
            <div className="text-[10px] uppercase tracking-widest text-tesla-red flex items-center gap-1">
              <Zap className="h-3 w-3" /> Tesla
            </div>
            <div className="text-3xl font-semibold tabular-nums mt-1 text-gradient-red">
              <AnimatedNumber value={evCost} decimals={0} prefix="R$ " />
            </div>
            <div className="text-[11px] text-white/55 mt-1">{(km * teslaConsumption).toFixed(0)} kWh</div>
          </Card>
        </div>

        {/* Savings hero */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative rounded-3xl p-5 overflow-hidden border bg-gradient-to-br from-emerald-500/20 via-emerald-500/5 to-transparent border-emerald-500/30"
        >
          <div className="absolute -right-10 -top-10 h-44 w-44 rounded-full bg-emerald-400/15 blur-3xl" />
          <div className="relative">
            <div className="text-[10px] uppercase tracking-[0.3em] text-emerald-300">Você economiza</div>
            <div className="text-5xl font-semibold tracking-tight mt-1 tabular-nums">
              <AnimatedNumber value={saved} prefix="R$ " /> /mês
            </div>
            <div className="text-[12px] text-white/65 mt-1">
              Em 12 meses: R$ {Math.round(saved * 12).toLocaleString('pt-BR')} • CO₂: −{co2.toFixed(1)} kg/mês
            </div>
          </div>
        </motion.div>

        {/* Spec compare table */}
        <Card>
          <div className="text-[15px] font-semibold mb-3">Comparação técnica</div>
          <div className="divide-y divide-white/8 -my-2">
            <Spec label="Consumo" gas="12 km/L" ev="6,2 km/kWh" icon={<Fuel className="h-3.5 w-3.5" />} />
            <Spec label="Custo por km" gas="R$ 0,50" ev="R$ 0,14" highlight icon={<Zap className="h-3.5 w-3.5" />} />
            <Spec label="Manutenção/ano" gas="R$ 2.400" ev="R$ 480" highlight icon={<Wrench className="h-3.5 w-3.5" />} />
            <Spec label="Emissões CO₂" gas="2,3 kg/L" ev="0 kg" highlight icon={<Leaf className="h-3.5 w-3.5" />} />
            <Spec label="Ruído cabine" gas="74 dB" ev="62 dB" icon={<Volume2 className="h-3.5 w-3.5" />} />
            <Spec label="OTA Updates" gas="—" ev="Mensais" icon={<Sparkles className="h-3.5 w-3.5" />} />
          </div>
        </Card>

        {/* Chart */}
        <Card>
          <div className="text-[15px] font-semibold mb-2">Histórico de custo</div>
          <LineCompare
            labels={monthlyEconomy.map((m) => m.month)}
            series={[
              { label: 'Gasolina', color: '#FFB020', data: monthlyEconomy.map((m) => m.gas) },
              { label: 'Tesla EV', color: '#E82127', data: monthlyEconomy.map((m) => m.ev) }
            ]}
            yFormat={(v) => `R$${v}`}
          />
        </Card>
      </div>
    </div>
  );
}

function Spec({ label, gas, ev, highlight, icon }: { label: string; gas: string; ev: string; highlight?: boolean; icon: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[1fr_auto_auto] items-center gap-3 py-2.5">
      <div className="flex items-center gap-2 text-[12px] text-white/65">
        <span className="text-white/45">{icon}</span>
        {label}
      </div>
      <div className="text-[12px] text-amber-300 tabular-nums w-20 text-right">{gas}</div>
      <div className={['text-[12px] tabular-nums w-20 text-right font-semibold',
        highlight ? 'text-tesla-red' : 'text-white'
      ].join(' ')}>{ev}</div>
    </div>
  );
}
