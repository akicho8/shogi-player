// 反則関連

import { IllegalInfo } from "./models/illegal_info.js"

export const mod_illegal = {
  props: {
    // |----------------+-------+-------+--------------------------------------------------+--------|
    // | props          | check | break |                                                  |        |
    // |----------------+-------+-------+--------------------------------------------------+--------|
    // | リレー将棋向け | o     |       | 反則になりそうでも指させてシステム側で指摘する   | 初期値 |
    // | 上級者向け     |       |       | 反則かどうかは人が判断する                       |        |
    // | 初心者向け     | o     | o     | 反則になりそうなら emit して動作をキャンセルする |        |
    // |----------------+-------+-------+--------------------------------------------------+--------|
    sp_illegal_validate: { type: Boolean, default: true,  }, // play で「二歩・王手放置・駒ワープ・死に駒」の判定をするか？
    sp_illegal_cancel:   { type: Boolean, default: false, }, // 判定で反則だったら emit して抜けるか？(true: 初心者向け)
  },

  data() {
    return {
      illegal_list: [],
    }
  },
  methods: {
    illegal_init() {
      this.illegal_list = []
    },

    illegal_clear() {
      this.illegal_list = []
    },

    illegal_add(illegal_key, attrs = {}) {
      const illegal_info = IllegalInfo.fetch(illegal_key)
      this.log(`反則: ${illegal_info.name}`)
      attrs = { ...illegal_info, ...attrs }
      if (this.sp_illegal_cancel) {
        this.event_call("ev_illegal_illegal_accident", attrs)
        return "__cancel__"
      }
      this.illegal_list.push(attrs)
    },
  },
}
