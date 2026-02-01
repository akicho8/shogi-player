// ・千日手の判定をするには、アプリ側で snapshot_hash の登場個数をカウントする
// ・連続王手の千日手の反則判定するには、それに加えて op_king_check を考慮してカウントする
// ・shogi-player 側では具体的な実装はせず、単に低レベルの情報だけをイベントで返すようにする

import _ from "lodash"
import { GX } from "./models/gx"

export const mod_snapshot_hash = {
  props: {
    sp_request_snapshot_hash: { type: Boolean, default: true,  }, // 操作モードで千日手判定用に現局面のSFENをイベントに含めるか？ (本当はデフォルトを false にしたいが互換性のため true にしている)
    sp_request_op_king_check: { type: Boolean, default: false, }, // 操作モードで王手しているかどうかの結果をイベントに含めるか？
  },
  methods: {
    // 現在の局面のハッシュ文字列を返す (内容はSFEN文字列)
    snapshot_hash() {
      let value = null
      this.benchmark_print("局面ハッシュ作成処理時間", () => { value = this.xcontainer.snapshot_hash })
      return value
    },

    my_king_check() { return !!this.xcontainer.board.king_dead_p(this.xcontainer.current_location)      }, // 王手されているか？
    op_king_check() { return !!this.xcontainer.board.king_dead_p(this.xcontainer.current_location.flip) }, // 王手しているか？
  },
}
