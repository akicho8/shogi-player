import MemoryRecord from "js-memory-record"

export class PlaceYomiageInfo extends MemoryRecord {
  static get define() {
    return [
      { key: "1", yomiage: "1",      },
      { key: "2", yomiage: "にー",   },
      { key: "3", yomiage: "さん",   },
      { key: "4", yomiage: "よん",   },
      { key: "5", yomiage: "ごー",   },
      { key: "6", yomiage: "6",      },
      { key: "7", yomiage: "なな",   },
      { key: "8", yomiage: "8",      },
      { key: "9", yomiage: "きゅー", },
    ]
  }
}
