var webpack = require("webpack");

module.exports = {
  // ▼shogi-player 側のクラス定数 "static foo = 1" な表記が読み取れない問題に対処する
  // 原因は babel が node_modules 以下を除外しているため。
  // node_modules 以下であってもここで指定するとビルド対象になる
  // https://cli.vuejs.org/config/#transpiledependencies
  transpileDependencies: [
    "shogi-player",
  ],

  // ▼webpack5 で "Uncaught ReferenceError: process is not defined" になる問題に対処する
  // 4 まで必ず存在していた process が 5 から切り捨てられたため process を参照しているライブラリがことごとく失敗する
  // typedef process であらかじめチェックするように webpack のドキュメントに書いてあるがきりがない
  // これまで必ず存在する前提で process を参照しているため process を埋めた方がてっとり早い
  // この設定と合わせて yarn add process が必要
  // https://zenn.dev/szgk/articles/2d0843136d2fa8
  // https://webpack.js.org/migrate/5/#run-a-single-build-and-follow-advice
  // https://stackoverflow.com/questions/65018431/webpack-5-uncaught-referenceerror-process-is-not-defined
  // https://cli.vuejs.org/config/#configurewebpack
  // https://qiita.com/uturned0/items/5fdf2d92548274fe56e3
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        process: "process/browser",
      }),
    ],
  },

 // chainWebpack: (config) => {
 //   config.module
 //     .rule('images')
 //     // .test(/\.(otf|eot|svg|ttf|woff|woff2|svg|gif|png)(\?.+)?$/)
 //     .use('url-loader')
 //     .loader('url-loader')
 //     .tap(options => {
 //       return {
 //         ...options,
 //         limit: Infinity,
 //         encoding: 'base64',
 //         esModule: false,
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
    extract: false, // false: production のときも css を分離しない(分離すると駒が表示されなくなる)

    loaderOptions: {
      sass: {
        additionalData: `
@import "@/sp_sass_variables.sass"
@import "@/sp_sass_variables_${process.env.SP_TARGET}.sass"
`
      }
    },
  },

}
