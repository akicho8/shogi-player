import MemoryRecord from "js-memory-record"

export class PieceVariantInfo extends MemoryRecord {
  static get define() {
    return [
      { key: "is_piece_variant_none", name: "none",                        },
      { key: "is_piece_variant_a",    name: "ぬれよん(svg)",               },
      { key: "is_piece_variant_b",    name: "紙面風(svg)",                 },
      { key: "is_piece_variant_c",    name: "図案駒(png)",                 },
      { key: "is_piece_variant_d",    name: "Portella(png)",               },
    ]
  }
}

if (process.argv[1] === __filename) {
  console.log(PieceVariantInfo.fetch("is_piece_variant_a").key)
  console.log(PieceVariantInfo.fetch("is_piece_variant_a").name)
}
