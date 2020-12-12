import MemoryRecord from "js-memory-record"

export default class PiVariantInfo extends MemoryRecord {
  static get define() {
    return [
      { key: "is_pi_variant_none", name: "none",                        },
      { key: "is_pi_variant_a",    name: "☗ゴシック",                  },
      { key: "is_pi_variant_b",    name: "紙面風",                      },
      { key: "is_pi_variant_c",    name: "☗図案駒(画像)",              },
      { key: "is_pi_variant_d",    name: "☗毛筆体(画像・解像度低)",    },
      { key: "is_pi_variant_e",    name: "orangain/shogi-piece-images", },
      { key: "is_pi_variant_f",    name: "f",                           },
      { key: "is_pi_variant_g",    name: "g",                           },
    ]
  }
}

if (process.argv[1] === __filename) {
  console.log(PiVariantInfo.fetch("is_pi_variant_a").key)
  console.log(PiVariantInfo.fetch("is_pi_variant_a").name)
}
