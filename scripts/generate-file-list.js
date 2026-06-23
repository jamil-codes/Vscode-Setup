/**
 * generate-file-list.js
 * ---------------------
 * Walks the repository (excluding .git, node_modules, and the generated site directory)
 * and creates two artifacts inside the site folder:
 *   1. `files.json` – a JSON array of file metadata { path, size }
 *   2. Copies each file into `site/files/<path>` preserving the directory hierarchy.
 *
 * This script is intended to be run locally (or via a CI workflow) before committing the site.
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..'); // repository root
const SITE_DIR = path.join(ROOT_DIR, 'site');
const OUTPUT_JSON = path.join(SITE_DIR, 'files.json');
const OUTPUT_FILES_ROOT = path.join(SITE_DIR, 'files');

// Directories to ignore during the walk
const IGNORED = new Set([
  '.git',
  'node_modules',
  'site', // the generated site itself – we don't want to embed the site inside itself
  '.claude', // internal Claude metadata
]);

/** Recursively walk a directory and collect file info */
function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (IGNORED.has(entry.name)) continue;
    const fullPath = path.join(dir, entry.name);
    const relPath = path.relative(ROOT_DIR, fullPath).replace(/\\/g, '/'); // use forward slashes
    if (entry.isDirectory()) {
      files.push(...walk(fullPath));
    } else if (entry.isFile()) {
      const stats = fs.statSync(fullPath);
      files.push({ path: relPath, size: stats.size });
    }
  }
  return files;
}

function ensureDirSync(p) {
  if (!fs.existsSync(p)) {
    fs.mkdirSync(p, { recursive: true });
  }
}

function copyFile(src, dest) {
  ensureDirSync(path.dirname(dest));
  fs.copyFileSync(src, dest);
}

function main() {
  console.log('Generating file list...');
  const fileList = walk(ROOT_DIR);

  // Write files.json
  ensureDirSync(SITE_DIR);
  fs.writeFileSync(OUTPUT_JSON, JSON.stringify(fileList, null, 2), 'utf8');
  console.log(`Wrote ${OUTPUT_JSON} (${fileList.length} entries)`);

  // Copy files into site/files/<path>
  console.log('Copying files into site/files/...');
  for (const { path: relPath } of fileList) {
    const src = path.join(ROOT_DIR, relPath);
    const dest = path.join(OUTPUT_FILES_ROOT, relPath);
    copyFile(src, dest);
  }
  console.log('Copy complete.');
}

main();
