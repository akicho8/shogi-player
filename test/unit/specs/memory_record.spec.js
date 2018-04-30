import { MemoryRecord } from '@/memory_record.js'

class MyModel extends MemoryRecord {
  static get define() {
    return [
      { key: "alice", },
      { key: "bob",   },
    ]
  }
}

describe('MemoryRecord', () => {
  it('lookup', () => {
    expect(MyModel.lookup("alice").key).toEqual("alice")
    expect(MyModel.lookup(0).key).toEqual("alice")
    expect(MyModel.lookup(-1)).toEqual(undefined)
  })

  it('fetch', () => {
    expect(() => { MyModel.fetch("unknown") }).toThrow()
  })

  it('values', () => {
    MyModel.values
  })

  it('name', () => {
    expect(MyModel.values[0].name).toEqual("alice")
  })
})
