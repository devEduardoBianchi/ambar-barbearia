import { useRef, type ReactNode } from 'react';
import { gsap, useGSAP } from '../animations/gsap';
import './HighlightedText.css';

// Spell UI's sliding highlight, now driven by GSAP and ScrollTrigger.
export function HighlightedText({ children, from = 'bottom', delay = 0, inView = false, once = true, className = '' }: {
  children: ReactNode;
  from?: 'left' | 'right' | 'top' | 'bottom';
  delay?: number;
  inView?: boolean;
  once?: boolean;
  className?: string;
}) {
  const root = useRef<HTMLSpanElement>(null);
  useGSAP(() => {
    if (!root.current || !('IntersectionObserver' in window)) return;
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const horizontal = from === 'left' || from === 'right';
      gsap.fromTo(root.current!.querySelector('.highlighted-text-fill'),
        { xPercent: horizontal ? (from === 'left' ? -101 : 101) : 0, yPercent: horizontal ? 0 : (from === 'top' ? -101 : 101) },
        { xPercent: 0, yPercent: 0, duration: 1.3, delay, ease: 'power1.inOut',
          scrollTrigger: inView ? { trigger: root.current!.closest('h2') ?? root.current!, start: 'bottom bottom-=80', once, toggleActions: once ? 'play none none none' : 'play none none reverse' } : undefined,
        });
    });
    return () => media.revert();
  }, { scope: root, dependencies: [from, delay, inView, once], revertOnUpdate: true });

  return (
    <span ref={root} className={`highlighted-text ${className}`}>
      <span className="highlighted-text-fill" aria-hidden="true" />
      <span className="highlighted-text-label">{children}</span>
    </span>
  );
}
export default HighlightedText;
