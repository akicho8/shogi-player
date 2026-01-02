import { AnyParser } from "@/components/models/any_parser.js"

describe("AnyParser", () => {
  describe("ClassMethods", () => {
    it(".parse", () => {
      expect(AnyParser.parse("position startpos").to_sfen).toEqual("position sfen lnsgkgsnl/1r5b1/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL b - 1")
      expect(AnyParser.parse("1 １二歩(21)").move_infos.length).toEqual(1)
    })
  })
})
