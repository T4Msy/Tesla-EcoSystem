import type { RideCategory } from '../../mock/categories';

interface Props {
  type: RideCategory['silhouette'];
  className?: string;
}

export default function CarSilhouette({ type, className = '' }: Props) {
  const common = 'fill-white';
  switch (type) {
    case 'modelS':
      return (
        <svg viewBox="0 0 220 80" className={className} aria-hidden="true">
          <path
            className={common}
            d="M14 56 C24 38 50 22 78 18 C108 14 140 14 168 22 C188 28 200 38 208 52 L208 60 L196 62 C194 70 186 74 178 74 C170 74 162 70 160 62 L70 62 C68 70 60 74 52 74 C44 74 36 70 34 62 L14 60 Z"
            opacity="0.96"
          />
          <circle cx="52" cy="64" r="9" className="fill-tesla-black" />
          <circle cx="52" cy="64" r="4" className="fill-white/60" />
          <circle cx="178" cy="64" r="9" className="fill-tesla-black" />
          <circle cx="178" cy="64" r="4" className="fill-white/60" />
          <path d="M84 24 L150 24 L160 40 L72 40 Z" className="fill-tesla-red/30" />
        </svg>
      );
    case 'modelY':
      return (
        <svg viewBox="0 0 220 84" className={className} aria-hidden="true">
          <path
            className={common}
            d="M12 58 C18 32 48 16 80 12 C112 8 144 10 172 20 C194 28 206 42 210 56 L210 64 L196 66 C194 74 186 78 178 78 C170 78 162 74 160 66 L70 66 C68 74 60 78 52 78 C44 78 36 74 34 66 L12 64 Z"
            opacity="0.95"
          />
          <circle cx="52" cy="68" r="9" className="fill-tesla-black" />
          <circle cx="52" cy="68" r="4" className="fill-white/60" />
          <circle cx="178" cy="68" r="9" className="fill-tesla-black" />
          <circle cx="178" cy="68" r="4" className="fill-white/60" />
        </svg>
      );
    case 'cybertruck':
      return (
        <svg viewBox="0 0 240 84" className={className} aria-hidden="true">
          <path
            className={common}
            d="M10 62 L40 30 L210 30 L230 62 L228 70 L208 70 C204 78 196 80 188 80 C180 80 172 78 168 70 L72 70 C68 78 60 80 52 80 C44 80 36 78 32 70 L12 70 Z"
            opacity="0.96"
          />
          <circle cx="52" cy="70" r="9" className="fill-tesla-black" />
          <circle cx="188" cy="70" r="9" className="fill-tesla-black" />
        </svg>
      );
    case 'roadster':
      return (
        <svg viewBox="0 0 220 64" className={className} aria-hidden="true">
          <path
            className={common}
            d="M12 46 C28 22 60 10 100 8 C140 6 178 18 204 38 L208 50 L196 52 C194 60 186 62 178 62 C170 62 162 60 160 52 L70 52 C68 60 60 62 52 62 C44 62 36 60 34 52 L12 50 Z"
            opacity="0.96"
          />
          <circle cx="52" cy="54" r="7" className="fill-tesla-black" />
          <circle cx="178" cy="54" r="7" className="fill-tesla-black" />
        </svg>
      );
    case 'model3':
    default:
      return (
        <svg viewBox="0 0 220 76" className={className} aria-hidden="true">
          <path
            className={common}
            d="M14 54 C26 32 56 18 88 14 C118 10 150 14 176 24 C194 30 204 40 208 52 L208 60 L196 62 C194 70 186 72 178 72 C170 72 162 70 160 62 L70 62 C68 70 60 72 52 72 C44 72 36 70 34 62 L14 60 Z"
            opacity="0.95"
          />
          <circle cx="52" cy="64" r="8" className="fill-tesla-black" />
          <circle cx="52" cy="64" r="3.5" className="fill-white/70" />
          <circle cx="178" cy="64" r="8" className="fill-tesla-black" />
          <circle cx="178" cy="64" r="3.5" className="fill-white/70" />
        </svg>
      );
  }
}
