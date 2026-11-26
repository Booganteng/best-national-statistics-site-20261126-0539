// NUSA DATA — Portal Statistik Indonesia. Entry program (Node 22, standard
// library only). The site is plain static files under app/: five pages, one
// stylesheet, and three small scripts, with no build step and nothing loaded
// over the network. This program hands the site in: it copies app/ and
// screenshots/ from beside this file into the output directory and writes
// dossier.json there, built by the vendored make.fun library so the judge can
// read the screenshots, the first load, and the source.
//
// Outside the grader, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
// Serve the site locally with: node serve.ts  (then http://localhost:8080)

import { cpSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const repoRoot = fileURLToPath(new URL('.', import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

function copyTree(from, to) {
  if (!existsSync(from)) return;
  mkdirSync(to, { recursive: true });
  cpSync(from, to, { recursive: true });
}

mkdirSync(outDir, { recursive: true });
copyTree(join(repoRoot, 'app'), join(outDir, 'app'));
copyTree(join(repoRoot, 'screenshots'), join(outDir, 'screenshots'));

// The scorer's own caps: at most 4 screenshots, each at most 256 KiB; app/
// at most 993 files and directories and 16 MiB; the dossier text at most
// 160 KiB. buildDossier refuses anything past those limits, so a successful
// run here means the entry fits the gate.
const dossier = buildDossier(outDir, {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  app_max_files: 993,
  app_max_bytes: 16777216,
});
writeFileSync(join(outDir, 'dossier.json'), dossier);
