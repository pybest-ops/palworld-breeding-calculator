import { ELEMENT_COLORS, ELEMENT_ICONS, Pal } from '@/lib/data';

export default function PalAvatar({ pal, size = 'md' }: { pal?: Pal; size?: 'sm' | 'md' | 'lg' }) {
  if (!pal) return <div className="rounded-lg bg-mist" />;

  const sizeClasses = {
    sm: 'w-8 h-8 rounded-md text-sm',
    md: 'w-12 h-12 rounded-lg text-lg',
    lg: 'w-16 h-16 rounded-xl text-2xl',
  };

  const primary = pal.elements[0] || 'Neutral';
  const gradient =
    pal.elements.length > 1
      ? `bg-gradient-to-br from-${primary.toLowerCase()} to-${pal.elements[1].toLowerCase()}`
      : '';

  const colorClass = ELEMENT_COLORS[primary] || ELEMENT_COLORS.Neutral;

  return (
    <div
      className={`inline-flex items-center justify-center font-mono font-bold shadow-sm ${sizeClasses[size]} ${gradient || colorClass}`}
      title={pal.name}
      aria-label={pal.name}
    >
      {ELEMENT_ICONS[primary] || '○'}
    </div>
  );
}
