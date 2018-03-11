import { Place } from '@/place'

describe('Place', () => {
  it('SFENの座標を受け取る', () => {
    const place = new Place("2c")
    expect(place.key).toEqual("7,2")
  })
})
