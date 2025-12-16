import { Place } from "@/components/models/place.js"
import { Piece } from "@/components/models/piece.js"
import { Soldier } from "@/components/models/soldier.js"
import { Location } from "@/components/models/location.js"

describe("Soldier", () => {
  it("easy_create", () => {
    const soldier = Soldier.easy_create()
    expect(soldier.promoted).toEqual(false)
    expect(soldier.location.key).toEqual("black")
    expect(soldier.place.digit_human).toEqual(Place.bottom_center.digit_human)
    expect(soldier.piece.key).toEqual("K")
  })

  it("#dead_place_p: 死に駒か？", () => {
    const fn = (place_key, piece_key, promoted, location_key) => !!Soldier.easy_create({place_key, piece_key, promoted, location_key}).dead_place_p

    expect(fn("91", "P", false, "black")).toEqual(true)
    expect(fn("92", "P", false, "black")).toEqual(false)
    expect(fn("91", "L", false, "black")).toEqual(true)
    expect(fn("92", "L", false, "black")).toEqual(false)
    expect(fn("91", "N", false, "black")).toEqual(true)
    expect(fn("92", "N", false, "black")).toEqual(true)
    expect(fn("93", "N", false, "black")).toEqual(false)
    expect(fn("91", "R", false, "black")).toEqual(false)

    expect(fn("99", "P", false, "white")).toEqual(true)
    expect(fn("98", "P", false, "white")).toEqual(false)
    expect(fn("99", "L", false, "white")).toEqual(true)
    expect(fn("98", "L", false, "white")).toEqual(false)
    expect(fn("99", "N", false, "white")).toEqual(true)
    expect(fn("98", "N", false, "white")).toEqual(true)
    expect(fn("97", "N", false, "white")).toEqual(false)
    expect(fn("99", "R", false, "white")).toEqual(false)

    expect(fn("91", "P", true, "black")).toEqual(false)
    expect(fn("99", "P", true, "white")).toEqual(false)
  })

  it("#top_spaces", () => {
    const fn = (place_key, location_key) => Soldier.create({
      place: Place.fetch(place_key),
      location: Location.fetch(location_key),
    }).top_spaces
    expect(fn("91", "black")).toEqual(0)
    expect(fn("92", "black")).toEqual(1)
    expect(fn("98", "black")).toEqual(7)
    expect(fn("99", "black")).toEqual(8)
    expect(fn("91", "white")).toEqual(8)
    expect(fn("92", "white")).toEqual(7)
    expect(fn("98", "white")).toEqual(1)
    expect(fn("99", "white")).toEqual(0)
  })
})
