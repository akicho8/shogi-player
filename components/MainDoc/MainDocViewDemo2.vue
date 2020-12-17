<template lang="pug">
.MainDocViewDemo2.column
  b-message(type="is-info")
    | シンプル。最終手から表示。※盤面クリックで操作可。天王山クリックで反転
  .has-text-centered
    .title.is-4 羽生善治名人 vs 渡辺明竜王
    p.subtitle 第21期竜王戦七番勝負第4局
  hr
  ShogiPlayer(
    :kifu_body="'position startpos moves 2g2f 8c8d 2f2e 8d8e 6i7h 4a3b 2e2d 2c2d 2h2d P*2c 2d2h 7a7b 3i3h 3c3d 9g9f 9c9d 1g1f 1c1d 3h2g 8e8f 8g8f 8b8f P*8g 8f8d 2g3f 5a5b 7g7f 7c7d 8h2b+ 3a2b 7i8h 7b7c 8h7g 7c6d 3f4e 7d7e 4e5f 2b3c 6g6f 3c4d 5f6g 6a7b 5i6h 8a7c 4i5h 2a3c 6h7i 7e7f 6g7f 4d5e P*7e 9d9e B*7d P*8h 7i8h 7b8c 9f9e 8c7d 7e7d 8d7d P*7e 7d8d 5h6g P*7d 7e7d 8d7d P*7e 6d7e 7f7e 7d7e 7g7f 7e7d S*7e 7d4d P*7d 4d4g+ P*2d 2c2d 7d7c+ 4g4i 2h2d P*2c 2d3d 4c4d P*7i 5b4c 3d3e S*4e 6g5f P*7g 8i7g P*3d 3e4e 3c4e 5f5e R*2h N*3f 2h7h+ 8h9g 4e5g+ 5e4d 4i4d S*5b 4c5d 7i7h 4d4i G*6e 5d4e R*4d 4e5f 4d4i G*4h S*3h 4h4i R*5e 5f4f 3h4i G*4e P*4g 5g4g P*4h 4g3g 2i3g 4f3g 5e4e R*8i G*3h 3g3f G*4f 3f2f 9i9h 8i4i+ P*3i S*2i 3h2h 4i3i'"
    :start_turn="-1"
    :sp_bg_variant="'is_bg_variant_b'"
    :sp_pi_variant="'is_pi_variant_a1by'"
    )
</template>

<script>
export default {
  name: "MainDocViewDemo2",
  data() {
    return {
    }
  },
}
</script>

<style lang="sass">
@import "./support.sass"
.MainDocViewDemo2
</style>
