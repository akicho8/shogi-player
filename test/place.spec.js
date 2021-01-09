import { Place } from '@/components/models/place.js'

describe('Place', () => {
  it('SFENの座標を受け取る', () => {
    const place = new Place("2c")
    expect(place.key).toEqual("7,2")
  })

  it('css_place_key', () => {
    const place = new Place("2c")
    expect(place.css_place_key).toEqual("place_2_3")
  })
})
