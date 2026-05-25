import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Props {
  variant?: 'home' | 'request' | 'ride';
  showRoute?: boolean;
  showCars?: boolean;
  carProgress?: number; // 0..1 progress on the route
  className?: string;
}

/**
 * Simulated futuristic map. Uses procedural SVG streets, glowing
 * markers and animated cars to feel like a real Tesla nav HUD.
 */
export default function MapSimulation({
  variant = 'home',
  showRoute = false,
  showCars = true,
  carProgress = 0,
  className = ''
}: Props) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1600);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className={[
        'relative overflow-hidden bg-gradient-to-b from-[#0c1014] via-[#0a0d11] to-[#08090b]',
        className
      ].join(' ')}
    >
      {/* Grid layer */}
      <div className="absolute inset-0 grid-bg opacity-60" />

      {/* Soft glow blobs */}
      <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-tesla-red/10 blur-3xl" />
      <div className="absolute -bottom-20 right-0 h-72 w-72 rounded-full bg-sky-500/10 blur-3xl" />

      <svg
        viewBox="0 0 360 480"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          <linearGradient id="route" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#E82127" />
            <stop offset="100%" stopColor="#FF6B6F" />
          </linearGradient>
          <linearGradient id="street" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(255,255,255,0.06)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.18)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.06)" />
          </linearGradient>
          <radialGradient id="pulse" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(232,33,39,0.5)" />
            <stop offset="100%" stopColor="rgba(232,33,39,0)" />
          </radialGradient>
        </defs>

        {/* Street network */}
        <g stroke="url(#street)" strokeWidth="14" strokeLinecap="round" fill="none" opacity="0.85">
          <path d="M-20 110 L380 90" />
          <path d="M-20 220 L380 250" />
          <path d="M-20 350 L380 330" />
          <path d="M80 -20 L60 500" />
          <path d="M210 -20 L240 500" />
          <path d="M310 -20 L300 500" />
        </g>

        {/* Thinner street accents */}
        <g stroke="rgba(255,255,255,0.05)" strokeWidth="1" fill="none">
          <path d="M-20 60 L380 50" />
          <path d="M-20 170 L380 180" />
          <path d="M-20 290 L380 280" />
          <path d="M-20 420 L380 430" />
          <path d="M140 -20 L150 500" />
          <path d="M260 -20 L270 500" />
        </g>

        {/* Buildings (subtle blocks) */}
        <g fill="rgba(255,255,255,0.04)">
          <rect x="100" y="120" width="90" height="80" rx="6" />
          <rect x="260" y="120" width="40" height="80" rx="6" />
          <rect x="100" y="260" width="90" height="60" rx="6" />
          <rect x="260" y="260" width="40" height="60" rx="6" />
          <rect x="20" y="380" width="60" height="40" rx="6" />
          <rect x="260" y="380" width="40" height="40" rx="6" />
        </g>

        {/* Route */}
        {showRoute && (
          <>
            <motion.path
              d="M70 380 C 80 280, 200 260, 200 220 C 200 160, 290 140, 290 90"
              stroke="url(#route)"
              strokeWidth="5"
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.4, ease: 'easeOut' }}
              style={{ filter: 'drop-shadow(0 0 6px rgba(232,33,39,0.65))' }}
            />
            {/* Pickup pin */}
            <g>
              <circle cx="70" cy="380" r="22" fill="url(#pulse)" />
              <circle cx="70" cy="380" r="7" fill="#ffffff" />
              <circle cx="70" cy="380" r="3.2" fill="#0A0A0B" />
            </g>
            {/* Dropoff pin */}
            <g>
              <rect x="282" y="74" width="16" height="20" rx="3" fill="#E82127" />
              <circle cx="290" cy="83" r="3" fill="#fff" />
            </g>
          </>
        )}

        {/* Ambient cars */}
        {showCars && (
          <g>
            <AmbientCar key={`a-${tick % 4}`} from={[-30, 90]} to={[380, 88]} duration={6} delay={0} />
            <AmbientCar key={`b-${tick % 5}`} from={[380, 252]} to={[-30, 250]} duration={5} delay={0.6} />
            <AmbientCar key={`c-${tick % 6}`} from={[60, -20]} to={[62, 500]} duration={7} delay={1.4} vertical />
            <AmbientCar key={`d-${tick % 7}`} from={[300, 500]} to={[306, -20]} duration={8} delay={0.2} vertical />
          </g>
        )}

        {/* Hero car following route */}
        {variant === 'ride' && (
          <motion.g
            initial={false}
            animate={{ offsetDistance: `${Math.min(100, carProgress * 100)}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            style={{
              offsetPath:
                "path('M70 380 C 80 280, 200 260, 200 220 C 200 160, 290 140, 290 90')",
              offsetRotate: 'auto'
            } as React.CSSProperties}
          >
            <circle r="14" fill="rgba(232,33,39,0.25)" />
            <rect x="-10" y="-5" width="20" height="10" rx="3" fill="#ffffff" />
            <rect x="-4" y="-2" width="3" height="4" fill="#E82127" />
          </motion.g>
        )}

        {/* Center "you are here" */}
        {variant === 'home' && (
          <g transform="translate(180 240)">
            <circle r="36" fill="url(#pulse)">
              <animate attributeName="r" values="20;46;20" dur="2.8s" repeatCount="indefinite" />
            </circle>
            <circle r="10" fill="#ffffff" />
            <circle r="4" fill="#E82127" />
          </g>
        )}
      </svg>

      {/* HUD scan line */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-tesla-red/70 to-transparent animate-scan" />
    </div>
  );
}

interface AmbientCarProps {
  from: [number, number];
  to: [number, number];
  duration: number;
  delay: number;
  vertical?: boolean;
}

function AmbientCar({ from, to, duration, delay, vertical }: AmbientCarProps) {
  return (
    <motion.g
      initial={{ x: from[0], y: from[1], opacity: 0 }}
      animate={{ x: to[0], y: to[1], opacity: [0, 1, 1, 0] }}
      transition={{ duration, delay, ease: 'linear', repeat: Infinity }}
    >
      <rect
        x={vertical ? -4 : -7}
        y={vertical ? -7 : -4}
        width={vertical ? 8 : 14}
        height={vertical ? 14 : 8}
        rx="2"
        fill="rgba(255,255,255,0.85)"
      />
    </motion.g>
  );
}
