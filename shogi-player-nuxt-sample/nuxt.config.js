export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "shogi-player-nuxt-sample",
    htmlAttrs: {
      lang: "en"
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    "./assets/sass/application.sass", // ここで bulma や shogi-player のスタイルを読み込む
  ],

  // yarn add --dev @nuxtjs/style-resources で使えるようになる
  // これを指定しないと +tablet や $primary が参照できない
  styleResources: {
    sass: [
      "./assets/sass/styleResources.scss", // sass の項目に scss のファイルを与えないと読み込まれないのは謎
    ],
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "~/plugins/application.client.js",
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // *.vue の style ブロックの中で +tablet や $primary が参照できるようにするため
    "@nuxtjs/style-resources",
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/buefy
    "nuxt-buefy",
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  // https://ja.nuxtjs.org/api/configuration-build/#transpile
  build: {
    transpile: [
      // クラス定数や "??" の読み込みで失敗する対策
      "shogi-player",
    ],

    loaders: {
      // vue: {
      //   transformAssetUrls: {
      //     audio: "src",
      //   },
      // },

      // https://www.suzunatsu.com/post/node-sass-to-dart-sass/
      sass: {
        // implementation: require('node-sass'),
        implementation: require('sass'),
      },
      scss: {
        // implementation: require('node-sass'),
        implementation: require('sass'),
      },
    },

    // wav の読み込みで失敗する対策
    extend (config, ctx) {
      config.module.rules.push({
        test: /\.(ogg|mp3|mp4|m4a|wav|mpe?g)$/i,
        loader: "file-loader",
        options: {
          name: "blob/[name]-[contenthash].[ext]",
          // require("path/to/xxx.wav") が { default: "/_nuxt/blob/xxx.wav", __esModule: true, ...} になってしまう対策
          // https://github.com/webpack-contrib/file-loader#esmodule
          // false にすると単にパス "/_nuxt/blob/xxx.wav" になる
          esModule: false,
        },
      })
      config.module.rules.push({
        test: /\.(txt|md|kif|ki2|csa|sfen)$/,
        loader: "raw-loader",
      })
    },
  },
}
