# Plano: migrar a landing page para React e instalar SplitText

## Objetivo

Migrar a landing page Dom Libório, atualmente HTML/CSS/JS estático, para React com Vite e TypeScript. Instalar pelo comando pedido `npx shadcn@latest add @react-bits/SplitText-TS-TW` e aplicar o efeito SplitText de forma discreta no título principal.

## Restrições aprovadas

- Preservar identidade preta e dourada, conteúdo, fotos, links, valores, seções, layout responsivo e animações discretas já aprovados.
- Manter navegação por teclado, HTML semântico, movimento reduzido e conteúdo legível sem depender da animação.
- Usar Vite para continuar uma landing page estática simples; Tailwind entra para compatibilidade com a variante `TS-TW`.
- Não alterar preços, avaliações, horários, endereço ou dados do WhatsApp.

## Etapas

1. [x] Configurar projeto React/Vite/TypeScript, Tailwind e testes.
2. [x] Criar testes de interface; confirmar falha antes da migração e sucesso após.
3. [x] Migrar a página para React mantendo textos, IDs, links e fotografia.
4. [x] Executar o comando React Bits solicitado e instalar as dependências GSAP.
5. [x] Integrar SplitText ao título com fade curto, respeitando movimento reduzido e preservando texto acessível.
6. [x] Atualizar documentação e prévia Vite; retirar servidor HTML e script antigos.
7. [x] Rodar testes, tipos e build; revisar o navegador em desktop e celular; obter revisão independente.

## Critérios de aceite

- `npm test`, `npm run typecheck` e `npm run build` passam.
- Página conserva os conteúdos e destinos anteriores.
- `SplitText-TS-TW` fica instalado no projeto e é usado no título principal.
- Sem movimento reduzido, a animação é curta e de baixa intensidade; com movimento reduzido ou sem JavaScript, o texto permanece legível.
- Desktop e celular não apresentam overflow horizontal nem regressões visuais relevantes.
