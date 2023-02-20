const package = require('../../../package.json')

module.exports = {
  /**
   * ref: https://v1.vuepress.vuejs.org/config/#title
   */
  title: 'shogi-player',
  /**
   * ref: https://v1.vuepress.vuejs.org/config/#description
   */
  description: package.description,

  // lang: "ja-JP", ← 効かない

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref: https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/favicon.png' }],

    // OGP

    // https://developer.twitter.com/ja/docs/tweets/optimize-with-cards/guides/getting-started
    ["meta", { name: "twitter:card",       content: "summary_large_image"                }],
    ["meta", { name: "twitter:creator",    content: "@sgkinakomochi"                     }],
    ["meta", { name: "twitter:site",       content: "@sgkinakomochi"                     }],

    // https://ogp.me/
    ["meta", { property: "og:url",         content: package.homepage                     }],
    ["meta", { property: "og:type",        content: "website"                            }],
    ["meta", { property: "og:title",       content: "shogi-player documents"             }],
    ["meta", { property: "og:description", content: package.description                  }],
    ["meta", { property: "og:image",       content: package.homepage + "application.png" }],
    ["meta", { property: "og:locale",      content: "ja_JP"                              }],

    // @vuepress/plugin-google-analytics は 2 専用だった？
    // https://github.com/vuejs/vuepress/issues/2713#issuecomment-806621348
    //
    // <!-- Google tag (gtag.js) -->
    // <script async src="https://www.googletagmanager.com/gtag/js?id=G-KG0GXEY9BN"></script>
    // <script>
    //   window.dataLayer = window.dataLayer || [];
    //   function gtag(){dataLayer.push(arguments);}
    //   gtag('js', new Date());
    //
    //   gtag('config', 'G-KG0GXEY9BN');
    // </script>
    //
    ['script', { async: true, src: 'https://www.googletagmanager.com/gtag/js?id=G-KG0GXEY9BN', }],
    ['script', {}, ["window.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js', new Date());\ngtag('config', 'G-KG0GXEY9BN');"]],

    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],

    // グローバルに読み込むと vuepress のスタイルが崩れる問題がある
    // ['link', { rel: 'stylesheet', href: 'https://unpkg.com/tailwindcss@2.0.4/dist/tailwind.min.css' }],

    // for shogi-player-wc
    ['script', { src: '/dist/shogi-player-wc.min.js' }],
  ],

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref: https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    repo: 'akicho8/shogi-player',
    editLinks: false,
    docsDir: '',
    editLinkText: '',
    lastUpdated: true,
    // https://www.nxworld.net/hello-vuepress.html
    // sidebarDepth: 3,
    displayAllHeaders: false,
    nav: [
      { text: 'Guide', link: '/guide/', },
      {
        text: "Reference",
        items: [
          { text: 'コンポーネント引数', link: '/reference/component-arguments/', },
          { text: 'CSS Variables',      link: '/reference/css-variables/',       },
          { text: 'Event',              link: '/reference/event/',               },
          { text: 'API',                link: '/reference/api/',                 },
        ],
      },

      {
        text: 'スタイルエディタ',
        link: 'https://akicho8.github.io/shogi-player/style-editor',
      },
    ],
    sidebar: {
      '/guide/': [
        {
          title: 'Guide',
          collapsable: false,
          children: [
            '',
            'usage',
            'customize',
            'custom-build',
            'view-mode',
            'play-mode',
            'edit-mode',
            // 'test-of-demo',
          ],
        },

        {
          title: 'Advanced',
          collapsable: false,
          children: [
            'edit-mode-shortcut',
            'style-editor',
            'debug',
            'credit',
          ],
        },

        {
          title: 'Reference',
          collapsable: false,
          children: [
            '/reference/component-arguments/',
            '/reference/css-variables/',
            '/reference/event/',
            '/reference/api/',
          ],
        },

        // {
        //   title: 'Guide',
        //   collapsable: false,
        //   children: [
        //     '',
        //     'usage',
        //     'edit-mode',
        //     'credit',
        //   ]
        // },
      ],

      // '/reference/': [
      //   {
      //     title: 'Reference',
      //     collapsable: false,
      //     children: [
      //       '',
      //       '/component-arguments/',
      //       '/css-variables/',
      //       '/api/',
      //     ],
      //   },
      //
      //   // {
      //   //   title: 'Guide',
      //   //   collapsable: false,
      //   //   children: [
      //   //     '',
      //   //     'usage',
      //   //     'edit-mode',
      //   //     'credit',
      //   //   ]
      //   // },
      // ],

    }
  },

  // https://github.com/markdown-it/markdown-it
  markdown: {
    breaks: true, // Convert '\n' in paragraphs into <br>
    linkify: true, // URLを書いたら自動的にリンクするか？
  },

  // https://v1.vuepress.vuejs.org/plugin/using-a-plugin.html#plugin-options
  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',

    // https://v1.vuepress.vuejs.org/plugin/official/plugin-google-analytics.html#usage
    // yarn add -D @vuepress/plugin-google-analytics
    // npm i -D @vuepress/plugin-google-analytics
    // 'google-analytics': {
    //   ga: 'G-KG0GXEY9BN',
    // },

    ['demo-code', {
      // jsLibs: [
      //   // umd
      //   'https://unpkg.com/tua-storage/dist/TuaStorage.umd.js',
      // ],
      // cssLibs: [
      //   'https://unpkg.com/animate.css@3.7.0/animate.min.css',
      // ],
      // vueVersion: '^3',
      // showText: 'show code',
      // hideText: 'hide',
      // styleStr: 'text-decoration: underline;',
      // minHeight: 200,
      // onlineBtns: {
      //   codepen: true,
      //   jsfiddle: true,
      //   codesandbox: true,
      // },
      // jsfiddle: {
      //   framework: 'library/pure', // default
      //   // framework: 'vue/2.6.11',
      // },
      // codesandbox: {
      //   deps: { 'lodash': 'latest' },
      //   json: '',
      //   query: '',
      //   embed: '',
      // },
      // demoCodeMark: 'demo-code',
      // copyOptions: { ... },
    }],

    // require('tailwindcss'),
    // require('autoprefixer'),
  ],

  // postcss: {
  //   plugins: [
  //     require("autoprefixer"),
  //     require("tailwindcss")("./tailwind.config.js")
  //   ]
  // }

  // postcss: {
  //   plugins: [
  //     // require('tailwindcss')('./tailwind.config.js'),
  //     // require('autoprefixer'),
  //     require('tailwindcss'),
  //     require('autoprefixer'),
  //   ]
  // }
}
