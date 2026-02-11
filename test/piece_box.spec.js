import { SfenParser } from "@/components/models/sfen_parser.js"
import { SfenBookInfo } from "@/components/models/sfen_book_info.js"
import { PresetInfo } from "@/components/models/preset_info.js"
import { Location } from "@/components/models/location.js"
import { Piece } from "@/components/models/piece.js"
import { Place } from "@/components/models/place.js"
import { PieceBox } from "@/components/models/piece_box.js"

describe("PieceBox", () => {
  describe("ClassMethods", () => {
    it(".empty", () => {
      expect(PieceBox.empty().to_h).toEqual({})
    })

    it(".create", () => {
      expect(PieceBox.create({R: 1}).to_h).toEqual({R: 1})
      expect(PieceBox.create().to_h).toEqual({})
    })
  })

  it("#count", () => {
    const piece_box = PieceBox.create({R: 1})
    expect(piece_box.count(Piece.fetch("B"))).toEqual(0)
    expect(piece_box.count(Piece.fetch("R"))).toEqual(1)
  })

  it("#add", () => {
    const piece_box = PieceBox.create({R: 1})
    expect(piece_box.add(Piece.fetch("B"), 1).to_h).toEqual({B: 1, R: 1})
    expect(piece_box.add(Piece.fetch("R"), 1).to_h).toEqual({R: 2})
    expect(piece_box.add(Piece.fetch("R"), -1).to_h).toEqual({})
  })

  it("#merge", () => {
    const piece_box = PieceBox.create({R: 1}).merge(PieceBox.create({R: 1, B: 1}))
    expect(piece_box.to_h).toEqual({B: 1, R: 2})
  })

  it("#merge_from_hash_counts", () => {
    const piece_box = PieceBox.create({R: 1}).merge_from_hash_counts({R: 1, B: 1})
    expect(piece_box.to_h).toEqual({B: 1, R: 2})
  })

  it("#to_h", () => {
    expect(PieceBox.create({R: 1}).to_h).toEqual({R: 1})
  })

  it("#piece_box.realize", () => {
    const piece_box = PieceBox.create({B: 1, R: 2})
    expect(piece_box.realize).toEqual([[Piece.fetch("R"), 2], [Piece.fetch("B"), 1]])
  })

  it("#can_be_reduced_count", () => {
    const piece_box = PieceBox.create({R: 5})
    expect(piece_box.can_be_reduced_count(Piece.fetch("R"), 8)).toEqual(5)
  })
})
