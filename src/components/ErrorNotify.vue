<template lang="pug">
.columns
  .column
    article.message.is-danger.has-text-left
      .message-header
        slot(name="header")
      .message-body
        slot
</template>
