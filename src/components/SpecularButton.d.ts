import type { ComponentType, CSSProperties, ReactNode } from 'react';

interface SpecularButtonProps {
  children: ReactNode;
  href?: string;
  radius?: number;
  tintOpacity?: number;
  textColor?: string;
  lineColor?: string;
  baseColor?: string;
  intensity?: number;
  idleIntensity?: number;
  glow?: number;
  proximity?: number;
  className?: string;
  style?: CSSProperties;
}

declare const SpecularButton: ComponentType<SpecularButtonProps>;
export default SpecularButton;
