<template lang="pug">
.MembershipLocation.is-flex
  // 要素縦並びにする
  //
  // "▲名前"  ← MembershipLocationMark + .player_name
  // "12:34"   ← .time_format
  //
  .is-flex
    MembershipLocationMark(:base="base" :location="location")
    .player_name.ml-1.has-text-weight-bold(v-if="player_name" v-text="player_name")
  .time_format(v-if="player_time" v-text="player_time")
</template>

<script>
import { support_child } from "./support_child.js"
import MembershipLocationMark from "./MembershipLocationMark.vue"

export default {
  name: "MembershipLocation",
  mixins: [support_child],
  props: {
    location: { required: true },
  },
  components: {
    MembershipLocationMark,
  },
  methods: {
    player_attr(key) {
      if (this.base.player_info) {
        return this.base.player_info[this.location.key][key]
      }
    },
  },
  computed: {
    player_name() { return this.player_attr("name") },
    player_time() { return this.player_attr("time") },
  },
}
</script>

<style lang="sass">
@import "./support.sass"
.shogi-player
  &.vertical
    .Membership
      &.location_white
        .MembershipLocation
          // margin-right: auto  // ▲だけ左寄せ (左寄せにしたければ右側のマージンをautoにする)
      &.location_black
        .MembershipLocation
          // margin-left: auto  // ▲だけ右寄せ (右寄せにしたければ左側のマージンをautoにする)

      .MembershipLocation
        border: 1px dashed change_color($primary, $alpha: 0.5)
        width: 8rem
        height: 8rem

        margin-left: auto  // ▲だけ右寄せ (右寄せにしたければ左側のマージンをautoにする)
        font-size: 1rem

        flex-direction: column  // 縦並びにする場合
        align-items: center     // 縦並びなのでY座標を中央にするとXが中央になる
        justify-content: center // 縦並びなのでX座標を中央にするとYが中央になる

  ////////////////////////////////////////////////////////////////////////////////
  &.vertical
    // 反転してない状態で上の最初から反転している「△後手」を先手目線にするため反転する
    // つまり反転したのを一部反転して元に戻す
    .flip_off
      .Membership
        &.location_white
          .MembershipLocation
            @extend %is_flip
    // 同様に反転させたときは▲が上にくるので location_black の方を反転する
    .flip_on
      .Membership
        &.location_black
          .MembershipLocation
            @extend %is_flip
</style>
