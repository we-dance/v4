// https://github.com/nuxt-themes/docus/blob/main/nuxt.schema.ts
export default defineAppConfig({
  docus: {
    title: 'WeDance Docs',
    description:
      'A participatory network transforming how dance communities connect, organize, and thrive together',
    aside: {
      level: 1,
      collapsed: true,
      exclude: [],
    },
    main: {
      padded: true,
      fluid: true,
    },
    header: {
      logo: false,
      showLinkIcon: true,
      exclude: [],
      fluid: true,
    },
  },
})
