import MemoryRecord from "js-memory-record"

export default class PiVariantInfo extends MemoryRecord {
  static get define() {
    return [
      { key: "is_pi_variant_none", name: "none",                        },
      { key: "is_pi_variant_a1by", name: "ゴシック(1文字)",             },
      { key: "is_pi_variant_a2by", name: "ゴシック(2文字)",             },
      { key: "is_pi_variant_b",    name: "紙面風",                      },
      { key: "is_pi_variant_c",    name: "図案駒(画像)",                },
      { key: "is_pi_variant_d",    name: "orangain/shogi-piece-images", },
      { key: "is_pi_variant_e",    name: "プチッチ(画像・暗め)",        },
      { key: "is_pi_variant_f",    name: "テスト中",                    },
    ]
  }
}

if (process.argv[1] === __filename) {
  console.log(PiVariantInfo.fetch("is_pi_variant_a1by").key)
  console.log(PiVariantInfo.fetch("is_pi_variant_a1by").name)
}
