<template lang="pug">
.section
  .columns
    .column
      ShogiBoard
    .column
      ShogiBoard
</template>

<script>
import ShogiBoard from "./components/ShogiBoard.vue"

export default {
  name: "App",
  components: { ShogiBoard },
}
</script>

<style>
#app {
}
</style>
