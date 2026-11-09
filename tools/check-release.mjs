import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const failures = [];
async function filesIn(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map(entry => entry.isDirectory()
    ? filesIn(path.join(directory, entry.name)) : [path.join(directory, entry.name)]));
  return nested.flat();
}
const files = await filesIn(dist);
let bytes = 0;
for (const file of files) {
  const relative = path.relative(dist, file).replaceAll('\\', '/');
  bytes += (await stat(file)).size;
  if (/(^|\/)(?:\.git|\.env(?:\..*)?|\.portfolio-originals|node_modules|barbearia)(\/|$)|\.map$/i.test(relative)) {
    failures.push(`Arquivo local indevido no build: ${relative}`);
  }
  if (/\.(?:html|js|css|json)$/i.test(file)) {
    const text = await readFile(file, 'utf8');
    if (/dom[-_ ]?lib[oó]rio|caio[_ -]?(?:mfl|magalh|atendimento)|wa\.link\/bmboc0|99891-?9734/i.test(text)) {
      failures.push(`Referência à identidade anterior no build: ${relative}`);
    }
    if (/-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/.test(text)) {
      failures.push(`Possível chave privada em ${relative}; não publicar.`);
    }
  }
}
const html = await readFile(path.join(dist, 'index.html'), 'utf8');
if (!html.includes('Projeto conceitual')) failures.push('Identificação de projeto conceitual ausente.');
for (const match of html.matchAll(/(?:src|href)="(\/[^"?#]*)/g)) {
  const target = path.resolve(dist, '.' + match[1]);
  if (!target.startsWith(dist + path.sep)) { failures.push('Referência fora do diretório de publicação.'); continue; }
  try { await stat(target); } catch { failures.push(`Asset ausente: ${match[1]}`); }
}
if (failures.length) {
  failures.forEach(failure => process.stderr.write(failure + '\n'));
  process.exitCode = 1;
} else {
  process.stdout.write(`Build conferido: ${files.length} arquivos, ${(bytes / 1024 / 1024).toFixed(1)} MiB; referências locais presentes e nenhum arquivo proibido encontrado.\n`);
}
