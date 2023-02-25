<template>
  <div class="CustomizeExample2">
    <iframe :src="html_file" frameborder="0" />
  </div>
</template>

<script>
export default {
  name: "CustomizeExample2",
  props: ["name"],
  computed: {
    html_file: e => `/examples/${e.name}.html`,
  },
}
</script>

<style lang="stylus">
.CustomizeExample2
  display: flex
  justify-content: center
  // align-items: center
  flex-direction: column
  iframe
    width: 160px
    height: 210px
    // border: 1px solid blue
</style>
