<template lang="pug">
b-navbar-item(tag="nuxt-link" :to="to")
  b-icon(:icon="icon")
</template>

<script>
export default {
  name: "MainDocNavbarItemHome",
  props: {
    to:   { default: () => ({name: "index"}), },
    icon: { default: "home",                  },
  },
}
</script>
