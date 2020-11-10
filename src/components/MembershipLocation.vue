<template lang="pug">
.MembershipLocation
  .location_mark(v-html="location.name")

  //- 2桁にして幅を常に予約しておく
  template(v-if="base.theme === 'simple'")
    template(v-if="!base.current_vlayout")
      .piece_count.piece_count1
        | 99

  template(v-if="base.current_vlayout && player_name")
    .player_name
      | {{player_name}}

  template(v-if="!base.current_vlayout && player_name")
    .player_name
      | {{player_name}}
</template>

<script>
import { support_child } from "./support_child.js"

export default {
  name: "MembershipLocation",
  mixins: [support_child],

  props: {
    location: { required: true },
  },

  computed: {
    player_name() {
      if (this.player_info) {
        return this.player_info[this.location.key].name
      }
    },

    player_info() {
      return this.base.player_info
    },
  },
}
</script>
