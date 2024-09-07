import { KifParser } from "@/components/models/kif_parser.js"
import { Place } from "@/components/models/place.js"

describe("KifParser", () => {
  it("ヘッダー", () => {
    expect(KifParser.parse("key1：val1").header["key1"]).toEqual("val1")
    expect(KifParser.parse("key2： val2").header["key2"]).toEqual("val2")
    expect(KifParser.parse("key3：").header["key3"]).toEqual("")
  })

  it("コメント内の「KEY：VALUE」形式をヘッダーとして読み込まないこと", () => {
    expect(KifParser.parse("手数----指手---------消費時間--\n*KEY：VALUE").header).toEqual({})
  })

  it("コメント", () => {
    expect(KifParser.parse("*a\n*b").comment_lines_hash).toEqual({ '0': [ 'a', 'b' ] })
  })

  it("指し手", () => {
    const instance1 = KifParser.parse(`1 １二歩(21)   (00:00/00:00:00)`)
    expect(instance1.move_infos[0].location.key).toEqual("black")
    expect(instance1.move_infos[0].origin_place.digit_human).toEqual("21")
    expect(instance1.move_infos[0].place.digit_human).toEqual("12")
  })

  it("盤面", () => {
    expect(KifParser.parse("| と|").board.lookup(Place.fetch("91")).name).toEqual("と")
    expect(KifParser.parse("|vと|").board.lookup(Place.fetch("91")).promoted).toEqual(true)
  })

  it("持駒", () => {
    const hold_pieces = KifParser.parse("上手の持駒：玉王玉 飛2 歩").hold_pieces
    expect(hold_pieces["white"]["K"]).toEqual(3)
    expect(hold_pieces["white"]["R"]).toEqual(2)
    expect(hold_pieces["white"]["P"]).toEqual(1)
  })

  it("手番", () => {
    expect(KifParser.parse("上手番").location_by_offset(0).key).toEqual("white")
    expect(KifParser.parse("下手番").location_by_offset(0).key).toEqual("black")
    expect(KifParser.parse("先手番").location_by_offset(0).key).toEqual("black")
    expect(KifParser.parse("後手番").location_by_offset(0).key).toEqual("white")

    expect(KifParser.parse("手数＝24 △５四歩 まで").location_by_offset(0).key).toEqual("black")
    expect(KifParser.parse("手数＝24 ▲５四歩 まで").location_by_offset(0).key).toEqual("white")

    // シンプルにするためあとに来た方が勝つことにしとく
    expect(KifParser.parse("後手番\n手数＝24 △５四歩 まで").location_by_offset(0).key).toEqual("black")
    expect(KifParser.parse("先手番\n手数＝24 ▲５四歩 まで").location_by_offset(0).key).toEqual("white")
    expect(KifParser.parse("手数＝24 △５四歩 まで\n後手番").location_by_offset(0).key).toEqual("white")
    expect(KifParser.parse("手数＝24 ▲５四歩 まで\n先手番").location_by_offset(0).key).toEqual("black")
  })
})
