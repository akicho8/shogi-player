<template lang="pug">
.columns
  .column
    article.message.is-danger.has-text-left
      .message-header
        slot(name="header")
      .message-body
        slot
</template>

<script>
import { support_child } from "./support_child.js"

export default {
  mixins: [support_child],
}
</script>
