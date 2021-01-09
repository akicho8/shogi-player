import { Place } from '@/components/models/place.js'
import { Piece } from '@/components/models/piece.js'
import { Soldier } from '@/components/models/soldier.js'
import { Location } from '@/components/models/location.js'

describe('Soldier', () => {
  it('基本', () => {
    const soldier = new Soldier({
      place: new Place([1, 2]),
      piece: Piece.fetch("R"),
      promoted: true,
      location: Location.fetch("white"),
    })
    expect(soldier.name).toEqual("龍")
    expect(soldier.location.key).toEqual("white")
  })
})
