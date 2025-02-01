export default defineNuxtConfig({
  // https://github.com/nuxt-themes/docus
  extends: ['@nuxt-themes/docus'],
  devtools: { enabled: true },

  compatibilityDate: '2024-10-24',
  devServer: {
    port: 8080,
  },
})
