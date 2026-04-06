import { Piece } from "@/components/models/piece.js"

describe("Piece", () => {
  describe("ClassMethods", () => {
    it(".fetch", () => {
      expect(Piece.fetch("P").name).toEqual("歩")
      expect(Piece.fetch("p").name).toEqual("歩")
      expect(() => { Piece.fetch("unknown") }).toThrow()
    })

    it(".lookup", () => {
      expect(Piece.lookup("P").name).toEqual("歩")
      expect(Piece.lookup("p").name).toEqual("歩")
      expect(Piece.lookup("unknown")).toEqual(undefined)
    })

    it(".lookup_by_name", () => {
      expect(Piece.lookup_by_name("歩").name).toEqual("歩")
      expect(Piece.lookup_by_name("と")).toEqual(undefined)
    })

    it(".lookup_by_promoted_name", () => {
      expect(Piece.lookup_by_promoted_name("歩")).toEqual(undefined)
      expect(Piece.lookup_by_promoted_name("と").name).toEqual("歩")
    })
  })

  it("Value Object である", () => {
    expect(() => { Piece.fetch("K").name = "" }).toThrow()
  })

  it("#css_class_list", () => {
    expect(Piece.fetch("R").css_class_list).toEqual(["piece_name", "piece_R"])
  })

  it("#promotable_p", () => {
    expect(Piece.fetch("R").promotable_p).toEqual(true)
    expect(Piece.fetch("K").promotable_p).toEqual(false)
  })

  it("#piece_vector", () => {
    expect(Piece.fetch("R").piece_vector.constructor.name).toEqual("PieceVector")
  })

  it("#once_vectors", () => {
    expect(Piece.fetch("P").once_vectors(false).length).toEqual(1) // 歩
    expect(Piece.fetch("P").once_vectors(true).length).toEqual(6)  // と
  })

  it("#repeat_vectors", () => {
    expect(Piece.fetch("L").repeat_vectors(false).length).toEqual(1) // 香
    expect(Piece.fetch("L").repeat_vectors(true)).toEqual(undefined) // 杏
  })
})
