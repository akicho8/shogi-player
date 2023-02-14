<template>
  <div class="CustomStyleExample2">
    <iframe :src="html_file" frameborder="0" />
    <!-- <a :href="html_file" target="_blank">この例を単体で開く <OutboundLink /></a> -->
  </div>
</template>

<script>
export default {
  name: "CustomStyleExample2",
  props: ["name"],
  computed: {
    html_file: e => `/examples/${e.name}.html`,
  },
}
</script>

<style lang="stylus">
.CustomStyleExample2
  display: flex
  justify-content: center
  // align-items: center
  flex-direction: column
  iframe
    width: 160px
    height: 210px
    // border: 1px solid blue
</style>
