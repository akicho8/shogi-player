import { ApplicationMemoryRecord } from './application_memory_record.js'

export class MixBlendModeInfo extends ApplicationMemoryRecord {
  static get define() {
    return [
      { key: "wood_normal",      name: "なし",         desc: "上優先",                                     },
      { key: "darken",      name: "比較(暗)",     desc: "暗い点を優先",                               },
      { key: "lighten",     name: "比較(明)",     desc: "明るい点を優先",                             },
      { key: "multiply",    name: "乗算",         desc: "色が重なると暗く",                           },
      { key: "screen",      name: "スクリーン",   desc: "色が重なると明るく",                         },
      { key: "color-burn",  name: "焼きこみ",     desc: "暗い色をより暗く",                           },
      { key: "color-dodge", name: "覆い焼き",     desc: "明い色をより明く",                           },
      { key: "overlay",     name: "オーバーレイ", desc: "下の方が暗いならmultiplyで明るいならscreen", },
      { key: "hard-light",  name: "ハードライト", desc: "明暗を強く",                                 },
      { key: "soft-light",  name: "ソフトライト", desc: "明暗をもっと強く",                           },
      { key: "difference",  name: "差の絶対値",   desc: "明い方 - 暗い方",                            },
      { key: "exclusion",   name: "除外",         desc: "difference コントラスト弱",                  },
      { key: "hue",         name: "色相",         desc: "LS + H",                                     },
      { key: "saturation",  name: "彩度",         desc: "HL + S",                                     },
      { key: "color",       name: "カラー",       desc: "L + HS",                                     },
      { key: "luminosity",  name: "輝度",         desc: "HS + L",                                     },
    ]
  }
}
