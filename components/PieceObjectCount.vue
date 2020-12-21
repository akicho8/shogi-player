<template lang="pug">
</template>

<script>
import { support } from "./support.js"

export default {
  name: "PieceObjectCount",
  mixins: [support],
  props: {
    count: { type: Number, required: true },
  },
}
</script>

<style lang="sass">
</style>
