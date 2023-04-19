<template lang="pug">
.CommentBlock(v-if="TheSp.sp_comment && TheSp.xcontainer.current_comments")
  .message.has-text-left
    .message-body
      .content
        template(v-for="str in TheSp.xcontainer.current_comments")
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
@import "./support.sass"
.ShogiPlayer
  .CommentBlock
    margin: var(--sp_common_gap_real_px) 0 0
    line-height: 1.5rem
</style>
