<template>
<div class="CustomizeExample">
  <iframe class="CustomizeExample" :src="html_file" frameborder="0" width="250" height="250" />
  <LinkToExample :name="name" />
</div>
</template>

<script>
export default {
  name: "CustomizeExample",
  props: ["name"],
  computed: {
    html_file: e => `/examples/${e.name}.html`,
  },
}
</script>

<style lang="stylus">
.CustomizeExample
  iframe
    display: block
</style>
