<template>
<div class="CustomizeExample">
  <iframe class="CustomizeExample" :src="html_file" frameborder="0" :width="width" :height="height" v-bind="$attrs" />
  <LinkToExample :name="name" />
</div>
</template>

<script>
export default {
  name: "CustomizeExample",
  props: {
    name:   { type: String, required: true                 },
    width:  { type: Number, required: false, default: 250, },
    height: { type: Number, required: false, default: 250, },
  },
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
