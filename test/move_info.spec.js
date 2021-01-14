import { MoveInfo } from "@/components/models/move_info.js"
import { Place } from "@/components/models/place.js"
import { Soldier } from "@/components/models/soldier.js"
import { Piece } from "@/components/models/piece.js"
import { Location } from "@/components/models/location.js"

describe("MoveInfo", () => {
  const soldier_77P0 = new Soldier({place: new Place([2, 6]), piece: Piece.fetch("P"), promoted: false, location: Location.fetch("black")})
  const soldier_77P1 = new Soldier({place: new Place([2, 6]), piece: Piece.fetch("P"), promoted: true,  location: Location.fetch("black")})
  const soldier_76P0 = new Soldier({place: new Place([2, 5]), piece: Piece.fetch("P"), promoted: false, location: Location.fetch("black")})
  const soldier_76P1 = new Soldier({place: new Place([2, 5]), piece: Piece.fetch("P"), promoted: true,  location: Location.fetch("black")})

  it("to_sfen", () => {
    expect(new MoveInfo({type: "move",       from: soldier_77P0, to: soldier_76P0}).to_sfen).toEqual("7g7f")
    expect(new MoveInfo({type: "move",       from: soldier_77P1, to: soldier_76P1}).to_sfen).toEqual("7g7f")
    expect(new MoveInfo({type: "promotable", from: soldier_77P0, to: soldier_76P1}).to_sfen).toEqual("7g7f+")
    expect(new MoveInfo({type: "promotable", from: soldier_77P0, to: soldier_76P0}).to_sfen).toEqual("7g7f")
    expect(new MoveInfo({type: "put",                            to: soldier_76P0}).to_sfen).toEqual("P*7f")
  })

  it("to_kif", () => {
    expect(new MoveInfo({type: "move",       from: soldier_77P0, to: soldier_76P0}).to_kif).toEqual("☗7六歩(77)")
    expect(new MoveInfo({type: "move",       from: soldier_77P1, to: soldier_76P1}).to_kif).toEqual("☗7六と(77)")
    expect(new MoveInfo({type: "promotable", from: soldier_77P0, to: soldier_76P1}).to_kif).toEqual("☗7六歩成(77)")
    expect(new MoveInfo({type: "promotable", from: soldier_77P0, to: soldier_76P0}).to_kif).toEqual("☗7六歩不成(77)")
    expect(new MoveInfo({type: "put",                            to: soldier_76P0}).to_kif).toEqual("☗7六歩打")
  })

  it("to_kif_without_from", () => {
    expect(new MoveInfo({type: "move",       from: soldier_77P0, to: soldier_76P0}).to_kif_without_from).toEqual("☗7六歩")
    expect(new MoveInfo({type: "move",       from: soldier_77P1, to: soldier_76P1}).to_kif_without_from).toEqual("☗7六と")
    expect(new MoveInfo({type: "promotable", from: soldier_77P0, to: soldier_76P1}).to_kif_without_from).toEqual("☗7六歩成")
    expect(new MoveInfo({type: "promotable", from: soldier_77P0, to: soldier_76P0}).to_kif_without_from).toEqual("☗7六歩不成")
    expect(new MoveInfo({type: "put",                            to: soldier_76P0}).to_kif_without_from).toEqual("☗7六歩打")
  })

  it("to_yomiage", () => {
    expect(new MoveInfo({type: "move",       from: soldier_77P0, to: soldier_76P0}).to_yomiage).toEqual("7 6 ふーっ！")
    expect(new MoveInfo({type: "move",       from: soldier_77P1, to: soldier_76P1}).to_yomiage).toEqual("7 6 ときんっ！")
    expect(new MoveInfo({type: "promotable", from: soldier_77P0, to: soldier_76P1}).to_yomiage).toEqual("7 6 ふ、なりっ！")
    expect(new MoveInfo({type: "promotable", from: soldier_77P0, to: soldier_76P0}).to_yomiage).toEqual("7 6 ふ、ふなりっ！")
    expect(new MoveInfo({type: "put",                            to: soldier_76P0}).to_yomiage).toEqual("7 6 ふ、うつ！")
  })
})
