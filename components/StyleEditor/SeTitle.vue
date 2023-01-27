<template lang="pug">
a.SeTitle.title.is-5(:id="name") {{name}}
</template>

<script>
export default {
  name: "SeTitle",
  props: {
    name: { type: String, required: true },
  },
}
</script>

<style lang="sass">
.SeTitle
  display: inline-block
  margin-top: 0.4rem
  margin-bottom: 1rem
</style>
