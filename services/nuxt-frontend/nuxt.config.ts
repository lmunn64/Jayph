// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  ssr: true,
  nitro : {
      preset: 'netlify'
  },
  app : {
    baseURL: '/Jayph/'
  },
  runtimeConfig : {
    public : {
      googleMapsApiKey : process.env.GOOGLE_API_KEY,
<<<<<<< HEAD
      googleMapsId: process.env.GOOGLE_MAP_ID as string
=======
      googleMapsId: process.env.GOOGLE_MAP_ID
>>>>>>> review-carousel-dev
    }
  },
  devtools: { enabled: true },
    modules: [
    '@pinia/nuxt',
    '@nuxt/ui'
  ],
  css: ['@/assets/css/variables.css','@/assets/css/reset.css', '@/assets/css/main.css'],
})