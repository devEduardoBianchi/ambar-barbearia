import { fireEvent, render, screen, within } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

vi.mock('./components/SplitText', () => ({
  default: ({ text }: { text: string }) => text,
}));
vi.mock('./components/SideRays', () => ({ default: () => null }));

import App from './App';

describe('landing page Dom Libório', () => {
  it('exposes the main promise as one accessible level-one heading', () => {
    render(<App />);

    expect(screen.getByRole('heading', { level: 1, name: 'Seu estilo. Nosso ofício.' })).toBeInTheDocument();
  });

  it('shows the four individual services with prices and images', () => {
    render(<App />);

    const grid = screen.getByRole('group', { name: 'Serviços e preços da Dom Libório' });
    const cards = within(grid).getAllByRole('article');
    expect(cards).toHaveLength(4);
    for (const [index, price] of ['R$ 30', 'R$ 35', 'R$ 25', 'R$ 5'].entries()) {
      expect(within(cards[index]).getByText(price)).toBeInTheDocument();
      expect(within(cards[index]).getByRole('img')).toHaveAttribute('src', expect.stringMatching(/^\/assets\/services\//));
    }
    expect(screen.queryByText('Corte social e barba')).not.toBeInTheDocument();
    expect(screen.queryByText('Corte degradê e barba')).not.toBeInTheDocument();
  });

  it('links booking calls to WhatsApp and shows the reviewed Google summary', () => {
    render(<App />);

    expect(screen.getByRole('link', { name: /agendar pelo whatsapp/i })).toHaveAttribute('href', 'https://wa.link/bmboc0');
    expect(screen.getByText('125 avaliações no Google')).toBeInTheDocument();
    const testimonials = screen.getByRole('group', { name: 'Depoimentos de clientes' });
    const cards = within(testimonials).getAllByRole('article');
    expect(cards).toHaveLength(11);
    expect(within(testimonials).getAllByRole('region', { name: /Avaliações — fileira/ })).toHaveLength(2);
    const authors = cards.map(card => card.querySelector('.chroma-review-author')?.textContent);
    expect(new Set(authors).size).toBe(11);
    expect(authors).toEqual(expect.arrayContaining(['Allan Postaue Santos', 'Allax Ribeiro', 'Samuel Navarro', 'Marcelo Marques', 'Pedro Abreu', 'Victor Bezerra']));
    for (const card of cards) {
      expect(within(card).getByRole('img', { name: '5 de 5 estrelas' })).toBeInTheDocument();
      expect(within(card).getByText('Trecho de avaliação no Google')).toBeInTheDocument();
    }
  });
  it('reveals the opening hours and lets visitors return to the storefront', () => {
    render(<App />);
    expect(screen.queryByRole('heading', { name: /Nosso hor.rio/ })).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /Ver hor.rios de atendimento/ }));
    expect(screen.getByRole('heading', { name: /Nosso hor.rio/ })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /Voltar para a fachada/ }));
    expect(screen.queryByRole('heading', { name: /Nosso hor.rio/ })).not.toBeInTheDocument();
  });

});

