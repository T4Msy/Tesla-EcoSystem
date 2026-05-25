import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Shield, Share2, ChevronUp, Music, Snowflake, X, Sparkles } from 'lucide-react';
import StatusBar from '../components/ui/StatusBar';
import MapSimulation from '../components/map/MapSimulation';
import DriverCard from '../components/ride/DriverCard';
import Pill from '../components/ui/Pill';
import { useRideStore } from '../stores/rideStore';
import Sheet from '../components/ui/Sheet';
import Button from '../components/ui/Button';

type Phase = 'searching' | 'matched' | 'arriving' | 'in_progress' | 'arrived';

export default function RideInProgressPage() {
  const navigate = useNavigate();
  const { driver, request, resetRide } = useRideStore();
  const [phase, setPhase] = useState<Phase>('searching');
  const [progress, setProgress] = useState(0);
  const [eta, setEta] = useState(180);
  const [openSos, setOpenSos] = useState(false);
  const [openCancel, setOpenCancel] = useState(false);

  // Phase machine
  useEffect(() => {
    const t1 = setTimeout(() => setPhase('matched'), 1800);
    const t2 = setTimeout(() => setPhase('arriving'), 3600);
    const t3 = setTimeout(() => setPhase('in_progress'), 9000);
    const t4 = setTimeout(() => setPhase('arrived'), 22000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  // Progress / eta ticker
  useEffect(() => {
    if (phase === 'in_progress' || phase === 'arriving') {
      const id = setInterval(() => {
        setProgress((p) => Math.min(1, p + 0.012));
        setEta((s) => Math.max(0, s - 2));
      }, 350);
      return () => clearInterval(id);
    }
  }, [phase]);

  // Auto-navigate to summary
  useEffect(() => {
    if (phase === 'arrived') {
      const id = setTimeout(() => navigate('/ride/summary'), 2400);
      return () => clearTimeout(id);
    }
  }, [phase, navigate]);

  return (
    <div className="relative min-h-[100dvh] bg-tesla-black">
      <div className="relative h-[58dvh]">
        <MapSimulation
          variant={phase === 'searching' ? 'home' : 'ride'}
          showRoute={phase !== 'searching'}
          carProgress={progress}
          className="absolute inset-0"
        />
        <StatusBar />

        {/* Top HUD */}
        <div className="absolute top-[max(56px,env(safe-area-inset-top))] left-3 right-3 flex items-center gap-2">
          <div className="glass-strong rounded-2xl px-3 py-2 flex items-center gap-2 flex-1">
            <span className="h-2 w-2 rounded-full bg-tesla-red animate-pulse" />
            <div className="leading-tight">
              <div className="text-[10px] uppercase tracking-widest text-white/55">Status</div>
              <div className="text-[13px] font-semibold">{phaseTitle(phase)}</div>
            </div>
            <div className="ml-auto text-right leading-tight">
              <div className="text-[10px] uppercase tracking-widest text-white/55">ETA</div>
              <div className="text-[13px] font-semibold tabular-nums">{fmt(eta)}</div>
            </div>
          </div>
        </div>

        {/* Side actions */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col gap-2">
          <SideBtn icon={<Shield className="h-4 w-4" />} onClick={() => setOpenSos(true)} accent />
          <SideBtn icon={<Share2 className="h-4 w-4" />} />
          <SideBtn icon={<Music className="h-4 w-4" />} />
          <SideBtn icon={<Snowflake className="h-4 w-4" />} />
        </div>

        {/* Searching overlay */}
        <AnimatePresence>
          {phase === 'searching' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 grid place-items-center"
            >
              <div className="relative">
                <span className="radar absolute inset-0 rounded-full" />
                <div className="h-24 w-24 rounded-full glass-strong grid place-items-center shadow-glow ring-tesla">
                  <Sparkles className="h-8 w-8 text-tesla-red animate-pulse" />
                </div>
              </div>
              <div className="absolute bottom-10 inset-x-0 text-center">
                <div className="text-sm font-semibold">Procurando o Tesla ideal…</div>
                <div className="text-[11px] text-white/55 mt-1">Analisando 12 veículos próximos</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom panel */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        className="relative -mt-8 glass-strong rounded-t-[32px] px-5 pt-3 pb-safe pb-6"
      >
        <div className="flex justify-center mb-2">
          <div className="h-1.5 w-12 rounded-full bg-white/20" />
        </div>

        <AnimatePresence mode="wait">
          {phase === 'searching' && (
            <motion.div
              key="searching"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="py-4"
            >
              <div className="h-3 w-1/2 rounded-full bg-white/8 mb-3 shimmer animate-shimmer" />
              <div className="h-3 w-2/3 rounded-full bg-white/8 mb-3 shimmer animate-shimmer" />
              <div className="h-3 w-1/3 rounded-full bg-white/8 shimmer animate-shimmer" />
            </motion.div>
          )}

          {driver && phase !== 'searching' && (
            <motion.div
              key="matched"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45 }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Pill tone={phase === 'in_progress' ? 'red' : 'green'}>
                  {phaseTag(phase)}
                </Pill>
                <span className="text-[11px] text-white/55">
                  Trip ID • #TR-{Math.floor(Math.random() * 9000 + 1000)}
                </span>
              </div>

              <DriverCard driver={driver} eta={eta} />

              {/* Trip details */}
              <div className="mt-4 glass rounded-2xl p-3 space-y-2.5">
                <Row label="Origem" value={request.pickup} accent="emerald" />
                <Row label="Destino" value={request.dropoff} accent="red" bold />
                <hr className="border-white/10" />
                <div className="flex items-center justify-between text-[12px]">
                  <span className="text-white/55">Distância</span>
                  <span className="font-semibold tabular-nums">
                    {request.estimatedKm.toFixed(1)} km
                  </span>
                </div>
                <div className="flex items-center justify-between text-[12px]">
                  <span className="text-white/55">Tempo estimado</span>
                  <span className="font-semibold tabular-nums">{request.estimatedMinutes} min</span>
                </div>
                <div className="flex items-center justify-between text-[12px]">
                  <span className="text-white/55">Tarifa</span>
                  <span className="font-semibold text-tesla-red tabular-nums">
                    R$ {(request.category?.base != null
                      ? request.estimatedKm * request.category.pricePerKm + request.category.base
                      : request.fare
                    ).toFixed(2).replace('.', ',')}
                  </span>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2">
                <Button
                  variant="ghost"
                  onClick={() => setOpenCancel(true)}
                  icon={<X className="h-4 w-4" />}
                >
                  Cancelar
                </Button>
                <Button
                  variant="glass"
                  onClick={() => navigate('/ride/summary')}
                  icon={<ChevronUp className="h-4 w-4" />}
                >
                  Detalhes
                </Button>
              </div>

              {/* Live progress bar */}
              {(phase === 'in_progress' || phase === 'arriving') && (
                <div className="mt-4">
                  <div className="flex items-center justify-between text-[10px] text-white/55 mb-1.5 uppercase tracking-widest">
                    <span>{phase === 'arriving' ? 'Indo até você' : 'Em viagem'}</span>
                    <span>{Math.round(progress * 100)}%</span>
                  </div>
                  <div className="h-1.5 bg-white/8 rounded-full overflow-hidden">
                    <motion.div
                      animate={{ width: `${progress * 100}%` }}
                      transition={{ ease: 'linear', duration: 0.4 }}
                      className="h-full bg-gradient-to-r from-tesla-red to-tesla-red-soft shadow-glow"
                    />
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* SOS Sheet */}
      <Sheet open={openSos} onClose={() => setOpenSos(false)} title="Segurança Tesla">
        <p className="text-sm text-white/65">
          A Tesla está monitorando esta viagem. Ative o protocolo de segurança caso algo esteja errado.
        </p>
        <div className="mt-4 space-y-2">
          <Button variant="danger" block size="lg">Ligar para emergência (190)</Button>
          <Button variant="glass" block size="lg">Compartilhar viagem em tempo real</Button>
          <Button variant="ghost" block size="lg" onClick={() => setOpenSos(false)}>Cancelar</Button>
        </div>
      </Sheet>

      {/* Cancel Sheet */}
      <Sheet open={openCancel} onClose={() => setOpenCancel(false)} title="Cancelar viagem?">
        <p className="text-sm text-white/65">
          O cancelamento após o motorista ser designado pode gerar uma taxa de R$ 6,00.
        </p>
        <div className="mt-4 space-y-2">
          <Button
            variant="danger"
            block
            size="lg"
            onClick={() => {
              resetRide();
              navigate('/home', { replace: true });
            }}
          >
            Sim, cancelar
          </Button>
          <Button variant="ghost" block size="lg" onClick={() => setOpenCancel(false)}>
            Voltar
          </Button>
        </div>
      </Sheet>
    </div>
  );
}

function SideBtn({ icon, onClick, accent }: { icon: React.ReactNode; onClick?: () => void; accent?: boolean }) {
  return (
    <button
      onClick={onClick}
      className={[
        'h-10 w-10 rounded-full grid place-items-center transition',
        accent ? 'bg-tesla-red text-white shadow-glow' : 'glass-strong hover:bg-white/12'
      ].join(' ')}
    >
      {icon}
    </button>
  );
}

function Row({ label, value, accent, bold }: { label: string; value: string; accent: 'emerald' | 'red'; bold?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <span
        className={[
          'h-2 w-2 rounded-full',
          accent === 'emerald' ? 'bg-emerald-400' : 'bg-tesla-red'
        ].join(' ')}
      />
      <div className="text-[10px] text-white/45 uppercase tracking-widest w-14">{label}</div>
      <div className={['flex-1 text-[13px] truncate', bold ? 'font-semibold' : ''].join(' ')}>{value}</div>
    </div>
  );
}

function phaseTitle(p: Phase) {
  switch (p) {
    case 'searching': return 'Procurando Tesla';
    case 'matched': return 'Tesla encontrado';
    case 'arriving': return 'Tesla a caminho';
    case 'in_progress': return 'Em viagem';
    case 'arrived': return 'Chegou ao destino';
  }
}
function phaseTag(p: Phase) {
  switch (p) {
    case 'matched': return 'Tesla encontrado';
    case 'arriving': return 'A caminho';
    case 'in_progress': return 'Viagem em andamento';
    case 'arrived': return 'Concluída';
    case 'searching': return 'Procurando';
  }
}
function fmt(s: number) {
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${m}:${r.toString().padStart(2, '0')}`;
}
