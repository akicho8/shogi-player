import { ApplicationMemoryRecord } from "../models/application_memory_record.js"

export class SeSectionInfo extends ApplicationMemoryRecord {
  static get define() {
    return [
      { key: "基本",                   },
      { key: "背景",                   },
      { key: "盤テクスチャ",           },
      { key: "盤",                     },
      { key: "グリッド",               },
      { key: "星",                     },
      { key: "カメラ",                 },
      { key: "座標",                   },
      { key: "盤セル",                 },
      { key: "駒の種類",               },
      { key: "駒の大きさ",             },
      { key: "駒台",                   },
      { key: "持駒表示",             },
      { key: "対局者",                 },
      { key: "駒数",                   },
      { key: "駒箱",                   },
      { key: "成り不成り選択",         },
      { key: "駒を操作中の移動元",     },
      { key: "Transform",              },
      { key: "コントローラー",         },
      { key: "操作感",                 },
      { key: "反則",                   },
      { key: "千日手",                 },
      { key: "デバッグ",               },
      { key: "その他",                 },
      { key: "棋譜",                   },
      { key: "カスタムCSS",            },
      { key: "コンポーネント引数確認", },
      { key: "CSS変数確認",            },
    ]
  }
}
