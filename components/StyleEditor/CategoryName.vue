<template lang="pug">
.CategoryName.title.is-5(is="a" :id="name" @click="click_handle") {{name}}
</template>

<script>
export default {
  name: "CategoryName",
  inject: ["AppContext"],
  props: {
    name: { type: String, required: true },
  },
  methods: {
    click_handle(e) {
      this.AppContext.category_jumped_fn(e.target)
      this.$buefy.toast.open({message: `カレントカテゴリーを「${e.target.id}」に変更しました`, queue: false})
    },
  },
}
</script>

<style lang="sass">
.CategoryName
  display: inline-block
  margin-top: 0.4rem
  margin-bottom: 1rem
</style>
