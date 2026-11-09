import './ChromaGrid.css';
import { useMemo, useRef, useState, type ComponentPropsWithoutRef } from 'react';
import { gsap, useGSAP } from '../animations/gsap';
import LogoLoop from './LogoLoop';

interface ChromaItem {
  image: string;
  title: string;
  subtitle: string;
  alt: string;
}

interface ReviewItem { author: string; quote: string; avatar?: string; }
type ChromaGridProps = { items: ChromaItem[]; variant?: 'services' | 'location' } | { items: ReviewItem[]; variant: 'reviews' };

export function ChromaCard({ children, className = '', ...props }: ComponentPropsWithoutRef<'article'>) {
  return <article className={`chroma-card ${className}`} {...props}>{children}</article>;
}

function reviewerAvatar(author: string) {
  const words = author.trim().split(/\s+/);
  const initials = [words[0][0], words.length > 1 ? words[words.length - 1][0] : ''].join('').toUpperCase();
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80"><rect width="80" height="80" rx="40" fill="#393526"/><text x="40" y="42" dy=".35em" fill="#e4c889" font-family="Arial,sans-serif" font-size="28" text-anchor="middle">${initials.replace(/[^A-ZÀ-Ú]/g, '')}</text></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

function ReviewRows({ items }: { items: ReviewItem[] }) {
  const [paused, setPaused] = useState(false);
  const rows = useMemo(() => [items.filter((_, index) => index % 2 === 0), items.filter((_, index) => index % 2 === 1)].map(row => row.map(review => ({
    node: (
      <ChromaCard className="chroma-review-card">
        <div className="chroma-review-person">
          <img className="chroma-review-avatar" src={review.avatar || reviewerAvatar(review.author)} alt="" title={review.avatar ? 'Foto de perfil recriada com IA a partir do print' : undefined} width="44" height="44" loading="lazy" />
          <div><p className="chroma-review-author">{review.author}</p><span className="chroma-review-source">Depoimento ilustrativo</span></div>
        </div>
        <div className="chroma-review-rating"><span className="chroma-review-stars" role="img" aria-label="5 de 5 estrelas">★★★★★</span><span>5,0</span></div>
        <blockquote>“{review.quote}”</blockquote>
        <p className="chroma-review-excerpt">Exemplo fictício para portfólio</p>
      </ChromaCard>
    ),
  }))), [items]);

  return (
    <div className="chroma-grid chroma-reviews" role="group" aria-label="Depoimentos de clientes">
      <div className="chroma-review-controls">
        <button className="chroma-review-pause" type="button" aria-pressed={paused} onClick={() => setPaused(value => !value)}>
          {paused ? 'Retomar avaliações' : 'Pausar avaliações'} <span aria-hidden="true">{paused ? '▶' : 'Ⅱ'}</span>
        </button>
      </div>
      {rows.map((logos, index) => (
        <div className="chroma-review-row" key={index}>
          <LogoLoop logos={logos} speed={paused ? 0 : 26} direction={index === 0 ? 'left' : 'right'} logoHeight={14} gap={20} hoverSpeed={0} intro={false} draggable={false} fadeOutWidth={0.035} ariaLabel={`Avaliações — fileira ${index + 1}`} className="chroma-review-loop" />
        </div>
      ))}
    </div>
  );
}

// Adapted from the supplied React Bits ChromaGrid: always-color service cards.
export default function ChromaGrid(props: ChromaGridProps) {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    if (!root.current) return;
    const media = gsap.matchMedia();
    media.add('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
      const cleanups = gsap.utils.toArray<HTMLElement>('.chroma-card', root.current!).map(card => {
        const tween = gsap.to(card, { scale: 1.025, duration: 0.26, ease: 'power2.out', paused: true });
        const enter = () => { tween.play(); };
        const leave = () => { tween.reverse(); };
        card.addEventListener('pointerenter', enter);
        card.addEventListener('pointerleave', leave);
        return () => { card.removeEventListener('pointerenter', enter); card.removeEventListener('pointerleave', leave); };
      });
      return () => cleanups.forEach(cleanup => cleanup());
    });
    return () => media.revert();
  }, { scope: root, dependencies: [props.items], revertOnUpdate: true });
  if (props.variant === 'reviews') return <ReviewRows items={props.items} />;
  const { items } = props;
  const location = props.variant === 'location';
  return (
    <div ref={root} className={`chroma-grid${location ? ' chroma-location' : ''}`} role="group" aria-label={location ? 'Fachada da Âmbar' : 'Serviços e preços da Âmbar'} aria-describedby={location ? undefined : 'services-note'}>
      <div className="chroma-grid-inner">
        {items.map(item => (
          <div className={location ? 'chroma-location-entry' : 'chroma-card-entry'} key={item.title}>
          <ChromaCard>
            <div className="chroma-media">
              <img src={item.image} alt={item.alt} width={location ? 1000 : 800} height={location ? 500 : 800} loading="lazy" decoding="async" />
            </div>
            {!location && <div className="chroma-info">
              <h3 className="chroma-title">{item.title}</h3>
              <p className="chroma-subtitle">{item.subtitle}</p>
            </div>}
          </ChromaCard>
          </div>
        ))}
      </div>
    </div>
  );
}
