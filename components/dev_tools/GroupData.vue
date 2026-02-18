<template lang="pug">
.DevToolsGroup
  pre {{TheSP.$data}}
</template>

<script>
import { support } from "../support.js"

export default {
  mixins: [support],
}
</script>
