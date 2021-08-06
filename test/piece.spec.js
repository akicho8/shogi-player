import { Piece } from '@/components/models/piece.js'

describe('Piece', () => {
  it('fetch', () => {
    expect(Piece.fetch("P").name).toEqual("歩")
    expect(Piece.fetch("p").name).toEqual("歩")
  })

  it('存在しない', () => {
    expect(() => { Piece.fetch("unknown") }).toThrow()
  })

  it('破壊できない', () => {
    expect(() => {
      const v = Piece.fetch("K")
      v.promoted = true
    }).toThrow()
  })

  it('lookup_by_name', () => {
    expect(!!Piece.lookup_by_name("歩")).toEqual(true)
    expect(!!Piece.lookup_by_name("と")).toEqual(false)
  })

  it('lookup_by_promoted_name', () => {
    expect(!!Piece.lookup_by_promoted_name("歩")).toEqual(false)
    expect(!!Piece.lookup_by_promoted_name("と")).toEqual(true)
  })
})
