import React, { useEffect, useRef, useState } from 'react';

export type Slide = {
  src: string;
  alt?: string;
  href?: string; // optional link when clicking the slide
};

export interface SliderProps {
  slides: Slide[];
  autoPlay?: boolean;
  intervalMs?: number;
  className?: string;
  pauseOnHover?: boolean;
  showCaptions?: boolean;
  showButton?: boolean;
  buttonText?: string;
}

const Slider: React.FC<SliderProps> = ({
  slides,
  autoPlay = true,
  intervalMs = 4000,
  className = '',
  pauseOnHover = true,
  showCaptions = true,
  showButton = false,
  buttonText = 'View',
}) => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const timerRef = useRef<number | null>(null);

  const next = () => setIndex((i) => (i + 1) % slides.length);
  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);
  const goTo = (i: number) => setIndex(((i % slides.length) + slides.length) % slides.length);

  useEffect(() => {
    if (!autoPlay || slides.length <= 1 || paused) return;
    timerRef.current && window.clearInterval(timerRef.current);
    timerRef.current = window.setInterval(next, intervalMs);
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [autoPlay, intervalMs, slides.length, paused]);

  const onKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.key === 'ArrowRight') next();
    else if (e.key === 'ArrowLeft') prev();
  };

  const onTouchStart: React.TouchEventHandler<HTMLDivElement> = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd: React.TouchEventHandler<HTMLDivElement> = (e) => {
    if (touchStartX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(dx) > 40) {
      dx < 0 ? next() : prev();
    }
  };

  return (
    <div
      className={`relative overflow-hidden rounded-2xl shadow-xl bg-gray-100 ${className}`}
      tabIndex={0}
      onKeyDown={onKeyDown}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onMouseEnter={() => pauseOnHover && setPaused(true)}
      onMouseLeave={() => pauseOnHover && setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Image slider"
    >
      {slides.map((s, i) => (
        <a
          key={s.src + i}
          href={s.href || '#'}
          onClick={(e) => !s.href && e.preventDefault()}
          className={`absolute inset-0 transition-opacity duration-700 ${i === index ? 'opacity-100' : 'opacity-0'} `}
          aria-hidden={i !== index}
        >
          <img
            src={s.src}
            alt={s.alt || ''}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          {showCaptions && i === index && s.alt && (
            <div className="absolute left-4 bottom-4 bg-black/50 text-white text-sm px-3 py-1 rounded-md">
              {s.alt}
            </div>
          )}
        </a>
      ))}

      {/* Controls */}
      {slides.length > 1 && (
        <>
          <button
            aria-label="Previous slide"
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-brand-gray-900 rounded-full p-2 shadow"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button
            aria-label="Next slide"
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-brand-gray-900 rounded-full p-2 shadow"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </>
      )}

      {/* Indicator dots */}
      {slides.length > 1 && (
        <div className="absolute left-4 bottom-4 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => goTo(i)}
              className={`h-2.5 w-2.5 rounded-full transition-all ${i === index ? 'bg-white shadow ring-2 ring-white/60' : 'bg-white/70 hover:bg-white'}`}
            />
          ))}
        </div>
      )}

      {/* Bottom-right expand icon, opens current image in new tab */}
      <a
        href={slides[index]?.src}
        target="_blank"
        rel="noreferrer"
        aria-label="Open image"
        className="absolute right-4 bottom-4 bg-black/50 hover:bg-black/60 text-white rounded-full p-2"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 3h7v7m-7 0l6.5-6.5M10 21H3v-7m7 0L3.5 20.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </a>
    </div>
  );
};

export default Slider;
