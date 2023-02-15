export default {
  // debug: true,

  // https://ja.nuxtjs.org/guides/configuration-glossary/configuration-ssr/
  //
  //   mode は DEPRECATED なので下に置き換え
  //
  //   mode: "spa"        → ssr: false
  //   mode: "universal"  → ssr: true
  //
  ssr: false,

  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  // target: "server",
  target: "static",

  router: {
    base: process.env.NODE_ENV === "production" ? "/myapp1/" : "/",
    // https://ja.nuxtjs.org/api/configuration-router/#trailingslash
    // trailingSlash: false,
  },

  generate: {
    subFolders: false,  // false: xxx.html true: xxx/index.html
    dir: "docs",        // for github pages
  },

  /*
  ** Headers of the page
  */
  head: {
    title: "myapp1",

    htmlAttrs: {
      lang: "ja",
    },
    meta: [
      // https://ja.nuxtjs.org/faq/duplicated-meta-tags/
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
    ],
    // base: { href: "http://0.0.0.0:3000" },
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: "hsl(0, 0%, 21%)" }, // bulma grey-daker color
  /*
  ** Global CSS
  */
  css: [
  ],
  styleResources: {
  },
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  // components: true,
  components: [
    { path: "~/components", extensions: ["vue"], pathPrefix: false, },
  ],

  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
  ],

  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },

  proxy: {},

  /*
  ** Build configuration
  */
  // オーディオファイルをロードするように Webpack の設定を拡張するには？
  // https://ja.nuxtjs.org/faq/webpack-audio-files
  build: {
    // https://ja.nuxtjs.org/api/configuration-build#extractcss
    extractCSS: process.env.NODE_ENV === "production", // htmlファイルにスタイルが吐かれるのを防ぐ。trueにするとHMRが効かないので注意

    // TODO: 意味を調べる
    optimization: {
      splitChunks: {
        cacheGroups: {
          styles: {
            name: "styles",
            test: /\.(scss|sass|css|vue)$/,
            chunks: "all",
            enforce: true,
          },
        },
      },
    },

    // https://ja.nuxtjs.org/api/configuration-build/#transpile
    // transpile: ["myapp1"], // 外側にあるファイルは import 文を require に変換しないと node でパースできない

    // オーディオファイルをロードするように Webpack の設定を拡張するには？
    // https://ja.nuxtjs.org/faq/webpack-audio-files/
    //
    //   <audio :src="require("@/assets/water.mp3")" controls></audio>
    //   <audio src="@/assets/water.mp3" controls></audio>
    //
    loaders: {
      vue: {
        transformAssetUrls: {
          audio: "src",
        },
      },
    },

    extend (config, ctx) {
      config.module.rules.push({
        test: /\.(ogg|mp3|wav|mpe?g)$/i,
        loader: "file-loader",
        options: {
          name: "[path][name].[ext]",
          // require("path/to/xxx.wav") が { default: "/_nuxt/blob/xxx.wav", __esModule: true, ...} になってしまう対策
          // https://github.com/webpack-contrib/file-loader#esmodule
          // false にすると単にパス "/_nuxt/blob/xxx.wav" になる
          esModule: false,
        },
      })

      config.module.rules.push({
        test: /\.(txt|md|kif|ki2|csa|sfen)$/,
        loader: "raw-loader",
        exclude: /(node_modules)/,
      })

    },
  },

  publicRuntimeConfig: {
  },

  privateRuntimeConfig: {
  },

  env: {
  },
}
