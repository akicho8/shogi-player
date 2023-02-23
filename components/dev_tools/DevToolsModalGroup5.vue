<template lang="pug">
.DevToolsModalGroup
  pre {{TheSp.$data}}
</template>

<script>
import { support } from "../support.js"

export default {
  mixins: [support],
}
</script>
