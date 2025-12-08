import { Board } from "@/components/models/board.js"
import { Place } from "@/components/models/place.js"
import { Piece } from "@/components/models/piece.js"
import { Soldier } from "@/components/models/soldier.js"
import { Location } from "@/components/models/location.js"
import { KifParser } from "@/components/models/kif_parser.js"

describe("Board", () => {
  let soldier = null
  let board = null

  beforeEach(() => {
    board = Board.empty
    soldier = Soldier.create({place: Place.top_left, piece: Piece.fetch("P")})
  })

  describe("ClassMethods", () => {
    it(".dimension", () => {
      expect(Board.dimension).toEqual(9)
    })

    it(".vector_flip", () => {
      expect(Board.vector_flip(0, 0)).toEqual([8, 8])
    })

    it(".create_from_soldiers", () => {
      const new_board = Board.create_from_soldiers([soldier])
      expect(!!new_board.soldier_exist_p(soldier)).toEqual(true)
    })
  })

  describe("基本", () => {
    it("#soldier_drop$", () => {
      board.soldier_drop$(soldier)
      expect(board.to_sfen).toEqual("P8/9/9/9/9/9/9/9/9")
    })

    it("#soldier_remove$", () => {
      board.soldier_drop$(soldier)
      board.soldier_remove$(soldier)
      expect(board.to_sfen).toEqual("9/9/9/9/9/9/9/9/9")
    })

    it("#soldier_move$", () => {
      const new_board = soldier.clone_with({place: Place.bottom_right})
      board.soldier_move$(soldier, new_board)
      expect(board.to_sfen).toEqual("9/9/9/9/9/9/9/9/8P")
    })

    it("#soldier_exist_p", () => {
      expect(!!board.soldier_exist_p(soldier)).toEqual(false)
      board.soldier_drop$(soldier)
      expect(!!board.soldier_exist_p(soldier)).toEqual(true)
    })

    it("#delete_at$", () => {
      board.soldier_drop$(soldier)
      board.delete_at$(soldier.place)
      expect(board.to_sfen).toEqual("9/9/9/9/9/9/9/9/9")
    })

    it("#lookup", () => {
      expect(!!board.lookup(Place.top_left)).toEqual(false)
      board.soldier_drop$(soldier)
      expect(board.lookup(Place.top_left)).toEqual(soldier)
    })

    it("#clear$", () => {
      board.soldier_drop$(soldier)
      board.clear$()
      expect(board.to_sfen).toEqual("9/9/9/9/9/9/9/9/9")
    })
  })

  describe("非破壊的", () => {
    it("#soldier_drop", () => {
      const new_board = board.soldier_drop(soldier)
      expect(board.to_sfen).toEqual("9/9/9/9/9/9/9/9/9")
      expect(new_board.to_sfen).toEqual("P8/9/9/9/9/9/9/9/9")
    })

    it("#soldier_remove", () => {
      board.soldier_drop$(soldier)
      const new_board = board.soldier_remove(soldier)
      expect(board.to_sfen).toEqual("P8/9/9/9/9/9/9/9/9")
      expect(new_board.to_sfen).toEqual("9/9/9/9/9/9/9/9/9")
    })

    it("#soldier_move", () => {
      board.soldier_drop$(soldier)
      const new_soldier = soldier.clone_with({place: Place.bottom_right})
      const new_board = board.soldier_move(soldier, new_soldier)
      expect(board.to_sfen).toEqual("P8/9/9/9/9/9/9/9/9")
      expect(new_board.to_sfen).toEqual("9/9/9/9/9/9/9/9/8P")
    })

    it("#shallow_clone", () => {
      board.soldier_drop$(soldier)
      const clone_board = board.shallow_clone
      expect(clone_board.to_sfen).toEqual("P8/9/9/9/9/9/9/9/9")
      clone_board.soldier_remove$(soldier)
      expect(clone_board.to_sfen).toEqual("9/9/9/9/9/9/9/9/9")
      expect(board.to_sfen).toEqual("P8/9/9/9/9/9/9/9/9")
    })

    it("#soldiers", () => {
      board.soldier_drop$(soldier)
      expect(board.soldiers).toEqual([soldier])
    })

    it("#soldiers_by_location", () => {
      board.soldier_drop$(soldier)
      expect(board.soldiers_by_location(Location.black)).toEqual([soldier])
      expect(board.soldiers_by_location(Location.white)).toEqual([])
    })
  })

  describe("UtilityMethods", () => {
    it("#king_find_by_location", () => {
      const king = Soldier.easy_create({piece_key: "K"})
      const board = Board.empty.soldier_drop(king)
      expect(board.king_find_by_location(Location.black)).toEqual(king)
      expect(board.king_find_by_location(Location.white)).toEqual(undefined)
    })

    it("#piece_counts_hash", () => {
      const pawn = Soldier.easy_create({piece_key: "P"})
      const board = Board.empty.soldier_drop(pawn)
      expect(board.piece_counts_hash).toEqual({"P": 1})
    })

    it("#pawn_drop_on_king_front_p", () => {
      const fn = (pawn_place_key) => {
        const king_place_key = Place.center_center.digit_human
        const king = Soldier.easy_create({place_key: king_place_key, piece_key: "K", location_key: "white"})
        const pawn = Soldier.easy_create({place_key: pawn_place_key, piece_key: "P", location_key: "black"})
        const board = Board.empty.soldier_drop(king)
        return board.pawn_drop_on_king_front_p(pawn)
      }
      expect(fn("54")).toEqual(false)
      expect(fn("56")).toEqual(true)
      expect(fn("45")).toEqual(false)
      expect(fn("65")).toEqual(false)
    })
  })

  describe("SerializeMethods", () => {
    it("#to_sfen", () => {
      expect(board.to_sfen).toEqual("9/9/9/9/9/9/9/9/9")
    })
  })

  describe("ViolationMethods", () => {
    it("#double_pawn_violation_p", () => {
      const soldier1 = Soldier.create({place: Place.bottom_center, piece: Piece.fetch("P")})
      const soldier2 = Soldier.create({place: Place.center_center, piece: Piece.fetch("P")})
      board.soldier_drop$(soldier1)
      expect(board.double_pawn_violation_p(soldier2)).toEqual(true)
    })
  })

  describe("TransformMethods", () => {
    it("#half_spin", () => {
      board.soldier_drop$(soldier)
      const new_board = board.half_spin
      expect(board.to_sfen).toEqual("P8/9/9/9/9/9/9/9/9")
      expect(new_board.to_sfen).toEqual("9/9/9/9/9/9/9/9/8p")
    })

    it("#flop", () => {
      board.soldier_drop$(soldier)
      const new_board = board.flop
      expect(board.to_sfen).toEqual("P8/9/9/9/9/9/9/9/9")
      expect(new_board.to_sfen).toEqual("8P/9/9/9/9/9/9/9/9")
    })

    it("#slide_xy", () => {
      board.soldier_drop$(soldier)
      const new_board = board.slide_xy(-1, -1)
      expect(board.to_sfen).toEqual("P8/9/9/9/9/9/9/9/9")
      expect(new_board.to_sfen).toEqual("9/9/9/9/9/9/9/9/8P")
    })
  })

  describe("LeaveKingAloneMethods", () => {
    beforeEach(() => {
      soldier = Soldier.create({place: Place.fetch("19"), piece: Piece.fetch("R"), promoted: true})
    })

    it("#king_dead_p", () => {
      const fn = (board_lines) => {
        const { board } = KifParser.parse(board_lines.join("\n"))
        return !!board.king_dead_p(Location.black)
      }
      expect(fn([
        "+------+",
        "| 玉v竜|",
        "+------+",
      ])).toEqual(true)
      expect(fn([
        "+------+",
        "| 玉   |",
        "+------+",
      ])).toEqual(false)
      expect(fn([
        "+------+",
        "|      |",
        "+------+",
      ])).toEqual(false)
    })

    it("#soldier_move_then_king_death_p: 指すと即死するか？", () => {
      const { board } = KifParser.parse([
        "+----------+",
        "| 玉 ・v金 |",
        "|v金 ・ ・ |",
        "| ・ ・ ・ |",
        "+----------+",
      ].join("\n"))
      const king = board.king_find_by_location(Location.black)
      expect(board.soldier_move_then_king_death_p(king, king.clone_with({place: Place.fetch("81")}))).toEqual(true)
      expect(board.soldier_move_then_king_death_p(king, king.clone_with({place: Place.fetch("92")}))).toEqual(false)
    })

    it("#soldier_drop_then_king_death_p: 打つと即死するか？ (打ち歩詰めは関係ない)", () => {
      const { board } = KifParser.parse([
        "+----------+",
        "| ・ ・ 玉 |",
        "|v玉 ・v飛 |",
        "| ・ ・ 竜 |",
        "+----------+",
      ].join("\n"))
      expect(board.soldier_drop_then_king_death_p(Soldier.create4("91", "P", false, "black"))).toEqual(true)
    })

    it("#reach_p", () => {
      expect(board.reach_p(soldier, Place.fetch("28"))).toEqual(true)
      expect(board.reach_p(soldier, Place.fetch("37"))).toEqual(false)
      expect(board.reach_p(soldier, Place.fetch("17"))).toEqual(true)
    })

    it("#reach_count", () => {
      expect(board.reach_count(soldier, Place.fetch("28"))).toEqual(1)
      expect(board.reach_count(soldier, Place.fetch("37"))).toEqual(0)
      expect(board.reach_count(soldier, Place.fetch("17"))).toEqual(2)
    })

    it("#once_reach_count", () => {
      expect(board.once_reach_count(soldier, Place.fetch("28"))).toEqual(1)
      expect(board.once_reach_count(soldier, Place.fetch("37"))).toEqual(0)
      expect(board.once_reach_count(soldier, Place.fetch("17"))).toEqual(0)
    })

    it("#repeat_reach_count", () => {
      expect(board.repeat_reach_count(soldier, Place.fetch("28"))).toEqual(0)
      expect(board.repeat_reach_count(soldier, Place.fetch("37"))).toEqual(0)
      expect(board.repeat_reach_count(soldier, Place.fetch("17"))).toEqual(2)
    })

    it("#repeat_reach_count (間に駒がある場合)", () => {
      const soldier_18P = Soldier.create({place: Place.fetch("18"), piece: Piece.fetch("P")})
      board.soldier_drop$(soldier_18P)
      expect(board.repeat_reach_count(soldier, Place.fetch("17"), {ghost_move: true})).toEqual(2)
      expect(board.repeat_reach_count(soldier, Place.fetch("17"))).toEqual(0)
    })
  })

  describe("CheckmateMethods", () => {
    function case2(board_lines) {
      const { board } = KifParser.parse(board_lines.join("\n"))
      const king = board.king_find_by_location(Location.black)
      const { friends, attackers } = board.friends_and_attackers_by(king)
      const attacker = attackers[0]
      const block_places = king.place.line_between_to(attacker.place)
      return { board, king, friends, attacker, block_places }
    }

    describe("#checkmate_stat: 詰んでいるか？", () => {

      it("詰んでいる", () => {
        const { board, king, friends, attacker, block_places } = case2([
          "+---------+",
          "|v歩 ・ ・|",
          "|v金 ・ ・|",
          "| 玉 ・ ・|",
          "| ・ ・v飛|",
          "+---------+",
        ])
        expect(board.checkmate_stat(Location.black, {})).toEqual(true)
      })
    })

    describe("#can_escape_p: (A) 玉が逃げることができるか？", () => {

      it("逃げられない", () => {
        const { board, king, friends, attacker, block_places } = case2([
          "+---------+",
          "|v歩 ・ ・|",
          "|v銀 歩 ・|",
          "| 玉 ・ ・|",
          "| ・ ・v飛|",
          "+---------+",
        ])
        expect(board.can_escape_p(king)).toEqual(false)
      })

      it("逃げることができる", () => {
        const { board, king, friends, attacker, block_places } = case2([
          "+---------+",
          "|v歩 ・ ・|",
          "|v銀 ・ ・|",
          "| 玉 歩 ・|",
          "| ・ ・v飛|",
          "+---------+",
        ])
        expect(board.can_escape_p(king)).toEqual(true)
      })
    })

    describe("#kill_by_friend_p: (B) 味方駒で王手駒を取れるか？", () => {
      it("可能", () => {
        const { board, king, friends, attacker, block_places } = case2([
          "+---------+",
          "|v香 飛 ・|",
          "| 玉 ・ ・|",
          "| ・ ・ ・|",
          "+---------+",
        ])
        expect(board.kill_by_friend_p(friends, king, attacker)).toEqual(true)
      })

      it("ピンのため動けない", () => {
        const { board, king, friends, attacker, block_places } = case2([
          "+---------+",
          "| ・ ・ 角|",
          "|v香v飛 ・|",
          "| 玉 ・ ・|",
          "+---------+",
        ])
        expect(board.kill_by_friend_p(friends, king, attacker)).toEqual(false)
      })
    })

    describe("#interpose_by_friend_p: (C) 味方駒で利きを遮断できるか？", () => {
      it("可能", () => {
        const { board, king, friends, attacker, block_places } = case2([
          "+---------+",
          "|v香 ・ ・|",
          "| ・ 飛 ・|",
          "| 玉 ・ ・|",
          "+---------+",
        ])
        expect(board.interpose_by_friend_p(block_places, friends)).toEqual(true)
      })

      it("ピンのため動けない", () => {
        const { board, king, friends, attacker, block_places } = case2([
          "+---------+",
          "|v香 ・v角|",
          "| ・ 飛 ・|",
          "| 玉 ・ ・|",
          "+---------+",
        ])
        expect(board.interpose_by_friend_p(block_places, friends, king)).toEqual(false)
      })
    })

    describe("#interpose_by_hold_pieces_p: (D) 持駒で合駒できるか？", () => {
      const fn = (hold_pieces) => {
        const { board, king, friends, attacker, block_places } = case2([
          "+---------+",
          "| 玉 ・v飛|",
          "| ・ 歩 ・|",
          "+---------+",
        ])
        return !!board.interpose_by_hold_pieces_p(block_places, hold_pieces, king.location)
      }

      it("金で合駒できる", () => {
        expect(fn({"G": 1})).toEqual(true)
      })

      it("持駒がないため不可能", () => {
        expect(fn({})).toEqual(false)
      })

      it("二歩のため不可能", () => {
        expect(fn({"P": 1})).toEqual(false)
      })

      it("死に駒のため不可能", () => {
        expect(fn({"N": 1})).toEqual(false)
      })
    })
  })
})
