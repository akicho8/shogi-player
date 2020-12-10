import MemoryRecord from "js-memory-record"

export default class BgVariantInfo extends MemoryRecord {
  static get define() {
    return [
      { key: "is_bg_variant_none", name: "none", },
      { key: "is_bg_variant_a",    name: "木1",  },
      { key: "is_bg_variant_b",    name: "木2",  },
      { key: "is_bg_variant_c",    name: "紙1",  },
      { key: "is_bg_variant_d",    name: "紙2",  },
      { key: "is_bg_variant_e",    name: "紙3",  },
      { key: "is_bg_variant_f",    name: "布1",  },
      { key: "is_bg_variant_g",    name: "布2",  },
    ]
  }
}

if (process.argv[1] === __filename) {
  console.log(BgVariantInfo.fetch("is_bg_variant_a").key)
  console.log(BgVariantInfo.fetch("is_bg_variant_a").name)
}
