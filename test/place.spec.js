import { Place } from '@/components/models/place.js'

describe('Place', () => {
  it('SFENの座標を受け取る', () => {
    expect(Place.fetch("2c").key).toEqual("7,2")
  })

  it('css_place_key', () => {
    expect(Place.fetch("2c").css_place_key).toEqual("place_2_3")
  })

  it('kanji_human', () => {
    expect(Place.fetch("2c").kanji_human).toEqual("２三")
  })

  it('digit_human', () => {
    expect(Place.fetch("2c").digit_human).toEqual("23")
  })

  it('to_sfen', () => {
    expect(Place.fetch("2c").to_sfen).toEqual("2c")
  })

  it('even_p',     () => { expect(Place.fetch("91").even_p).toEqual(true)     })
  it('odd_p',      () => { expect(Place.fetch("92").odd_p).toEqual(true)      })
  it('tennozan_p', () => { expect(Place.fetch("55").tennozan_p).toEqual(true) })
})
