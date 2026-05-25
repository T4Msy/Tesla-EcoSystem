interface Props {
  src?: string;
  name: string;
  size?: number;
  className?: string;
  ring?: boolean;
}

export default function Avatar({ src, name, size = 40, className = '', ring }: Props) {
  const initials = name
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
  return (
    <div
      style={{ width: size, height: size }}
      className={[
        'relative rounded-full overflow-hidden shrink-0 bg-tesla-surface text-white grid place-items-center font-semibold',
        ring ? 'ring-tesla' : 'ring-1 ring-white/10',
        className
      ].join(' ')}
    >
      {src ? (
        <img src={src} alt={name} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
      ) : (
        <span style={{ fontSize: size * 0.36 }}>{initials}</span>
      )}
    </div>
  );
}
