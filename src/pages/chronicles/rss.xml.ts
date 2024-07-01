import type { APIContext } from 'astro'
import { getCollection } from 'astro:content'
import { Cloudinary } from '@cloudinary/url-gen'
import { getImage } from 'astro:assets'
import rss from '@astrojs/rss'
import sanitizeHtml from 'sanitize-html'
import MarkdownIt from 'markdown-it'

const cld = new Cloudinary({
  cloud: { cloudName: import.meta.env.CLOUDINARY_CLOUD_NAME }
})

async function getCloudinaryImage(url: string) {
  const { src } = await getImage({
    src: cld.image(url).createCloudinaryURL(),
    inferSize: true
  })

  return src
}

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
              url: await getCloudinaryImage(chronicle.data.image),
              length: 1
            }
          : undefined,

        content: sanitizeHtml(parser.render(chronicle.body))
      }))
    ),

    customData: '<language>en-us</language>'
  })
}
