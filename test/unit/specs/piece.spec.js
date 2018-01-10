import { Piece } from '@/piece.js'

describe('Piece', () => {
  it('基本', () => {
    Piece.fetch("K")
  })

  it('fetch', () => {
    expect(() => { Piece.fetch("") }).toThrow()
  })
})
