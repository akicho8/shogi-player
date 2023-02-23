<template lang="pug">
.DevToolsGroup
  b-field(custom-class="is-small" label="モード")
    template(v-for="e in TheSp.ModeInfo.values")
      b-radio-button(size="is-small" v-model="TheSp.mut_mode" :native-value="e.key") {{e.name}}

  b-field(custom-class="is-small" label="視点")
    b-radio-button(size="is-small" v-model="TheSp.mut_viewpoint" native-value="black") ☗
    b-radio-button(size="is-small" v-model="TheSp.mut_viewpoint" native-value="white") ☖

  b-field(grouped)
    b-field(custom-class="is-small" label="デバッグモード")
      b-switch(v-model="TheSp.mut_debug" type="is-primary" size="is-small")

    b-field(custom-class="is-small" label="イベントログ")
      b-switch(v-model="TheSp.mut_event_log" type="is-primary" size="is-small")

    b-field(custom-class="is-small" label="レイヤー")
      b-switch(v-model="TheSp.mut_layer" type="is-primary" size="is-small")
</template>

<script>
import { support } from "../support.js"

export default {
  mixins: [support],
}
</script>
