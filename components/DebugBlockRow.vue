<template lang="pug">
tr.DebugBlockRow
  th {{name}}
  td {{value}}
  td
    code
      | {{code}}
</template>

<script>
import { support } from "./support.js"

export default {
  name: "DebugBlockRow",
  mixins: [support],
  props: {
    name:  { type: String, required: true },
    value: { required: true },
    code:  { type: String, required: true },
  },
}
</script>

<style lang="sass">
@use "./support.sass"
.ShogiPlayer
  .DebugBlockRow
    th
      text-align: right
      background-color: $white-ter
</style>
