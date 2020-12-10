<template lang="pug">
.MainDocViewDemo3.column
  b-message(type="is-info")
    | スライダーのみ表示
  .has-text-centered
    .title.is-4 藤井猛六段 vs 井上慶太六段
    p.subtitle 第54期順位戦B級2組7回戦
  hr
  ShogiPlayer(
    :kifu_body="'position startpos moves 7g7f 8c8d 2h6h 3c3d 6g6f 7a6b 3i3h 5a4b 4g4f 4b3b 3g3f 2b3c 1g1f 8d8e 8h7g 3b2b 7i7h 5c5d 7h6g 6a5b 2i3g 1a1b 6g5f 5d5e 5f4e 8b8d 3f3e 3d3e 3g2e 3c4d 6f6e 2c2d 6e6d 2d2e 4e4d 4c4d 7g5e N*3b P*3c 2b3c B*4e P*5d 5e6f 3c2b 6f8d 4d4e 6d6c+'"
    :start_turn="-1"
    :slider_show="true"
    :sp_bg_variant="'is_bg_variant_d'"
    )
</template>

<script>
export default {
  name: "MainDocViewDemo3",
  data() {
    return {
    }
  },
}
</script>

<style lang="sass">
@import "./support.sass"
.MainDocViewDemo3
</style>
