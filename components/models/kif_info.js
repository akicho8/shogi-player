import { ApplicationMemoryRecord } from "./application_memory_record.js"

export class KifInfo extends ApplicationMemoryRecord {
  static get define() {
    return [
      {
        key: "コメント付き2手", kif: `
*c0a
*c0b
1 ７六歩(77)
*c1a
*c1b
2 ３四歩(33)
`
      },
    ]
  }
}
