class MemoryRecord {
  static get define() {
    console.warn("not implemented")

    return [
      { key: "(key)", },
    ]
  }

  static lookup(key) {
    return this.values_map.get(key)
  }

  static fetch(key) {
    const element = this.lookup(key)
    if (!element) {
      throw new Error(`Key not found: ${key}`)
    }
    return element
  }

  static get values_map() {
    this._values_map = this._values_map || new Map(this.define.map((e) => [e.key, Object.freeze(new this(e))]))
    return this._values_map
  }

  static get values() {
    this._values = this._values || Array.from(this.values_map.values())
    return this._values
  }

  constructor(attributes) {
    this.attributes = attributes
  }

  get key() {
    return this.attributes.key
  }

  get name() {
    return this.attributes.name || this.key.toString()
  }
}

export { MemoryRecord }

if (process.argv[1] === __filename) {
  console.log(MemoryRecord.lookup("(key)").name)
}
