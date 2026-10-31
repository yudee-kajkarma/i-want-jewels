import fs from 'fs'
import path from 'path'

/**
 * The site's English blogs, guides and FAQ in one file, made when the site is
 * built, for the chat's knowledge: the backend reads it when an admin presses
 * "Update knowledge" (or at night), because the server has no copy of these
 * files. Nothing here is private: it is the text the site already shows.
 *
 * Shape: { blogs: [{ slug, data }], guides: [{ category, slug, data }], faq }
 * (see the backend's src/ai/knowledge/content.ts).
 */
export const dynamic = 'force-static'

const readJson = (file: string) => JSON.parse(fs.readFileSync(file, 'utf8'))
const jsonFiles = (dir: string) => fs.readdirSync(dir).filter((file) => file.endsWith('.json')).sort()

export function GET() {
  const root = process.cwd()

  const blogDir = path.join(root, 'src/content/blogs/en')
  const blogs = jsonFiles(blogDir).map((file) => ({ slug: file.replace(/\.json$/, ''), data: readJson(path.join(blogDir, file)) }))

  const guideRoot = path.join(root, 'src/content/resources/en')
  const guides = fs
    .readdirSync(guideRoot)
    .sort()
    .filter((category) => fs.statSync(path.join(guideRoot, category)).isDirectory())
    .flatMap((category) =>
      jsonFiles(path.join(guideRoot, category)).map((file) => ({
        category,
        slug: file.replace(/\.json$/, ''),
        data: readJson(path.join(guideRoot, category, file)),
      })),
    )

  const faq = readJson(path.join(root, 'src/locales/en/common.json')).faq ?? {}

  return Response.json({ blogs, guides, faq })
}
