<template lang="pug">
.DevToolsGroup
  b-field(custom-class="is-small" label="モード")
    template(v-for="e in TheSP.ModeInfo.values")
      b-radio-button(size="is-small" v-model="TheSP.mut_mode" :native-value="e.key") {{e.name}}

  b-field(custom-class="is-small" label="視点")
    template(v-for="e in TheSP.Location.values")
      b-radio-button(size="is-small" v-model="TheSP.mut_viewpoint" :native-value="e.key") {{e.name}}

  //- b-field(grouped)
  b-field(custom-class="is-small" label="デバッグモード")
    b-switch(v-model="TheSP.mut_debug" type="is-primary" size="is-small")
</template>

<script>
import { support } from "../support.js"

export default {
  mixins: [support],
}
</script>
