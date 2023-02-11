const { description } = require('../../package')

module.exports = {
  /**
   * ref: https://v1.vuepress.vuejs.org/config/#title
   */
  title: 'shogi-player',
  /**
   * ref: https://v1.vuepress.vuejs.org/config/#description
   */
  description: description,

  // lang: "ja-JP", ← 効かない

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref: https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    // ['link', { rel: 'icon', type: 'image/png', href: '/favicon.png' }],
    // ['meta', { name: 'og:url', content: 'https://example.com/' }],
    // ['meta', { name: 'og:type', content: 'website' }],
    // ['meta', { name: 'og:title', content: 'example title' }],
    // ['meta', { name: 'og:description', content: 'example description' }],
    // ['meta', { name: 'og:image', content: '/og.png' }]

    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],

    // グローバルに読み込むと vuepress のスタイルが崩れる問題がある
    // ['link', { rel: 'stylesheet', href: 'https://unpkg.com/tailwindcss@2.0.4/dist/tailwind.min.css' }],

    // for shogi-player-wc
    ['link', { rel: "stylesheet", href: "https://cdn.jsdelivr.net/npm/@mdi/font/css/materialdesignicons.min.css" }],
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
          { text: 'コンポーネント引数', link: '/component-arguments/', },
          { text: 'CSS Variables',      link: '/css-variables/',       },
          { text: 'API',                link: '/api/',                 },
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
            'install',
            'customize',
            'custom-build',
            'play-mode',
            'edit-mode',
            'edit-mode-shortcut',
            'style-editor',
            'credit',
            // 'test-of-demo',
          ],
        },
        {
          title: 'Advanced',
          collapsable: false,
          children: [
            '',
            '/component-arguments/',
            '/css-variables/',
            '/api/',
          ],
        },

        // {
        //   title: 'Guide',
        //   collapsable: false,
        //   children: [
        //     '',
        //     'install',
        //     'edit-mode',
        //     'credit',
        //   ]
        // },
      ],
    }
  },

  // https://github.com/markdown-it/markdown-it
  markdown: {
    breaks: true, // Convert '\n' in paragraphs into <br>
    linkify: true, // URLを書いたら自動的にリンクするか？
  },

  // https://v1.vuepress.vuejs.org/plugin/using-a-plugin.html#plugin-options
  plugins: {
    'back-to-top': {},
    'medium-zoom': {},

    // https://v1.vuepress.vuejs.org/plugin/official/plugin-google-analytics.html#install
    // yarn add -D @vuepress/plugin-google-analytics
    // npm i -D @vuepress/plugin-google-analytics
    'google-analytics': {
      ga: 'G-KG0GXEY9BN',
    },

    'demo-code': {
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
    },

    // require('tailwindcss'),
    // require('autoprefixer'),
  },

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
