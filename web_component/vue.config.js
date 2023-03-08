module.exports = {
  // ▼shogi-player 側のクラス定数 "static foo = 1" な表記が読み取れない問題に対処する
  // 原因は babel が node_modules 以下を除外しているため。
  // node_modules 以下であってもここで指定するとビルド対象になる
  // https://cli.vuejs.org/config/#transpiledependencies
  transpileDependencies: [
    "shogi-player",
  ],

  // chainWebpack: (config) => {
  //   config.module
  //     .rule('images')
  //     .test(/\.(otf|eot|svg|ttf|woff|woff2|svg|gif|png)(\?.+)?$/)
  //     .use('url-loader')
  //     .loader('url-loader')
  //     .tap(options => {
  //       return {
  //         ...options,
  //         limit: Infinity,
  //         encoding: 'base64',
  //         esModule: false,    // ← 効かない
  //       };
  //     })
  // },

  // chainWebpack: config => {
  //   config.module
  //     .rule("images")
  //     .use("url-loader")
  //     .loader("url-loader")
  //     .tap(options => {
  //       console.log("---------------")
  //       console.log(options)
  //       console.log("---------------")
  //       return Object.assign(options, { limit: Infinity })
  //     })
  // },

  // https://cli.vuejs.org/config/#css-loaderoptions
  // https://github.com/webpack-contrib/sass-loader#additionaldata
  css: {
    // --mode process --target lib のとき駒が表示されなくなる問題の対処方法
    // https://cli.vuejs.org/config/#css-extract
    extract: false, // false: production のときも css を分離しない → 結果的に駒が表示されるようになる

    loaderOptions: {
      sass: {
        additionalData: `
@import "@/sp_sass_variables.sass"
@import "@/sp_sass_variables_${process.env.SP_TARGET || 'none'}.sass"
`
      }
    },
  },

}
