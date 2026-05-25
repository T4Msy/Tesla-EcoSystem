import { motion } from 'framer-motion';
import type { RideCategory } from '../../mock/categories';
import CarSilhouette from '../map/CarSilhouette';
import Pill from '../ui/Pill';
import { Battery, Clock, Users } from 'lucide-react';

interface Props {
  category: RideCategory;
  selected: boolean;
  onSelect: () => void;
  fare: number;
}

export default function CategoryCard({ category, selected, onSelect, fare }: Props) {
  return (
    <motion.button
      whileTap={{ scale: 0.985 }}
      onClick={onSelect}
      className={[
        'w-full text-left rounded-2xl p-3 flex items-center gap-3 transition-all border',
        selected
          ? 'bg-white/10 border-tesla-red/60 ring-tesla'
          : 'bg-white/4 border-white/10 hover:bg-white/6'
      ].join(' ')}
    >
      <div
        className={[
          'h-14 w-20 grid place-items-center rounded-xl shrink-0 transition-colors',
          selected ? 'bg-tesla-red/15' : 'bg-white/5'
        ].join(' ')}
      >
        <CarSilhouette type={category.silhouette} className="w-16" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-[15px] truncate">{category.name}</span>
          {category.badge && (
            <Pill tone={category.badge === 'AI' ? 'blue' : category.badge === 'Beta' ? 'amber' : 'red'}>
              {category.badge}
            </Pill>
          )}
        </div>
        <div className="text-[11px] text-white/55 truncate">{category.tagline}</div>
        <div className="mt-1 flex items-center gap-3 text-[11px] text-white/65">
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {category.etaMinutes} min
          </span>
          <span className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            {category.seats}
          </span>
          <span className="flex items-center gap-1">
            <Battery className="h-3 w-3" />
            {category.range}
          </span>
        </div>
      </div>
      <div className="text-right">
        <div className="text-[15px] font-semibold tabular-nums">
          R$ {fare.toFixed(2).replace('.', ',')}
        </div>
        <div className="text-[10px] text-white/50">fixo</div>
      </div>
    </motion.button>
  );
}
