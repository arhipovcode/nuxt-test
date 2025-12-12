// https://nuxt.com/docs/api/configuration/nuxt-config
const repoName = process.env.GITHUB_REPOSITORY?.split('/').pop()

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  ssr: false,
  app: {
    // baseURL can be overridden with env NUXT_BASE, or derived from GITHUB_REPOSITORY in CI
    baseURL: process.env.NUXT_BASE || (repoName ? `/${repoName}/` : '/'),
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
