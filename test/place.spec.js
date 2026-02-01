import { Place } from "@/components/models/place.js"

describe("Place", () => {
  describe("ClassMethods", () => {
    it(".fetch", () => {
      expect(Place.fetch("1a").digit_human).toEqual("11")
      expect(Place.fetch("11").digit_human).toEqual("11")
      expect(Place.fetch([8, 0]).digit_human).toEqual("11")
    })

    it(".wrap_fetch", () => {
      expect(Place.wrap_fetch(-1, -1).digit_human).toEqual("19")
      expect(Place.wrap_fetch( 8,  8).digit_human).toEqual("19")
    })

    it("ショーカット", () => {
      expect(Place.top_left.digit_human).toEqual("91")
      expect(Place.top_center.digit_human).toEqual("51")
      expect(Place.top_right.digit_human).toEqual("11")
      expect(Place.bottom_left.digit_human).toEqual("99")
      expect(Place.bottom_center.digit_human).toEqual("59")
      expect(Place.bottom_right.digit_human).toEqual("19")
      expect(Place.center_center.digit_human).toEqual("55")
    })

    it(".random", () => {
      expect(Place.random.constructor.name).toEqual("Place")
    })

    it(".line_between", () => {
      expect(Place.line_between(Place.fetch("91"), Place.fetch("94")).map(e => e.digit_human)).toEqual(["92", "93"])
      expect(Place.line_between(Place.fetch("91"), Place.fetch("64")).map(e => e.digit_human)).toEqual(["82", "73"])
      expect(Place.line_between(Place.fetch("91"), Place.fetch("72")).map(e => e.digit_human)).toEqual([])
    })

    it(".straight_p", () => {
      expect(Place.straight_p(Place.fetch("91"), Place.fetch("94"))).toEqual(true)
      expect(Place.straight_p(Place.fetch("91"), Place.fetch("64"))).toEqual(true)
      expect(Place.straight_p(Place.fetch("91"), Place.fetch("72"))).toEqual(false)
    })
  })

  it("#css_place_key", () => {
    expect(Place.fetch("2c").css_place_key).toEqual("place_2_3")
  })

  it("#kanji_human", () => {
    expect(Place.fetch("2c").kanji_human).toEqual("２三")
  })

  it("#digit_human", () => {
    expect(Place.fetch("2c").digit_human).toEqual("23")
    expect(Place.fetch([7, 1]).digit_human).toEqual("22")
  })

  it("#to_sfen", () => {
    expect(Place.fetch("2c").to_sfen).toEqual("2c")
  })

  it("#key", () => {
    expect(Place.fetch("22").key).toEqual("7,1")
  })

  describe("判定系", () => {
    it("#even_p", () => {
      expect(Place.fetch("91").even_p).toEqual(true)
    })

    it("#odd_p", () => {
      expect(Place.fetch("92").odd_p).toEqual(true)
    })

    it("#even_or_odd", () => {
      expect(Place.fetch("91").even_or_odd).toEqual("even")
      expect(Place.fetch("92").even_or_odd).toEqual("odd")
    })

    it("#middle_center_p", () => {
      expect(Place.fetch("55").middle_center_p).toEqual(true)
    })
  })
})
