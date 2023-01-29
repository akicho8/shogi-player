<template lang="pug">
//- http://kyokumen.jp/positions/lnsgkgsnl/1r5b1/ppppppppp/9/9/2P6/PP1PPPPPP/1B5R1/LNSGKGSNL%20w%20-
.SfenShowBlock.is-size-7.has-text-grey(v-if="TheSp.sp_sfen_show === 'is_sfen_show_on'")
  // FIXME: これ子コンポーネントにしたせいで利用者は slot で取れないのでは？
  slot(name="sfen_part" :sfen="TheSp.xcontainer.to_simple_sfen" :xcontainer="TheSp.xcontainer")
    | {{TheSp.xcontainer.to_simple_sfen}}
</template>

<script>
import { support } from "./support.js"

export default {
  name: "SfenShowBlock",
  mixins: [support],
}
</script>

<style lang="sass">
@import "./support.sass"
.ShogiPlayerGround
  .SfenShowBlock
    word-break: break-all // 幅が狭いときでも折り返す
    margin-top: var(--sp_common_gap_real_px)
</style>
