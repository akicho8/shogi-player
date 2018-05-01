// Example.
//
//   import { MemoryRecord } from "./memory_record"
//
//   class Foo extends MemoryRecord {
//     static get define() {
//       return [
//         { key: "black", name: '☗', },
//         { key: "white", name: '☖', },
//       ]
//     }
//
//     get flip() {
//       return Foo.values[(this.code + 1) % Foo.values.length]
//     }
//   }
//
//   Foo.lookup("black").key           // => "black"
//   Foo.lookup(1).key                 // => "white"
//   Foo.values[0] === Foo.values[0]   // => true
//

import _ from "lodash"

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
    if (typeof key === "number") {
      return this.values[key]
    } else {
      return this.values_map[key]
    }
  }

  static fetch(key) {
    const element = this.lookup(key)
    if (!element) {
      throw new Error(`Key not found: ${key}`)
    }
    return element
  }

  static get values_map() {
    this._values_map = this._values_map || _.reduce(this.define, (a, e, i) => { // http://devdocs.io/lodash~4/index#reduce
      a[e.key] = Object.freeze(new this(Object.assign({}, e, {code: i})))
      return a
    }, {})
    return this._values_map
  }

  static get values() {
    this._values = this._values || Object.values(this.values_map)
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

  console.log(MemoryRecord.lookup(0))
  console.log(MemoryRecord.lookup(1))
  console.log(MemoryRecord.lookup(2))

  console.log(MemoryRecord.values[0] === MemoryRecord.values[0])
}
