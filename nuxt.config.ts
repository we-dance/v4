// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-01-02',
  // devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  build: {
    transpile: ['vee-validate', 'trpc-nuxt'],
  },

  ignore: ['/cli', '/e2e', '/docs'],

  vite: {
    server: {
      allowedHosts: true,
    },
  },

  nitro: {
    serverAssets: [
      {
        baseName: 'emails',
        dir: './emails',
      },
    ],
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  posthog: {
    clientOptions: {
      persistence: 'memory',
    },
    disabled: process.env.NUXT_PUBLIC_POSTHOG_DISABLED === 'true',
  },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/icon',
    'shadcn-nuxt',
    '@nuxt/image',
    '@nuxtjs/color-mode',
    '@nuxtjs/google-fonts',
    '@nuxt/content',
    '@sidebase/nuxt-auth',
    '@hebilicious/vue-query-nuxt',
    'nuxt-posthog',
    '@nuxtjs/i18n',
  ],
  i18n: {
    restructureDir: './',
    defaultLocale: 'en',
    langDir: 'locales',
    locales: [
      { code: 'en', name: 'English', file: 'en.yml' },
      { code: 'de', name: 'Deutsch', file: 'de.yml' },
      { code: 'es', name: 'Español', file: 'es.yml' },
      { code: 'fr', name: 'Français', file: 'fr.yml' },
      { code: 'it', name: 'Italiano', file: 'it.yml' },
      { code: 'pl', name: 'Polski', file: 'pl.yml' },
      { code: 'pt', name: 'Português', file: 'pt.yml' },
      { code: 'ro', name: 'Română', file: 'ro.yml' },
      { code: 'ru', name: 'Русский', file: 'ru.yml' },
      { code: 'sr', name: 'Srpski', file: 'sr.yml' },
      { code: 'tr', name: 'Türkçe', file: 'tr.yml' },
    ],
  },
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
    {
      path: '~/components/common',
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
  auth: {
    provider: {
      type: 'authjs',
    },
  },
  runtimeConfig: {
    googleMapsServerApiKey: '',
    stripeSecretKey: '',
    stripePublicKey: '',
    stripeWebhookSecret: '',
    cloudinaryApiKey: '',
    cloudinaryApiSecret: '',
    muxTokenId: '',
    muxTokenSecret: '',
    muxWebhookSecret: '',
    mailgunApiKey: '',
    mailgunDomain: '',
    mailgunHost: '',
    mailgunWebhookKey: '',
    public: {
      posthog: {
        publicKey: '',
        host: '',
      },
      posthogDisabled: '',
      appUrl: '',
      googleMapsApiKey: '',
      cloudinaryCloudName: '',
    },
  },
})
