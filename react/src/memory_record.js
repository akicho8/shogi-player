class MemoryRecord {
  static get define() {
    console.warn("not implemented")

    return [
      { key: "(key_x)", },
      { key: "(key_y)", },
    ]
  }

  static lookup(key) {
    if (key instanceof this) {
      return key
    }
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
    this._values_map = this._values_map || new Map(this.define.map((e, i) => [e.key, Object.freeze(new this(Object.assign({}, e, {code: i})))]))
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

  get code() {
    return this.attributes.code
  }
}

export { MemoryRecord }

if (process.argv[1] === __filename) {
  console.log(MemoryRecord.values)
  console.log(MemoryRecord.lookup("(key_x)").name)
  console.log(MemoryRecord.lookup("(key_x)").code)

  let v = MemoryRecord.lookup("(key_x)")
  console.log(v instanceof MemoryRecord)
}
