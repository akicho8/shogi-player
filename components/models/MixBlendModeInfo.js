import MemoryRecord from 'js-memory-record'

export class MixBlendModeInfo extends MemoryRecord {
  static get define() {
    return [
      { key: "normal",      name: "なし",         desc: "ブレンドしない",                                                                               },
      { key: "darken",      name: "比較(暗)",     desc: "上下の画像を比較して暗いピクセルを表示",                                                       },
      { key: "multiply",    name: "乗算",         desc: "暗い表現を作るときに使う",                                                                     },
      { key: "color-burn",  name: "焼きこみ",     desc: "乗算よりもより暗くなる",                                                                       },
      { key: "lighten",     name: "比較(明)",     desc: "上下の画像を比較して明るいピクセルを表示",                                                     },
      { key: "screen",      name: "スクリーン",   desc: "明るい表現を作るときに使う",                                                                   },
      { key: "color-dodge", name: "覆い焼き",     desc: "スクリーンよりもより明るくなる",                                                               },
      { key: "overlay",     name: "オーバーレイ", desc: "乗算とスクリーンの両方に近い効果",                                                             },
      { key: "soft-light",  name: "ソフトライト", desc: "明暗の度合いをより強くする",                                                                   },
      { key: "hard-light",  name: "ハードライト", desc: "ソフトライトよりも強い効果",                                                                   },
      { key: "difference",  name: "差の絶対値",   desc: "違いを可視化するのに役立つ",                                                                   },
      { key: "exclusion",   name: "除外",         desc: "差の絶対値よりも弱い効果",                                                                     },
      { key: "hue",         name: "色相",         desc: "HSL色空間で合成。下位レイヤーの輝度(L)と彩度(S)、上位レイヤーの色相(H)を持つカラーが得られる", },
      { key: "saturation",  name: "彩度",         desc: "HSL色空間で合成。下位レイヤーの輝度(L)と色相(H)、上位レイヤーの彩度(S)を持つカラーが得られる", },
      { key: "color",       name: "カラー",       desc: "HSL色空間で合成。下位レイヤーの輝度(L)、上位レイヤーの彩度(S)と色相(H)を持つカラーが得られる", },
      { key: "luminosity",  name: "輝度",         desc: "HSL色空間で合成。下位レイヤーの彩度(S)と色相(H)、上位レイヤーの輝度(L)を持つカラーが得られる", },
    ]
  }
}
