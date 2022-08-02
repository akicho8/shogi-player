import MemoryRecord from "js-memory-record"

export class PiVariantInfo extends MemoryRecord {
  static get define() {
    return [
      { key: "is_pi_variant_none", name: "none",                        },
      { key: "is_pi_variant_a",    name: "ぬれよん(svg)",               },
      { key: "is_pi_variant_b",    name: "紙面風(svg)",                 },
      { key: "is_pi_variant_c",    name: "図案駒(png)",                 },
      { key: "is_pi_variant_d",    name: "orangain/shogi-piece-images", },
      { key: "is_pi_variant_g",    name: "Portella(png)",               },
    ]
  }
}

if (process.argv[1] === __filename) {
  console.log(PiVariantInfo.fetch("is_pi_variant_a").key)
  console.log(PiVariantInfo.fetch("is_pi_variant_a").name)
}
