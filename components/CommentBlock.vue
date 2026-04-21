<template lang="pug">
.CommentBlock(v-if="TheSP.sp_comment && TheSP.xcontainer.current_comments")
  .message.has-text-left
    .message-body
      .content
        template(v-for="str in TheSP.xcontainer.current_comments")
          template(v-if="_.isEmpty(str)")
            br
          template(v-else)
            div(v-html="auto_link(str)")
</template>

<script>
import Autolinker from "autolinker"
import _ from "lodash"
import { support } from "./support.js"

export default {
  name: "CommentBlock",
  mixins: [support],
  methods: {
    auto_link(str) { return Autolinker.link(str) },
  },
  computed: {
    _() { return _  },
  },
}
</script>

<style lang="sass">
@import "./support"
.ShogiPlayer
  .CommentBlock
    margin: var(--sp_common_gap_real_px) 0 0
    line-height: 1.5rem
</style>
