<template lang="pug">
.DevToolsGroup
  b-field(custom-class="is-small" label="イベントログ")
    b-switch(v-model="TheSP.mut_event_log" type="is-primary" size="is-small")
  pre {{TheSP.event_logs}}
</template>

<script>
import { support } from "../support.js"

export default {
  mixins: [support],
}
</script>
