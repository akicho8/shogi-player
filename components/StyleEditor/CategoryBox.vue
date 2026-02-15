<template lang="pug">
.CategoryBox.box(v-if="category_info.enable_p" :id="category_info.key")
  CategoryName(:name="category_info.display_name")
  slot
</template>

<script>
import CategoryName from "./CategoryName.vue"

export default {
  name: "CategoryBox",
  inject: ["AppContext"],
  components: {
    CategoryName,
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
