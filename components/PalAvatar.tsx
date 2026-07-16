import { ELEMENT_COLORS, ELEMENT_ICONS, Pal } from '@/lib/data';
import { PAL_IMAGES } from '@/lib/pal-images';

export default function PalAvatar({ pal, size = 'md' }: { pal?: Pal; size?: 'sm' | 'md' | 'lg' }) {
  if (!pal) return <div className="rounded bg-void-panel" />;

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  const primary = pal.elements[0] || 'Neutral';
  const colorClass = ELEMENT_COLORS[primary] || ELEMENT_COLORS.Neutral;
  const imageUrl = PAL_IMAGES[pal.id];

  if (imageUrl) {
    return (
      <div
        className={`inline-flex items-center justify-center overflow-hidden border border-cyan/30 shadow-[0_0_8px_rgba(0,229,255,0.2)] ${sizeClasses[size]} ${colorClass}`}
        title={pal.name}
        aria-label={pal.name}
      >
        <img src={imageUrl} alt={pal.name} className="h-full w-full object-contain" />
      </div>
    );
  }

  return (
    <div
      className={`inline-flex items-center justify-center font-mono font-bold border border-cyan/30 shadow-[0_0_8px_rgba(0,229,255,0.2)] ${sizeClasses[size]} ${colorClass}`}
      title={pal.name}
      aria-label={pal.name}
    >
      {ELEMENT_ICONS[primary] || '○'}
    </div>
  );
}
