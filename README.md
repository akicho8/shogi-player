[![Build Status](https://travis-ci.org/akicho8/shogi-player.svg?branch=master)](https://travis-ci.org/akicho8/shogi-player)
[![Maintainability](https://api.codeclimate.com/v1/badges/4de340004a69572e32a0/maintainability)](https://codeclimate.com/github/akicho8/shogi-player/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/4de340004a69572e32a0/test_coverage)](https://codeclimate.com/github/akicho8/shogi-player/test_coverage)
[![Dependency Status](https://gemnasium.com/badges/github.com/akicho8/shogi-player.svg)](https://gemnasium.com/github.com/akicho8/shogi-player)
[![npm version](https://badge.fury.io/js/shogi_player.svg)](https://badge.fury.io/js/shogi_player)
[![GitHub version](https://badge.fury.io/gh/akicho8%2Fshogi-player.svg)](https://badge.fury.io/gh/akicho8%2Fshogi-player)

# 将棋棋譜プレイヤー

<div><a href="https://akicho8.github.io/shogi-player/"><img src="https://raw.github.com/akicho8/shogi-player/master/screenshot1.png" height="480" /></a></div>

[Demo](https://akicho8.github.io/shogi-player/)

## Rails で使用する例

```shell
% yarn add shogi_player
```

app/javascript/packs/shogi_player.js

```JavaScript
import Vue from 'vue/dist/vue.esm'
import ShogiPlayer from 'shogi_player/src/components/ShogiPlayer.vue'

document.addEventListener('DOMContentLoaded', () => {
  const app = new Vue({
    el: '#shogi_player_app',
    components: { "shogi_player": ShogiPlayer },
  })
})
```

app/views/xxx/show.html.erb

```html
<%= javascript_pack_tag("shogi_player") %>
<%= stylesheet_pack_tag("shogi_player") %>

<div id="shogi_player_app">
  <shogi_player :kifu_body="'position startpos moves 7g7f 8c8d'" :turn_start="-1"></shogi_player>
</div>
```

## 引数

| props                   | 意味                       | 例・補足                                           |
|-------------------------|----------------------------|----------------------------------------------------|
| kifu_body               | 棋譜                       | 例: position startpos                              |
| turn_start              | N手目                      | 0:最初 -1:最後                                     |
| keyboard_operation_flag | キーボード操作を充実させる | どこにもフォーカスしていないときでも左右が反応する |


## Build Setup

```bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
