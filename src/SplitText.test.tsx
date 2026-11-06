import { render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import SplitText from './components/SplitText';

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('SplitText', () => {
  it('keeps the text visible when reduced motion is preferred', () => {
    vi.spyOn(window, 'matchMedia').mockImplementation((query) => ({
      matches: true,
      media: query,
      onchange: null,
      addListener() {},
      removeListener() {},
      addEventListener() {},
      removeEventListener() {},
      dispatchEvent() { return false; },
    }));

    render(<SplitText text="Seu estilo." tag="span" effect="fade" />);

    expect(screen.getByText('Seu estilo.')).toBeVisible();
    expect(screen.getByText('Seu estilo.')).not.toHaveStyle({ visibility: 'hidden' });
  });
});
