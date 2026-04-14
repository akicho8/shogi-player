import { ApplicationMemoryRecord } from "../../models/application_memory_record.js"

export class CategoryInfo extends ApplicationMemoryRecord {
  static get define() {
    return [
      { key: "動作モード",             alter_name: null, development_only: false, },
      { key: "レイアウト",             alter_name: null, development_only: false, },
      { key: "背景",                   alter_name: null, development_only: false, },
      { key: "盤テクスチャ",           alter_name: null, development_only: false, },
      { key: "盤",                     alter_name: null, development_only: false, },
      { key: "グリッド",               alter_name: null, development_only: false, },
      { key: "星",                     alter_name: null, development_only: false, },
      { key: "カメラ",                 alter_name: null, development_only: false, },
      { key: "座標",                   alter_name: null, development_only: false, },
      { key: "盤セル",                 alter_name: null, development_only: false, },
      { key: "駒の種類",               alter_name: null, development_only: false, },
      { key: "駒の大きさ",             alter_name: null, development_only: false, },
      { key: "駒台",                   alter_name: null, development_only: false, },
      { key: "持駒表示",               alter_name: null, development_only: false, },
      { key: "対局者",                 alter_name: null, development_only: false, },
      { key: "駒数",                   alter_name: null, development_only: false, },
      { key: "駒箱",                   alter_name: null, development_only: false, },
      { key: "成り不成り選択",         alter_name: null, development_only: false, },
      { key: "駒を操作中の移動元",     alter_name: null, development_only: false, },
      { key: "transform",              alter_name: "3D", development_only: false, },
      { key: "コントローラー類",       alter_name: null, development_only: false, },
      { key: "操作感",                 alter_name: null, development_only: false, },
      { key: "反則",                   alter_name: null, development_only: false, },
      { key: "千日手",                 alter_name: null, development_only: false, },
      { key: "イベント",               alter_name: null, development_only: false, },
      { key: "デバッグ",               alter_name: null, development_only: false, },
      { key: "その他",                 alter_name: null, development_only: false, },
      { key: "棋譜",                   alter_name: null, development_only: false, },
      { key: "カスタムCSS",            alter_name: null, development_only: false, },
      { key: "移動元印",               alter_name: null, development_only: false, },
      { key: "コンポーネント引数確認", alter_name: null, development_only: false, },
      { key: "CSS変数確認",            alter_name: null, development_only: false, },
      { key: "SE側CSS変数確認",        alter_name: null, development_only: true,  },
      { key: "ショートカット",         alter_name: null, development_only: false, },
      { key: "開発環境限定",           alter_name: null, development_only: true,  },
    ]
  }

  get display_name() {
    return this.alter_name ?? this.name
  }

  get enable_p() {
    if (this.development_only) {
      if (process.env.NODE_ENV === "development") {
      } else {
        return false
      }
    }
    return true
  }
}
