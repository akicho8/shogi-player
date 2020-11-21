import MemoryRecord from "js-memory-record"

export default class ThemeInfo extends MemoryRecord {
  static get define() {
    return [
      { key: "is_texture_image", name: "画像",     },
      { key: "is_texture_text",  name: "テキスト", },
      { key: "is_texture_none",  name: "none",     },
    ]
  }
}

if (process.argv[1] === __filename) {
  console.log(ThemeInfo.fetch("is_texture_image").key)
  console.log(ThemeInfo.fetch("is_texture_image").name)
}
