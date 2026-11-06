import { useRef, type ReactNode } from 'react';
import { gsap, useGSAP } from '../animations/gsap';
import './HoloCard.css';

// DOM-content adaptation of React Bits HoloCard's pointer-driven tilt.
// Keeps live text and semantics rather than rendering the timetable into an image.
export default function HoloCard({ children, className = '', tiltMax = 5, hoverScale = 1.015 }: {
  children: ReactNode;
  className?: string;
  tiltMax?: number;
  hoverScale?: number;
}) {
  const root = useRef<HTMLDivElement>(null);
  const rotor = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!root.current || !rotor.current) return;
    const container = root.current;
    const card = rotor.current;
    const media = gsap.matchMedia();
    media.add('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
      const maxTilt = gsap.utils.clamp(0, 12, tiltMax);
      const xTo = gsap.quickTo(card, 'rotationX', { duration: 0.45, ease: 'power2.out' });
      const yTo = gsap.quickTo(card, 'rotationY', { duration: 0.45, ease: 'power2.out' });
      const lift = gsap.to(card, { scale: gsap.utils.clamp(1, 1.04, hoverScale), duration: 0.35, ease: 'power2.out', paused: true });
      const track = (event: PointerEvent) => {
        if (event.pointerType !== 'mouse') return;
        const bounds = container.getBoundingClientRect();
        const x = gsap.utils.clamp(0, 1, (event.clientX - bounds.left) / bounds.width);
        const y = gsap.utils.clamp(0, 1, (event.clientY - bounds.top) / bounds.height);
        xTo(gsap.utils.mapRange(0, 1, maxTilt, -maxTilt, y));
        yTo(gsap.utils.mapRange(0, 1, -maxTilt, maxTilt, x));
        lift.play();
      };
      const reset = () => { xTo(0); yTo(0); lift.reverse(); };
      container.addEventListener('pointerenter', track);
      container.addEventListener('pointermove', track);
      container.addEventListener('pointerleave', reset);
      container.addEventListener('pointercancel', reset);
      return () => {
        container.removeEventListener('pointerenter', track);
        container.removeEventListener('pointermove', track);
        container.removeEventListener('pointerleave', reset);
        container.removeEventListener('pointercancel', reset);
      };
    });
    return () => media.revert();
  }, { scope: root, dependencies: [tiltMax, hoverScale], revertOnUpdate: true });

  return <div ref={root} className={`holo-card ${className}`}><div ref={rotor} className="holo-card__rotor">{children}</div></div>;
}
