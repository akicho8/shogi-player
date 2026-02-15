<template lang="pug">
.CategoryName.title.is-5(is="a" :id="name") {{name}}
</template>

<script>
export default {
  name: "CategoryName",
  props: {
    name: { type: String, required: true },
  },
}
</script>

<style lang="sass">
.CategoryName
  display: inline-block
  margin-top: 0.4rem
  margin-bottom: 1rem
</style>
