import { Piece } from '@/piece.js'

describe('Piece', () => {
  it('参照', () => {
    Piece.fetch("K")
  })

  it('参照するけどない', () => {
    expect(() => { Piece.fetch("") }).toThrow()
  })

  it('破壊できない', () => {
    expect(() => {
      const v = Piece.fetch("K")
      v.promoted = true
    }).toThrow()
  })
})
