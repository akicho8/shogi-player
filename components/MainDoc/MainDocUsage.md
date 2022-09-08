## Vue CLI への組み込み手順

  * 手順を半自動化したスクリプト [shogi-player-vue-cli-sample-create.sh](https://github.com/akicho8/shogi-player/blob/master/shogi-player-vue-cli-sample-create.sh) を参考にしてください
  * そのスクリプトを実行してできたものをそのまま https://github.com/akicho8/shogi-player-vue-cli-sample に置いています

## Nuxt.js への組み込み方法

create-nuxt-app したときの選択肢

- UI framework → Buefy
- Programming language → JavaScript
- Linting tools: → なし

nuxt.config.js の build の所をこうする

    build: {
      transpile: ["shogi-player"],
    },

buefy で便利 mixin をグローバルで使えるようにする。nuxt.config.js も変更する必要あり。

    yarn add --dev @nuxtjs/style-resources

shogi-player のスタイルを読み込む

書き切れないので https://github.com/akicho8/shogi-player-nuxt-sample を見てください
