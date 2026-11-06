import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { createServer } from 'vite';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outputPath = path.join(projectRoot, 'dist', 'index.html');
const vite = await createServer({
  configFile: path.join(projectRoot, 'vite.config.ts'),
  server: { middlewareMode: true },
  appType: 'custom',
});

try {
  const { default: App } = await vite.ssrLoadModule('/src/App.tsx');
  const content = renderToString(createElement(App));
  const page = await readFile(outputPath, 'utf8');
  const placeholder = '<div id="root"></div>';

  if (!page.includes(placeholder)) {
    throw new Error('Raiz #root vazia não foi encontrada no HTML gerado pelo Vite.');
  }

  await writeFile(outputPath, page.replace(placeholder, `<div id="root">${content}</div>`));
  process.stdout.write('Conteúdo React pré-renderizado em dist/index.html.\n');
} finally {
  await vite.close();
}
