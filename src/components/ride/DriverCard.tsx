import { Star, Phone, MessageCircle, Battery } from 'lucide-react';
import Avatar from '../ui/Avatar';
import type { Driver } from '../../mock/drivers';

interface Props {
  driver: Driver;
  eta?: number;
}

export default function DriverCard({ driver, eta }: Props) {
  return (
    <div className="flex items-center gap-3">
      <Avatar src={driver.avatar} name={driver.name} size={52} ring />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-[15px] truncate">{driver.name}</span>
          <span className="flex items-center gap-0.5 text-amber-300 text-xs">
            <Star className="h-3 w-3 fill-amber-300" />
            {driver.rating.toFixed(2)}
          </span>
        </div>
        <div className="text-[11px] text-white/55 truncate">
          {driver.carModel} • {driver.carColor}
        </div>
        <div className="mt-1 flex items-center gap-2">
          <span className="px-2 py-0.5 rounded-md bg-white text-tesla-black text-[10px] font-bold tracking-widest">
            {driver.plate}
          </span>
          <span className="flex items-center gap-1 text-[10px] text-emerald-300">
            <Battery className="h-3 w-3" /> {driver.battery}%
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {eta != null && (
          <div className="text-right mr-1">
            <div className="text-[10px] text-white/50 uppercase tracking-wider">chega em</div>
            <div className="text-lg font-semibold tabular-nums">{formatEta(eta)}</div>
          </div>
        )}
        <button className="h-10 w-10 rounded-full bg-white/8 border border-white/10 grid place-items-center hover:bg-white/12">
          <MessageCircle className="h-4 w-4" />
        </button>
        <button className="h-10 w-10 rounded-full bg-tesla-red text-white grid place-items-center shadow-glow">
          <Phone className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function formatEta(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}
