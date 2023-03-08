module.exports = {
  // ▼shogi-player 側のクラス定数 "static foo = 1" な表記が読み取れない問題に対処する
  // 原因は babel が node_modules 以下を除外しているため。
  // node_modules 以下であってもここで指定するとビルド対象になる
  // https://cli.vuejs.org/config/#transpiledependencies
  transpileDependencies: [
    "shogi-player",
  ],

  // https:cli.vuejs.org/config/#css-loaderoptions
  // https:github.com/webpack-contrib/sass-loader#additionaldata
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
@import "~bulma/sass/utilities/_all"
`
      },
    },
  },
}
