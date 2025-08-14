import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: 'page',
      source: 'posts/*.md',
      schema: z.object({
        thumbnail: z.string(),
        date: z.string(),
        slug: z.string(),
        tags: z.array(z.string()),
        length: z.string(),
        title: z.string(),
        subtitle: z.string()
      })
    })
  }
})