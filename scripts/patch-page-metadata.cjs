/**
 * Converts static `export const metadata` pages to locale-aware `generateMetadata`.
 */
const fs = require('fs');
const path = require('path');

const appDir = path.join(__dirname, '..', 'src', 'app', '[locale]');

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else if (entry.name === 'page.tsx') files.push(full);
  }
  return files;
}

function getPathFromFile(filePath) {
  const rel = path.relative(appDir, filePath).replace(/\\/g, '/');
  const parts = rel.split('/');
  parts.pop();
  if (parts.length === 0) return '/';
  return `/${parts.join('/')}`;
}

function extractMetadataObject(content, startIndex) {
  const braceStart = content.indexOf('{', startIndex);
  if (braceStart === -1) return null;

  let depth = 0;
  for (let i = braceStart; i < content.length; i++) {
    if (content[i] === '{') depth++;
    else if (content[i] === '}') {
      depth--;
      if (depth === 0) {
        return content.slice(braceStart, i + 1);
      }
    }
  }
  return null;
}

function patchFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  if (content.includes('generateMetadata')) return false;

  const exportIdx = content.indexOf('export const metadata');
  if (exportIdx === -1) return false;

  const metadataObj = extractMetadataObject(content, exportIdx);
  if (!metadataObj) return false;

  const canonicalMatch = metadataObj.match(/canonical:\s*['"]([^'"]+)['"]/);
  const canonicalPath = canonicalMatch ? canonicalMatch[1] : getPathFromFile(filePath);

  const metadataWithoutAlternates = metadataObj
    .replace(/,?\s*alternates:\s*\{[\s\S]*?\}\s*,?/g, '')
    .replace(/,\s*\}/g, '\n}');

  if (!content.includes('@/i18n/metadata')) {
    const importMatch = content.match(/^import .+ from ['"]next['"]\s*\r?\n/m);
    if (importMatch) {
      content = content.replace(
        importMatch[0],
        `${importMatch[0]}import { localizedAlternates } from '@/i18n/metadata'\r\n`,
      );
    } else {
      content = `import { localizedAlternates } from '@/i18n/metadata'\r\n${content}`;
    }
  }

  const generateFn = `export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const base = ${metadataWithoutAlternates} as Metadata
  return {
    ...base,
    alternates: localizedAlternates('${canonicalPath}', locale),
  }
}

`;

  const metadataBlockRegex = /export const metadata[\s\S]*?\r?\n\}\r?\n\r?\n/;
  if (!metadataBlockRegex.test(content)) return false;

  content = content.replace(metadataBlockRegex, generateFn);
  fs.writeFileSync(filePath, content, 'utf8');
  return true;
}

const files = walk(appDir);
let patched = 0;

for (const file of files) {
  if (patchFile(file)) {
    patched++;
    console.log('Patched:', path.relative(appDir, file));
  }
}

console.log(`Done. Patched ${patched} files.`);
