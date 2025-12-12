// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  ssr: false,
  app: {
    // baseURL: '/recipe-code/',
    baseURL: '/nuxt-test/',
    buildAssetsDir: '_nuxt/',
  },
  nitro: {
    preset: 'static',
    // output: {
    //   dir: '../../public/local/frontend/recipe-code',
    // },
    // Игнорируем server API при статической генерации
    prerender: {
      crawlLinks: false,
      ignore: ['/api/**'],
    },
  },
  modules: [
    '@nuxt/fonts',
    '@nuxt/image',
    "@pinia/nuxt",
    "@nuxt/icon",
    '@nuxt/test-utils',
  ],
  css: ["@/assets/scss/main.scss"],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "@/assets/scss/variables" as *;
            @use "@/assets/scss/mixins" as *;
          `,
        },
      },
    },
  },
  icon: {
    size: '24px',
    customCollections: [
      {
        prefix: 'my-icon',
        dir: './assets/icons',
      },
    ],
  },
})
