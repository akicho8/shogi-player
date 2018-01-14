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
    MyModel.fetch("alice")
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
