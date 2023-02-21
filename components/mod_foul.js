// 反則関連

import { FoulInfo } from "./models/foul_info.js"

export const mod_foul = {
  props: {
    // |----------------+-------+-------+--------------------------------------------------+--------|
    // | props          | check | break |                                                  |        |
    // |----------------+-------+-------+--------------------------------------------------+--------|
    // | リレー将棋向け | o     |       | 反則になりそうでも指させてシステム側で指摘する   | 初期値 |
    // | 上級者向け     |       |       | 反則かどうかは人が判断する                       |        |
    // | 初心者向け     | o     | o     | 反則になりそうなら emit して動作をキャンセルする |        |
    // |----------------+-------+-------+--------------------------------------------------+--------|
    sp_foul_validate: { type: Boolean, default: true,  }, // play で「二歩・王手放置・駒ワープ・死に駒」の判定をするか？
    sp_foul_cancel:   { type: Boolean, default: false, }, // 判定で反則だったら emit して抜けるか？(true: 初心者向け)
  },

  data() {
    return {
      foul_list: [],
    }
  },
  methods: {
    foul_init() {
      this.foul_list = []
    },

    foul_clear() {
      this.foul_list = []
    },

    foul_add(foul_key, attrs = {}) {
      const foul_info = FoulInfo.fetch(foul_key)
      this.log(`反則: ${foul_info.name}`)
      attrs = { ...foul_info, ...attrs }
      if (this.sp_foul_cancel) {
        this.event_call("ev_foul_foul_accident", attrs)
        return "__cancel__"
      }
      this.foul_list.push(attrs)
    },
  },
}
