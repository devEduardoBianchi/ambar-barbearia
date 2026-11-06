import type { RefObject } from 'react';
import { gsap, ScrollTrigger, useGSAP } from './gsap';

export function usePageMotion(scope: RefObject<HTMLDivElement | null>) {
  useGSAP((_context, contextSafe) => {
    const root = scope.current;
    if (!root || !('IntersectionObserver' in window)) return;
    const media = gsap.matchMedia();
    let disposed = false;

    media.add({ desktop: '(min-width: 900px)', mobile: '(max-width: 899px)', reduced: '(prefers-reduced-motion: reduce)' }, context => {
      if (context.conditions?.reduced) return;
      const select = gsap.utils.selector(root);
      const distance = context.conditions?.desktop ? 24 : 14;
      const hero = gsap.timeline({ defaults: { duration: 0.75, ease: 'power2.out', clearProps: 'transform,opacity,visibility' } });
      hero.from(select('.hero-copy > .eyebrow'), { autoAlpha: 0, y: 12 }, 0)
        .from(select('.hero-copy > h1'), { autoAlpha: 0, y: distance }, 0.1)
        .from(select('.hero-description'), { autoAlpha: 0, y: distance }, 0.25)
        // Move the group so button hover transitions never compete with GSAP transforms.
        .from(select('.hero-actions'), { autoAlpha: 0, y: distance }, 0.4)
        .from(select('.hero-copy > .microcopy'), { autoAlpha: 0, y: 10 }, 0.6)
        .from(select('.hero-brand > *'), { autoAlpha: 0, y: distance, stagger: 0.14 }, 0.2);

      const reveals = gsap.utils.toArray<HTMLElement>('[data-reveal]', root)
        .filter(element => !element.closest('.hero') && !element.classList.contains('review'));
      const focusCleanups: (() => void)[] = [];
      for (const element of reveals) {
        const children = Array.from(element.children);
        const tween = gsap.from(children, {
          autoAlpha: 0, y: distance, duration: 0.7, stagger: 0.09, ease: 'power2.out',
          clearProps: 'transform,opacity,visibility',
          scrollTrigger: { trigger: element, start: 'clamp(top 88%)', once: true },
        });
        const revealOnFocus = () => { tween.progress(1); };
        element.addEventListener('focusin', revealOnFocus);
        focusCleanups.push(() => element.removeEventListener('focusin', revealOnFocus));
      }

      const cards = gsap.utils.toArray<HTMLElement>('.chroma-card-entry, .review', root);
      gsap.set(cards, { autoAlpha: 0, y: distance });
      ScrollTrigger.batch(cards, {
        start: 'clamp(top 90%)', once: true, interval: 0.08, batchMax: 4,
        onEnter: contextSafe!((batch: Element[]) => {
          gsap.to(batch, { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power2.out', overwrite: 'auto', clearProps: 'transform,opacity,visibility' });
        }),
      });
      const booking = select('.services-booking');
      gsap.from(booking, { autoAlpha: 0, y: 14, duration: 0.6, clearProps: 'transform,opacity,visibility', scrollTrigger: { trigger: booking[0], start: 'clamp(top 92%)', once: true } });
      return () => { focusCleanups.forEach(cleanup => cleanup()); };
    });

    // Web fonts can change heading heights after the initial trigger measurements.
    document.fonts?.ready.then(() => { if (!disposed) ScrollTrigger.refresh(); });
    return () => { disposed = true; media.revert(); };
  }, { scope });
}
