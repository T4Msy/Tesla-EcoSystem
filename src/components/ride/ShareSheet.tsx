import { QrCode, Copy, MessageCircle, MapPin, Check } from 'lucide-react';
import { useState } from 'react';
import Sheet from '../ui/Sheet';

interface Props {
  open: boolean;
  onClose: () => void;
  pickup: string;
  dropoff: string;
}

export default function ShareSheet({ open, onClose, pickup, dropoff }: Props) {
  const [copied, setCopied] = useState(false);
  const link = `https://urbanride.tesla.com/track/TR-${Math.floor(Date.now() / 60000)}`;

  const copy = () => {
    navigator.clipboard?.writeText(link).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  return (
    <Sheet open={open} onClose={onClose} title="Compartilhar viagem">
      <p className="text-[13px] text-white/65 mb-4">
        Compartilhe o rastreamento em tempo real da sua viagem com alguém de confiança.
      </p>

      {/* QR fake */}
      <div className="flex justify-center mb-5">
        <div className="h-40 w-40 rounded-3xl bg-white p-3 grid place-items-center">
          <FakeQR />
        </div>
      </div>

      {/* Link */}
      <div className="glass rounded-2xl p-3 flex items-center gap-2 mb-4">
        <MapPin className="h-4 w-4 text-tesla-red shrink-0" />
        <span className="flex-1 text-[11px] text-white/70 font-mono truncate">{link}</span>
        <button
          onClick={copy}
          className={[
            'h-8 px-3 rounded-xl text-[11px] font-semibold flex items-center gap-1 transition',
            copied ? 'bg-emerald-500/20 text-emerald-300' : 'bg-white/8 hover:bg-white/15'
          ].join(' ')}
        >
          {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
          {copied ? 'Copiado!' : 'Copiar'}
        </button>
      </div>

      {/* Route summary */}
      <div className="glass rounded-2xl p-3 mb-4 text-[12px]">
        <div className="flex items-center gap-2 mb-1.5">
          <div className="h-2 w-2 rounded-full bg-emerald-400" />
          <span className="truncate">{pickup}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="h-3 w-3 text-tesla-red" />
          <span className="truncate font-semibold">{dropoff}</span>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={copy}
          className="flex-1 h-12 rounded-2xl glass flex items-center justify-center gap-2 text-[13px] font-semibold hover:bg-white/10"
        >
          <Copy className="h-4 w-4" /> Link
        </button>
        <button className="flex-1 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center gap-2 text-[13px] font-semibold text-emerald-300 hover:bg-emerald-500/25">
          <MessageCircle className="h-4 w-4" /> WhatsApp
        </button>
      </div>
    </Sheet>
  );
}

function FakeQR() {
  const cells: boolean[][] = Array.from({ length: 21 }, (_, r) =>
    Array.from({ length: 21 }, (_, c) => {
      if ((r < 7 && c < 7) || (r < 7 && c > 13) || (r > 13 && c < 7)) return true;
      return Math.random() > 0.55;
    })
  );
  return (
    <div className="grid" style={{ gridTemplateColumns: 'repeat(21, 1fr)', gap: 1, width: 120, height: 120 }}>
      {cells.flat().map((v, i) => (
        <div key={i} style={{ background: v ? '#000' : '#fff', borderRadius: 1 }} />
      ))}
    </div>
  );
}
