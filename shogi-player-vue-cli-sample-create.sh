#!/bin/sh
# 本当は npm で動かしたいが @vue/vue-loader-v15@15.10.0' is not in the npm registry. の問題があって動かない
# vue-loader-v15 は悪意のあるコードが仕込まれたため npm に削除された
# でも yarn はなぜかその問題を回避できる

echo "~/src/shogi-player/shogi-player-vue-cli-sample があればいったん削除してそこにサンプルを生成します"
read -p "よろしければ ENTER を押してください"

# 使用する node のバージョン
# なるべく新しいので動かしたいが上げすぎると node-sass が動かないので注意
export NODENV_VERSION=12.22.0

# node の対応するバージョンがなければインストールする
nodenv install --skip-existing $NODENV_VERSION

# node の対応するバージョンがあるのを確認する
node -v
# v12.22.0

# このあとの vue create で yarn が走るので入れておく
npm i -g yarn

# vue cli 本体をインストール
# npm で入れる場合は npm install -g @vue/cli @vue/cli-service-global とする
yarn global add @vue/cli
yarn global add @vue/cli-service-global

# @vue/cli のバージョン確認
vue -V
# @vue/cli 5.0.8

rm -fr ~/src/shogi-player/shogi-player-vue-cli-sample
mkdir -p ~/src/shogi-player
cd ~/src/shogi-player

# プロジェクト作成
# Default ([Vue 2] babel, eslint) を選択する
vue create shogi-player-vue-cli-sample

# vue create で作成したディレクトリに移動
cd ~/src/shogi-player/shogi-player-vue-cli-sample

# バージョンを固定する
nodenv local $NODENV_VERSION

yarn add shogi-player

# webpack5 で process が参照できない問題への対処するために必要
yarn add process

cat <<'EOF' > vue.config.js
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
}
EOF

cat <<'EOF' > src/components/HelloWorld.vue
<template lang="pug">
.is-flex.is-justify-content-center
  .MyShogiPlayerContainer
    ShogiPlayer(
      sp_layout="is_horizontal"
      sp_controller="is_controller_on"
      sp_slider="is_slider_on"
      sp_body="position sfen lnsgkgsnl/1r7/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL w - 1 moves 7a6b 7g7f 5c5d 2g2f 5a4b 2f2e 4b3b 2e2d 2c2d 2h2d 6b5c 2d2f P*2c 3i4h 8c8d 7i7h 8d8e 8h7g 4a4b 5g5f 6a5b 6g6f 7c7d 7g6h 5c6d 7h6g 5b5c 6i7h 9c9d 9g9f 5c4d 6f6e 6d7c 4h5g 8b6b 8i7g 6b8b 5g6f 1c1d 1g1f 9d9e 9f9e 8e8f 8g8f 9a9e P*9g 9e9g 9i9g P*9f 7g8e 9f9g+ 8e7c+ 8a7c P*9d 8b9b S*8c 9b9a 2f2h P*8g 6h4f 5d5e 6f5e 4d4e 4f5g 7c6e 5g8d N*3e L*2g 3e2g+ 2h2g 8g8h+ 7h6h 9g8g 5e6f 8h7h 6g7h 8g7h 6h7h L*6d P*6g 4e5f P*5h P*5g 2g2f L*5c 6f6e 6d6e 5i6h 5g5h+ 4i5h P*5g 5h4h S*8i N*7i P*8g 7h8g S*7h N*6f 9a8a 9d9c+ 7h8g+ 7i8g 8a8c 9c8c G*7h 6h5i S*5h"
      )
</template>

<script>
// Buefy
// これは全体で使うことになるので本当は index.js で読み込んだ方がよい
import Vue from "vue"
import Buefy from "buefy"
import "buefy/dist/buefy.css"
Vue.use(Buefy)

// shogi-player 本体
import ShogiPlayer from "shogi-player/components/ShogiPlayer.vue"

export default {
  name: "HelloWorld",
  components: {
    ShogiPlayer,
  },
  props: {
    msg: String,
  },
}
</script>

<style lang="sass">
// ShogiPlayer のスタイルを読み込む
// できれば $sp_assets_dir は取りたい
// 本当は ShogiPlayer.sass からの相対パスで assets の場所が指定できればいいけどわからないので新たに設定してもらう形にしている
$sp_assets_dir: "shogi-player/assets"
@import "shogi-player/components/ShogiPlayer.sass"

// これは public/index.html で普通に読み込んだ方がいい
@import url("https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css")

// このあとで +mobile などを使いたいため
@import "~bulma/sass/utilities/_all"

// ShogiPlayer は常に横100%まで広がるので外側で大きさを調整する
.MyShogiPlayerContainer
  +mobile
    width: 100%
  +tablet
    width: 70vmin

// Vue のロゴを小さくする
#app > img
  height: 64px
</style>
EOF

# ブラウザで開く
yarn serve --open --port 3100
