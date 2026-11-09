import { fireEvent, render, screen, within } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
vi.mock('./components/SplitText', () => ({ default: ({ text }: { text: string }) => text }));
vi.mock('./components/SideRays', () => ({ default: () => null }));
import App from './App';
describe('Ambar fictional portfolio', () => {
  it('discloses the concept and removes original business details', () => {
    const { container } = render(<App />);
    expect(screen.getByRole('heading', { level: 1, name: 'Seu estilo. Nosso ofício.' })).toBeInTheDocument();
    expect(screen.getByText(/Projeto conceitual para portfólio\. Marca, imagens/)).toBeInTheDocument();
    expect(container.innerHTML).not.toMatch(/lib[oó]rio|caio|wa\.link|cuiab[aá]|79830|125 avaliações/i);
    expect(container.querySelector('iframe')).toHaveAttribute('src', 'https://maps.google.com/maps?q=Dourados,MS&z=13&output=embed');
  });
  it('shows four fictional service prices and new images', () => {
    render(<App />);
    const cards = within(screen.getByRole('group', { name: 'Serviços e preços da Âmbar' })).getAllByRole('article');
    expect(cards).toHaveLength(4);
    ['R$ 45', 'R$ 55', 'R$ 35', 'R$ 15'].forEach((price, i) => {
      expect(within(cards[i]).getByText(price)).toBeInTheDocument();
      expect(within(cards[i]).getByRole('img')).toHaveAttribute('src', expect.stringMatching(/^\/assets\/portfolio\//));
    });
  });
  it('labels every testimonial and retains the two rows', () => {
    render(<App />);
    const group = screen.getByRole('group', { name: 'Depoimentos de clientes' });
    expect(within(group).getAllByRole('region', { name: /Avaliações — fileira/ })).toHaveLength(2);
    const cards = within(group).getAllByRole('article');
    expect(cards).toHaveLength(11);
    for (const card of cards) expect(within(card).getByText('Exemplo fictício para portfólio')).toBeInTheDocument();
    expect(screen.getByText('Depoimentos fictícios para portfólio')).toBeInTheDocument();
  });
  it('opens a demo dialog instead of a real contact', () => {
    render(<App />);
    const dialog = document.querySelector('dialog')!;
    const showModal = vi.fn(() => dialog.setAttribute('open', ''));
    Object.defineProperty(dialog, 'showModal', { value: showModal, configurable: true });
    const contact = screen.getByRole('link', { name: /Agendar pelo WhatsApp/i });
    expect(contact).toHaveAttribute('href', '#demonstracao');
    fireEvent.click(contact);
    expect(showModal).toHaveBeenCalledOnce();
    expect(screen.getByRole('dialog')).toHaveTextContent('barbearia fictícia');
  });
  it('reveals the sample timetable and returns to the facade', () => {
    render(<App />);
    expect(screen.queryByRole('heading', { name: /Nosso horário/ })).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /Ver horários de atendimento/ }));
    expect(screen.getByRole('heading', { name: /Nosso horário/ })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /Voltar para a fachada/ }));
    expect(screen.queryByRole('heading', { name: /Nosso horário/ })).not.toBeInTheDocument();
  });
});
