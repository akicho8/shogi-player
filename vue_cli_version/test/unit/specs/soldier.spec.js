import { Place } from '@/place.js'
import { Piece } from '@/piece.js'
import { Soldier } from '@/soldier.js'

describe('Soldier', () => {
  it('基本', () => {
    const soldier = new Soldier({
      place: new Place([1, 2]),
      piece: Piece.fetch("R"),
      promoted: true,
      location_key: "white",
    })
    expect(soldier.name).toEqual("龍")
  })
})
