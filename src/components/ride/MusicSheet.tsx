import { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Music, Radio } from 'lucide-react';
import Sheet from '../ui/Sheet';

const tracks = [
  { id: 't1', title: 'Midnight Driver', artist: 'Tesla Soundtrack', duration: '3:42', genre: 'Ambient' },
  { id: 't2', title: 'Electric Horizon', artist: 'Synthetic City', duration: '4:17', genre: 'Electronic' },
  { id: 't3', title: 'Neural Drive', artist: 'Dojo Sessions', duration: '2:58', genre: 'Lo-fi' },
  { id: 't4', title: 'Zero Emission', artist: 'Clean Beats', duration: '5:01', genre: 'Chill' },
  { id: 't5', title: 'Supercharger', artist: 'Elon\'s Pick', duration: '3:24', genre: 'Pop' }
];

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function MusicSheet({ open, onClose }: Props) {
  const [trackIdx, setTrackIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [vol, setVol] = useState(72);
  const [progress, setProgress] = useState(28);

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => setProgress((p) => (p >= 100 ? 0 : p + 0.4)), 400);
    return () => clearInterval(id);
  }, [playing]);

  const track = tracks[trackIdx];
  const bars = Array.from({ length: 32 }, (_, i) => ({
    h: playing ? 20 + Math.sin(i * 0.7 + Date.now() * 0.001) * 60 : 10 + i % 3 * 8,
    idx: i
  }));

  return (
    <Sheet open={open} onClose={onClose} title="Tesla Audio">
      {/* Visualizer */}
      <div className="h-16 flex items-end justify-center gap-[2px] mb-4">
        {bars.map((b, i) => (
          <EqBar key={i} playing={playing} idx={i} />
        ))}
      </div>

      {/* Track info */}
      <div className="text-center mb-4">
        <div className="h-16 w-16 mx-auto rounded-2xl bg-tesla-red/15 ring-tesla grid place-items-center mb-3">
          <Music className="h-7 w-7 text-tesla-red" />
        </div>
        <div className="text-[17px] font-semibold">{track.title}</div>
        <div className="text-[12px] text-white/55">{track.artist} • {track.genre}</div>
      </div>

      {/* Progress */}
      <div className="mb-4">
        <div className="h-1 bg-white/10 rounded-full overflow-hidden mb-1">
          <div
            className="h-full bg-tesla-red transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between text-[10px] text-white/40">
          <span>{fmtProgress(progress, track.duration)}</span>
          <span>{track.duration}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-6 mb-5">
        <button
          onClick={() => setTrackIdx((i) => (i - 1 + tracks.length) % tracks.length)}
          className="h-11 w-11 rounded-full bg-white/8 grid place-items-center hover:bg-white/15"
        >
          <SkipBack className="h-5 w-5" />
        </button>
        <button
          onClick={() => setPlaying((p) => !p)}
          className="h-16 w-16 rounded-full bg-tesla-red text-white grid place-items-center shadow-glow hover:bg-tesla-red-soft"
        >
          {playing ? <Pause className="h-7 w-7" /> : <Play className="h-7 w-7" />}
        </button>
        <button
          onClick={() => setTrackIdx((i) => (i + 1) % tracks.length)}
          className="h-11 w-11 rounded-full bg-white/8 grid place-items-center hover:bg-white/15"
        >
          <SkipForward className="h-5 w-5" />
        </button>
      </div>

      {/* Volume */}
      <div className="flex items-center gap-3">
        <Volume2 className="h-4 w-4 text-white/55" />
        <input
          type="range"
          min={0}
          max={100}
          value={vol}
          onChange={(e) => setVol(Number(e.target.value))}
          className="flex-1 accent-tesla-red"
        />
        <span className="text-[11px] text-white/55 w-6 text-right">{vol}</span>
      </div>

      {/* Track list */}
      <div className="mt-4 space-y-1">
        {tracks.map((t, i) => (
          <button
            key={t.id}
            onClick={() => { setTrackIdx(i); setProgress(0); }}
            className={[
              'w-full flex items-center gap-3 p-2.5 rounded-xl transition',
              i === trackIdx ? 'bg-tesla-red/15' : 'hover:bg-white/5'
            ].join(' ')}
          >
            <div className={['h-8 w-8 rounded-lg grid place-items-center text-[11px] font-bold',
              i === trackIdx ? 'bg-tesla-red text-white' : 'bg-white/8 text-white/60'
            ].join(' ')}>
              {i === trackIdx && playing ? <Radio className="h-3 w-3" /> : i + 1}
            </div>
            <div className="flex-1 text-left">
              <div className="text-[13px] font-medium">{t.title}</div>
              <div className="text-[10px] text-white/50">{t.artist}</div>
            </div>
            <span className="text-[11px] text-white/45">{t.duration}</span>
          </button>
        ))}
      </div>
    </Sheet>
  );
}

function EqBar({ playing, idx }: { playing: boolean; idx: number }) {
  const [h, setH] = useState(20);
  useEffect(() => {
    if (!playing) { setH(10 + idx % 4 * 5); return; }
    const update = () => setH(8 + Math.random() * 52);
    const id = setInterval(update, 180 + idx * 10);
    return () => clearInterval(id);
  }, [playing, idx]);
  return (
    <div
      className="w-1.5 rounded-t bg-tesla-red transition-all duration-150"
      style={{ height: h, opacity: 0.5 + (h / 60) * 0.5 }}
    />
  );
}

function fmtProgress(pct: number, dur: string) {
  const [m, s] = dur.split(':').map(Number);
  const total = m * 60 + s;
  const elapsed = Math.round((pct / 100) * total);
  const em = Math.floor(elapsed / 60);
  const es = elapsed % 60;
  return `${em}:${es.toString().padStart(2, '0')}`;
}
