# Dom Libório — Conteúdo Real e Movimento Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Atualizar a página com foto real, preços fornecidos, avaliações verificadas, localização e animações discretas.

**Architecture:** Preservar a página estática existente. Acrescentar uma fotografia local e interações progressivas com CSS e IntersectionObserver, sem biblioteca externa. Manter o servidor local com lista explícita de arquivos públicos.

**Tech Stack:** HTML5, CSS, JavaScript nativo, Node.js, node:test e navegador.

**Spec:** `docs/superpowers/specs/2026-11-05-dom-liborio-acabamento-design.md`, aprovado pelo usuário.

## Global Constraints

- Visual moderno, preto e dourado; animações discretas e elegantes.
- WhatsApp: https://wa.link/bmboc0.
- Preços: corte social R$ 30; corte degradê R$ 35; barba R$ 25; sobrancelha R$ 5; corte social e barba R$ 55; corte degradê e barba R$ 60.
- Avaliações: trechos selecionados, autor público e cinco estrelas, com origem no Maps e consulta em 05/11/2026.
- Nota observada: 5,0 de 5, com 124 avaliações. Não simular atualização automática.
- Endereço: R. Cuiabá, 1728 — Centro, Dourados–MS, 79830-220.
- Segunda a sexta: 09h–11h e 13h–18h30; sábado: 09h–11h e 13h–18h; domingo: fechado.
- Usar apenas a foto fornecida; sem galeria inventada, publicação ou integração paga.
- Conteúdo utilizável sem JavaScript e com preferência por movimento reduzido.

## Review Focus

- Falha ou ausência de JavaScript: nenhuma seção permanece escondida; preços e contatos continuam disponíveis.
- Preferência de movimento reduzido, inclusive alteração durante a visita: animações deixam de ocorrer.
- Tela estreita: preços, nomes dos avaliadores e horários não provocam transbordamento.
- Novos arquivos públicos: foto e interações carregam, documentos e ferramentas continuam inacessíveis pelo servidor.
- Origem dos dados: trechos não viram depoimentos integrais e nota não aparenta atualização automática.

## Arquivos

- Modify `index.html`: foto, tabela, avaliações, informações de visita e carregamento do script.
- Modify `styles.css`: seções novas, enquadramento da foto, movimento e adaptação.
- Create `interactions.js`: revelação progressiva, sem lógica comercial.
- Create `assets/caio-atendimento.png`: cópia sem edição da fotografia fornecida.
- Modify `tools/serve.mjs`, `tools/serve.test.mjs`: novos arquivos públicos e teste HTTP.
- Modify `README.md`: fontes de conteúdo, manutenção manual e novos arquivos.
- Create `docs/superpowers/2026-11-05-dom-liborio-acabamento-execution.md`: decisões e verificação.

### Task 1: Conteúdo real e arquivos públicos

**Interfaces:**
- `index.html` preserva `#inicio`, `#conteudo`, `#servicos`, `#sobre` e `#agendar`; acrescenta `#avaliacoes` e `#visita`.
- A fotografia usa `/assets/caio-atendimento.png`; o script posterior usa `/interactions.js`.
- O Maps usa a URL completa verificada na especificação, sem inventar um link abreviado.
- `createPreviewServer(root)` mantém sua assinatura e a restrição de endereço local.

- [x] Ler a especificação e conferir o estado atual dos arquivos antes de editar.
- [x] Atualizar o teste HTTP com arquivos controlados para fotografia e script: GET retorna 200, MIME `image/png` e `text/javascript`, e conteúdo idêntico ao fixture. Incluir um arquivo vizinho não público em `assets/` que retorna 404.
- [x] Executar `node --test tools/serve.test.mjs`; observar falha por 404 nos novos recursos ainda ausentes da lista pública.
- [x] Acrescentar apenas os dois caminhos exatos à lista pública em `tools/serve.mjs`; repetir o teste até passar sem abrir o restante da pasta.
- [x] Copiar a fotografia de `C:/Users/peiti/AppData/Local/Temp/codex-clipboard-453ec780-da71-4870-8010-b0919a531304.png` para `assets/caio-atendimento.png`. Não editar o bitmap. Atualizar texto alternativo, legenda e dimensões reais no HTML, usando enquadramento CSS que favoreça rosto e mãos e evite os controles do Instagram nas bordas.
- [x] Substituir os serviços propostos pela tabela acessível com os seis serviços e valores exatos. Acrescentar nota curta para confirmar valores ao agendar.
- [x] Inserir `#avaliacoes` com os três trechos exatos e nomes da especificação, estrelas acessíveis, origem, data de consulta e link para ler no Google. Apresentar os trechos como seleção, sem avatares fabricados.
- [x] Inserir `#visita` com endereço, horários e link para abrir o Maps. Atualizar navegação sem sobrecarregar o cabeçalho em celular.
- [x] Adaptar CSS às novas seções preservando o desenho aprovado e executar `node --check tools/serve.mjs` e o teste HTTP completo.
- [x] Abrir a página e conferir foto, valores, atribuições, horários e links em computador e celular. Sem Git, registrar os resultados no documento de execução; se um repositório tiver sido criado pelo usuário, seguir suas convenções de commit.

### Task 2: Movimento discreto, revisão e entrega

**Interfaces:**
- `interactions.js` consome elementos `[data-reveal]` e acrescenta a classe `.is-revealed` uma única vez quando entram na tela.
- `.is-revealed` define animação CSS de opacidade e deslocamento até 16 px por aproximadamente 450 ms; a classe base não esconde conteúdo.
- O script é carregado com `defer`. Sem IntersectionObserver ou com movimento reduzido na inicialização, todo o conteúdo permanece visível e sem animação.

- [x] Aplicar a skill de interação e implementar `interactions.js`, marcações `data-reveal` e CSS de movimento. Não criar um estado global que esconda o site enquanto o script carrega.
- [x] Reutilizar o tratamento de foco existente; limitar respostas de botões a 180–220 ms e respeitar `prefers-reduced-motion` também quando a preferência muda durante a visita.
- [x] Executar `node --check interactions.js`; esperar saída sem erros.
- [x] Conferir no navegador em 1440 × 900 e 360 × 800: foto e conteúdo completos, sem transbordamento, preços alinhados, navegação por teclado e movimento sem bloquear interação.
- [x] Conferir implementação progressiva: sem classe de revelação, conteúdo visível; media query de redução desativa animações. Se ferramentas permitirem, simular preferência reduzida e ausência de script no navegador; registrar limites sem alegar cenários não executados.
- [x] Atualizar README para fotografia real, conteúdo fornecido, dados consultados em 05/11/2026 e manutenção manual das avaliações. Documentar servidor e arquivo de interações.
- [x] Solicitar revisão independente contra especificação, plano e Review Focus, corrigindo falhas comprovadas. Não repetir ciclos de revisão sem necessidade.
- [x] Aplicar `verification-before-completion`: verificar sintaxe, teste HTTP e carregamento final depois das últimas alterações relevantes. Salvar evidências visuais e atualizar os itens concluídos deste plano.
- [x] Deixar a página final aberta e entregar URL local, resultado da revisão e limites reais. Sem Git, finalização de branch não se aplica.

## Auto-revisão

Todos os requisitos do desenho aprovado estão ligados às duas tarefas. O teste cobre a mudança real no contrato HTTP e evita exposição acidental de arquivos; não serão criados testes que apenas procurem frases no HTML. As checagens visuais e de acessibilidade avaliam os efeitos da implementação. Preferência por execução direta com um revisor ao final permanece a mesma da entrega anterior.
