import { useEffect, useRef } from 'react';
import { usePageMotion } from './animations/usePageMotion';
import SplitText from './components/SplitText';
import SideRays from './components/SideRays';
import BrandStrip from './components/BrandStrip';
import ChromaGrid from './components/ChromaGrid';
import { HighlightedText } from './components/HighlightedText';
import HoloTradingCard from './components/ui/holo-trading-card';
import DepthCarousel from './components/DepthCarousel';

const founderPhotos = [
  { image: '/assets/portfolio/rafael-trabalhando.png', alt: 'Cena ilustrativa do barbeiro fictício Rafael trabalhando' },
  { image: '/assets/portfolio/rafael-retrato.png', alt: 'Retrato ilustrativo de Rafael Monteiro, personagem fictício' },
  { image: '/assets/portfolio/ambiente-ambar.png', alt: 'Interior ilustrativo da barbearia conceitual Âmbar' },
  { image: '/assets/portfolio/ferramentas-ambar.png', alt: 'Ferramentas de barbearia em uma composição ilustrativa' },
];

const whatsappUrl = '#demonstracao';
const mapsUrl = 'https://www.google.com/maps?q=Dourados,MS';

const services = [
  { title: 'Corte social', subtitle: 'R$ 45', image: '/assets/portfolio/corte-classico.png', alt: 'Imagem ilustrativa de corte social com acabamento clássico' },
  { title: 'Corte degradê', subtitle: 'R$ 55', image: '/assets/portfolio/corte-degrade.png', alt: 'Imagem ilustrativa de corte degradê com transição nas laterais' },
  { title: 'Barba', subtitle: 'R$ 35', image: '/assets/portfolio/barba-ambar.png', alt: 'Imagem ilustrativa de acabamento de barba com navalha' },
  { title: 'Sobrancelha', subtitle: 'R$ 15', image: '/assets/portfolio/sobrancelha-ambar.png', alt: 'Imagem ilustrativa de cuidado da sobrancelha masculina com pinça' },
];

// Fictional testimonials, written only to demonstrate the portfolio layout.
const reviews = [
  {
    "author": "Lucas Azevedo",
    "quote": "O corte ficou exatamente como imaginei. Gostei do cuidado com cada detalhe."
  },
  {
    "author": "Bruno Duarte",
    "quote": "Ambiente tranquilo e atendimento atencioso. Uma pausa boa no meio da semana."
  },
  {
    "author": "André Campos",
    "quote": "Degradê bem feito e acabamento caprichado. Saí com o visual renovado."
  },
  {
    "author": "Felipe Nogueira",
    "quote": "Conversa leve, cadeira confortável e um corte que combina comigo."
  },
  {
    "author": "Gustavo Leal",
    "quote": "Gostei da atenção antes de começar: ouviram o que eu queria para o meu cabelo."
  },
  {
    "author": "Henrique Vieira",
    "quote": "A barba ganhou forma sem perder o estilo natural. Muito cuidado no acabamento."
  },
  {
    "author": "Diego Martins",
    "quote": "Do primeiro contato ao último detalhe, uma experiência acolhedora."
  },
  {
    "author": "Matheus Paiva",
    "quote": "Um lugar para cuidar do visual com calma e trocar uma boa ideia."
  },
  {
    "author": "Eduardo Farias",
    "quote": "O ambiente é bonito e o atendimento faz a gente se sentir à vontade."
  },
  {
    "author": "Gabriel Tavares",
    "quote": "Corte clássico com acabamento atual. Era essa combinação que eu procurava."
  },
  {
    "author": "Vinícius Mota",
    "quote": "Gostei do cuidado com a barba e do resultado do corte. Uma experiência completa."
  }
];

function ExternalArrow() {
  return <span aria-hidden="true">↗</span>;
}

function InstagramButton({ handle }: { handle: string }) {
  return (
    <a className="instagram-button" href="#demonstracao" data-demo-contact>
      <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
      <span className="instagram-button-copy"><span>@{handle}</span><small>{handle === 'ambar.conceito' ? 'Instagram da barbearia' : 'Instagram do proprietário'}</small></span><NewTabNote> (demonstração)</NewTabNote>
    </a>
  );
}

function BackgroundDetails({ variant }: { variant: 'services' | 'contact' }) {
  return (
    <div className={`section-background section-background--${variant}`} aria-hidden="true">
      <svg className="section-background__tools" viewBox="0 0 240 240" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        {variant === 'services' ? <>
          <circle cx="60" cy="166" r="25" /><circle cx="164" cy="166" r="25" />
          <path d="m77 147 104-121-62 109M147 147 43 26l62 109" /><circle cx="112" cy="130" r="5" />
        </> : <>
          <path d="M46 40h148v24H46zM58 64v132a16 16 0 0 0 16 16h92a16 16 0 0 0 16-16V64M46 212h148v18H46zM104 26a16 16 0 0 1 32 0" />
          <path d="m60 110 120-40m-120 88 120-40m-120 88 120-40" strokeWidth="12" />
        </>}
      </svg>
      <span className="section-background__ring" />
      <span className="section-background__spark">✳</span>
    </div>
  );
}

function NewTabNote({ children }: { children: string }) {
  return <span className="sr-only"> {children}</span>;
}

function StarRating() {
  return (
    <span className="stars" role="img" aria-label="5 de 5 estrelas">
      ★★★★★
    </span>
  );
}

function App() {
  const pageRef = useRef<HTMLDivElement>(null);
  const demoRef = useRef<HTMLDialogElement>(null);
  usePageMotion(pageRef);
  useEffect(() => {
    const header = pageRef.current?.querySelector('.header-shell');
    const updateHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 24);
    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });
    return () => window.removeEventListener('scroll', updateHeader);
  }, []);

  return (
    <div ref={pageRef} className="site-frame" onClick={event => {
      if (event.target instanceof Element && event.target.closest('a[data-demo-contact]')) {
        event.preventDefault();
        demoRef.current?.showModal();
      }
    }}>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>

      <div className="header-shell">
      <header className="header page-width">
        <a className="wordmark" href="#inicio" aria-label="Âmbar — início">
          <img src="/assets/portfolio/logo-ambar.png" alt="Âmbar Barbearia" width="88" height="88" />
        </a>
        <nav className="navigation" aria-label="Navegação principal">
          <a href="#servicos">Serviços</a>
          <a href="#sobre">A barbearia</a>
          <a href="#avaliacoes">Avaliações</a>
          <a href="#visita">Visita</a>
        </nav>
        <a className="button header-cta" href={whatsappUrl} data-demo-contact>
          Reserve seu horário <ExternalArrow />
          <NewTabNote> pelo WhatsApp (demonstração)</NewTabNote>
        </a>
      </header>
      </div>

      <main id="conteudo" tabIndex={-1}>
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-atmosphere" aria-hidden="true" />
          <div className="hero-rays" aria-hidden="true">
            <SideRays rayColor1="#FFC46B" rayColor2="#c5a568" origin="top-right" speed={2.5} intensity={2} spread={2} density={5} followMouse={true} maxDevicePixelRatio={1.5} style={{}} />
          </div>
          <div className="hero-copy" data-reveal>
            <p className="eyebrow">Barbearia conceitual · Dourados, MS</p>
            <h1 id="hero-title">
              <span className="sr-only">Seu estilo. Nosso ofício.</span>
              <span className="hero-animated-title" aria-hidden="true">
                <span className="hero-title-line">
                  <SplitText text="Seu estilo." tag="span" textAlign="left" splitType="chars" effect="fade" duration={0.48} delay={16} trigger="load" />
                </span>
                <span className="hero-title-line hero-title-second">
                  <SplitText text="Nosso" tag="span" textAlign="left" splitType="chars" effect="fade" duration={0.48} delay={16} trigger="load" />
                  <SplitText text="ofício." className="hero-title-accent" tag="span" textAlign="left" splitType="chars" effect="fade" duration={0.48} delay={16} trigger="load" />
                </span>
              </span>
            </h1>
            <div className="hero-description">
              <p><strong>Precisão no corte. Personalidade no visual.</strong></p>
              <p>Conheça a Âmbar e agende seu próximo horário.</p>
            </div>
            <div className="hero-actions">
            <a className="button" href={whatsappUrl} data-demo-contact>
              Agendar pelo WhatsApp <ExternalArrow />
              <NewTabNote> (demonstração)</NewTabNote>
            </a>
            <a href="#sobre" className="hero-about-button">
              Conheça a barbearia <span aria-hidden="true">↓</span>
            </a>
            </div>
            <p className="microcopy">Projeto conceitual para portfólio. Marca, imagens e contatos ilustrativos.</p>
          </div>
          <figure className="hero-brand" data-reveal>
            <img src="/assets/portfolio/logo-ambar.png" alt="Âmbar Barbearia" width="512" height="512" fetchPriority="high" />
            <figcaption>Barbearia · Dourados–MS · Projeto conceitual</figcaption>
          </figure>
        </section>

        <BrandStrip />

        <section id="servicos" className="services-section" aria-labelledby="services-title">
          <BackgroundDetails variant="services" />
          <div className="services-layout services-content page-width">
            <div className="pricing-intro" data-reveal>
              <p className="eyebrow">Serviços &amp; valores</p>
              <h2 id="services-title">Detalhes que fazem seu <HighlightedText from="left" delay={0} inView>estilo.</HighlightedText></h2>
              <p className="section-aside" id="services-note">Do corte social ao degradê, escolha seu cuidado. Serviços e valores ilustrativos deste projeto conceitual.</p>
            </div>
            <ChromaGrid items={services} />
            <p className="services-image-note">Imagens ilustrativas dos serviços.</p>
            <a className="button services-booking" href={whatsappUrl} data-demo-contact>
              Agendar meu horário <ExternalArrow /><NewTabNote> pelo WhatsApp (demonstração)</NewTabNote>
            </a>
          </div>
        </section>

        <section id="sobre" className="about-section" aria-labelledby="about-title">
          <div className="barber-background" aria-hidden="true">
            <svg className="barber-detail barber-detail--scissors" viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="48" cy="145" r="23" /><circle cx="143" cy="145" r="23" />
              <path d="M62 127 155 24 103 113M128 127 40 24 91 112" />
              <circle cx="97" cy="108" r="5" />
            </svg>
            <svg className="barber-detail barber-detail--pole" viewBox="0 0 120 260" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <defs><clipPath id="about-pole-clip"><rect x="30" y="48" width="60" height="164" rx="24" /></clipPath></defs>
              <path d="M44 24a16 16 0 0 1 32 0M25 32h70v16H25zM25 212h70v16H25zM44 236a16 16 0 0 0 32 0" />
              <rect x="30" y="48" width="60" height="164" rx="24" />
              <g clipPath="url(#about-pole-clip)" strokeWidth="14"><path d="m12 92 98-60m-98 108 98-60m-98 108 98-60m-98 108 98-60" /></g>
              <path d="M39 70v118" strokeWidth="1" />
            </svg>
            <svg className="barber-detail barber-detail--comb" viewBox="0 0 240 80" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 18h208a8 8 0 0 1 8 8v10H8V26a8 8 0 0 1 8-8Z" />
              <path d="M16 36v28m12-28v28m12-28v28m12-28v28m12-28v28m12-28v28m12-28v28m12-28v28m12-28v28m12-28v28m12-28v28m12-28v28m12-28v28m12-28v28m12-28v28m12-28v28m12-28v28m12-28v28" />
            </svg>
          </div>
          <div className="about page-width" data-reveal>
            <div className="about-story">
            <div><p className="eyebrow">A barbearia</p><h2 id="about-title">Tem nome.<br />Tem história.</h2></div>
            <div className="about-copy">
              <p>A Âmbar nasceu de uma ideia: transformar o cuidado com o visual em um momento para desacelerar. Nesta história fictícia, Rafael Monteiro reúne a precisão do corte clássico, o acabamento contemporâneo e a conversa de quem recebe um amigo. Inspirado no ritmo acolhedor de Dourados, o espaço foi imaginado para quem valoriza um corte com personalidade e atenção em cada detalhe. Da primeira conversa ao último toque na barba, a proposta é fazer você sair da cadeira se reconhecendo no espelho.</p>
              <blockquote>“Precisão no corte. Personalidade no visual.”</blockquote>
            </div>
            </div>
            <div className="about-gallery">
              <p className="signature">Rafael Monteiro<span>Barbeiro · personagem fictício</span></p>
              <DepthCarousel items={founderPhotos} cardWidth={340} cardHeight={425} depth={180} spread={70} tilt={16} visibleCards={3} falloff={0.12} blur={2} radius={12} />
            </div>
          </div>
        </section>

        <section id="avaliacoes" className="reviews-section" aria-labelledby="reviews-title">
          <div className="section-heading page-width" data-reveal>
            <div><p className="eyebrow">Quem vem, conta</p><h2 id="reviews-title">Na palavra de quem senta aqui.</h2></div>
            <div className="rating-summary">
              <div className="rating-line"><span className="rating-number">5,0</span><StarRating /></div>
              <p>Avaliação ilustrativa · demonstração</p>
              <p className="data-note">Depoimentos fictícios para portfólio</p>
            </div>
          </div>
          <ChromaGrid variant="reviews" items={reviews} />
          <div className="page-width">
          <p className="data-note review-photo-note">Nomes, depoimentos e notas são fictícios e demonstram a apresentação das avaliações.</p>
          <a className="text-link google-link reviews-source" href="#agendar">
            Conheça a experiência Âmbar <ExternalArrow /><NewTabNote> (demonstração)</NewTabNote>
          </a>
          </div>
        </section>

        <section id="visita" className="visit-section visit-map-section" aria-labelledby="visit-title">
          <iframe className="visit-map" title="Mapa de Dourados: cidade de referência do projeto, sem localização comercial real" src="https://maps.google.com/maps?q=Dourados,MS&z=13&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          <div className="visit-map-shade" aria-hidden="true" />
          <div className="visit-map-content page-width">
            <div className="visit-info" data-reveal>
              <p className="eyebrow">Inspirada em Dourados</p>
              <h2 id="visit-title">A gente se vê na<br /><HighlightedText from="left" delay={0} inView>Âmbar.</HighlightedText></h2>
            <div className="visit-facade-card">
              <HoloTradingCard name="Âmbar" background="/assets/portfolio/fachada-ambar.png" print={false} finish="gold" foil={0.18} pattern={0.1} tilt={5} idle={false} bgDepth={0} width="100%" className="dom-location-card" back={
                <div className="location-hours">
                  <p className="eyebrow">Planeje sua visita</p>
                  <h3>Nosso horário<br />de atendimento.</h3>
                  <dl>
                    <div><dt>Segunda a sexta</dt><dd>09h–11h<span>13h–18h30</span></dd></div>
                    <div><dt>Sábado</dt><dd>09h–11h<span>13h–18h</span></dd></div>
                    <div><dt>Domingo</dt><dd>Fechado</dd></div>
                  </dl>
                  <p className="data-note">Horários ilustrativos do projeto.<br />Agendamento em modo de demonstração.</p>
                </div>
              } />
            </div>
              <p className="visit-invitation">Seu próximo corte, uma boa conversa e aquele cuidado que faz a diferença.</p>
              <address><strong>Âmbar Barbearia</strong><br />Rua do Estilo, 128 · endereço fictício<br />Dourados–MS · mapa apenas da cidade</address>
              <div className="visit-map-actions">
                <a className="button" href={mapsUrl} target="_blank" rel="noopener noreferrer">Ver cidade no mapa <ExternalArrow /><NewTabNote> no Google Maps (abre em nova aba)</NewTabNote></a>
                <a className="text-link google-link" href={whatsappUrl} data-demo-contact>Fale conosco <ExternalArrow /><NewTabNote> pelo WhatsApp (demonstração)</NewTabNote></a>
              </div>
            </div>

          </div>
        </section>

        <section id="agendar" className="contact-section" aria-labelledby="contact-title">
          <BackgroundDetails variant="contact" />
          <div className="contact page-width" data-reveal>
          <div className="contact-copy"><p className="eyebrow">Seu próximo corte começa aqui</p><h2 id="contact-title"><HighlightedText from="left" delay={0} inView>Agende um horário</HighlightedText><br />para cuidar de você.</h2>
            <div className="contact-socials" aria-label="Perfis no Instagram">
              <InstagramButton handle="ambar.conceito" />
              <InstagramButton handle="rafael.conceito" />
            </div>
          </div>
          <div className="contact-action">
            <img className="contact-logo" src="/assets/portfolio/logo-ambar.png" alt="Âmbar Barbearia" width="512" height="512" loading="lazy" />
            <a className="button" href={whatsappUrl} data-demo-contact>
              Conversar no WhatsApp <ExternalArrow /><NewTabNote> (demonstração)</NewTabNote>
            </a>
            <p className="microcopy">Consulte horários, serviços e localização.</p>
          </div>
          </div>
        </section>
      </main>

      <footer className="footer page-width">
        <span>Âmbar · Dourados / MS</span>
        <span>Projeto conceitual para portfólio · Marca e conteúdo fictícios.</span>
        <a href="#inicio">Voltar ao início <span aria-hidden="true">↑</span></a>
      </footer>
      <dialog ref={demoRef} id="demonstracao" className="demo-dialog" aria-labelledby="demo-title">
        <p className="eyebrow">Projeto de portfólio</p>
        <h2 id="demo-title">Uma experiência<br />em demonstração.</h2>
        <p>A Âmbar é uma barbearia fictícia. Os botões de WhatsApp e Instagram demonstram o fluxo de contato, sem abrir uma conta real ou confirmar agendamentos.</p>
        <form method="dialog"><button className="button" type="submit">Continuar explorando</button></form>
      </dialog>
    </div>
  );
}

export default App;
