<template lang="pug">
.FriendlyCloseButton.is-clickable(v-bind="$attrs" v-on="$listeners")
  .delete
    slot
</template>

<script>
export default {
  name: "FriendlyCloseButton",
}
</script>

<style lang="sass">
.FriendlyCloseButton
  position: absolute
  top: 0
  right: 0
  padding: 0.25rem
</style>
