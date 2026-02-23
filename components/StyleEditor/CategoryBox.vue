<template lang="pug">
.CategoryBox.box(v-if="category_info.enable_p" :id="category_info.key")
  CategoryTitle(:name="category_info.display_name")
  slot
</template>

<script>
import CategoryTitle from "./CategoryTitle.vue"

export default {
  name: "CategoryBox",
  inject: ["AppContext"],
  components: {
    CategoryTitle,
  },
  props: {
    category_key: { type: String, required: true },
  },
  computed: {
    category_info() { return this.AppContext.CategoryInfo.fetch(this.category_key) },
  },
}
</script>

<style lang="sass">
@import "./support.scss"
.StyleEditor
  .CategoryBox
    __css_keep__: 0
</style>
