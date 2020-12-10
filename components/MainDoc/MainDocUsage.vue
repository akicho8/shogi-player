<template lang="pug">
.MainDocUsage.section(v-if="false")
  a(name="usage")
  .container
    .title.is-3 使い方
    hr
    MainDocMd(:body="usage_md")
</template>

<script>
import usage_md from "./usage.md"

export default {
  name: "MainDocUsage",
  data() {
    return {
      usage_md,
    }
  },
}
</script>

<style lang="sass">
@import "./support.sass"
.MainDocUsage
</style>
