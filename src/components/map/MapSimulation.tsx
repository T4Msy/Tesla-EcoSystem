import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Props {
  variant?: 'home' | 'request' | 'ride';
  showRoute?: boolean;
  showCars?: boolean;
  carProgress?: number;
  className?: string;
}

const DISTRICTS = [
  { label: 'Av. Paulista', x: 118, y: 96 },
  { label: 'Itaim Bibi', x: 210, y: 148 },
  { label: 'Vila Olímpia', x: 220, y: 188 },
  { label: 'Pinheiros', x: 72, y: 138 },
  { label: 'Moema', x: 170, y: 230 },
  { label: 'Ibirapuera', x: 148, y: 260 },
  { label: 'Centro', x: 288, y: 80 },
];

const SUPERCHARGERS = [
  { x: 222, y: 192, label: 'SC Vila Olímpia', stalls: 8 },
  { x: 120, y: 100, label: 'SC Paulista', stalls: 12 },
  { x: 290, y: 82, label: 'SC Centro', stalls: 6 },
];

const AMBIENT_CARS = [
  { from: [-30, 92] as [number, number], to: [380, 90] as [number, number], dur: 6, delay: 0, vertical: false },
  { from: [380, 252] as [number, number], to: [-30, 250] as [number, number], dur: 5, delay: 0.6, vertical: false },
  { from: [62, -20] as [number, number], to: [62, 500] as [number, number], dur: 7, delay: 1.4, vertical: true },
  { from: [306, 500] as [number, number], to: [306, -20] as [number, number], dur: 8, delay: 0.2, vertical: true },
  { from: [210, -20] as [number, number], to: [238, 500] as [number, number], dur: 9, delay: 2.1, vertical: true },
  { from: [80, 500] as [number, number], to: [66, -20] as [number, number], dur: 10, delay: 3.5, vertical: true },
];

export default function MapSimulation({
  variant = 'home',
  showRoute = false,
  showCars = true,
  carProgress = 0,
  className = ''
}: Props) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 2000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className={[
        'relative overflow-hidden',
        'bg-gradient-to-b from-[#070c12] via-[#09101a] to-[#060a0e]',
        className
      ].join(' ')}
    >
      {/* Grid layer */}
      <div className="absolute inset-0 grid-bg opacity-50" />

      {/* Ambient color zones */}
      <div className="absolute top-8 left-8 h-48 w-48 rounded-full bg-tesla-red/8 blur-3xl" />
      <div className="absolute bottom-8 right-4 h-48 w-48 rounded-full bg-sky-500/8 blur-3xl" />
      <div className="absolute top-32 right-20 h-32 w-32 rounded-full bg-emerald-500/6 blur-2xl" />

      <svg
        viewBox="0 0 360 480"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          <linearGradient id="routeGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#E82127" />
            <stop offset="100%" stopColor="#FF6B6F" />
          </linearGradient>
          <radialGradient id="pickupPulse" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.55)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>
          <radialGradient id="heroPulse" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(232,33,39,0.55)" />
            <stop offset="100%" stopColor="rgba(232,33,39,0)" />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="glowSoft">
            <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
            <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* ==== Street network — main avenues ==== */}
        <g fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth="12" strokeLinecap="round">
          {/* Horizontal avenues */}
          <path d="M-20 98 Q90 94 200 96 Q280 97 380 92" />
          <path d="M-20 198 Q100 202 200 198 Q290 195 380 200" />
          <path d="M-20 308 Q100 305 200 310 Q300 313 380 308" />
          <path d="M-20 420 L380 418" />
        </g>

        {/* Secondary streets */}
        <g fill="none" stroke="rgba(255,255,255,0.065)" strokeWidth="7" strokeLinecap="round">
          <path d="M-20 50 L380 48" />
          <path d="M-20 150 Q150 152 380 148" />
          <path d="M-20 250 L380 252" />
          <path d="M-20 360 Q200 358 380 362" />
          <path d="M-20 460 L380 458" />
        </g>

        {/* Vertical avenues */}
        <g fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth="12" strokeLinecap="round">
          <path d="M62 -20 Q64 100 60 200 Q58 300 62 500" />
          <path d="M200 -20 Q202 80 206 200 Q208 300 208 500" />
          <path d="M306 -20 L308 500" />
        </g>

        {/* Secondary verticals */}
        <g fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="5">
          <path d="M130 -20 Q132 100 130 300 L128 500" />
          <path d="M250 -20 L252 500" />
          <path d="M350 -20 L348 500" />
          <path d="M30 -20 L28 500" />
        </g>

        {/* Diagonal/organic streets */}
        <g fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="4">
          <path d="M-20 340 Q100 320 200 310" />
          <path d="M200 310 Q260 300 320 280" />
          <path d="M62 198 Q130 180 200 198" />
        </g>

        {/* City blocks */}
        <g fill="rgba(200,220,255,0.025)" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5">
          <rect x="72" y="108" width="118" height="82" rx="4" />
          <rect x="72" y="208" width="118" height="92" rx="4" />
          <rect x="72" y="318" width="118" height="82" rx="4" />
          <rect x="218" y="108" width="78" height="82" rx="4" />
          <rect x="218" y="208" width="78" height="92" rx="4" />
          <rect x="218" y="318" width="78" height="82" rx="4" />
          <rect x="318" y="108" width="42" height="82" rx="4" />
          <rect x="318" y="208" width="42" height="92" rx="4" />
        </g>

        {/* Dense small buildings */}
        <g fill="rgba(255,255,255,0.025)">
          <rect x="80" y="116" width="32" height="16" rx="2" />
          <rect x="120" y="116" width="20" height="16" rx="2" />
          <rect x="148" y="116" width="34" height="16" rx="2" />
          <rect x="80" y="140" width="45" height="24" rx="2" />
          <rect x="134" y="140" width="48" height="24" rx="2" />
          <rect x="80" y="218" width="34" height="20" rx="2" />
          <rect x="122" y="218" width="60" height="20" rx="2" />
          <rect x="226" y="116" width="30" height="22" rx="2" />
          <rect x="264" y="116" width="24" height="22" rx="2" />
        </g>

        {/* ==== District labels ==== */}
        {DISTRICTS.map((d) => (
          <g key={d.label}>
            <circle cx={d.x} cy={d.y} r="3" fill="rgba(255,255,255,0.2)" />
            <text
              x={d.x + 6}
              y={d.y + 4}
              fontSize="7.5"
              fill="rgba(255,255,255,0.4)"
              fontFamily="Inter, system-ui"
              fontWeight="500"
            >
              {d.label}
            </text>
          </g>
        ))}

        {/* ==== Supercharger pins ==== */}
        {SUPERCHARGERS.map((sc) => (
          <g key={sc.label} filter="url(#glowSoft)">
            <circle cx={sc.x} cy={sc.y} r="10" fill="rgba(16,185,129,0.12)" />
            <circle cx={sc.x} cy={sc.y} r="5" fill="rgba(16,185,129,0.9)" />
            <text
              x={sc.x + 7}
              y={sc.y + 4}
              fontSize="6"
              fill="rgba(16,185,129,0.8)"
              fontFamily="Inter, system-ui"
              fontWeight="600"
            >
              ⚡ {sc.stalls}
            </text>
          </g>
        ))}

        {/* ==== Route ==== */}
        {showRoute && (
          <>
            {/* Route glow */}
            <motion.path
              d="M70 390 C 80 300, 200 270, 200 230 C 200 170, 286 150, 290 100"
              stroke="rgba(232,33,39,0.15)"
              strokeWidth="14"
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.6, ease: 'easeOut' }}
            />
            {/* Route line */}
            <motion.path
              d="M70 390 C 80 300, 200 270, 200 230 C 200 170, 286 150, 290 100"
              stroke="url(#routeGrad)"
              strokeWidth="4.5"
              strokeLinecap="round"
              strokeDasharray="0"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: 'easeOut', delay: 0.1 }}
              style={{ filter: 'drop-shadow(0 0 8px rgba(232,33,39,0.7))' }}
            />

            {/* Pickup pin */}
            <g>
              <circle cx="70" cy="390" r="26" fill="url(#pickupPulse)" />
              <circle cx="70" cy="390" r="8" fill="rgba(255,255,255,0.95)" />
              <circle cx="70" cy="390" r="3.5" fill="#0A0A0B" />
              <text x="82" y="394" fontSize="7" fill="rgba(255,255,255,0.6)" fontFamily="Inter, system-ui">Origem</text>
            </g>
            {/* Dropoff pin */}
            <g filter="url(#glow)">
              <rect x="282" y="84" width="16" height="22" rx="4" fill="#E82127" />
              <circle cx="290" cy="94" r="4" fill="rgba(255,255,255,0.9)" />
              <text x="302" y="98" fontSize="7" fill="rgba(232,33,39,0.9)" fontFamily="Inter, system-ui">Tesla</text>
            </g>
          </>
        )}

        {/* ==== Ambient cars ==== */}
        {showCars && AMBIENT_CARS.map((c, i) => (
          <AmbientCar
            key={i}
            from={c.from}
            to={c.to}
            duration={c.dur}
            delay={c.delay}
            vertical={c.vertical}
          />
        ))}

        {/* ==== Hero car on route ==== */}
        {variant === 'ride' && showRoute && (
          <HeroCar progress={carProgress} />
        )}

        {/* ==== Home "you are here" ==== */}
        {variant === 'home' && (
          <g transform="translate(180 250)">
            <circle r="42" fill="url(#heroPulse)" className="animate-pulse-slow" />
            <circle r="18" fill="rgba(232,33,39,0.12)" />
            <circle r="10" fill="rgba(255,255,255,0.95)" />
            <circle r="4.5" fill="#E82127" />
            {/* Accuracy ring */}
            <circle r="28" fill="none" stroke="rgba(232,33,39,0.3)" strokeWidth="1" strokeDasharray="3 4" className="animate-spin-slow" />
          </g>
        )}
      </svg>

      {/* HUD scan line */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-tesla-red/60 to-transparent animate-scan pointer-events-none" />

      {/* Supercharger legend */}
      <div className="absolute top-3 right-3 flex items-center gap-1 glass rounded-xl px-2 py-1 pointer-events-none">
        <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
        <span className="text-[9px] text-emerald-300 font-medium">Supercharger</span>
      </div>
    </div>
  );
}

function AmbientCar({ from, to, duration, delay, vertical }: {
  from: [number, number]; to: [number, number]; duration: number; delay: number; vertical?: boolean;
}) {
  return (
    <motion.g
      initial={{ x: from[0], y: from[1], opacity: 0 }}
      animate={{ x: to[0], y: to[1], opacity: [0, 1, 1, 0] }}
      transition={{ duration, delay, ease: 'linear', repeat: Infinity }}
    >
      <rect
        x={vertical ? -3.5 : -6}
        y={vertical ? -6 : -3.5}
        width={vertical ? 7 : 12}
        height={vertical ? 12 : 7}
        rx="2"
        fill="rgba(255,255,255,0.82)"
        style={{ filter: 'drop-shadow(0 0 3px rgba(255,255,255,0.5))' }}
      />
      {/* headlights */}
      <rect
        x={vertical ? -1 : 5}
        y={vertical ? -7.5 : -1}
        width={vertical ? 2 : 2}
        height={vertical ? 1.5 : 2}
        fill="rgba(255,240,150,0.9)"
        rx="0.5"
      />
    </motion.g>
  );
}

function HeroCar({ progress }: { progress: number }) {
  const pathPoints = [
    { x: 70, y: 390 },
    { x: 80, y: 360 },
    { x: 100, y: 320 },
    { x: 140, y: 290 },
    { x: 180, y: 260 },
    { x: 200, y: 240 },
    { x: 206, y: 210 },
    { x: 210, y: 180 },
    { x: 230, y: 160 },
    { x: 258, y: 140 },
    { x: 278, y: 120 },
    { x: 290, y: 100 }
  ];
  const idx = Math.min(Math.floor(progress * (pathPoints.length - 1)), pathPoints.length - 2);
  const local = (progress * (pathPoints.length - 1)) - idx;
  const p = pathPoints[idx];
  const q = pathPoints[idx + 1] || p;
  const cx = p.x + (q.x - p.x) * local;
  const cy = p.y + (q.y - p.y) * local;

  return (
    <g>
      <circle cx={cx} cy={cy} r="18" fill="rgba(232,33,39,0.20)" />
      <circle cx={cx} cy={cy} r="10" fill="rgba(232,33,39,0.12)" />
      <rect x={cx - 9} y={cy - 4.5} width="18" height="9" rx="3" fill="rgba(255,255,255,0.95)" style={{ filter: 'drop-shadow(0 0 5px rgba(255,255,255,0.6))' }} />
      <rect x={cx + 7} y={cy - 2} width="2.5" height="1.5" fill="rgba(255,240,150,0.9)" rx="0.5" />
    </g>
  );
}
