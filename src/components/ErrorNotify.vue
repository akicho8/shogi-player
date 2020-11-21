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
import { support } from "./support.js"

export default {
  mixins: [support],
}
</script>
