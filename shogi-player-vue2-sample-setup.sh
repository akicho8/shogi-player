#!/bin/sh
# 本当は npm で動かしたいが @vue/vue-loader-v15@15.10.0' is not in the npm registry. の問題があって動かない
# vue-loader-v15 は悪意のあるコードが仕込まれたため npm に削除された
# でも yarn はなぜかその問題を回避できる

# echo "~/src/shogi-player/shogi-player-vue2-sample があればいったん削除してそこにサンプルを生成します"
# read -p "よろしければ ENTER を押してください"

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

rm -fr ~/src/shogi-player/shogi-player-vue2-sample
mkdir -p ~/src/shogi-player
cd ~/src/shogi-player

# プロジェクト作成
# Default ([Vue 2] babel, eslint) を選択する
vue create shogi-player-vue2-sample

# vue create で作成したディレクトリに移動
cd ~/src/shogi-player/shogi-player-vue2-sample

# バージョンを固定する
nodenv local $NODENV_VERSION

yarn add shogi-player
