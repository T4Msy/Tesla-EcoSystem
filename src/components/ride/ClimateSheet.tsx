import { useState } from 'react';
import { Thermometer, Wind, Snowflake, Flame, Droplets, Sun } from 'lucide-react';
import Sheet from '../ui/Sheet';

export default function ClimateSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [temp, setTemp] = useState(22);
  const [fan, setFan] = useState(2);
  const [mode, setMode] = useState<'cool' | 'heat' | 'auto'>('auto');
  const [seatDriver, setSeatDriver] = useState(1);
  const [seatPassenger, setSeatPassenger] = useState(0);
  const [defrost, setDefrost] = useState(false);
  const [recirculate, setRecirculate] = useState(true);

  return (
    <Sheet open={open} onClose={onClose} title="Clima Tesla">
      {/* Temp ring */}
      <div className="flex items-center justify-center mb-6">
        <div className="relative">
          <TempArc temp={temp} mode={mode} />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-4xl font-semibold tabular-nums">{temp}°</div>
            <div className="text-[10px] uppercase tracking-widest text-white/50">interior</div>
          </div>
        </div>
      </div>

      {/* Temp adjust */}
      <div className="flex items-center gap-4 mb-5">
        <button
          onClick={() => setTemp((t) => Math.max(16, t - 1))}
          className="h-12 w-12 rounded-full glass text-2xl font-light grid place-items-center hover:bg-white/10"
        >
          −
        </button>
        <input
          type="range"
          min={16}
          max={30}
          value={temp}
          onChange={(e) => setTemp(Number(e.target.value))}
          className="flex-1 accent-tesla-red"
        />
        <button
          onClick={() => setTemp((t) => Math.min(30, t + 1))}
          className="h-12 w-12 rounded-full glass text-2xl font-light grid place-items-center hover:bg-white/10"
        >
          +
        </button>
      </div>

      {/* Mode */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {([['cool', <Snowflake className="h-4 w-4" />, 'Frio'],
           ['auto', <Thermometer className="h-4 w-4" />, 'Auto'],
           ['heat', <Flame className="h-4 w-4" />, 'Calor']] as const).map(([m, icon, label]) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={[
              'h-12 rounded-xl flex flex-col items-center justify-center gap-1 text-[10px] font-semibold border transition',
              mode === m
                ? 'bg-tesla-red text-white border-tesla-red shadow-glow'
                : 'bg-white/5 border-white/10 hover:bg-white/10 text-white/70'
            ].join(' ')}
          >
            {icon}
            <span>{label}</span>
          </button>
        ))}
      </div>

      {/* Fan speed */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-[11px] text-white/55 mb-2">
          <div className="flex items-center gap-1">
            <Wind className="h-3 w-3" />
            <span>Ventilação</span>
          </div>
          <span className="text-tesla-red font-semibold">{['Off', 'Baixo', 'Médio', 'Alto', 'Max'][fan]}</span>
        </div>
        <div className="flex gap-2">
          {[0,1,2,3,4].map((v) => (
            <button
              key={v}
              onClick={() => setFan(v)}
              className={[
                'flex-1 h-8 rounded-lg border transition text-[11px] font-semibold',
                fan >= v ? 'bg-tesla-red/80 border-tesla-red text-white' : 'bg-white/5 border-white/10 text-white/40'
              ].join(' ')}
            />
          ))}
        </div>
      </div>

      {/* Seat heat */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <SeatControl label="Motorista" value={seatDriver} onChange={setSeatDriver} />
        <SeatControl label="Passageiro" value={seatPassenger} onChange={setSeatPassenger} />
      </div>

      {/* Toggles */}
      <div className="grid grid-cols-2 gap-2">
        <Toggle
          label="Desembaçar"
          icon={<Sun className="h-4 w-4" />}
          active={defrost}
          onClick={() => setDefrost((x) => !x)}
        />
        <Toggle
          label="Recircular"
          icon={<Droplets className="h-4 w-4" />}
          active={recirculate}
          onClick={() => setRecirculate((x) => !x)}
        />
      </div>
    </Sheet>
  );
}

function SeatControl({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) {
  return (
    <div className="glass rounded-2xl p-3">
      <div className="text-[10px] uppercase tracking-widest text-white/50 mb-2">{label}</div>
      <div className="flex gap-1.5">
        {[0, 1, 2, 3].map((v) => (
          <button
            key={v}
            onClick={() => onChange(v)}
            className={[
              'flex-1 h-6 rounded-md border transition text-[9px] font-bold',
              value >= v && v > 0 ? 'bg-tesla-red border-tesla-red text-white' : 'bg-white/5 border-white/10 text-white/30'
            ].join(' ')}
          >
            {v === 0 ? '—' : '★'.repeat(v)}
          </button>
        ))}
      </div>
    </div>
  );
}

function Toggle({ label, icon, active, onClick }: { label: string; icon: React.ReactNode; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={[
        'flex items-center gap-2 p-3 rounded-2xl border text-[12px] font-medium transition',
        active ? 'bg-tesla-red/20 border-tesla-red/40 text-white' : 'bg-white/5 border-white/10 text-white/60'
      ].join(' ')}
    >
      {icon}
      {label}
    </button>
  );
}

function TempArc({ temp, mode }: { temp: number; mode: 'cool' | 'heat' | 'auto' }) {
  const size = 140;
  const r = 56;
  const cx = size / 2;
  const cy = size / 2;
  const startAngle = -220;
  const sweepAngle = 260;
  const pct = (temp - 16) / (30 - 16);
  const filled = sweepAngle * pct;
  const color = mode === 'cool' ? '#58C5FF' : mode === 'heat' ? '#FFB020' : '#E82127';

  function arc(start: number, sweep: number, rr: number) {
    const a1 = ((start - 90) * Math.PI) / 180;
    const a2 = ((start + sweep - 90) * Math.PI) / 180;
    const x1 = cx + rr * Math.cos(a1);
    const y1 = cy + rr * Math.sin(a1);
    const x2 = cx + rr * Math.cos(a2);
    const y2 = cy + rr * Math.sin(a2);
    const large = sweep > 180 ? 1 : 0;
    return `M ${x1} ${y1} A ${rr} ${rr} 0 ${large} 1 ${x2} ${y2}`;
  }

  return (
    <svg width={size} height={size}>
      <path d={arc(startAngle, sweepAngle, r)} stroke="rgba(255,255,255,0.06)" strokeWidth={10} fill="none" strokeLinecap="round" />
      <path
        d={arc(startAngle, filled, r)}
        stroke={color}
        strokeWidth={10}
        fill="none"
        strokeLinecap="round"
        style={{ filter: `drop-shadow(0 0 8px ${color}66)` }}
      />
    </svg>
  );
}
