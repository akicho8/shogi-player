<template lang="pug">
.DevToolsGroup
  b-field(custom-class="is-small" label="モード")
    template(v-for="e in TheSp.ModeInfo.values")
      b-radio-button(size="is-small" v-model="TheSp.mut_mode" :native-value="e.key") {{e.name}}

  b-field(grouped)
    b-field(custom-class="is-small" label="視点")
      b-radio-button(size="is-small" v-model="TheSp.new_viewpoint" native-value="black") ☗
      b-radio-button(size="is-small" v-model="TheSp.new_viewpoint" native-value="white") ☖

    b-field(custom-class="is-small" label="デバッグモード")
      b-radio-button(size="is-small" v-model="TheSp.mut_debug" :native-value="false") OFF
      b-radio-button(size="is-small" v-model="TheSp.mut_debug" :native-value="true") ON

    b-field(custom-class="is-small" label="イベントログ")
      b-radio-button(size="is-small" v-model="TheSp.mut_event_log" :native-value="false") OFF
      b-radio-button(size="is-small" v-model="TheSp.mut_event_log" :native-value="true")  ON
</template>

<script>
import { support } from "../support.js"

export default {
  mixins: [support],
}
</script>
