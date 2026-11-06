# Execução: React e SplitText

## Resumo

- React 19, TypeScript 7, Vite 8 e Tailwind 4 adicionados ao projeto.
- `npx shadcn@latest add @react-bits/SplitText-TS-TW` executado com sucesso; criou `src/components/SplitText.tsx`.
- SplitText aplicado ao título principal em fade curto, sem movimento de subida; leitor de tela recebe título único.
- Conteúdo, preços, reviews, endereço, horários, fotografia e links existentes mantidos.
- Build faz pré-render estático para conservar conteúdo visível antes do JavaScript.

## TDD

- RED: `src/App.test.tsx` falhou porque `src/App.tsx` ainda não existia.
- GREEN: 4 testes passaram: título acessível, 6 preços, WhatsApp/avaliações e texto visível no SplitText com movimento reduzido.
- Vitest usa threads e um worker porque o pool padrão encontrou uma restrição de renomeação de arquivos temporários no Windows.

## Verificação final

- `npm test -- --reporter=dot`: 4 passaram em 2 arquivos.
- `npm run typecheck`: passou.
- `npm run build`: passou; TypeScript, Vite e pré-render terminaram sem erros.
- Prévia de produção em `http://127.0.0.1:4177/`: título, foto e conteúdo verificados no navegador; sem erros de console.
- Desktop 1440×900 e celular 390×844: sem overflow horizontal; imagem natural com 971 px; seis preços presentes.
- Sem JavaScript: HTML de build pré-renderizado contém os textos e links da landing page.
- Teste real do componente confirma que movimento reduzido mantém o texto visível.
- Revisão independente: nenhum achado crítico ou importante; a observação menor sobre cobertura do SplitText foi resolvida com o teste direto.

## Arquivos principais

- `src/App.tsx`
- `src/components/SplitText.tsx`
- `src/main.tsx`
- `src/index.css`
- `vite.config.ts`
- `tools/prerender.mjs`
- `src/App.test.tsx`
- `src/SplitText.test.tsx`
