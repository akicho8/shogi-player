import { ApplicationMemoryRecord } from "./application_memory_record.js"

export class BoardVariantInfo extends ApplicationMemoryRecord {
  static get define() {
    return [
      { key: "none",           name: "none",       },
      { key: "wood_normal",    name: "普通の木目", },
      { key: "wood_bright",    name: "明るい木目", },
      { key: "wood_alpha",     name: "木目効果",   },
      { key: "wood_opaque",    name: "木目盤",     },
      { key: "emboss_alpha",   name: "凹凸効果",   },
      { key: "emboss_opaque",  name: "凹凸盤",     },
      { key: "japanese_paper", name: "和紙",       },
    ]
  }
}
