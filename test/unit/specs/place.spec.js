import Place from '@/place'

describe('Place', () => {
  it('SFENの座標を受け取る', () => {
    const place = new Place("2c")
    expect(place.key).toEqual("7,2")
  })

  it('to_css_class', () => {
    const place = new Place("2c")
    expect(place.to_css_class).toEqual("place_23")
  })
})
