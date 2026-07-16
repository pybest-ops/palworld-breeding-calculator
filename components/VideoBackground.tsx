'use client';

export default function VideoBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/videos/hero-bg-poster.jpg"
        className="absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 object-cover"
      >
        <source src="/videos/hero-bg.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-void/80" />
      <div className="absolute inset-0 bg-[length:40px_40px] bg-grid-pattern opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-b from-void/60 via-transparent to-void/90" />
    </div>
  );
}
