/**
 * Removes legacy per-slug page.tsx files replaced by dynamic routes.
 * Usage: node scripts/remove-legacy-content-pages.cjs
 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const appRoot = path.join(root, 'src', 'app', '[locale]');

function removeDir(dirPath) {
  if (!fs.existsSync(dirPath)) return;
  for (const entry of fs.readdirSync(dirPath)) {
    const entryPath = path.join(dirPath, entry);
    if (fs.statSync(entryPath).isDirectory()) removeDir(entryPath);
    else fs.unlinkSync(entryPath);
  }
  fs.rmdirSync(dirPath);
}

let removed = 0;

for (const category of fs.readdirSync(path.join(appRoot, 'resources'))) {
  const categoryDir = path.join(appRoot, 'resources', category);
  if (!fs.statSync(categoryDir).isDirectory()) continue;
  if (category === '[category]') continue;

  for (const slug of fs.readdirSync(categoryDir)) {
    if (slug === 'page.tsx') continue;
    const articleDir = path.join(categoryDir, slug);
    const pagePath = path.join(articleDir, 'page.tsx');
    if (fs.existsSync(pagePath)) {
      removeDir(articleDir);
      removed++;
    }
  }
}

for (const slug of fs.readdirSync(path.join(appRoot, 'blogs'))) {
  if (slug === 'page.tsx' || slug === '[slug]') continue;
  const articleDir = path.join(appRoot, 'blogs', slug);
  const pagePath = path.join(articleDir, 'page.tsx');
  if (fs.existsSync(pagePath)) {
    removeDir(articleDir);
    removed++;
  }
}

console.log(`Removed ${removed} legacy content page directories.`);
