export default {
  ssr: false,
  target: "static",
  router: {
  },
  generate: {
    subFolders: false,  // false: xxx.html true: xxx/index.html
    dir: "docs",        // for github pages
  },
  head: {
    title: "myapp1",
    htmlAttrs: {
      lang: "ja",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
    ],
  },
  loading: { color: "hsl(0, 0%, 21%)" }, // bulma grey-daker color
  css: [
  ],
  styleResources: {
  },
  plugins: [
  ],
  buildModules: [
  ],
  modules: [
  ],
  axios: {
  },
  proxy: {},
  build: {
  },
  publicRuntimeConfig: {
  },
  privateRuntimeConfig: {
  },
  env: {
  },
}
