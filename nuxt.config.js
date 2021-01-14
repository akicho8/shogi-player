import dayjs from "dayjs"
const BUILD_VERSION = dayjs().format("YYYY-MM-DD HH:mm:ss")
const SITE_DESC = "将棋盤のライブラリです"

export default {
  // debug: true,

  // https://ja.nuxtjs.org/guides/configuration-glossary/configuration-ssr/
  //
  //   mode は DEPRECATED なので下に置き換え
  //
  //   mode: 'spa'        → ssr: false
  //   mode: 'universal'  → ssr: true
  //
  ssr: false,

  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  // target: 'server',
  target: 'static',

  router: {
    base: process.env.NODE_ENV === 'production' ? "/shogi-player/" : "/",
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
    title: process.env.APP_NAME,
    titleTemplate: `%s - ${process.env.APP_NAME}`,
    // titleTemplate(title) {
    //   return (title ? `${title} | ` : "") + process.env.APP_NAME
    // },

    htmlAttrs: {
      lang: "ja",
      prefix: 'og: http://ogp.me/ns#',
      class: `NODE_ENV-${process.env.NODE_ENV} STAGE-${process.env.STAGE}`,
    },
    meta: [
      // https://ja.nuxtjs.org/faq/duplicated-meta-tags/
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: SITE_DESC },

      ////////////////////////////////////////////////////////////////////////////////
      { hid: "og:site_name",   property: "og:site_name",   content: process.env.APP_NAME },
      { hid: "og:type",        property: "og:type",        content: "website" },
      { hid: "og:url",         property: "og:url",         content: process.env.MY_SITE_URL }, // これいるのか？

      // 重要なのはこの4つだけで各ページで上書きする
      { hid: "og:title",       property: "og:title",       content: process.env.APP_NAME },
      { hid: "og:description", property: "og:description", content: SITE_DESC },
      // { hid: "og:image",       property: "og:image",       content: process.env.MY_NUXT_URL + "/ogp/application.png" },
      // { hid: "twitter:card",   property: "twitter:card",   content: "summary_large_image" }, // summary or summary_large_image

      { hid: "twitter:site",       property: "twitter:site",       content: "@sgkinakomochi" }, // これいるのか？
      { hid: "twitter:creator",    property: "twitter:creator",    content: "@sgkinakomochi" }, // これいるのか？
    ],
    link: [
      { hid: "icon",             rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'          },
      { hid: "apple-touch-icon", rel: "apple-touch-icon",           href: "/apple-touch-icon.png" },
    ],
    // base: { href: "http://0.0.0.0:3000" },
  },
  /*
  ** Customize the progress-bar color
  */
  // loading: { color: 'hsl(348, 100%, 61%)' }, // bulma red color
  // loading: { color: 'hsl(48,  100%, 67%)' }, // bulma yellow color
  loading: { color: 'hsl(0, 0%, 21%)' }, // bulma grey-daker color
  /*
  ** Global CSS
  */
  css: [
    // 'application.sass'
    // '~/assets/css/buefy.scss',
    // '~/assets/sass/application.sass',
    // '../app/javascript/stylesheets/application.sass',
    './assets/sass/application.sass',
    // '@/assets/custom-styles.scss'
  ],
  styleResources: {
    sass: [
      './assets/sass/styleResources.scss', // sass の項目に scss のファイルを与えないと読み込まれないのは謎
    ],
    // scss: [
    //   // '~assets/vars/*.scss',
    //   // '~assets/abstracts/_mixins.scss'
    // ]
  },

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    // client only
    "~/plugins/mixin_mod.client.js",

    // 両方
    "~/plugins/axios_mod.js",
    "~/plugins/universal.js",
  ],
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://buefy.github.io/#/documentation
    // ~/src/shogi-extend/front_app/node_modules/nuxt-buefy/lib/module.js
    [
      'nuxt-buefy',
      {
        css: false,
        // materialDesignIconsHRef: '//cdn.materialdesignicons.com/5.0.45/css/materialdesignicons.min.css',
        materialDesignIconsHRef: "https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css",
      }
    ],
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/proxy',

    '@nuxtjs/style-resources',
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
            name: 'styles',
            test: /\.(scss|sass|css|vue)$/,
            chunks: 'all',
            enforce: true,
          },
        },
      },
    },

    // https://ja.nuxtjs.org/api/configuration-build/#transpile
    transpile: ["shogi-player"], // 外側にあるファイルは import 文を require に変換しないと node でパースできない

    // オーディオファイルをロードするように Webpack の設定を拡張するには？
    // https://ja.nuxtjs.org/faq/webpack-audio-files/
    //
    //   <audio :src="require('@/assets/water.mp3')" controls></audio>
    //   <audio src="@/assets/water.mp3" controls></audio>
    //
    loaders: {
      vue: {
        transformAssetUrls: {
          audio: 'src'
        }
      }
    },

    extend (config, ctx) {
      config.module.rules.push({
        test: /\.(ogg|mp3|wav|mpe?g)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]'
        },
      })

      config.module.rules.push({
        test: /\.(txt|md|kif|ki2|csa|sfen)$/,
        loader: 'raw-loader',
        exclude: /(node_modules)/,
      })

    },
  },

  // https://nuxtjs.org/guide/runtime-config
  // 空文字列は空で設定したのではなく XXX: process.env.XXX の意味(わかりにくい！)
  // またビルドしてもこの情報はそこに含まれてないので注意
  // デプロイするときには .nuxt だけでなく .env* も転送しないといけない
  // このせいで本番環境なのに開発環境の設定で運用していて不可解な現象が起きていた
  publicRuntimeConfig: {
    CSR_BUILD_VERSION: BUILD_VERSION,
    MY_SITE_URL: "",
    MY_NUXT_URL: "",
    STAGE: "",
    APP_NAME: "",
  },

  // SSR側での定義で publicRuntimeConfig を上書きする
  // 意味はよくわかっていない
  privateRuntimeConfig: {
  },

  // 面倒な process.env.XXX の再定義
  // ・ここで定義すると .vue 側で process.env.XXX で参照できる
  // ・しかし process.env.XXX は文字列として展開されるので非常に扱いづらい
  // ・それを忘れて process.env がハッシュだと勘違いしていつもはまる
  // ・だから publicRuntimeConfig を使う方がよい
  // ・ちなみに NUXT_ENV_ プレフィクスをつけた環境変数は自動的にここで定義したことになる
  // ・しかしプレフィクスはついたままなのでこれまた使いにくい
  // ・なので publicRuntimeConfig を使う方がよい
  env: {
    // FOO: process.env.FOO,
    ENV_BUILD_VERSION: BUILD_VERSION,
  },
}
