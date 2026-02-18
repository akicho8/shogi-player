<template lang="pug">
//- http://kyokumen.jp/positions/lnsgkgsnl/1r5b1/ppppppppp/9/9/2P6/PP1PPPPPP/1B5R1/LNSGKGSNL%20w%20-
.SfenShowBlock.is-size-7.has-text-grey(v-if="TheSP.sp_sfen_show")
  // FIXME: これ子コンポーネントにしたせいで利用者は slot で取れないのでは？
  slot(name="sfen_part" :sfen="TheSP.xcontainer.to_simple_sfen" :xcontainer="TheSP.xcontainer")
    | {{TheSP.xcontainer.to_simple_sfen}}
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
.ShogiPlayer
  .SfenShowBlock
    word-break: break-all // 幅が狭いときでも折り返す
    margin-top: var(--sp_common_gap_real_px)
</style>
