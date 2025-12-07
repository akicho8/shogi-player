import { ApplicationMemoryRecord } from "./application_memory_record.js"

export class IllegalInfo extends ApplicationMemoryRecord {
  static get define() {
    return [
      { key: "illegal_double_pawn",     name: "二歩",           condition_desc: "",                                                                               },
      { key: "illegal_warp_move",       name: "駒ワープ",       condition_desc: "",                                                                               },
      { key: "illegal_dead_piece",      name: "死に駒",         condition_desc: "",                                                                               },
      { key: "illegal_check_ignored",   name: "王手放置",       condition_desc: "王手を解除しなかった。うっかりの可能性が高い。内部的には打の場合と移動の場合の二通りある", },
      { key: "illegal_no_check_escape", name: "王手解除せず",   condition_desc: "王手を故意に解除しなかった可能性がある。往生際悪く詰みの局面で玉を動かしたか？。玉を移動させた場合のみとする。", },
      { key: "illegal_self_check",      name: "自殺手",         condition_desc: "玉を利きに動かしたことで即死",                                                   },
      { key: "illegal_pin_break_check", name: "ピン外し自殺手", condition_desc: "守っていた駒を動かしたことで即死",                                               },
      { key: "illegal_perpetual_check", name: "千日手",         condition_desc: "同一局面のX回目",                                                 }, // shogi-player ではチェックしていない
    ]
  }
}

if (typeof process !== "undefined" && process.argv[1] === __filename) {
  console.log(IllegalInfo.fetch("illegal_double_pawn").attributes)
}
