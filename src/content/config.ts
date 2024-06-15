import { defineCollection, z } from 'astro:content'

const chronicles = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string().optional(),
    date: z.coerce.date()
  })
})

export const collections = {
  chronicles
}
