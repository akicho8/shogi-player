<template lang="pug">
.CommentBlock.columns(v-if="TheSp.sp_comment === 'is_comment_on' && comments_pack && current_comments")
  .column
    .message.is-info.has-text-left
      .message-body
        .content
          template(v-for="str in current_comments")
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
    _()                { return _                                       },
    mediator()         { return this.TheSp.mediator                      },
    comments_pack()    { return this.mediator.data_source.comments_pack },
    current_comments() { return this.mediator.current_comments          },
  },
}
</script>

<style lang="sass">
@import "./support.sass"
.ShogiPlayerGround
  .CommentBlock
    line-height: 1.5rem
    .column
      margin-top: var(--sp_common_gap)
</style>
