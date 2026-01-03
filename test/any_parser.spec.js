import { AnyParser } from "@/components/models/any_parser.js"
import { SfenParser } from "@/components/models/sfen_parser.js"

describe("AnyParser", () => {
  describe("ClassMethods", () => {
    it(".parse", () => {
      expect(AnyParser.parse("position startpos").to_sfen).toEqual(SfenParser.SFEN_DEFAULT)
      expect(AnyParser.parse("1 １二歩(21)").move_infos.length).toEqual(1)
    })

    it(".from_attributes", () => {
      expect(AnyParser.from_attributes({sfen: "position startpos"}).to_sfen).toEqual(SfenParser.SFEN_DEFAULT)
      expect(AnyParser.from_attributes({kif: "1 １二歩(21)"}).move_infos.length).toEqual(1)
      expect(AnyParser.from_attributes({any: "position startpos"}).to_sfen).toEqual(SfenParser.SFEN_DEFAULT)
      expect(AnyParser.from_attributes({data_source: SfenParser.parse("position startpos")}).to_sfen).toEqual(SfenParser.SFEN_DEFAULT)
    })
  })
})
