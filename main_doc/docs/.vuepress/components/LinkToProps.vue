<template>
<a :href="path">{{name}}</a>
</template>

<script>
export default {
  props: {
    name: { type: String, required: true, },
  },

  computed: {
    path() {
      const name2 = this.name.replace(/_/g, "-")
      return `/reference/props/#${name2}`
    },
  },
}
</script>

<style lang="stylus">
</style>
