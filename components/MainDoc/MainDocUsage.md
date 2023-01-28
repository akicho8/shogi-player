## Vue CLI ##

  * 手順を半自動化したスクリプト [shogi-player-vue-cli-sample-create.sh](https://github.com/akicho8/shogi-player/blob/master/shogi-player-vue-cli-sample-create.sh) を参考にしてみてください
  * そのスクリプトをそのまま実行して生成したものを https://github.com/akicho8/shogi-player/tree/master/shogi-player-vue-cli-sample に置いています

## Nuxt.js ##

  * 手動で組み込んだ例を https://github.com/akicho8/shogi-player/tree/master/shogi-player-nuxt-sample に置いています
  * いろんな箇所を変更するため半自動化での生成は断念しました

## React, Next.js, 静的サイト等 ##

  * Web Components 化することで他のフレームワークと共生できます
  * 例: [将棋MAP](https://shogimap.com/ph13PcP0tga53rWhH7BD) (Next.js 製)

## 共通する組み込みポイント ##

  * `node_modules/shogi-player` 以下を babel のビルド対象に含める
    * これをやらないと JavaScript のクラス定数や `??` 演算子が解釈できずビルドできない
  * file-loader で *.wav をファイル化するときに `esModule: false` オプションをつける
    * これをやらないと wav ファイルへのパスが文字列にならず、ビルドできない
  * process 定数がグローバルに存在するようにする
    * これをやらないと `process` を参照しているライブラリがビルドできない
