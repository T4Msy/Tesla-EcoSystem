import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import TeslaLogo from './TeslaLogo';

interface Props {
  title?: string;
  subtitle?: string;
  back?: boolean;
  right?: React.ReactNode;
  transparent?: boolean;
}

export default function TopBar({ title, subtitle, back, right, transparent }: Props) {
  const navigate = useNavigate();
  return (
    <div
      className={[
        'sticky top-0 z-30 pt-safe',
        transparent ? '' : 'glass-strong border-b border-white/5'
      ].join(' ')}
    >
      <div className="h-14 px-3 flex items-center justify-between">
        <div className="w-10 flex items-center justify-start">
          {back ? (
            <button
              onClick={() => navigate(-1)}
              className="h-10 w-10 rounded-full grid place-items-center hover:bg-white/5 active:bg-white/10 transition"
              aria-label="Voltar"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          ) : (
            <TeslaLogo size={22} className="text-white ml-2" />
          )}
        </div>
        <div className="text-center flex-1">
          {title && <div className="text-[15px] font-semibold tracking-tight">{title}</div>}
          {subtitle && <div className="text-[11px] text-white/50 -mt-0.5">{subtitle}</div>}
        </div>
        <div className="w-10 flex items-center justify-end">{right}</div>
      </div>
    </div>
  );
}
