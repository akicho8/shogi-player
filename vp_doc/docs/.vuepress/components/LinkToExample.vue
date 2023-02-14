<template>
<a :href="html_file" target="_blank">{{text}} <OutboundLink /></a>
</template>

<script>
export default {
  props: {
    name: { type: String, required: true },
    text: { type: String, required: false, default: "単体で開く" },
  },
  computed: {
    html_file: e => `/examples/${e.name}.html`,
  },
}
</script>
