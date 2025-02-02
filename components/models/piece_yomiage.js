import { ApplicationMemoryRecord } from "./application_memory_record.js"

export class PieceYomiage extends ApplicationMemoryRecord {
  static get define() {
    return [
      { key: "K", prefix_name: "gyoku",  name: "gyoku",      promoted_name: null,           },
      { key: "R", prefix_name: "ひしゃ", name: "ひしゃっ！", promoted_name: "りゅー！",     },
      { key: "B", prefix_name: "かく",   name: "かくっ！",   promoted_name: "うまっ！",     },
      { key: "G", prefix_name: "きん",   name: "きんっ！",   promoted_name: null,           },
      { key: "S", prefix_name: "ぎん",   name: "ぎんっ！",   promoted_name: "なりぎんっ！", },
      { key: "N", prefix_name: "けい",   name: "けいっ！",   promoted_name: "なりけいっ！", },
      { key: "L", prefix_name: "きょー", name: "きょー！",   promoted_name: "なりきょー！", },
      { key: "P", prefix_name: "ふ",     name: "ふ！",       promoted_name: "ときんっ！",   },
    ]
  }

  yomiage(promoted) {
    if (promoted) {
      return this.promoted_name
    } else {
      return this.name
    }
  }
}
