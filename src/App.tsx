import { useEffect, useRef } from 'react';
import { usePageMotion } from './animations/usePageMotion';
import SplitText from './components/SplitText';
import SideRays from './components/SideRays';
import BrandStrip from './components/BrandStrip';
import ChromaGrid from './components/ChromaGrid';
import { HighlightedText } from './components/HighlightedText';
import HoloTradingCard from './components/ui/holo-trading-card';
import DepthCarousel from './components/DepthCarousel';

const caioPhotos = [
  { image: '/assets/caio/caio-trabalhando.png', alt: 'Caio Magalhães trabalhando na barbearia, em preto e branco' },
  { image: '/assets/caio/caio-retrato.png', alt: 'Caio de terno em um jardim' },
  { image: '/assets/caio/caio-moto.png', alt: 'Caio de terno ao lado de uma moto azul' },
  { image: '/assets/caio/caio-rio.png', alt: 'Caio em um momento de lazer à beira do rio' },
  { image: '/assets/caio/caio-corrida.png', alt: 'Caio participando de uma corrida de rua' },
  { image: '/assets/caio/caio-lago.png', alt: 'Caio sentado à sombra de uma árvore junto ao lago' },
  { image: '/assets/caio/caio-fonte.png', alt: 'Caio sentado junto a uma fonte em um dia ensolarado' },
];

const whatsappUrl = 'https://wa.link/bmboc0';
const mapsUrl =
  'https://www.google.com/maps/place/Barbearia+Dom+Lib%C3%B3rio/@-22.2328735,-54.8129979,17z/data=!4m17!1m10!3m9!1s0x9489a91741d24837:0xbca8528c11f92c43!2sBarbearia+Dom+Lib%C3%B3rio!8m2!3d-22.2329678!4d-54.8129847!10e5!14m1!1BCgIgAQ!16s%2Fg%2F11sw4bv8_v!3m5!1s0x9489a91741d24837:0xbca8528c11f92c43!8m2!3d-22.2329678!4d-54.8129847!16s%2Fg%2F11sw4bv8_v';

const services = [
  { title: 'Corte social', subtitle: 'R$ 30', image: '/assets/services/corte-social.jpg', alt: 'Imagem ilustrativa de corte social com acabamento clássico' },
  { title: 'Corte degradê', subtitle: 'R$ 35', image: '/assets/services/corte-degrade.jpg', alt: 'Imagem ilustrativa de corte degradê com transição nas laterais' },
  { title: 'Barba', subtitle: 'R$ 25', image: '/assets/services/barba.jpg', alt: 'Imagem ilustrativa de acabamento de barba com navalha' },
  { title: 'Sobrancelha', subtitle: 'R$ 5', image: '/assets/services/sobrancelha-pinca.jpg', alt: 'Imagem ilustrativa de cuidado da sobrancelha masculina com pinça' },
];

const reviews = [
  {
    author: 'TIAGO LIBORIO DE ALENCAR',
    quote: 'Atendimento top, localização excelente, ambiente agradável',
  },
  { author: 'Fernando Morais', avatar: '/assets/reviewers/fernando-morais.png', quote: 'Melhor barbearia da região.' },
  {
    author: 'Sheriff Dom Falcone do Texas!',
    avatar: '/assets/reviewers/sheriff-dom.png',
    quote: 'ambiente top, atendimento nota mil, corte no capricho',
  },
  {
    author: 'KIDSEXPRESS',
    quote: 'Salão ótimo, meu esposo só corta cabelo no Dom Liborio muito bom!',
  },
  {
    author: 'Victor Costa (Victor)',
    avatar: '/assets/reviewers/victor-costa.png',
    quote: 'Ótimo atendimento, lugar bem climatizado, música ambiente, preço justo.',
  },
  {
    author: 'Allan Postaue Santos',
    avatar: '/assets/reviewers/allan-santos.png',
    quote: 'Excelente profissional, local agradável e muito bem localizado recomendo.',
  },
  {
    author: 'Allax Ribeiro',
    quote: 'Excelente atendimento, ambiente agradável e serviço de qualidade. Recomendo muito!',
  },
  {
    author: 'Samuel Navarro',
    avatar: '/assets/reviewers/samuel-navarro.png',
    quote: 'Ambiente agradável, bem localizado, excelente barbeiro e profissional',
  },
  {
    author: 'Marcelo Marques',
    quote: 'Ótima barbearia atendimento perfeito bom preço recomendo',
  },
  {
    author: 'Pedro Abreu',
    avatar: '/assets/reviewers/pedro-abreu.png',
    quote: 'Corte bom demais, e barbeiro gente boa dms',
  },
  {
    author: 'Victor Bezerra',
    avatar: '/assets/reviewers/victor-bezerra.png',
    quote: 'corto com ele desde 2018, muito bom no trampo, recomendo!!',
  },
];

function ExternalArrow() {
  return <span aria-hidden="true">↗</span>;
}

function InstagramButton({ handle }: { handle: string }) {
  return (
    <a className="instagram-button" href={`https://www.instagram.com/${handle}/`} target="_blank" rel="noopener noreferrer">
      <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
      <span className="instagram-button-copy"><span>@{handle}</span><small>{handle === 'dom_liborio' ? 'Instagram da barbearia' : 'Instagram do proprietário'}</small></span><NewTabNote> (abre em nova aba)</NewTabNote>
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
  usePageMotion(pageRef);
  useEffect(() => {
    const header = pageRef.current?.querySelector('.header-shell');
    const updateHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 24);
    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });
    return () => window.removeEventListener('scroll', updateHeader);
  }, []);

  return (
    <div ref={pageRef} className="site-frame">
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>

      <div className="header-shell">
      <header className="header page-width">
        <a className="wordmark" href="#inicio" aria-label="Dom Libório — início">
          <img src="/assets/logo-dom-liborio.png" alt="Dom Libório Barbearia" width="88" height="88" />
        </a>
        <nav className="navigation" aria-label="Navegação principal">
          <a href="#servicos">Serviços</a>
          <a href="#sobre">A barbearia</a>
          <a href="#avaliacoes">Avaliações</a>
          <a href="#visita">Visita</a>
        </nav>
        <a className="button header-cta" href={whatsappUrl} target="_blank" rel="noopener noreferrer">
          Reserve seu horário <ExternalArrow />
          <NewTabNote> pelo WhatsApp (abre em nova aba)</NewTabNote>
        </a>
      </header>
      </div>

      <main id="conteudo" tabIndex={-1}>
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-rays" aria-hidden="true">
            <SideRays rayColor1="#FFC46B" rayColor2="#c5a568" origin="top-right" speed={2.5} intensity={2} spread={2} density={5} followMouse={true} maxDevicePixelRatio={1.5} style={{}} />
          </div>
          <div className="hero-copy" data-reveal>
            <p className="eyebrow">Dourados, Mato Grosso do Sul</p>
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
              <p><strong>Estilo e sofisticação em cada corte.</strong></p>
              <p>Conheça a Dom Libório e agende seu próximo horário.</p>
            </div>
            <div className="hero-actions">
            <a className="button" href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              Agendar pelo WhatsApp <ExternalArrow />
              <NewTabNote> (abre em nova aba)</NewTabNote>
            </a>
            <a href="#sobre" className="hero-about-button">
              Conheça a barbearia <span aria-hidden="true">↓</span>
            </a>
            </div>
            <p className="microcopy">Uma conversa. Seu próximo corte.</p>
          </div>
          <figure className="hero-brand" data-reveal>
            <img src="/assets/logo-dom-liborio.png" alt="Dom Libório Barbearia" width="512" height="512" fetchPriority="high" />
            <figcaption>Barbearia · Dourados–MS · Desde 2021</figcaption>
          </figure>
        </section>

        <BrandStrip />

        <section id="servicos" className="services-section" aria-labelledby="services-title">
          <BackgroundDetails variant="services" />
          <div className="services-layout services-content page-width">
            <div className="pricing-intro" data-reveal>
              <p className="eyebrow">Serviços &amp; valores</p>
              <h2 id="services-title">Detalhes que fazem seu <HighlightedText from="left" delay={0} inView>estilo.</HighlightedText></h2>
              <p className="section-aside" id="services-note">Do corte social ao degradê, escolha seu cuidado. Valores da tabela da barbearia; confirme ao agendar.</p>
            </div>
            <ChromaGrid items={services} />
            <p className="services-image-note">Imagens ilustrativas dos serviços.</p>
            <a className="button services-booking" href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              Agendar meu horário <ExternalArrow /><NewTabNote> pelo WhatsApp (abre em nova aba)</NewTabNote>
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
              <p>A Dom Libório faz parte de Dourados desde 2021. À frente da cadeira está Caio Magalhães, barbeiro e proprietário. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus dignissim, justo eu tincidunt consectetur, sem erat facilisis neque, vitae consequat lorem justo non ipsum. Praesent quis tellus vel metus malesuada aliquam. Integer at risus sed nibh interdum posuere. Donec vitae mauris eget neque fermentum volutpat. Sed euismod, erat a pellentesque scelerisque, nulla sapien sollicitudin sem, ac faucibus libero lorem vitae lectus. Aliquam erat volutpat. Curabitur sit amet neque in orci commodo tincidunt.</p>
              <blockquote>“Estilo e sofisticação em cada corte.”</blockquote>
            </div>
            </div>
            <div className="about-gallery">
              <p className="signature">Caio Magalhães<span>Barbeiro e proprietário</span></p>
              <DepthCarousel items={caioPhotos} cardWidth={340} cardHeight={425} depth={180} spread={70} tilt={16} visibleCards={3} falloff={0.12} blur={2} radius={12} />
            </div>
          </div>
        </section>

        <section id="avaliacoes" className="reviews-section" aria-labelledby="reviews-title">
          <div className="section-heading page-width" data-reveal>
            <div><p className="eyebrow">Quem vem, conta</p><h2 id="reviews-title">Na palavra de quem senta aqui.</h2></div>
            <div className="rating-summary">
              <div className="rating-line"><span className="rating-number">5,0</span><StarRating /></div>
              <p>125 avaliações no Google</p>
              <p className="data-note">Consulta em <time dateTime="2026-11-05">05/11/2026</time></p>
            </div>
          </div>
          <ChromaGrid variant="reviews" items={reviews} />
          <div className="page-width">
          <p className="data-note review-photo-note">Fotos de perfil recriadas com IA a partir dos prints das avaliações.</p>
          <a className="text-link google-link reviews-source" href={mapsUrl} target="_blank" rel="noopener noreferrer">
            Ler as avaliações no Google <ExternalArrow /><NewTabNote> (abre em nova aba)</NewTabNote>
          </a>
          </div>
        </section>

        <section id="visita" className="visit-section visit-map-section" aria-labelledby="visit-title">
          <iframe className="visit-map" title="Localização da Dom Libório em Dourados" src="https://maps.google.com/maps?q=Barbearia%20Dom%20Lib%C3%B3rio%2C%20Rua%20Cuiab%C3%A1%201728%2C%20Dourados&z=16&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          <div className="visit-map-shade" aria-hidden="true" />
          <div className="visit-map-content page-width">
            <div className="visit-info" data-reveal>
              <p className="eyebrow">Aqui em Dourados</p>
              <h2 id="visit-title">A gente se vê na<br /><HighlightedText from="left" delay={0} inView>Dom Libório.</HighlightedText></h2>
            <div className="visit-facade-card">
              <HoloTradingCard name="Dom Libório" background="/assets/fachada-dom-liborio-1600.jpg" print={false} finish="gold" foil={0.18} pattern={0.1} tilt={5} idle={false} bgDepth={0} width="100%" className="dom-location-card" back={
                <div className="location-hours">
                  <p className="eyebrow">Planeje sua visita</p>
                  <h3>Nosso horário<br />de atendimento.</h3>
                  <dl>
                    <div><dt>Segunda a sexta</dt><dd>09h–11h<span>13h–18h30</span></dd></div>
                    <div><dt>Sábado</dt><dd>09h–11h<span>13h–18h</span></dd></div>
                    <div><dt>Domingo</dt><dd>Fechado</dd></div>
                  </dl>
                  <p className="data-note">Horários consultados em 05/11/2026.<br />Confirme a disponibilidade pelo WhatsApp.</p>
                </div>
              } />
            </div>
              <p className="visit-invitation">Seu próximo corte, uma boa conversa e aquele cuidado que faz a diferença.</p>
              <address><strong>Dom Libório Barbearia</strong><br />R. Cuiabá, 1728 · Centro<br />Dourados–MS · CEP 79830-220</address>
              <div className="visit-map-actions">
                <a className="button" href={mapsUrl} target="_blank" rel="noopener noreferrer">Como chegar <ExternalArrow /><NewTabNote> no Google Maps (abre em nova aba)</NewTabNote></a>
                <a className="text-link google-link" href={whatsappUrl} target="_blank" rel="noopener noreferrer">Fale conosco <ExternalArrow /><NewTabNote> pelo WhatsApp (abre em nova aba)</NewTabNote></a>
              </div>
            </div>

          </div>
        </section>

        <section id="agendar" className="contact-section" aria-labelledby="contact-title">
          <BackgroundDetails variant="contact" />
          <div className="contact page-width" data-reveal>
          <div className="contact-copy"><p className="eyebrow">Seu próximo corte começa aqui</p><h2 id="contact-title"><HighlightedText from="left" delay={0} inView>Agende um horário</HighlightedText><br />para cuidar de você.</h2>
            <div className="contact-socials" aria-label="Perfis no Instagram">
              <InstagramButton handle="dom_liborio" />
              <InstagramButton handle="caio_mfl" />
            </div>
          </div>
          <div className="contact-action">
            <img className="contact-logo" src="/assets/logo-dom-liborio.png" alt="Dom Libório Barbearia" width="512" height="512" loading="lazy" />
            <a className="button" href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              Conversar no WhatsApp <ExternalArrow /><NewTabNote> (abre em nova aba)</NewTabNote>
            </a>
            <p className="microcopy">Consulte horários, serviços e localização.</p>
          </div>
          </div>
        </section>
      </main>

      <footer className="footer page-width">
        <span>Dom Libório · Dourados / MS</span>
        <span>Todos os direitos reservados.</span>
        <a href="#inicio">Voltar ao início <span aria-hidden="true">↑</span></a>
      </footer>
    </div>
  );
}

export default App;


