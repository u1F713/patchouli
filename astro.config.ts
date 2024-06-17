import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import solidJs from '@astrojs/solid-js'

export default defineConfig({
  image: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.cloudinary.com'
      }
    ]
  },
  markdown: {
    shikiConfig: { theme: 'ayu-dark' }
  },
  integrations: [solidJs(), mdx()]
})
