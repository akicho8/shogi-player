<template lang="pug">
.SettingModalGroup
  pre {{TheSp.$props}}
</template>

<script>
import { support } from "../support.js"

export default {
  mixins: [support],
}
</script>

<style lang="sass">
@import "../support.sass"
</style>
