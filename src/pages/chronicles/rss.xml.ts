import type { APIContext } from 'astro'
import { getCollection } from 'astro:content'
import rss from '@astrojs/rss'
import sanitizeHtml from 'sanitize-html'
import MarkdownIt from 'markdown-it'
import { getCloudinaryImage } from '~/utils/cloudinary'

const parser = new MarkdownIt()

export async function GET(context: APIContext) {
  const chronicles = await getCollection('chronicles')

  return rss({
    title: `u1F71's chronicles`,
    description: 'Good for health, bad for...',
    site: `${context.site}`,

    items: await Promise.all(
      chronicles.map(async chronicle => ({
        title: chronicle.data.title,
        pubDate: chronicle.data.pubDate,
        description: chronicle.data.description,
        link: `${import.meta.env.BASE_URL}/chronicles/${chronicle.slug}/`,

        enclosure: chronicle.data.image
          ? {
              type: 'image/jpeg',
              url: (await getCloudinaryImage(chronicle.data.image)).src,
              length: 1
            }
          : undefined,

        content: sanitizeHtml(parser.render(chronicle.body))
      }))
    ),

    customData: '<language>en-us</language>'
  })
}
