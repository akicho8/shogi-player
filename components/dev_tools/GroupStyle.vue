<template lang="pug">
.DevToolsGroup
  b-field(custom-class="is-small" label="レイヤー")
    b-switch(v-model="TheSp.mut_layer" type="is-primary" size="is-small")

  b-field(grouped)
    b-field(custom-class="is-small" label="駒")
      b-select(size="is-small" v-model="TheSp.mut_piece_variant")
        template(v-for="e in TheSp.PieceVariantInfo.values")
          option(:value="e.key") {{e.name}}

    b-field(custom-class="is-small" label="盤")
      b-select(size="is-small" v-model="TheSp.mut_bg_variant")
        template(v-for="e in TheSp.BgVariantInfo.values")
          option(:value="e.key") {{e.name}}

  pre {{TheSp.ro_css_variables_hash}}

</template>

<script>
import { support } from "../support.js"

export default {
  mixins: [support],
}
</script>
