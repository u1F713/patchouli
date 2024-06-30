import { defineConfig } from 'astro/config'
import { loadEnv } from 'vite'
import mdx from '@astrojs/mdx'
import solidJs from '@astrojs/solid-js'

const { SITE_URL } = loadEnv(import.meta.env.MODE, import.meta.dirname, '')

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

  site: SITE_URL,
  base: 'patchouli',
  integrations: [solidJs(), mdx()]
})
