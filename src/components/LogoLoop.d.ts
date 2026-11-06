import type { CSSProperties, ComponentType, ReactNode } from 'react';

interface LogoItem {
  node: ReactNode;
  title?: string;
  href?: string;
  ariaLabel?: string;
  hoverColor?: string;
}

interface LogoLoopProps {
  logos: LogoItem[];
  speed?: number;
  direction?: 'left' | 'right' | 'up' | 'down';
  logoHeight?: number;
  gap?: number;
  hoverSpeed?: number;
  pauseOnHover?: boolean;
  fadeOutWidth?: number;
  intro?: boolean;
  draggable?: boolean;
  ariaLabel?: string;
  className?: string;
  renderItem?: (item: LogoItem, key: string) => ReactNode;
  style?: CSSProperties;
}

declare const LogoLoop: ComponentType<LogoLoopProps>;
export default LogoLoop;
