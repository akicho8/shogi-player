// 反則関連

import { IllegalInfo } from "./models/illegal_info.js"

export const mod_illegal = {
  props: {
    // |----------------+----------+--------+--------------------------------------------------+--------|
    // | props          | validate | cancel |                                                  |        |
    // |----------------+----------+--------+--------------------------------------------------+--------|
    // | リレー将棋向け | o        |        | 反則になりそうでも指させてシステム側で指摘する   | 初期値 |
    // | 上級者向け     |          |        | 反則かどうかは人が判断する                       |        |
    // | 初心者向け     | o        | o      | 反則になりそうなら emit して動作をキャンセルする |        |
    // |----------------+----------+--------+--------------------------------------------------+--------|
    sp_illegal_validate: { type: Boolean, default: true,  }, // play で反則の判定をするか？
    sp_illegal_cancel:   { type: Boolean, default: false, }, // 判定で反則だったら emit して抜けるか？(true: 初心者向け)
  },

  data() {
    return {
      illegal_hv_list: [],
    }
  },
  methods: {
    illegal_init() {
      this.illegal_hv_list = []
    },

    illegal_clear() {
      this.illegal_hv_list = []
    },

    illegal_call(illegal_key, last_move_info) {
      const illegal_info = IllegalInfo.fetch(illegal_key)
      const moves = [...this.moves_take_turn_offset, last_move_info.to_sfen]
      const sfen = this.init_sfen + " moves " + moves.join(" ")
      const illegal_hv = {
        // 混ぜるな危険。構造化していれよ
        // あとこれら以外は入れるな
        // /Users/ikeda/src/shogi-extend/nuxt_side/components/ShareBoard/mod_illegal/mod_illegal.js の illegal_create_perpetual_check と合わせること
        illegal_info: illegal_info,
        sfen_and_turn: { sfen: sfen, turn: this.turn_offset + 1 },
        last_move_info: last_move_info,
      }
      this.log(`反則: ${illegal_info.name}`)
      if (this.sp_illegal_cancel) {
        this.event_call("ev_illegal_illegal_accident", illegal_hv)
        return "__cancel__"
      }
      this.illegal_hv_list.push(illegal_hv)
    },

    perpetual_check_process() {
    },
  },
}
