#!/bin/sh

node -v
# v12.6.0

vue -V
# @vue/cli 4.5.9

cd ~/src
rm -fr shogi-player-vue-cli-sample
vue create shogi-player-vue-cli-sample
cd shogi-player-vue-cli-sample

cat <<'EOF' > src/components/HelloWorld.vue
<template lang="pug">
  ShogiPlayer
</template>

<script>
import Vue from "vue"
import Buefy from "buefy"
import "buefy/dist/buefy.css"
Vue.use(Buefy)

import ShogiPlayer from "shogi-player/components/ShogiPlayer.vue"

export default {
  name: 'HelloWorld',
  components: {
    ShogiPlayer,
  },
  props: {
    msg: String,
  },
}
</script>

<style lang="sass">
$sp_assets_dir: "../../node_modules/shogi-player/assets"
@import "../../node_modules/shogi-player/components/ShogiPlayer.sass"
</style>
EOF

yarn add shogi-player

# yarn add pug
# yarn add pug-loader
# yarn add pug-plain-loader

yarn add sass-loader
yarn add node-sass@4

# yarn add babel-core
# yarn add babel-loader
# yarn add babel-runtime

# yarn add core-js
# yarn add babel-runtime

yarn serve
open http://localhost:8080/
