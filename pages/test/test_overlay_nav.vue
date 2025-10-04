<template lang="pug">
.test-test_overlay_nav
  MainDocMainNavbar
    template(slot="brand")
      MainDocNavbarItemHome
      b-navbar-item(tag="div").has-text-weight-bold 画面左右手数変更
  .section
    .container.is-fluid
      .columns
        .column.is-6
          ShogiPlayer(
            sp_mode="view"
            sp_body="position sfen lnsgkgsnl/1r5b1/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL b - 1 moves 7g7f 3c3d 6g6f 8c8d 2h6h"
            :sp_overlay_nav="true"
            )
        .column.is-6
          .my_div(@click="foo(1)") my_div
</template>

<script>
import assert from "minimalistic-assert"

export default {
  methods: {
    foo(v) {
      this.$buefy.toast.open({message: v, queue: false})
    },
  },
}
</script>

<style lang="sass">
.test-test_overlay_nav
  __css_keep__: 0
  .my_div
    touch-action: manipulation
    cursor: pointer
    border: 1px solid blue
    position: absolute
    z-index: 1
    right: 0
    width: 200px
    height: 200px
</style>
