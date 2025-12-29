import { Place } from "@/components/models/place.js"
import { Piece } from "@/components/models/piece.js"
import { Soldier } from "@/components/models/soldier.js"
import { Location } from "@/components/models/location.js"

describe("Soldier", () => {
  describe("ClassMethods", () => {
    it(".create", () => {
      const soldier = Soldier.create({place: Place.bottom_center, piece: Piece.fetch("R"), location: Location.white, promoted: true})
      expect(soldier.to_sfen).toEqual("+r")
    })

    it(".easy_create", () => {
      const soldier = Soldier.easy_create()
      expect(soldier.promoted).toEqual(false)
      expect(soldier.location.key).toEqual("black")
      expect(soldier.place.digit_human).toEqual(Place.bottom_center.digit_human)
      expect(soldier.piece.key).toEqual("K")
    })

    it(".random", () => {
      const soldier = Soldier.random()
      expect(soldier.constructor.name).toEqual("Soldier")
    })
  })

  it("#place", () => {
    expect(Soldier.easy_create().place.digit_human).toEqual("59")
  })

  it("#piece", () => {
    expect(Soldier.easy_create().piece.key).toEqual("K")
  })

  it("#promoted", () => {
    expect(Soldier.easy_create().promoted).toEqual(false)
  })

  it("#location", () => {
    expect(Soldier.easy_create().location.key).toEqual("black")
  })

  it("#name", () => {
    expect(Soldier.easy_create({piece_key: "R", promoted: false}).name).toEqual("飛")
    expect(Soldier.easy_create({piece_key: "R", promoted: true}).name).toEqual("龍")
  })

  it("#to_s", () => {
    expect(Soldier.easy_create().to_s).toEqual("<☗59玉>")
  })

  it("#inspect", () => {
    expect(Soldier.easy_create().inspect).toEqual("<☗59玉>")
  })

  it("#yomiage_name", () => {
    expect(Soldier.easy_create({piece_key: "R", promoted: false}).yomiage_name).toEqual("ひしゃっ！")
    expect(Soldier.easy_create({piece_key: "R", promoted: true}).yomiage_name).toEqual("りゅー！")
  })

  it("#to_sfen", () => {
    expect(Soldier.easy_create({piece_key: "R", promoted: false}).to_sfen).toEqual("R")
    expect(Soldier.easy_create({piece_key: "R", promoted: true}).to_sfen).toEqual("+R")
  })

  it("#clone_with", () => {
    const old_soldier = Soldier.easy_create()
    const new_soldier = old_soldier.clone_with({piece: Piece.fetch("R")})
    expect(old_soldier.to_sfen).toEqual("K")
    expect(new_soldier.to_sfen).toEqual("R")
  })

  it("#promotable_p", () => {
    expect(Soldier.easy_create({place_key: "53", piece_key: "R", location_key: "black"}).promotable_p).toEqual(true)
    expect(Soldier.easy_create({place_key: "54", piece_key: "R", location_key: "black"}).promotable_p).toEqual(false)
    expect(Soldier.easy_create({place_key: "56", piece_key: "R", location_key: "white"}).promotable_p).toEqual(false)
    expect(Soldier.easy_create({place_key: "57", piece_key: "R", location_key: "white"}).promotable_p).toEqual(true)
  })

  it("#danger_zone_p", () => {
    expect(Soldier.easy_create({place_key: "53", location_key: "black"}).danger_zone_p).toEqual(true)
    expect(Soldier.easy_create({place_key: "54", location_key: "black"}).danger_zone_p).toEqual(false)
    expect(Soldier.easy_create({place_key: "56", location_key: "white"}).danger_zone_p).toEqual(false)
    expect(Soldier.easy_create({place_key: "57", location_key: "white"}).danger_zone_p).toEqual(true)
  })

  it("#css_class_list", () => {
    expect(Soldier.easy_create().css_class_list).toEqual(["location_black", "promoted_false", "piece_name", "piece_K"])
  })

  it("#top_spaces", () => {
    const fn = (place_key, location_key) => Soldier.easy_create({place_key, location_key}).top_spaces
    expect(fn("91", "black")).toEqual(0)
    expect(fn("92", "black")).toEqual(1)
    expect(fn("98", "black")).toEqual(7)
    expect(fn("99", "black")).toEqual(8)
    expect(fn("91", "white")).toEqual(8)
    expect(fn("92", "white")).toEqual(7)
    expect(fn("98", "white")).toEqual(1)
    expect(fn("99", "white")).toEqual(0)
  })

  it("#bottom_spaces", () => {
    const fn = (place_key, location_key) => Soldier.easy_create({place_key, location_key}).bottom_spaces
    expect(fn("91", "black")).toEqual(8)
    expect(fn("92", "black")).toEqual(7)
    expect(fn("98", "black")).toEqual(1)
    expect(fn("99", "black")).toEqual(0)
    expect(fn("91", "white")).toEqual(0)
    expect(fn("92", "white")).toEqual(1)
    expect(fn("98", "white")).toEqual(7)
    expect(fn("99", "white")).toEqual(8)
  })

  it("#once_vectors", () => {
    expect(Soldier.easy_create({piece_key: "R", promoted: true}).once_vectors.map(e => e.to_a)).toEqual([[-1,-1],[1,-1],[-1,1],[1,1]])
    expect(Soldier.easy_create({piece_key: "L"}).once_vectors).toEqual(undefined)
  })

  it("#repeat_vectors", () => {
    expect(Soldier.easy_create({piece_key: "R", promoted: true}).repeat_vectors.map(e => e.to_a)).toEqual([[0,-1],[-1,0],[1,0],[0,1]])
    expect(Soldier.easy_create({piece_key: "L"}).repeat_vectors.map(e => e.to_a)).toEqual([[0, -1]])
  })

  it("#dead_place_p: 死に駒か？", () => {
    const fn = (place_key, piece_key, promoted, location_key) => {
      const soldier = Soldier.easy_create({place_key, piece_key, promoted, location_key})
      return !!soldier.dead_place_p
    }

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

  describe("TransformMethods", () => {
    it("#transform_all", () => {
      let soldier = Soldier.easy_create({place: Place.top_left, piece_key: "R"})
      expect(soldier.inspect).toEqual("<☗91飛>")
      soldier = soldier.transform_all
      expect(soldier.inspect).toEqual("<☗91龍>")
      soldier = soldier.transform_all
      expect(soldier.inspect).toEqual("<☖91飛>")
      soldier = soldier.transform_all
      expect(soldier.inspect).toEqual("<☖91龍>")
      soldier = soldier.transform_all
      expect(soldier.inspect).toEqual("<☗91飛>")
    })

    it("#transform_promote", () => {
      let soldier = Soldier.easy_create({place: Place.top_left, piece_key: "R"})
      expect(soldier.inspect).toEqual("<☗91飛>")
      soldier = soldier.transform_promote
      expect(soldier.inspect).toEqual("<☗91龍>")
      soldier = soldier.transform_promote
      expect(soldier.inspect).toEqual("<☗91飛>")
    })

    it("#transform_location", () => {
      let soldier = Soldier.easy_create({place: Place.top_left, piece_key: "R"})
      expect(soldier.inspect).toEqual("<☗91飛>")
      soldier = soldier.transform_location
      expect(soldier.inspect).toEqual("<☖91飛>")
    })
  })
})
