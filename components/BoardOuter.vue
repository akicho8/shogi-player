<template lang="pug">
.BoardOuter
</template>

<script>
import { support } from "./support.js"

export default {
  name: "BoardOuter",
  mixins: [support],
}
</script>

<style lang="sass">
@import "./support.sass"
.ShogiPlayerGround
  .BoardOuter
    width: 640px
    height: 480px
    background-position: center
    background-repeat: no-repeat
    background-size: contain
    background-image: url("../assets/inspect/256x256.png")
    mix-blend-mode: difference
</style>
