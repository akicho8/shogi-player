import { ApplicationMemoryRecord } from "./application_memory_record.js"
import { PresetInfo } from "./preset_info.js"

export class PresetDropdownInfo extends ApplicationMemoryRecord {
  static get define() {
    return [
      { key: "平手",                      },
      { separator: true,                  },
      { key: "詰将棋",                    },
      { key: "詰将棋 - 美濃",             },
      { key: "詰将棋 - 矢倉",             },
      { separator: true,                  },
      { key: "戦型 - 右四間 vs 四間飛車", },
      { key: "戦型 - 角換わり",           },
      { separator: true,                  },
      { key: "全部駒箱",                  },
      { separator: true,                  },
      { key: "香落ち",                    },
      { key: "右香落ち",                  },
      { key: "角落ち",                    },
      { key: "飛車落ち",                  },
      { key: "飛香落ち",                  },
      { key: "二枚落ち",                  },
      { key: "三枚落ち",                  },
      { key: "四枚落ち",                  },
      { key: "六枚落ち",                  },
      { key: "八枚落ち",                  },
      { key: "十枚落ち",                  },
      { key: "十九枚落ち",                },
      { key: "二十枚落ち",                },
      { separator: true,                  },
      { key: "青空将棋",                  },
    ]
  }

  get preset_info() {
    if (this.separator) {
      return
    }
    return PresetInfo.fetch(this.key)
  }
}
