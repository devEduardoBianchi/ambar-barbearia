import type { ComponentType } from 'react';
declare const DepthCarousel: ComponentType<{
  items: { image: string; alt: string }[];
  cardWidth?: number; cardHeight?: number; radius?: number;
  depth?: number; spread?: number; tilt?: number; perspective?: number;
  visibleCards?: number; falloff?: number; blur?: number;
  autoplay?: boolean; loop?: boolean; className?: string;
}>;
export default DepthCarousel;
