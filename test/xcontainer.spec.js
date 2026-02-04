import { Xcontainer } from "@/components/models/xcontainer.js"
import { SfenParser } from "@/components/models/sfen_parser.js"
import { SfenInfo } from "@/components/models/sfen_info.js"
import { PresetInfo } from "@/components/models/preset_info.js"
import { Location } from "@/components/models/location.js"
import { Piece } from "@/components/models/piece.js"
import { Place } from "@/components/models/place.js"

describe("Xcontainer", () => {
  describe("旧テスト", () => {
    it("基本", () => {
      const sfen = "position startpos moves 7g7f 8c8d 2g2f 4a3b 6i7h 8d8e 8h7g 3c3d 7i6h 2b7g+ 6h7g 3a2b 3i3h 7a6b 3g3f 2b3c 4g4f 6c6d 5i6h 6b6c 2i3g 5a4b 3h4g 7c7d 4i4h 8a7c 2h2i 8b8a 6g6f 6a6b 4g5f 9c9d 9g9f 1c1d 1g1f 6c5d 6h7i 5d6c 7i8h 6c5d 2f2e 5d6c 5f6g 6c5d 5g5f 4c4d 2i5i 4b3a 5f5e 5d4c 6g5f 3a2b 5i6i 2b3a 6i2i 3a2b 4f4e 4d4e 5f4e 8e8f 8g8f P*8e 8f8e 9d9e 9f9e 7d7e 7f7e 6d6e B*7f 6b5b 7g8f 6e6f 8i7g P*4d 4e5f 3d3e 3f3e 7c8e 7g8e P*3f 3g4e 4d4e P*6d N*7b 6d6c+ 5b6c 7f4c+ 3b4c S*5b B*7f 7h7g P*8g 7g8g B*6g 5f6g 7f8g+ 8h8g 6f6g+ B*8i 6g6f 5b4c+ G*7f 8g8h 7f8f 8h7i 8f7g P*6h S*6g 8i6g 6f6g 4c3c 2b3c S*3d 3c4d B*2b S*3c 3d3c 4d5e 3c3b 5e6d N*7f 7g7f 6h6g B*4f S*5g N*5e S*5f 8a8e 5g4f S*7h 7i7h 5e6g+ 5f6g 8e8g+ 7h7i 7f6g 2b5e+ 6d7e G*6e 7e8e N*7g 8e7f 6e7e 7f7e 5e6e 7e8d 6e8g S*6h 7i8i 6h7g+ R*8a N*8c P*8e 8d7c P*7d"
      const xcontainer = Xcontainer.setup_by({sfen: sfen, current_turn: 121})
    })

    it("後手から始まる", () => {
      const sfen = "position sfen lnsgkgsnl/1r5b1/ppppppppp/9/9/2P6/PP1PPPPPP/1B5R1/LNSGKGSNL w - 2"
      const data_source = SfenParser.parse(sfen)
      expect(data_source.location_by_offset(0).key).toEqual("white")

      const xcontainer = Xcontainer.setup_by({sfen: sfen})
      expect(xcontainer.current_location.key).toEqual("white")
    })
  })

  describe("ClassMethods", () => {
    it(".setup_default", () => {
      const xcontainer = Xcontainer.setup_default()
      expect(xcontainer.board != null).toEqual(true)
    })
  })

  describe("SerializeMethods", () => {
    it("#to_simple_sfen", () => {
      const xcontainer = Xcontainer.setup_default()
      expect(xcontainer.to_simple_sfen).toEqual("lnsgkgsnl/1r5b1/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL b - 1")
    })

    it("#snapshot_hash", () => {
      const xcontainer = Xcontainer.setup_default()
      expect(xcontainer.snapshot_hash).toEqual("lnsgkgsnl/1r5b1/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL b -")
    })

    it("#to_short_sfen", () => {
      {
        const xcontainer = Xcontainer.setup_by({preset_key: "平手"})
        expect(xcontainer.to_short_sfen).toEqual(PresetInfo.fetch("平手").sfen)
      }
      {
        const xcontainer = Xcontainer.setup_by({sfen_key: "適当な局面"})
        expect(xcontainer.to_short_sfen).toEqual(SfenInfo.fetch("適当な局面").sfen)
      }
    })
  })

  describe("BoardMethods", () => {
    it("#soldier_css_class_list", () => {
      const xcontainer = Xcontainer.setup_by({preset_key: "平手"})
      expect(xcontainer.soldier_css_class_list(Place.fetch("55"))).toEqual(undefined)
      expect(xcontainer.soldier_css_class_list(Place.fetch("59"))).toEqual(["location_black", "promoted_false", "piece_name", "piece_K"])
    })
  })

  describe("HoldPieceMethods", () => {
    it("#hold_pieces_to_h", () => {
      const xcontainer = Xcontainer.setup_by({sfen_key: "▲飛2△角2"})
      expect(xcontainer.hold_pieces_to_h(Location.black)).toEqual({"R": 2})
    })

    it("#hold_pieces_count", () => {
      const xcontainer = Xcontainer.setup_by({sfen_key: "▲飛2△角2"})
      expect(xcontainer.hold_pieces_count(Location.black, Piece.fetch("B"))).toEqual(0)
      expect(xcontainer.hold_pieces_count(Location.black, Piece.fetch("R"))).toEqual(2)
      expect(xcontainer.hold_pieces_count(Location.white, Piece.fetch("B"))).toEqual(2)
      expect(xcontainer.hold_pieces_count(Location.white, Piece.fetch("R"))).toEqual(0)
    })

    it("#hold_pieces_blank_p", () => {
      const xcontainer = Xcontainer.setup_by({sfen_key: "▲飛2角2△"})
      expect(xcontainer.hold_pieces_blank_p(Location.black)).toEqual(false)
      expect(xcontainer.hold_pieces_blank_p(Location.white)).toEqual(true)
    })

    it("#hold_pieces_add$", () => {
      const xcontainer = Xcontainer.setup_default()
      expect(xcontainer.hold_pieces_count(Location.black, Piece.fetch("R"))).toEqual(0)
      xcontainer.hold_pieces_add$(Location.black, Piece.fetch("R"))
      expect(xcontainer.hold_pieces_count(Location.black, Piece.fetch("R"))).toEqual(1)
      xcontainer.hold_pieces_add$(Location.black, Piece.fetch("R"), -1)
      expect(xcontainer.hold_pieces_count(Location.black, Piece.fetch("R"))).toEqual(0)
      xcontainer.hold_pieces_add$(Location.black, Piece.fetch("R"), -1)
      expect(xcontainer.hold_pieces_count(Location.black, Piece.fetch("R"))).toEqual(0)
    })

    it("#hold_pieces_can_be_reduced_count", () => {
      const xcontainer = Xcontainer.setup_by({sfen_key: "▲飛2△角2"})
      expect(xcontainer.hold_pieces_can_be_reduced_count(Location.black, Piece.fetch("R"), 1)).toEqual(1)
      expect(xcontainer.hold_pieces_can_be_reduced_count(Location.black, Piece.fetch("R"), 2)).toEqual(2)
      expect(xcontainer.hold_pieces_can_be_reduced_count(Location.black, Piece.fetch("R"), 3)).toEqual(2)
    })

    it("#realized_hold_pieces_of", () => {
      const xcontainer = Xcontainer.setup_by({sfen_key: "▲飛2角2△"})
      expect(xcontainer.realized_hold_pieces_of(Location.black)).toEqual([[Piece.fetch("R"), 2], [Piece.fetch("B"), 2]])
      expect(xcontainer.realized_hold_pieces_of(Location.white)).toEqual([])
    })

    it("#hold_pieces_to_piece_box$", () => {
      const xcontainer = Xcontainer.setup_by({sfen_key: "▲飛2角2△"})
      xcontainer.hold_pieces_to_piece_box$(Location.black)
      expect(xcontainer.hold_pieces_to_h(Location.black)).toEqual({})
      expect(xcontainer.piece_box_realize).toEqual([[Piece.fetch("R"), 2], [Piece.fetch("B"), 2]])
    })

    it("#hold_piece_all_counts_hash", () => {
      const xcontainer = Xcontainer.setup_by({sfen_key: "▲飛2△角2"})
      expect(xcontainer.hold_piece_all_counts_hash).toEqual({"R": 2, "B": 2})
    })
  })

  describe("PieceBoxMethods", () => {
    it("#piece_box_count", () => {
      const xcontainer = Xcontainer.setup_default()
      expect(xcontainer.piece_box_to_h).toEqual({})
      xcontainer.piece_box_add$(Piece.fetch("R"), 1)
      expect(xcontainer.piece_box_to_h).toEqual({"R": 1})
    })

    it("#piece_box_count", () => {
      const xcontainer = Xcontainer.setup_default()
      expect(xcontainer.piece_box_count(Piece.fetch("R"))).toEqual(0)
    })

    it("#piece_box_add$", () => {
      const xcontainer = Xcontainer.setup_default()
      expect(xcontainer.piece_box_count(Piece.fetch("R"))).toEqual(0)
      xcontainer.piece_box_add$(Piece.fetch("R"), 1)
      expect(xcontainer.piece_box_count(Piece.fetch("R"))).toEqual(1)
      xcontainer.piece_box_add$(Piece.fetch("R"), 1)
      expect(xcontainer.piece_box_count(Piece.fetch("R"))).toEqual(2)
      xcontainer.piece_box_add$(Piece.fetch("R"), -1)
      expect(xcontainer.piece_box_count(Piece.fetch("R"))).toEqual(1)
      xcontainer.piece_box_add$(Piece.fetch("R"), -1)
      expect(xcontainer.piece_box_count(Piece.fetch("R"))).toEqual(0)
      xcontainer.piece_box_add$(Piece.fetch("R"), -1)
      expect(xcontainer.piece_box_count(Piece.fetch("R"))).toEqual(0)
    })

    it("#piece_box_can_be_reduced_count", () => {
      const xcontainer = Xcontainer.setup_default()
      xcontainer.piece_box_add$(Piece.fetch("R"), 5)
      expect(xcontainer.piece_box_can_be_reduced_count(Piece.fetch("R"), 8)).toEqual(5)
    })

    it("#piece_box_realize", () => {
      const xcontainer = Xcontainer.setup_default()
      xcontainer.piece_box_add$(Piece.fetch("B"), 1)
      xcontainer.piece_box_add$(Piece.fetch("R"), 2)
      expect(xcontainer.piece_box_realize).toEqual([[Piece.fetch("R"), 2], [Piece.fetch("B"), 1]])
    })

    it("#piece_box_to_hold_pieces$", () => {
      const xcontainer = Xcontainer.setup_default()
      xcontainer.piece_box_add$(Piece.fetch("R"), 1)
      xcontainer.piece_box_to_hold_pieces$(Location.black)
      expect(xcontainer.piece_box_to_h).toEqual({})
      expect(xcontainer.hold_pieces_to_h(Location.black)).toEqual({"R": 1})
    })

    it("#piece_box_reset_by_preset$", () => {
      const xcontainer = Xcontainer.setup_default()
      xcontainer.piece_box_reset_by_preset$(PresetInfo.fetch("角落ち"))
      expect(xcontainer.piece_box_to_h).toEqual({"B": 1})
    })

    it("#piece_box_piece_counts_adjust$", () => {
      const xcontainer = Xcontainer.setup_by({preset_key: "角落ち"})
      xcontainer.piece_box_piece_counts_adjust$()
      expect(xcontainer.piece_box_to_h).toEqual({"B": 1})
    })
  })

  describe("TurnMethods", () => {
    it("#turn_offset", () => {
      expect(Xcontainer.setup_by({sfen_key: "最速角交換", current_turn: -2}).turn_offset).toEqual(3)
      expect(Xcontainer.setup_by({sfen_key: "最速角交換", current_turn: -1}).turn_offset).toEqual(4)
      expect(Xcontainer.setup_by({sfen_key: "最速角交換", current_turn:  0}).turn_offset).toEqual(0)
      expect(Xcontainer.setup_by({sfen_key: "最速角交換", current_turn:  1}).turn_offset).toEqual(1)
      expect(Xcontainer.setup_by({sfen_key: "最速角交換", current_turn:  5}).turn_offset).toEqual(4)
    })

    it("#turn_clamp", () => {
      const xcontainer = Xcontainer.setup_by({sfen_key: "最速角交換"})
      expect(xcontainer.turn_clamp(-1)).toEqual(0)
      expect(xcontainer.turn_clamp(5)).toEqual(4)
    })

    it("#turn_cycle", () => {
      const xcontainer = Xcontainer.setup_by({sfen_key: "最速角交換"})
      expect(xcontainer.turn_cycle(-2)).toEqual(3)
      expect(xcontainer.turn_cycle(-1)).toEqual(4)
      expect(xcontainer.turn_cycle(+0)).toEqual(0)
      expect(xcontainer.turn_cycle(+1)).toEqual(1)
      expect(xcontainer.turn_cycle(+5)).toEqual(0)
    })

    it("#turn_offset_min #turn_offset_max #turn_base", () => {
      const xcontainer = Xcontainer.setup_by({sfen_key: "最速角交換"})
      expect(xcontainer.turn_offset_min).toEqual(0)
      expect(xcontainer.turn_offset_max).toEqual(4)
      expect(xcontainer.turn_base).toEqual(0)
    })

    it("#previous_location #current_location #next_location", () => {
      const xcontainer = Xcontainer.setup_by({sfen_key: "最速角交換"})
      expect(xcontainer.previous_location).toEqual(Location.white)
      expect(xcontainer.current_location).toEqual(Location.black)
      expect(xcontainer.next_location).toEqual(Location.white)
    })

    it("#current_comments", () => {
      expect(Xcontainer.setup_by({kif_key: "コメント付き2手", current_turn: 0}).current_comments).toEqual(["c0a", "c0b"])
      expect(Xcontainer.setup_by({kif_key: "コメント付き2手", current_turn: 1}).current_comments).toEqual(["c1a", "c1b"])
      expect(Xcontainer.setup_by({kif_key: "コメント付き2手", current_turn: 2}).current_comments).toEqual(undefined)
    })

    it("#current_turn_label", () => {
      expect(Xcontainer.setup_by({sfen_key: "最速角交換", current_turn:  0}).current_turn_label).toEqual("0手")
      expect(Xcontainer.setup_by({sfen_key: "最速角交換", current_turn: -1}).current_turn_label).toEqual("まで4手で☖の勝ち")

      expect(Xcontainer.setup_by({sfen_key: "最速角交換から相筋違い角", current_turn:  0}).current_turn_label).toEqual("4手")
      expect(Xcontainer.setup_by({sfen_key: "最速角交換から相筋違い角", current_turn: -1}).current_turn_label).toEqual("まで6手で☖の勝ち")
    })

    it("#display_turn", () => {
      const xcontainer = Xcontainer.setup_by({sfen_key: "最速角交換から相筋違い角"})
      expect(xcontainer.display_turn).toEqual(4)
    })
  })

  describe("UtilityMethods", () => {
    it("#rotate_xy$", () => {
      const xcontainer = Xcontainer.setup_by({preset_key: "平手"})
      xcontainer.rotate_xy$(1, 2)
      expect(xcontainer.board.to_sfen).toEqual("2B5R/LLNSGKGSN/llnsgkgsn/2r5b/ppppppppp/9/9/9/PPPPPPPPP")
    })

    it("#square_shuffle$", () => {
      const xcontainer = Xcontainer.setup_by({preset_key: "平手"})
      expect(xcontainer.square_shuffle$(9)).toEqual(true)
    })
  })
})
