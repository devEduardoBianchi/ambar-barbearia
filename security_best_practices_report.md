# Revisão de segurança, qualidade e publicação

Data: 09/11/2026. Projeto: Âmbar Barbearia, demonstração fictícia de portfólio.

## Resultado

Não foram identificadas vulnerabilidades críticas ou altas no código examinado. `npm audit --json` retornou zero vulnerabilidades conhecidas. Isso não garante ausência de falhas: a revisão foi estática, com testes locais e uma conferência limitada da prévia no navegador, sem pentest nem auditoria completa do histórico Git.

A configuração de publicação foi preparada, mas nenhum deploy, commit ou push foi realizado nesta revisão. A principal melhoria pendente é o peso das imagens. Os demais pontos abaixo são recomendações de qualidade ou verificações operacionais, não vulnerabilidades exploráveis confirmadas.

## Escopo e evidências

- React, TypeScript/JavaScript, estilos, componentes de animação, arquivos públicos, pré-renderização e configuração Vite/Vercel.
- Sem backend, autenticação, pagamentos, banco ou envio de formulário. Os contatos são demonstrações; não há credenciais necessárias.
- Busca por padrões comuns de chaves privadas e tokens nos arquivos atuais de texto, excluindo dependências, arquivos binários, backups e histórico Git: nenhum arquivo correspondente encontrado. Essa busca por padrões não é uma garantia de detecção de todos os tipos de segredo.
- `npm run check`: 2 arquivos de testes e 6 testes aprovados; tipos e build aprovados; 17 arquivos de saída, 23,2 MiB; referências locais examinadas presentes e nenhum arquivo proibido detectado.
- HTTP 200 na prévia de produção local com CSP e os quatro cabeçalhos adicionais presentes. O navegador abriu o aviso de contato demonstrativo, retornou à página e mostrou mapa e fachada. A leitura do console pela ferramenta retornou lista vazia; não substitui monitoramento nem teste completo de todas as interações.
- Os testes jsdom emitem aviso de canvas não implementado e não verificam GPU/WebGL. O mapa depende de rede externa. Não foram medidos Lighthouse, Core Web Vitals nem desempenho em conexão móvel.

## Críticas e altas

Nenhuma vulnerabilidade confirmada nesse escopo.

## Recomendações pendentes

### 1. Prioridade média — imagens pesadas (desempenho)

Evidência: imagens em `public/assets/portfolio/`, referenciadas em `src/App.tsx:317` e nas listas de conteúdo do mesmo arquivo; saída total de 23,2 MiB. Várias imagens PNG têm cerca de 2 MiB. O total do build não equivale ao download inicial, pois há imagens com carregamento tardio.

Impacto: mais transferência e demora para exibir imagens, especialmente no celular. Não é uma vulnerabilidade de segurança.

Recomendação: produzir WebP/AVIF, ajustar dimensões ao uso real, adicionar variantes com `srcset`/`sizes` e medir em rede móvel antes de afirmar que a página está rápida. Preservar transparência da logo.

### 2. Prioridade baixa — cobertura de análise de código incompleta (manutenção)

Evidência: `tsconfig.json:16` habilita JavaScript e a linha seguinte define `checkJs: false`. `package.json` não possui comando de lint. Componentes como `src/components/DepthCarousel.jsx` e `src/components/SideRays.jsx` ficam fora da checagem estrita de tipos.

Impacto: erros de hooks, acessibilidade ou variáveis em JavaScript podem escapar do build. TypeScript e seis testes não cobrem todos os comportamentos.

Recomendação: introduzir ESLint com regras de React/hooks e acessibilidade; migrar ou tipar os componentes JS progressivamente. Separar dados e seções do `App.tsx` quando houver nova manutenção, sem reescrever a página só por organização.

### 3. Prioridade baixa — trabalho de React durante animação (desempenho)

Evidência: `src/components/ui/holo-trading-card.tsx:489` atualiza `angles` no loop de animação. Há proteção contra valores iguais e cancelamento dos recursos no cleanup.

Impacto: mudanças de ângulo podem provocar renderizações de React frequentes enquanto o cartão se move. Não foi demonstrada perda de quadros nesta revisão.

Recomendação: medir com profiler; caso seja um gargalo, aplicar transformações visuais com refs/propriedades CSS e manter em estado apenas mudanças relevantes à interface.

### 4. Verificação operacional — histórico anterior não foi limpo

Evidência: o estado do Git contém remoções de arquivos da marca real; `.gitignore` ignora `.portfolio-originals/`. O checker do build não encontrou os identificadores antigos examinados na saída atual.

Impacto: ignorar e remover arquivos do build não remove cópias de commits antigos. Tornar o repositório público pode expor o material anterior mesmo com o site fictício.

Recomendação: revisar o histórico antes de disponibilizar o código público ou criar um repositório separado somente com a versão fictícia. Nenhum histórico foi reescrito e nenhum arquivo de backup foi apagado.

### 5. Verificação operacional — confirmar ambiente e cabeçalhos publicados

Evidência: `package.json` e `.nvmrc` definem Node 24.x; a revisão local rodou em Node 25.7.0. `vercel.json` configura o build e as proteções; `vite.config.ts` replica os cabeçalhos na prévia.

Impacto: a verificação local não demonstra execução em Node 24 nem aplicação dos cabeçalhos no domínio final.

Recomendação: conferir o primeiro build Vercel, respostas HTTP e fluxos em desktop/celular. Não há deploy remoto verificado nesta revisão.

## Preparação e pequenos ajustes aplicados

- `vercel.json`: instalação por lockfile (`npm ci`), saída limitada a `dist`, CSP, proteção contra enquadramento, `nosniff`, política de referência e restrição de câmera/microfone/geolocalização.
- `.gitignore` e `.vercelignore`: exclusão de arquivos de ambiente, configuração local Vercel, backups, dependências e arquivos auxiliares conforme o mecanismo de envio.
- `tools/check-release.mjs`: validação específica da saída e referências locais do HTML; não é um scanner completo de segredos nem verifica todas as URLs de CSS.
- `src/App.tsx:137`: guarda `instanceof Element` antes de usar `closest` no evento de contato. `src/App.tsx:299`: descrição acessível do link externo do mapa corrigida.
- README ampliado com instalação, comandos, publicação e limites.

## Pontos adequados observados

- TypeScript estrito para TS/TSX, lockfile versionado, build sem source maps públicos na saída examinada e HTML pré-renderizado.
- Navegação externa do mapa usa `noopener noreferrer` (`src/App.tsx:299`). Contatos são interceptados e abrem `dialog` rotulado (`src/App.tsx:332`).
- Listener de scroll possui cleanup (`src/App.tsx:131`); componentes animados examinados também possuem mecanismos de cancelamento. Isso não equivale a prova de ausência de vazamentos em todos os cenários.
- O uso de `dangerouslySetInnerHTML` em `src/components/ui/holo-trading-card.tsx:294` recebe uma constante interna de CSS, não texto de usuário. Não foi encontrado caminho de entrada não confiável até esse ponto; não há evidência de XSS ali.
- CSP usa `script-src 'self'`, sem `unsafe-eval` nem scripts inline. `style-src` mantém `unsafe-inline` como exceção documentada para estilos React, GSAP e CSS interno do cartão. Fontes Google e iframe de mapas têm origens específicas permitidas. Alterações de integrações exigirão nova validação da política.
- Google Fonts e Google Maps são serviços externos e recebem requisições do visitante. Não foi encontrado analytics instalado nem coleta própria de dados.

## Referências

- [Vite na Vercel](https://vercel.com/docs/frameworks/frontend/vite).
- [Configuração Vercel](https://vercel.com/docs/project-configuration/vercel-json).
- [Versões Node na Vercel](https://vercel.com/docs/functions/runtimes/node-js/node-js-versions).

As recomendações de manutenção e desempenho não foram aplicadas como uma refatoração ampla nesta revisão.
