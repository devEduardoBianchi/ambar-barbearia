# Dom Libório Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Entregar uma landing page moderna da Dom Libório que direcione visitantes ao WhatsApp da barbearia.

**Architecture:** Página estática com HTML semântico e CSS responsivo, sem framework e sem dependências de execução. Links nativos resolvem navegação e agendamento; JavaScript só será acrescentado se uma necessidade real aparecer. A prévia aprovada orienta a composição, mas não será usada como página final com os controles do brainstorming.

**Tech Stack:** HTML5, CSS, servidor local Node.js para prévia; ferramentas do navegador para verificação.

**Spec:** `docs/superpowers/specs/2026-11-05-dom-liborio-design.md`, aprovado pelo usuário em 2026-11-05.

## Global Constraints

- Visual moderno, preservando preto e dourado.
- Agendamento pelo WhatsApp como objetivo principal.
- Agendamento: https://wa.link/bmboc0.
- Slogan: “Estilo e sofisticação em cada corte”.
- Conteúdo em português do Brasil, cidade e fatos verificados corretos.
- Fotos ilustrativas identificadas; nenhuma avaliação, preço, endereço ou disponibilidade inventados.
- Entrega local, sem publicação, mensagens ou serviços de reserva simulados.
- Sem framework e sem dependências de execução.

## Review Focus

- Tela de 360 px: conteúdo e links permanecem visíveis, sem transbordamento horizontal.
- Teclado: foco visível e acesso direto ao conteúdo e ao agendamento.
- Falha de fontes ou imagem externa: texto legível, composição utilizável e WhatsApp acessível.
- Serviços não confirmados: apresentação não promete disponibilidade ou preços.
- Links externos: destinos exatos, abertura segura e nenhum envio automático de mensagens.

## Arquivos e responsabilidades

- `index.html`: conteúdo, estrutura, metadados, links e acessibilidade.
- `styles.css`: cores, tipografia, composição, estados de foco e adaptação às telas.
- `tools/serve.mjs`: servidor de desenvolvimento limitado à pasta do projeto e ao endereço local.
- `README.md`: execução da prévia, limites da versão e pontos de substituição de conteúdo.
- `.gitignore`: preservar exclusão de `.superpowers/`; ignorar apenas arquivos locais necessários.

## Verificação proporcional

É uma página editorial de baixo impacto, com links nativos. Usar verificações reais no navegador; não criar testes que apenas repitam o conteúdo do HTML. Se surgir lógica própria com comportamento relevante, aplicar TDD a essa lógica antes de implementá-la.

### Task 1: Página completa com conteúdo verificável

**Files:** Create `index.html`, `styles.css`, `tools/serve.mjs`.

**Interfaces:**
- Consome a composição da prévia e os fatos da especificação.
- Produz `#inicio`, `#conteudo`, `#servicos`, `#sobre` e `#agendar` para navegação interna.
- Todas as chamadas de WhatsApp usam `https://wa.link/bmboc0`; Instagram usa `https://www.instagram.com/dom_liborio/`.

- [x] Ler a prévia aprovada e confirmar os fatos e limites da especificação.
- [x] Criar `index.html` com `lang="pt-BR"`, título descritivo, descrição, um `h1`, hierarquia de títulos e link para pular ao conteúdo.
- [x] Criar cabeçalho, abertura dividida, faixa editorial, serviços sugeridos, apresentação, encerramento e rodapé. Usar o slogan exato; identificar fotografia ilustrativa junto à imagem e serviços sujeitos à consulta junto às categorias.
- [x] Criar `styles.css` com fundo `#10110f`, dourado `#c5a568`, texto claro `#f2eee5`, texto secundário legível e bordas discretas. Manter títulos condensados e alternativas locais de fontes.
- [x] Criar `tools/serve.mjs` com módulos nativos de Node.js. Servir `index.html` e arquivos estáticos com MIME correto, limitar caminhos à raiz, negar caminhos internos como `.git` e `.superpowers`, retornar 404 para arquivo inexistente e escutar apenas em `127.0.0.1:4173`.
- [x] Executar `node --check tools/serve.mjs`; esperar saída sem erros.
- [x] Executar `node tools/serve.mjs` e abrir `http://localhost:4173/`; confirmar página carregada, navegação entre seções e destinos dos links sem enviar mensagens.
- [x] Se houver repositório local, registrar os arquivos com commit `feat: build Dom Liborio landing page`.

### Task 2: Acabamento responsivo e acessível

**Files:** Modify `styles.css`, `index.html` conforme a inspeção.

**Interfaces:**
- Preserva IDs, conteúdo verificado e destinos externos da Task 1.
- Produz a mesma página utilizável em celular, computador e por teclado.

- [x] Inspecionar em 1440 × 900 e 360 × 800; verificar abertura, todas as seções e rodapé. Não deve existir rolagem horizontal, sobreposição ou corte de texto.
- [x] Ajustar abertura para coluna única em celular e navegação compacta, mantendo o agendamento visível.
- [x] Percorrer a página por teclado. Confirmar link para pular ao conteúdo, foco visível, ordem de leitura e chegada ao WhatsApp.
- [x] Verificar dimensões reservadas para a imagem e alternativas locais das fontes; confirmar que o texto e os links funcionam sem carregamento externo.
- [x] Respeitar `prefers-reduced-motion` se houver transições ou rolagem suave. Não acrescentar animação sem finalidade.
- [x] Conferir legenda de foto ilustrativa, serviços sujeitos à consulta e ausência de preços, avaliações e endereço inventados.
- [x] Salvar imagens da página em computador e celular como evidência de revisão.
- [x] Se houver repositório local, registrar ajustes com commit `fix: polish responsive layout and accessibility` quando houver mudanças.

### Task 3: Entrega e revisão final

**Files:** Create `README.md`; Modify documentação do plano para registrar conclusão real.

**Interfaces:**
- Consome arquivos e verificações das Tasks 1 e 2.
- Produz instruções reproduzíveis para abrir a página e identificar conteúdo pendente.

- [x] Escrever `README.md` com `node tools/serve.mjs`, URL local, necessidade de Node.js e encerramento pelo terminal.
- [x] Documentar fotografia ilustrativa, categorias de serviços propostas e ausência de dados verificados sobre endereço, horários e preços. Explicar onde substituir imagem e informações.
- [x] Solicitar revisão independente da implementação contra especificação e plano. Corrigir problemas comprovados; verificar novamente apenas o que as correções afetarem.
- [x] Aplicar `verification-before-completion`: confirmar servidor, página, navegação, destinos externos, responsividade e evidências antes de declarar a entrega.
- [x] Marcar os itens concluídos deste plano e registrar limitações reais. Não marcar verificações não executadas.
- [x] Se houver repositório local, registrar documentação com commit `docs: document local preview and content limits`; aplicar a skill de finalização conforme o estado real do projeto.
- [x] Abrir a página final no navegador e entregar URL local com resumo curto das verificações e limites.

## Auto-revisão do plano

Cobertura conferida contra a especificação: estrutura, identidade, conteúdo verificado, WhatsApp, Instagram, responsividade, acessibilidade, falhas de recursos externos e entrega local estão associados às tarefas acima. Não há API, banco de dados ou lógica de reserva que justifique infraestrutura adicional. Decisões menores de medidas e espaçamento ficam com o implementador.

## Resultado da execução

Concluído em 2026-11-05. Página e instruções entregues, teste HTTP passou, inspeção do navegador em 1440 × 900 e 360 × 800 sem transbordamento, navegação interna e acesso por teclado verificados. Revisão independente não encontrou correções obrigatórias.

Adaptações: prévia em http://localhost:4175/ porque a porta 4173 estava ocupada; sem commits porque não existe repositório Git. Falhas de rede de fontes/imagem não foram simuladas: alternativas foram inspecionadas no código. Capturas com tamanho de tela substituído têm limitação de corte no navegador; a captura no tamanho normal está completa. Decisões e evidências constam em `docs/superpowers/2026-11-05-dom-liborio-execution.md`.
