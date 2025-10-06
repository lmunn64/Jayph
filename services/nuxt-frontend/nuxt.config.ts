// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  ssr: true,
  nitro : {
      preset: 'netlify'
  },
  app : {
    head: {
      link: [
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Muli:200,300,400,600,700&display=swap' }
      ]
    }
  },
  runtimeConfig : {
    apiBase: 'https://jwayz3cdd5.execute-api.eu-north-1.amazonaws.com/dev',
    public : {
      googleMapsApiKey : process.env.GOOGLE_API_KEY,
      googleMapsId: process.env.GOOGLE_MAP_ID
    }
  },
  devtools: { enabled: true },
    modules: [
    '@pinia/nuxt',
    '@nuxt/ui',
    '@nuxt/content',
  ],
  css: ['@/assets/css/variables.css','@/assets/css/reset.css', '@/assets/css/main.css'],
})