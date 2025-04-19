// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-01-02',
  devtools: { enabled: true },
  ssr: false,
  css: ['~/assets/css/main.css'],
  build: {
    transpile: ['vee-validate', 'trpc-nuxt'],
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  vite: {
    server: {
      allowedHosts: [
        'a2d2-2a02-2455-17ea-2900-f8ac-182-94de-5bed.ngrok-free.app',
      ],
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
    public: {
      appUrl: process.env.NUXT_PUBLIC_APP_URL || '',
      cloudinaryCloudName: process.env.NUXT_PUBLIC_CLOUDINARY_CLOUD_NAME || '',
      cloudinaryUploadPreset:
        process.env.NUXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || '',
    },
  },
})
