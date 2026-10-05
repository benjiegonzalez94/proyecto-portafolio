/**
 * auditar-sitio.mjs — Auditoría del sitio compilado.
 *
 * Recorre todas las páginas HTML de dist/, extrae los enlaces internos y los
 * recursos referenciados (CSS, imágenes, scripts, fuentes) y comprueba que
 * todos respondan correctamente en el servidor de vista previa.
 *
 * Uso:
 *   1. pnpm build
 *   2. pnpm preview          (en otra terminal)
 *   3. node auditar-sitio.mjs
 */

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const BASE = process.env.SITIO_URL ?? 'http://127.0.0.1:4322';
const DIST = 'dist';

/** Devuelve todos los archivos .html dentro de dist/ */
function buscarHtml(dir) {
  const out = [];
  for (const nombre of readdirSync(dir)) {
    const ruta = join(dir, nombre);
    if (statSync(ruta).isDirectory()) out.push(...buscarHtml(ruta));
    else if (nombre.endsWith('.html')) out.push(ruta);
  }
  return out;
}

/** Convierte la ruta de un archivo en su URL pública */
function aUrl(ruta) {
  let p = relative(DIST, ruta).replace(/\\/g, '/');
  if (p.endsWith('index.html')) p = p.slice(0, -'index.html'.length);
  if (p && !p.startsWith('/')) p = '/' + p;
  return p || '/';
}

const archivosHtml = buscarHtml(DIST);
const paginas = archivosHtml.map(aUrl).sort();
console.log(`Páginas HTML encontradas: ${paginas.length}\n`);

const enlaces = new Set();
const recursos = new Set();

// Se recorre cada archivo y se guarda su contenido, para no volver a deducir
// la ruta desde la URL (404.html no sigue el patrón carpeta/index.html).
for (const archivo of archivosHtml) {
  const html = readFileSync(archivo, 'utf8');

  // Enlaces <a href="...">
  for (const m of html.matchAll(/<a\b[^>]*\shref="([^"]+)"/g)) {
    const href = m[1];
    if (/^(https?:|mailto:|tel:|#|data:)/.test(href)) continue;
    enlaces.add(href.split('#')[0] || '/');
  }

  // Recursos: src, srcset, href de CSS u otros archivos
  for (const m of html.matchAll(/\s(?:src|href)="(\/[^"]+\.(?:css|js|svg|png|jpe?g|webp|avif|woff2?|ico))"/g)) {
    recursos.add(m[1]);
  }
  // srcset con varios candidatos
  for (const m of html.matchAll(/\ssrcset="([^"]+)"/g)) {
    for (const parte of m[1].split(',')) {
      const u = parte.trim().split(/\s+/)[0];
      if (u.startsWith('/')) recursos.add(u);
    }
  }
}

/** Comprueba una URL y devuelve el código de estado, o el error */
async function comprobar(url, tipo) {
  const completa = url.startsWith('http') ? url : BASE + url;
  try {
    const r = await fetch(completa, { redirect: 'follow' });
    return { url, tipo, status: r.status, ok: r.ok };
  } catch (e) {
    return { url, tipo, status: 0, ok: false, error: String(e.message ?? e) };
  }
}

console.log(`Enlaces internos únicos: ${enlaces.size}`);
console.log(`Recursos referenciados:   ${recursos.size}\n`);

const objetivos = [
  ...[...enlaces].map((u) => ({ url: u, tipo: 'enlace' })),
  ...[...recursos].map((u) => ({ url: u, tipo: 'recurso' })),
];

const resultados = [];
// Se comprueban en tandas para no saturar el servidor
for (let i = 0; i < objetivos.length; i += 12) {
  resultados.push(...(await Promise.all(objetivos.slice(i, i + 12).map((o) => comprobar(o.url, o.tipo)))));
}

const fallos = resultados.filter((r) => !r.ok);

console.log('--- Resultado ---');
console.log(`Comprobados: ${resultados.length}`);
console.log(`Correctos:   ${resultados.length - fallos.length}`);
console.log(`Fallos:      ${fallos.length}`);

if (fallos.length) {
  console.log('\nDetalle de los fallos:');
  for (const f of fallos) {
    console.log(`  [${f.tipo}] ${f.url} -> ${f.status || f.error}`);
  }
}

process.exit(fallos.length ? 1 : 0);
