const { description } = require('../../package')

module.exports = {
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: 'shogi-player',
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: description,

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],

    // ['link', { rel: 'stylesheet', href: 'https://unpkg.com/tailwindcss@2.0.4/dist/tailwind.min.css' }],

    // for shogi-player-wc
    ['link', { rel: "stylesheet", href: "https://cdn.jsdelivr.net/npm/@mdi/font/css/materialdesignicons.min.css" }],
    ['script', { src: '/dist/shogi-player-wc.min.js' }],
  ],

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    repo: 'akicho8/shogi-player',
    editLinks: false,
    docsDir: '',
    editLinkText: '',
    lastUpdated: false,
    nav: [
      {
        text: 'Guide',
        link: '/guide/',
      },
      {
        text: 'コンポーネント引数',
        link: '/config/',
      },
      {
        text: 'Web Components',
        link: '/web-components/',
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
            'edit-mode',
            'credit',
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
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
    // 'demo-code',
    // [
    //   'demo-code', {
    //     // jsLibs: [
    //     //   // umd
    //     //   'https://unpkg.com/tua-storage/dist/TuaStorage.umd.js',
    //     // ],
    //     // cssLibs: [
    //     //   'https://unpkg.com/animate.css@3.7.0/animate.min.css',
    //     // ],
    //     // vueVersion: '^3',
    //     // showText: 'show code',
    //     // hideText: 'hide',
    //     // styleStr: 'text-decoration: underline;',
    //     // minHeight: 200,
    //     // onlineBtns: {
    //     //   codepen: true,
    //     //   jsfiddle: true,
    //     //   codesandbox: true,
    //     // },
    //     // jsfiddle: {
    //     //   framework: 'library/pure', // default
    //     //   // framework: 'vue/2.6.11',
    //     // },
    //     // codesandbox: {
    //     //   deps: { 'lodash': 'latest' },
    //     //   json: '',
    //     //   query: '',
    //     //   embed: '',
    //     // },
    //     // demoCodeMark: 'demo-code',
    //     // copyOptions: { ... },
    //   },
    // ]

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
