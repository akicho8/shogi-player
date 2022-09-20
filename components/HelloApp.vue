<template lang="pug">
.HelloApp
  | OK2
</template>

<script>
import Foo from "./foo.kif?raw"

export default {
  name: "HelloApp",
  data() {
    return {
    }
  },
  mounted() {
    console.log(Foo)
  },
}
</script>

<style lang="sass">
@import "./support.sass"
.HelloApp
  // +mobile
  //   font-size: 15px
</style>
