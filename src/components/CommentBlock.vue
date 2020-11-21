<template lang="pug">
.CommentBlock.columns(v-if="comments_pack && current_comments")
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
  mixins: [support],
  props: {
    comments_pack:    { required: true },
    current_comments: { required: true },
  },
  created() {
    this.autolinker = new Autolinker()
  },
  methods: {
    auto_link(str) {
      return this.autolinker.link(str)
    },
  },
  computed: {
    _() { return _ }
  },
}
</script>
