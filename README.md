# shogi-player-nuxt-sample

<p><a href="https://akicho8.github.io/shogi-player/"><img src="https://raw.githubusercontent.com/akicho8/shogi-player/master/shogi-player-nuxt-sample/application.png" height="640" /></a></p>

これは [shogi-player](https://akicho8.github.io/shogi-player/) を Nuxt.js で使うサンプルです

## 最初の段階の構築手順

```shell
# node の確認。無い場合は nodenv install 12.22.0 で入れておく
$ NODENV_VERSION=12.22.0 node -v
# v12.22.0

# あとで使うので yarn も入れておく
$ NODENV_VERSION=12.22.0 npm i -g yarn

$ cd ~/src

$ NODENV_VERSION=12.22.0 npx create-nuxt-app shogi-player-nuxt-sample
# create-nuxt-app v3.7.1

# 次の通りに選択する
# | 項目                 | 選択                     |
# |----------------------|--------------------------|
# | Project name         | shogi-player-nuxt-sample |
# | Programming language | JavaScript               |
# | Package manager      | Yarn                     |
# | UI framework         | Buefy                    |
# | Nuxt.js modules      |                          |
# | Linting tools        |                          |
# | Testing framework    | None                     |
# | Rendering mode       | Single Page App          |

$ cd ~/src/shogi-player-nuxt-sample

# バージョンを固定する
$ nodenv local 12.22.0

$ yarn add --dev @nuxtjs/style-resources
$ yarn add shogi-player
```

## shogi-player 更新方法

```shell
$ ncu -u shogi-player
$ yarn
```

## このサンプルの実行方法

```shell
yarn
yarn dev --open --port 3200
```
