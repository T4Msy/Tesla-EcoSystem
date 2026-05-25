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
import MusicSheet from '../components/ride/MusicSheet';
import ClimateSheet from '../components/ride/ClimateSheet';
import ShareSheet from '../components/ride/ShareSheet';
import { toast } from '../stores/toastStore';

type Phase = 'searching' | 'matched' | 'arriving' | 'in_progress' | 'arrived';

export default function RideInProgressPage() {
  const navigate = useNavigate();
  const { driver, request, resetRide } = useRideStore();
  const [phase, setPhase] = useState<Phase>('searching');
  const [progress, setProgress] = useState(0);
  const [eta, setEta] = useState(180);

  const [openSos, setOpenSos] = useState(false);
  const [openCancel, setOpenCancel] = useState(false);
  const [openMusic, setOpenMusic] = useState(false);
  const [openClimate, setOpenClimate] = useState(false);
  const [openShare, setOpenShare] = useState(false);

  // Phase machine
  useEffect(() => {
    const t1 = setTimeout(() => {
      setPhase('matched');
      toast('Tesla encontrado!', `${driver?.name} • ${driver?.carModel}`, 'tesla');
    }, 1800);
    const t2 = setTimeout(() => {
      setPhase('arriving');
      toast('Motorista a caminho', `Placa ${driver?.plate}`, 'success');
    }, 3600);
    const t3 = setTimeout(() => {
      setPhase('in_progress');
      toast('Viagem iniciada', 'Aproveite sua viagem Tesla!', 'tesla');
    }, 9000);
    const t4 = setTimeout(() => setPhase('arrived'), 22000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
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
      toast('Chegou ao destino!', 'Avalie sua viagem', 'success', 4000);
      const id = setTimeout(() => navigate('/ride/summary'), 2600);
      return () => clearTimeout(id);
    }
  }, [phase, navigate]);

  const fare = request.category
    ? request.estimatedKm * request.category.pricePerKm + request.category.base
    : request.fare;

  return (
    <div className="relative min-h-[100dvh] bg-tesla-black">
      {/* MAP */}
      <div className="relative h-[58dvh]">
        <MapSimulation
          variant={phase === 'searching' ? 'home' : 'ride'}
          showRoute={phase !== 'searching'}
          carProgress={progress}
          className="absolute inset-0"
        />
        <StatusBar />

        {/* Top HUD */}
        <div className="absolute top-[max(52px,env(safe-area-inset-top))] left-3 right-3 flex items-center gap-2">
          <div className="glass-strong rounded-2xl px-3 py-2 flex items-center gap-2 flex-1">
            <span className={['h-2 w-2 rounded-full',
              phase === 'arrived' ? 'bg-emerald-400' : 'bg-tesla-red animate-pulse'
            ].join(' ')} />
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

        {/* Side action buttons — all functional */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col gap-2">
          <SideBtn
            icon={<Shield className="h-4 w-4" />}
            onClick={() => setOpenSos(true)}
            accent
            tooltip="SOS"
          />
          <SideBtn
            icon={<Share2 className="h-4 w-4" />}
            onClick={() => setOpenShare(true)}
            tooltip="Compartilhar"
          />
          <SideBtn
            icon={<Music className="h-4 w-4" />}
            onClick={() => setOpenMusic(true)}
            tooltip="Música"
          />
          <SideBtn
            icon={<Snowflake className="h-4 w-4" />}
            onClick={() => setOpenClimate(true)}
            tooltip="Clima"
          />
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
                <MatchingDots />
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
              className="py-4 space-y-3"
            >
              <div className="text-center text-sm text-white/60">Analisando 12 Teslas próximos…</div>
              <div className="h-2 bg-white/8 rounded-full overflow-hidden">
                <motion.div
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }}
                  className="h-full w-1/2 bg-gradient-to-r from-transparent via-tesla-red to-transparent"
                />
              </div>
              <div className="flex items-center gap-2 text-[11px] text-white/45">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Verificando bateria • Distância • Avaliação
              </div>
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
                <Pill tone={phase === 'arrived' ? 'green' : phase === 'in_progress' ? 'red' : 'default'}>
                  {phaseTag(phase)}
                </Pill>
                <span className="text-[11px] text-white/55">
                  ID #TR-{Math.floor(Date.now() / 1000).toString().slice(-4)}
                </span>
              </div>

              <DriverCard driver={driver} eta={eta} />

              {/* Trip details */}
              <div className="mt-4 glass rounded-2xl p-3 space-y-2">
                <TripRow accent="emerald" label="Origem" value={request.pickup} />
                <TripRow accent="red" label="Destino" value={request.dropoff} bold />
                <hr className="border-white/10" />
                <div className="grid grid-cols-3 gap-2 text-[11px]">
                  <InfoCell label="Distância" value={`${request.estimatedKm.toFixed(1)} km`} />
                  <InfoCell label="Tempo est." value={`${request.estimatedMinutes} min`} />
                  <InfoCell label="Tarifa" value={`R$ ${fare.toFixed(2).replace('.', ',')}`} accent />
                </div>
              </div>

              {/* Live progress bar */}
              {(phase === 'in_progress' || phase === 'arriving') && (
                <div className="mt-3">
                  <div className="flex items-center justify-between text-[10px] text-white/55 mb-1.5 uppercase tracking-widest">
                    <span>{phase === 'arriving' ? 'Indo até você' : 'Em viagem'}</span>
                    <span className="tabular-nums">{Math.round(progress * 100)}%</span>
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

              {phase === 'arrived' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-3 p-3 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-center"
                >
                  <div className="text-[15px] font-semibold">Chegou ao destino! 🎉</div>
                  <div className="text-[11px] text-white/65 mt-0.5">Redirecionando para o resumo…</div>
                </motion.div>
              )}

              <div className="mt-4 grid grid-cols-2 gap-2">
                <Button
                  variant="ghost"
                  onClick={() => setOpenCancel(true)}
                  icon={<X className="h-4 w-4" />}
                  disabled={phase === 'arrived'}
                >
                  Cancelar
                </Button>
                <Button
                  variant="glass"
                  onClick={() => navigate('/ride/summary')}
                  icon={<ChevronUp className="h-4 w-4" />}
                >
                  Resumo
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* === Sheets === */}
      <Sheet open={openSos} onClose={() => setOpenSos(false)} title="Segurança Tesla">
        <p className="text-sm text-white/65 mb-4">
          A Tesla está monitorando esta viagem com câmeras 360° e GPS em tempo real. Acione o protocolo se precisar.
        </p>
        <div className="space-y-2">
          <Button
            variant="danger"
            block
            size="lg"
            onClick={() => {
              setOpenSos(false);
              toast('SOS ativado', 'Equipe Tesla em contato em 60s', 'error', 6000);
            }}
          >
            Acionar SOS (190)
          </Button>
          <Button
            variant="glass"
            block
            size="lg"
            onClick={() => {
              setOpenShare(true);
              setOpenSos(false);
            }}
          >
            Compartilhar localização
          </Button>
          <Button variant="ghost" block size="lg" onClick={() => setOpenSos(false)}>Cancelar</Button>
        </div>
      </Sheet>

      <Sheet open={openCancel} onClose={() => setOpenCancel(false)} title="Cancelar viagem?">
        <p className="text-sm text-white/65 mb-4">
          O cancelamento após o motorista ser designado gera uma taxa de R$ 6,00.
        </p>
        <div className="space-y-2">
          <Button
            variant="danger"
            block
            size="lg"
            onClick={() => {
              resetRide();
              toast('Viagem cancelada', 'Taxa de R$ 6,00 cobrada', 'warning');
              navigate('/home', { replace: true });
            }}
          >
            Confirmar cancelamento
          </Button>
          <Button variant="ghost" block size="lg" onClick={() => setOpenCancel(false)}>Voltar</Button>
        </div>
      </Sheet>

      <MusicSheet open={openMusic} onClose={() => setOpenMusic(false)} />
      <ClimateSheet open={openClimate} onClose={() => setOpenClimate(false)} />
      <ShareSheet
        open={openShare}
        onClose={() => setOpenShare(false)}
        pickup={request.pickup}
        dropoff={request.dropoff}
      />
    </div>
  );
}

/* ─── helpers ─── */

function SideBtn({
  icon, onClick, accent, tooltip
}: { icon: React.ReactNode; onClick?: () => void; accent?: boolean; tooltip?: string }) {
  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      title={tooltip}
      onClick={onClick}
      className={[
        'h-10 w-10 rounded-full grid place-items-center transition',
        accent ? 'bg-tesla-red text-white shadow-glow' : 'glass-strong hover:bg-white/15'
      ].join(' ')}
    >
      {icon}
    </motion.button>
  );
}

function TripRow({ accent, label, value, bold }: { accent: 'emerald' | 'red'; label: string; value: string; bold?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <span className={['h-2 w-2 rounded-full shrink-0',
        accent === 'emerald' ? 'bg-emerald-400' : 'bg-tesla-red'
      ].join(' ')} />
      <div className="text-[10px] text-white/45 uppercase tracking-widest w-14 shrink-0">{label}</div>
      <div className={['flex-1 text-[13px] truncate', bold ? 'font-semibold' : ''].join(' ')}>{value}</div>
    </div>
  );
}

function InfoCell({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="text-center">
      <div className="text-[10px] text-white/45 uppercase tracking-widest">{label}</div>
      <div className={['text-[13px] font-semibold tabular-nums', accent ? 'text-tesla-red' : ''].join(' ')}>{value}</div>
    </div>
  );
}

function MatchingDots() {
  return (
    <div className="flex items-center justify-center gap-1 mt-1">
      {['Bateria OK', 'Rota livre', 'Motorista verificado'].map((t, i) => (
        <motion.span
          key={t}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.4 + 0.5 }}
          className="text-[10px] text-white/50 flex items-center gap-1"
        >
          <span className="h-1 w-1 rounded-full bg-emerald-400" />
          {t}
        </motion.span>
      ))}
    </div>
  );
}

function phaseTitle(p: Phase) {
  switch (p) {
    case 'searching': return 'Procurando Tesla';
    case 'matched': return 'Tesla encontrado';
    case 'arriving': return 'Tesla a caminho';
    case 'in_progress': return 'Em viagem';
    case 'arrived': return 'Chegou!';
  }
}
function phaseTag(p: Phase) {
  switch (p) {
    case 'matched': return 'Tesla encontrado';
    case 'arriving': return 'A caminho';
    case 'in_progress': return 'Em andamento';
    case 'arrived': return 'Concluída';
    default: return 'Buscando';
  }
}
function fmt(s: number) {
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${m}:${r.toString().padStart(2, '0')}`;
}
