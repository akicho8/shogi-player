<template lang="pug">
.SettingModalGroup
  DebugBlock
</template>

<script>
import { support } from "../support.js"
import DebugBlock from "./DebugBlock.vue"

export default {
  mixins: [support],
  components: {
    DebugBlock,
  },
}
</script>
