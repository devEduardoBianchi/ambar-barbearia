# Âmbar Barbearia — projeto conceitual

Landing page fictícia para portfólio, feita com React, TypeScript, Vite e GSAP. Marca, pessoas, história, serviços, preços e depoimentos são ilustrativos. Não representa um estabelecimento em funcionamento nem um trabalho contratado.

## Rodar localmente

Use Node.js 24.x e npm. A versão está indicada em `.nvmrc` e `package.json`.

```sh
npm ci
npm run dev
```

Abra a URL informada no terminal. No PowerShell, se `npm.ps1` estiver bloqueado, use `npm.cmd` nos mesmos comandos, sem alterar a política de execução do computador.

## Publicação e verificação

| Comando | Finalidade |
| --- | --- |
| `npm run dev` | Desenvolvimento com atualização automática |
| `npm test` | Testes de componentes e comportamento |
| `npm run typecheck` | Verificação de tipos |
| `npm run build` | Verificação de tipos, build e pré-renderização de HTML |
| `npm run preview` | Prévia do build, com os cabeçalhos de segurança configurados |
| `npm run check` | Testes, build e conferência dos arquivos de publicação |
| `npm audit` | Consulta de vulnerabilidades conhecidas das dependências |

O resultado publicável fica em `dist/`. O servidor de desenvolvimento não é a versão de produção.

## Publicar na Vercel

1. Execute `npm run check`.
2. Confira os arquivos alterados no GitHub Desktop, faça commit e push. A Vercel conectada ao GitHub usa o código enviado, não as alterações locais.
3. Importe o repositório na Vercel e selecione a pasta que contém este `package.json` como raiz do projeto.
4. Use preset **Vite**, Node.js **24.x**, instalação `npm ci`, build `npm run build` e saída `dist`.
5. Não são necessárias variáveis de ambiente para esta demonstração.
6. Depois do deploy, teste navegação, imagens, mapa, carrossel, horários e aviso de demonstração em desktop e celular.

`vercel.json` já define instalação, build, saída e cabeçalhos. Não há roteador com caminhos internos; a navegação usa âncoras, então não é necessário redirecionar todos os caminhos para `index.html`.

Confirme os cabeçalhos no endereço publicado, por exemplo com `curl.exe -I https://SEU-PROJETO.vercel.app`. Devem aparecer `Content-Security-Policy`, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy` e `Permissions-Policy`. A configuração local não substitui essa verificação após o deploy.

Documentação oficial: [Vite na Vercel](https://vercel.com/docs/frameworks/frontend/vite) e [configuração do projeto](https://vercel.com/docs/project-configuration/vercel-json).

## Demonstração

- WhatsApp e Instagram abrem um aviso de demonstração, sem contas reais conectadas.
- O mapa mostra apenas Dourados–MS; o endereço da barbearia é fictício.
- Nomes, depoimentos e notas são exemplos, sem vínculo com o Google ou clientes reais.
- Logo, fachada, galeria e serviços usam imagens geradas com imagegen. Prompts: `output/imagegen/portfolio-prompts.md`.
- Não há agenda, pagamento nem cadastro de clientes conectado.
- Assets novos: `public/assets/portfolio/`. O fundo atmosférico da hero também é uma imagem ilustrativa gerada.
- `.portfolio-originals/` guarda arquivos antigos localmente e é ignorada pelo Git. `.vercelignore` também exclui arquivos locais do envio pela CLI.

## Segurança e privacidade

- Não coloque senhas, tokens ou chaves em `public/` ou em variáveis `VITE_*`: tudo que chega ao navegador é público.
- `.env*`, `.vercel/`, logs, dependências e builds são ignorados pelo Git. Isso não remove arquivos que já tenham sido versionados.
- O build não contém os arquivos antigos da empresa real. O histórico Git pode continuar contendo esses arquivos: antes de tornar o código público, revise o histórico ou publique a versão fictícia em um repositório novo com histórico limpo.
- A política CSP permite scripts apenas da própria origem. Estilos inline são permitidos para os componentes e animações atuais; fontes Google e iframe do Google Maps têm origens específicas autorizadas.
- Google Fonts e Maps fazem requisições a serviços externos. Não há analytics instalado nem formulário que armazene dados.
- O relatório da revisão está em `security_best_practices_report.md`.

## Estrutura e manutenção

- `src/App.tsx`: composição das seções e conteúdo demonstrativo.
- `src/components/`: componentes visuais, carrossel e animações.
- `styles.css`: estilos globais e responsividade.
- `public/`: arquivos copiados para a publicação.
- `tools/prerender.mjs`: geração do HTML inicial com React.
- `tools/check-release.mjs`: confere referências locais do HTML e impede alguns arquivos e identificadores antigos no build. É uma proteção específica, não um scanner completo de segredos.

## Limites conhecidos

As imagens ainda precisam de otimização para WebP/AVIF e tamanhos responsivos: o build revisado tem aproximadamente 23,2 MiB. Os testes de componentes usam jsdom e não validam renderização WebGL; a conferência visual continua necessária. Há componentes JavaScript fora da checagem estrita do TypeScript e ainda não há ESLint configurado.

A revisão local de 09/11/2026 passou em 6 testes, tipos, build e conferência de publicação. `npm audit` informou zero vulnerabilidades conhecidas naquele momento. O ambiente local usou Node 25.7.0; a execução em Node 24.x e os cabeçalhos reais devem ser confirmados no primeiro deploy. Nenhum deploy é realizado por esses comandos locais.
