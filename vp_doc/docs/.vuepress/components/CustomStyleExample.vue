<template>
  <div class="CustomStyleExample">
    <iframe :src="html_file" frameborder="0" width="100%" height="600" />
    <a :href="html_file" target="_blank">この例を単体で開く <OutboundLink /></a>
  </div>
</template>

<script>
export default {
  name: "CustomStyleExample",
  props: ["name"],
  computed: {
    html_file: e => `/examples/theme/${e.name}.html`,
  },
}
</script>

<style lang="stylus">
.CustomStyleExample
  display: flex
  justify-content: center
  align-items: center
  flex-direction: column
  // iframe
  //   border: 1px solid blue
</style>
