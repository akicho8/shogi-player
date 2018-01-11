import { Point } from '@/point.js'
import { Piece } from '@/piece.js'
import { Battler } from '@/battler.js'

describe('Battler', () => {
  it('基本', () => {
    const battler = new Battler({
      point: new Point([1, 2]),
      piece: Piece.fetch("R"),
      promoted: true,
      location: "white",
    })
    expect(battler.name).toEqual("龍")
  })
})
