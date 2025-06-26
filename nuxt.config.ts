// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-01-02',
  // devtools: { enabled: true },
  ssr: true,
  css: ['~/assets/css/main.css'],
  build: {
    transpile: ['vee-validate', 'trpc-nuxt'],
  },

  vite: {
    server: {
      allowedHosts: true,
    },
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
  ],
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
      posthogApiHost: '',
      posthogApiKey: '',
      appUrl: '',
      googleMapsApiKey: '',
      cloudinaryCloudName: '',
    },
  },
})
