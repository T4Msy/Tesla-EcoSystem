import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import TeslaLogo from '../components/ui/TeslaLogo';

export default function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-[100dvh] grid place-items-center px-6 text-center">
      <div>
        <TeslaLogo size={48} className="text-tesla-red mx-auto drop-shadow-[0_0_20px_rgba(232,33,39,0.4)]" />
        <div className="mt-6 text-5xl font-semibold tracking-tight">404</div>
        <div className="text-white/55 text-sm mt-2">Esta rota não está no mapa Tesla.</div>
        <Button block size="lg" className="mt-8" onClick={() => navigate('/home', { replace: true })}>
          Voltar ao início
        </Button>
      </div>
    </div>
  );
}
