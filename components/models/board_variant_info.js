import { ApplicationMemoryRecord } from "./application_memory_record.js"

export class BoardVariantInfo extends ApplicationMemoryRecord {
  static get define() {
    return [
      { key: "none",        name: "none",        },
      { key: "wood_normal", name: "普通の木目",  },
      { key: "wood_bright", name: "明るい木目",  },
      { key: "zarazara",    name: "ざらざら",    },
      { key: "wood_effect", name: "木目",        },
      { key: "bump_effect", name: "エンボス",    },
      { key: "washi",       name: "和紙",        },
    ]
  }
}
