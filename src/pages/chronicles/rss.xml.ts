import type { APIContext } from 'astro'
import { getCollection } from 'astro:content'
import rss from '@astrojs/rss'
import sanitizeHtml from 'sanitize-html'
import MarkdownIt from 'markdown-it'

const parser = new MarkdownIt()

export async function GET(context: APIContext) {
  const chronicles = await getCollection('chronicles')

  return rss({
    title: `u1F71's chronicles`,
    description: 'Good for health, bad for...',
    site: `${context.site}`,

    items: chronicles.map(chronicle => ({
      title: chronicle.data.title,
      pubDate: chronicle.data.pubDate,
      description: chronicle.data.description,
      link: `${import.meta.env.BASE_URL}/chronicles/${chronicle.slug}/`,

      content: sanitizeHtml(parser.render(chronicle.body))
    })),

    customData: `<language>en-us</language>`
  })
}
