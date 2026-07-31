/**
 * Extracts English resource/blog metadata and full article content from page.tsx files.
 * Usage: node scripts/extract-content.cjs
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.join(__dirname, '..');
const appRoot = path.join(root, 'src', 'app', '[locale]');

function extractBalanced(source, startIndex) {
  const first = source[startIndex];
  if (first !== '{' && first !== '[') return null;

  const endChar = first === '{' ? '}' : ']';
  let depth = 0;
  let inSingle = false;
  let inDouble = false;
  let inTemplate = false;
  let escape = false;

  for (let i = startIndex; i < source.length; i++) {
    const ch = source[i];
    if (escape) {
      escape = false;
      continue;
    }
    if (inSingle) {
      if (ch === '\\') escape = true;
      else if (ch === "'") inSingle = false;
      continue;
    }
    if (inDouble) {
      if (ch === '\\') escape = true;
      else if (ch === '"') inDouble = false;
      continue;
    }
    if (inTemplate) {
      if (ch === '\\') escape = true;
      else if (ch === '`') inTemplate = false;
      continue;
    }
    if (ch === "'") {
      inSingle = true;
      continue;
    }
    if (ch === '"') {
      inDouble = true;
      continue;
    }
    if (ch === '`') {
      inTemplate = true;
      continue;
    }
    if (ch === first) depth++;
    if (ch === endChar) {
      depth--;
      if (depth === 0) return source.slice(startIndex, i + 1);
    }
  }
  return null;
}

function extractConst(source, name) {
  const marker = `const ${name}`;
  const idx = source.indexOf(marker);
  if (idx === -1) return undefined;

  const eq = source.indexOf('=', idx);
  let pos = eq + 1;
  while (pos < source.length && /\s/.test(source[pos])) pos++;

  const literal = extractBalanced(source, pos);
  if (!literal) return undefined;

  try {
    return vm.runInNewContext(`(${literal})`, {}, { timeout: 5000 });
  } catch (error) {
    console.warn(`Failed to parse ${name}:`, error.message);
    return undefined;
  }
}

function extractMetadata(source) {
  const titleMatch = source.match(/title:\s*['"`]([^'"`]+)['"`]/);
  const descMatch = source.match(/description:\s*\n?\s*['"`]([^'"`]+)['"`]/);
  return {
    title: titleMatch?.[1] ?? '',
    description: descMatch?.[1] ?? '',
  };
}

function extractH1(source) {
  const match = source.match(/<h1[^>]*>\s*([\s\S]*?)\s*<\/h1>/);
  return match?.[1]?.trim() ?? '';
}

function extractCoverImage(source) {
  const match = source.match(/<img[\s\S]*?src="([^"]+)"/);
  return match?.[1] ?? '';
}

function walkResourceArticles() {
  const resourcesDir = path.join(appRoot, 'resources');
  const results = [];

  for (const category of fs.readdirSync(resourcesDir)) {
    if (category.startsWith('[')) continue;
    const categoryDir = path.join(resourcesDir, category);
    if (!fs.statSync(categoryDir).isDirectory()) continue;

    for (const slug of fs.readdirSync(categoryDir)) {
      if (slug.startsWith('[')) continue;
      const pagePath = path.join(categoryDir, slug, 'page.tsx');
      if (!fs.existsSync(pagePath)) continue;

      const source = fs.readFileSync(pagePath, 'utf8');
      results.push({
        category,
        slug,
        pagePath,
        meta: extractMetadata(source),
        heroIntro: extractConst(source, 'heroIntro'),
        quickSummary: extractConst(source, 'quickSummary'),
        content: extractConst(source, 'articleContent'),
        faq: extractConst(source, 'faq'),
        cta: extractConst(source, 'cta'),
      });
    }
  }

  return results;
}

function walkBlogPosts() {
  const blogsDir = path.join(appRoot, 'blogs');
  const results = [];

  for (const slug of fs.readdirSync(blogsDir)) {
    if (slug.startsWith('[')) continue;
    const pagePath = path.join(blogsDir, slug, 'page.tsx');
    if (!fs.existsSync(pagePath)) continue;

    const source = fs.readFileSync(pagePath, 'utf8');
    results.push({
      slug,
      pagePath,
      meta: extractMetadata(source),
      h1: extractH1(source),
      coverImage: extractCoverImage(source),
      sections: extractConst(source, 'articleData'),
    });
  }

  return results;
}

function loadResourcesData() {
  const source = fs.readFileSync(path.join(root, 'src', 'data', 'resources.ts'), 'utf8');

  const categoriesMatch = source.match(
    /export const resourceCategories[^=]*=\s*(\[[\s\S]*?\n\]);/,
  );
  const articlesMatch = source.match(/export const resourceArticles[^=]*=\s*(\[[\s\S]*?\n\]);/);

  if (!categoriesMatch || !articlesMatch) {
    throw new Error('Failed to parse resources.ts');
  }

  const categories = vm.runInNewContext(categoriesMatch[1], {}, { timeout: 5000 });
  const articles = vm.runInNewContext(articlesMatch[1], {}, { timeout: 5000 });

  return { categories, articles };
}

function loadBlogList() {
  const source = fs.readFileSync(
    path.join(root, 'src', 'components', 'shared', 'blogList.ts'),
    'utf8',
  );
  const posts = [];
  const blocks = source.matchAll(
    /title:\s*"([^"]+)"[\s\S]*?href:\s*"([^"]+)"[\s\S]*?coverImage:\s*"([^"]+)"/g,
  );
  for (const match of blocks) {
    posts.push({
      title: match[1],
      href: match[2],
      coverImage: match[3],
      slug: match[2].replace('/blogs/', ''),
    });
  }
  return posts;
}

function writeJson(filePath, data) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
}

function main() {
  const { categories, articles } = loadResourcesData();
  const blogPosts = loadBlogList();
  const resourceArticles = walkResourceArticles();
  const blogArticles = walkBlogPosts();

  const resourcesMeta = {
    categories: Object.fromEntries(
      categories.map((c) => [c.slug, { title: c.title, description: c.description }]),
    ),
    articles: Object.fromEntries(
      articles.map((a) => [
        `${a.categorySlug}/${a.slug}`,
        { title: a.title, excerpt: a.excerpt, readTime: a.readTime, tags: a.tags },
      ]),
    ),
    readTime: '{{count}} min read',
  };

  const blogsMeta = {
    posts: Object.fromEntries(blogPosts.map((p) => [p.slug, { title: p.title }])),
    sidebarMoreArticles: 'More Articles',
  };

  writeJson(path.join(root, 'src', 'locales', 'en', 'resources-meta.json'), resourcesMeta);
  writeJson(path.join(root, 'src', 'locales', 'en', 'blogs-meta.json'), blogsMeta);

  for (const article of resourceArticles) {
    writeJson(
      path.join(root, 'src', 'content', 'resources', 'en', article.category, `${article.slug}.json`),
      {
        meta: article.meta,
        heroIntro: article.heroIntro,
        quickSummary: article.quickSummary,
        content: article.content,
        faq: article.faq,
        cta: article.cta,
      },
    );
  }

  for (const blog of blogArticles) {
    writeJson(path.join(root, 'src', 'content', 'blogs', 'en', `${blog.slug}.json`), {
      meta: blog.meta,
      h1: blog.h1,
      coverImage: blog.coverImage,
      sections: blog.sections,
    });
  }

  console.log(`Extracted ${resourceArticles.length} resource articles`);
  console.log(`Extracted ${blogArticles.length} blog posts`);
  console.log(`Metadata: ${categories.length} categories, ${articles.length} resource list entries, ${blogPosts.length} blog titles`);
}

main();
