// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  build: {
    transpile: ['vee-validate'],
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  compatibilityDate: '2025-01-02',
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/icon',
    'shadcn-nuxt',
    '@nuxt/image',
    '@nuxtjs/color-mode',
    '@pinia/nuxt',
    '@nuxtjs/google-fonts',
    '@nuxt/content',
    '@sidebase/nuxt-auth',
    '@nuxtjs/i18n',
  ],
  auth: {
    provider: {
      type: 'authjs',
    },
  },
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
  colorMode: {
    classSuffix: '',
    preference: 'light',
    fallback: 'light',
    classPrefix: '',
    storageKey: 'nuxt-color-mode',
  },
  app: {
    head: {
      htmlAttrs: {
        class: 'font-sans',
      },
    },
  },
  googleFonts: {
    download: true,
    families: {
      'Nunito+Sans': [300, 400, 500, 600, 700, 800],
      'Roboto+Mono': [400, 500, 600, 700],
    },
    display: 'swap',
    prefetch: true,
    preconnect: true,
  },
  shadcn: {
    prefix: '',
    componentDir: './components/ui',
  },
  image: {
    provider: 'ipx',
    quality: 80,
    format: ['webp', 'jpeg'],
  },
  typescript: {
    tsConfig: {
      compilerOptions: {
        baseUrl: '.',
      },
    },
  },
  router: {
    options: {
      scrollBehaviorType: 'smooth',
    },
  },
  runtimeConfig: {
    public: {
      apiHost: process.env.API_HOST || 'localhost:3000',
    },
  },

  i18n: {
    locales: [
      { code: 'en', language: 'en-US', name: 'English', file: 'en.yml' },
      { code: 'es', language: 'es-ES', name: 'Español', file: 'es.yml' },
      { code: 'de', language: 'de-DE', name: 'Deutsch', file: 'de.yml' },
      { code: 'fr', language: 'fr-FR', name: 'Français', file: 'fr.yml' },
      { code: 'it', language: 'it-IT', name: 'Italiano', file: 'it.yml' },
      { code: 'pl', language: 'pl-PL', name: 'Polski', file: 'pl.yml' },
      { code: 'pt', language: 'pt-PT', name: 'Português', file: 'pt.yml' },
      { code: 'ro', language: 'ro-RO', name: 'Română', file: 'ro.yml' },
      { code: 'tr', language: 'tr-TR', name: 'Türkçe', file: 'tr.yml' },
      { code: 'ru', language: 'ru-RU', name: 'Русский', file: 'ru.yml' },
      { code: 'sr', language: 'sr-RS', name: 'Српски', file: 'sr.yml' },
    ],
    defaultLocale: 'en',
    langDir: 'locales',
  },
})
