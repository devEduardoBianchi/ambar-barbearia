import { useState } from 'react';
import LogoLoop from './LogoLoop';

const phrases = ['Corte com identidade', 'Cuidado estético', 'Resenha de amigo', 'Dourados · MS', 'Dom Libório'];
const items = phrases.map(text => ({
  node: <span className="brand-strip-phrase">{text}<span className="asterisk" aria-hidden="true">✳</span></span>,
}));

export default function BrandStrip() {
  const [paused, setPaused] = useState(false);

  return (
    <div className="brand-strip">
      <LogoLoop
        logos={items}
        speed={paused ? 0 : 32}
        direction="left"
        logoHeight={10}
        gap={40}
        hoverSpeed={0}
        pauseOnHover
        fadeOutWidth={0.04}
        intro={false}
        draggable={false}
        ariaLabel="O clima da Dom Libório"
        className="brand-strip-loop"
        renderItem={undefined}
        style={{}}
      />
      <button
        className="brand-strip-toggle"
        type="button"
        onClick={() => setPaused(value => !value)}
        aria-label={paused ? 'Retomar animação da faixa' : 'Pausar animação da faixa'}
        aria-pressed={paused}
      >
        <span aria-hidden="true">{paused ? '▶' : 'Ⅱ'}</span>
      </button>
    </div>
  );
}
