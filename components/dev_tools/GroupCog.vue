<template lang="pug">
.DevToolsGroup
  b-field(custom-class="is-small" label="固定サイド")
    template(v-for="e in TheSp.DevToolsPositionInfo.values")
      b-radio-button(size="is-small" v-model="TheSp.mut_dev_tools_position" :native-value="e.key") {{e.name}}
  b-field(custom-class="is-small" label="設定値")
    b-button(size="is-small" @click="TheSp.dev_tools_reset_handle") リセット
</template>

<script>
import { support } from "../support.js"

export default {
  mixins: [support],
}
</script>
