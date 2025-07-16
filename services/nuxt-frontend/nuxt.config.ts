// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  ssr: true,
  nitro : {
      preset: 'static'
  },
  app : {
    baseURL: '/Jayph/'
  },
  devtools: { enabled: true },
    modules: [
    '@pinia/nuxt',
    '@nuxt/ui'
  ],
  css: ['@/assets/css/variables.css','@/assets/css/reset.css', '@/assets/css/main.css'],
})