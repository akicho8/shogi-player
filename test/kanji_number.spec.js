import { KanjiNumber } from "@/components/models/kanji_number.js"

describe("KanjiNumber", () => {
  it("kanji_to_number_string", () => {
    expect(KanjiNumber.kanji_to_number_string("")).toEqual("")
    expect(KanjiNumber.kanji_to_number_string("歩")).toEqual("歩")
    expect(KanjiNumber.kanji_to_number_string("歩〇")).toEqual("歩0")
    expect(KanjiNumber.kanji_to_number_string("歩九")).toEqual("歩9")
    expect(KanjiNumber.kanji_to_number_string("歩十")).toEqual("歩10")
    expect(KanjiNumber.kanji_to_number_string("歩十〇")).toEqual("歩10")
    expect(KanjiNumber.kanji_to_number_string("歩十一")).toEqual("歩11")
    expect(KanjiNumber.kanji_to_number_string("歩十九")).toEqual("歩19")
    expect(KanjiNumber.kanji_to_number_string("歩二十")).toEqual("歩20")
    expect(KanjiNumber.kanji_to_number_string("歩二十〇")).toEqual("歩20")
    expect(KanjiNumber.kanji_to_number_string("歩二十一")).toEqual("歩21")
    expect(KanjiNumber.kanji_to_number_string("歩百二十三")).toEqual("歩123")
    expect(KanjiNumber.kanji_to_number_string("歩千二百三十四")).toEqual("歩1234")

    expect(KanjiNumber.kanji_to_number_string("歩十")).toEqual("歩10")
    expect(KanjiNumber.kanji_to_number_string("歩百")).toEqual("歩100")
    expect(KanjiNumber.kanji_to_number_string("歩千")).toEqual("歩1000")
    expect(KanjiNumber.kanji_to_number_string("歩1万")).toEqual("歩10000")
    expect(KanjiNumber.kanji_to_number_string("歩1憶")).toEqual("歩100000")
    expect(KanjiNumber.kanji_to_number_string("歩1兆")).toEqual("歩1000000")
  })

  it("integer_to_kanji", () => {
    expect(KanjiNumber.number_to_kanji(0)).toEqual("〇")
    expect(KanjiNumber.number_to_kanji(1)).toEqual("一")
    expect(KanjiNumber.number_to_kanji(10)).toEqual("十")
    expect(KanjiNumber.number_to_kanji(12)).toEqual("十二")
    expect(KanjiNumber.number_to_kanji(2)).toEqual("二")
    expect(KanjiNumber.number_to_kanji(23)).toEqual("二十三")
    expect(KanjiNumber.number_to_kanji(123)).toEqual("百二十三")
    expect(KanjiNumber.number_to_kanji(120)).toEqual("百二十")
    expect(KanjiNumber.number_to_kanji(100)).toEqual("百")
    expect(KanjiNumber.number_to_kanji(1000)).toEqual("千")
    expect(KanjiNumber.number_to_kanji(10000)).toEqual("一万")
    expect(KanjiNumber.number_to_kanji(100000)).toEqual("一憶")
    expect(KanjiNumber.number_to_kanji(1000000)).toEqual("一兆")
    expect(KanjiNumber.number_to_kanji(1234.5678)).toEqual("千二百三十四")
  })

  it("regexp", () => {
    expect(!!KanjiNumber.regexp).toEqual(true)
  })

  it("extract", () => {
    expect(KanjiNumber.extract("歩十二飛五")).toEqual(["十二", "五"])
  })
})
