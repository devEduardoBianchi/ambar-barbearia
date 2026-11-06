# Dom Libório

Landing page da Barbearia Dom Libório, em Dourados–MS. Feita com React, TypeScript e Vite, com identidade preta e dourada e agendamento pelo WhatsApp.

## Rodar localmente

Requer Node.js compatível com Vite 8 (Node 20.19+ ou 22.12+) e npm.

```powershell
npm install
npm run dev
```

Abra a URL impressa pelo Vite (por padrão, http://localhost:5173/). Encerre o servidor com `Ctrl+C`.

## Build e prévia de produção

```powershell
npm run build
npm run preview
```

O build verifica os tipos, gera os arquivos estáticos em `dist/` e pré-renderiza o conteúdo React no HTML. Assim, textos e links continuam disponíveis antes da animação e sem JavaScript ativo.

## Testes e tipos

```powershell
npm test
npm run typecheck
```

## Estrutura

- `src/App.tsx`: seções, conteúdo e dados da página.
- `src/components/SplitText.tsx`: componente React Bits instalado pelo shadcn; GSAP anima discretamente o título principal.
- `src/index.css`: carrega Tailwind para o componente e `styles.css` para o visual aprovado.
- `src/main.tsx`: hidrata o HTML pré-renderizado, ou monta o app no servidor de desenvolvimento.
- `tools/prerender.mjs`: gera a página HTML estática para o build.
- `public/assets/caio-atendimento.png`: fotografia real fornecida pelo usuário.

## Conteúdo

Nome, cidade, ano de início, proprietário, slogan e WhatsApp foram consultados no Instagram público [@dom_liborio](https://www.instagram.com/dom_liborio/). Os botões abrem uma conversa no WhatsApp; não enviam mensagens nem confirmam horários automaticamente.

Os seis serviços e preços foram transcritos da tabela de preços fornecida pelo usuário. Confirme os valores ao agendar; não houve confirmação adicional com o proprietário.

Endereço, horários, nota 5,0, contagem de 124 avaliações e os três trechos foram consultados no perfil Google Maps indicado pelo usuário em **05/11/2026**. Os dados são estáticos, sem conexão automática com a API do Google; atualize-os após consultar novamente o perfil.
