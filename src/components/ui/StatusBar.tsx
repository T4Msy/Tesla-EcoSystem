import { useEffect, useState } from 'react';
import { Signal, Wifi, BatteryFull } from 'lucide-react';

export default function StatusBar() {
  const [time, setTime] = useState(() => formatTime(new Date()));
  useEffect(() => {
    const id = setInterval(() => setTime(formatTime(new Date())), 30_000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="pt-safe px-6 flex items-center justify-between text-[13px] font-semibold text-white/90 no-select select-none">
      <span className="tracking-tight">{time}</span>
      <div className="flex items-center gap-1.5">
        <Signal className="h-3.5 w-3.5" />
        <Wifi className="h-3.5 w-3.5" />
        <BatteryFull className="h-4 w-4" />
      </div>
    </div>
  );
}

function formatTime(d: Date) {
  return d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}
