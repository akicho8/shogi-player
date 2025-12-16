import { Board } from "@/components/models/board.js"
import { Place } from "@/components/models/place.js"
import { Piece } from "@/components/models/piece.js"
import { Soldier } from "@/components/models/soldier.js"
import { Location } from "@/components/models/location.js"
import { KifParser } from "@/components/models/kif_parser.js"

describe("Board", () => {
  describe("ClassMethods", () => {
    it(".dimension", () => {
      expect(Board.dimension).toEqual(9)
    })

    it(".create", () => {
      expect(Board.create().constructor.name).toEqual("Board")
    })

    it(".create_from_soldiers", () => {
      const soldier = Soldier.easy_create()
      const board = Board.create_from_soldiers([soldier])
      expect(!!board.soldier_exist_p(soldier)).toEqual(true)
    })
  })

  describe("破壊的", () => {
    it("#soldier_drop$", () => {
      const soldier = Soldier.easy_create()
      const board = Board.create_empty()
      board.soldier_drop$(soldier)
      expect(!!board.soldier_exist_p(soldier)).toEqual(true)
    })

    it("#soldier_remove$", () => {
      const soldier = Soldier.easy_create()
      const board = Board.create_from_soldiers([soldier])
      board.soldier_remove$(soldier)
      expect(!!board.soldier_exist_p(soldier)).toEqual(false)
    })

    it("#soldier_move$", () => {
      const soldier_a = Soldier.easy_create({place_key: "91"})
      const soldier_b = Soldier.easy_create({place_key: "92"})
      const board = Board.create_from_soldiers([soldier_a])
      board.soldier_move$(soldier_a, soldier_b)
      expect(!!board.soldier_exist_p(soldier_a)).toEqual(false)
      expect(!!board.soldier_exist_p(soldier_b)).toEqual(true)
    })

    it("#delete_at$", () => {
      const soldier = Soldier.easy_create()
      const board = Board.create_from_soldiers([soldier])
      board.delete_at$(soldier.place)
      expect(!!board.soldier_exist_p(soldier)).toEqual(false)
    })

    it("#clear$", () => {
      const soldier = Soldier.easy_create()
      const board = Board.create_from_soldiers([soldier])
      board.clear$()
      expect(board.soldiers.length).toEqual(0)
    })
  })

  describe("非破壊的", () => {
    it("#empty_p", () => {
      expect(Board.create_empty().empty_p).toEqual(true)
      expect(Board.create_from_soldiers([Soldier.easy_create()]).empty_p).toEqual(false)
    })

    it("#lookup", () => {
      const soldier = Soldier.easy_create()
      const board = Board.create_from_soldiers([soldier])
      expect(board.lookup(soldier.place)).toEqual(soldier)
    })

    it("#shallow_clone", () => {
      const soldier = Soldier.easy_create()
      const old_board = Board.create_empty()
      const new_board = old_board.shallow_clone
      old_board.soldier_drop$(soldier)
      expect(new_board.empty_p).toEqual(true)
    })

    it("#soldiers", () => {
      const soldier = Soldier.easy_create()
      const board = Board.create_from_soldiers([soldier])
      expect(board.soldiers).toEqual([soldier])
      expect(board.to_a).toEqual([soldier])
    })

    it("#to_h", () => {
      const soldier = Soldier.easy_create()
      const board = Board.create_from_soldiers([soldier])
      expect(board.to_h).toEqual({[soldier.place.key]: soldier})
    })

    it("#soldiers_count", () => {
      const soldier = Soldier.easy_create()
      const board = Board.create_from_soldiers([soldier])
      expect(board.soldiers_count).toEqual(1)
    })

    it("#soldiers_by_location", () => {
      const soldier = Soldier.easy_create()
      const board = Board.create_from_soldiers([soldier])
      expect(board.soldiers_by_location(Location.black)).toEqual([soldier])
      expect(board.soldiers_by_location(Location.white)).toEqual([])
    })
  })

  describe("soldier_*", () => {
    it("#soldier_exist_p", () => {
      const soldier = Soldier.easy_create()
      const board = Board.create_from_soldiers([soldier])
      expect(!!board.soldier_exist_p(soldier)).toEqual(true)
    })

    it("#soldier_drop", () => {
      const soldier = Soldier.easy_create()
      const old_board = Board.create_empty()
      const new_board = old_board.soldier_drop(soldier)
      expect(old_board.empty_p).toEqual(true)
      expect(new_board.empty_p).toEqual(false)
    })

    it("#soldier_remove", () => {
      const soldier = Soldier.easy_create()
      const old_board = Board.create_from_soldiers([soldier])
      const new_board = old_board.soldier_remove(soldier)
      expect(old_board.empty_p).toEqual(false)
      expect(new_board.empty_p).toEqual(true)
    })

    it("#soldier_move", () => {
      const soldier_a = Soldier.easy_create({place_key: "91"})
      const soldier_b = Soldier.easy_create({place_key: "92"})
      const old_board = Board.create_from_soldiers([soldier_a])
      const new_board = old_board.soldier_move(soldier_a, soldier_b)
      expect(!!old_board.soldier_exist_p(soldier_a)).toEqual(true)
      expect(!!old_board.soldier_exist_p(soldier_b)).toEqual(false)
      expect(!!new_board.soldier_exist_p(soldier_a)).toEqual(false)
      expect(!!new_board.soldier_exist_p(soldier_b)).toEqual(true)
    })
  })

  describe("UtilityMethods", () => {
    it("#king_find_by_location", () => {
      const king = Soldier.easy_create()
      const board = Board.create_from_soldiers([king])
      expect(board.king_find_by_location(Location.black)).toEqual(king)
      expect(board.king_find_by_location(Location.white)).toEqual(undefined)
    })

    it("#piece_counts_hash", () => {
      const soldier = Soldier.easy_create()
      const board = Board.create_from_soldiers([soldier])
      expect(board.piece_counts_hash).toEqual({"K": 1})
    })

    it("#pawn_drop_on_king_front_p", () => {
      const fn = (pawn_place_key) => {
        const king_place_key = Place.center_center.digit_human
        const king = Soldier.easy_create({place_key: king_place_key, piece_key: "K", location_key: "white"})
        const pawn = Soldier.easy_create({place_key: pawn_place_key, piece_key: "P", location_key: "black"})
        const board = Board.create_from_soldiers([king])
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
      const soldier = Soldier.easy_create()
      const board = Board.create_from_soldiers([soldier])
      expect(board.to_sfen).toEqual("9/9/9/9/9/9/9/9/4K4")
      expect(Board.create_empty().to_sfen).toEqual("9/9/9/9/9/9/9/9/9")
    })
  })

  describe("ViolationMethods", () => {
    it("#double_pawn_violation_p", () => {
      const soldier_a = Soldier.easy_create({place: Place.bottom_center, piece_key: "P"})
      const soldier_b = Soldier.easy_create({place: Place.center_center, piece_key: "P"})
      const board = Board.create_from_soldiers([soldier_a])
      expect(board.double_pawn_violation_p(soldier_b)).toEqual(true)
    })
  })

  describe("TransformMethods", () => {
    it("#half_spin", () => {
      const soldier = Soldier.easy_create({place: Place.top_right})
      const old_board = Board.create_from_soldiers([soldier])
      const new_board = old_board.half_spin
      expect(old_board.to_sfen).toEqual("8K/9/9/9/9/9/9/9/9")
      expect(new_board.to_sfen).toEqual("9/9/9/9/9/9/9/9/k8")
    })

    it("#flip", () => {
      const soldier = Soldier.easy_create({place: Place.top_right})
      const old_board = Board.create_from_soldiers([soldier])
      const new_board = old_board.flip
      expect(old_board.to_sfen).toEqual("8K/9/9/9/9/9/9/9/9")
      expect(new_board.to_sfen).toEqual("9/9/9/9/9/9/9/9/8K")
    })

    it("#flop", () => {
      const soldier = Soldier.easy_create({place: Place.top_right})
      const old_board = Board.create_from_soldiers([soldier])
      const new_board = old_board.flop
      expect(old_board.to_sfen).toEqual("8K/9/9/9/9/9/9/9/9")
      expect(new_board.to_sfen).toEqual("K8/9/9/9/9/9/9/9/9")
    })

    it("#rotate_xy", () => {
      const soldier = Soldier.easy_create({place: Place.top_right})
      const old_board = Board.create_from_soldiers([soldier])
      const new_board = old_board.rotate_xy(1, -1)
      expect(old_board.to_sfen).toEqual("8K/9/9/9/9/9/9/9/9")
      expect(new_board.to_sfen).toEqual("9/9/9/9/9/9/9/9/K8")
    })

    it("#square_shuffle", () => {
      const soldier = Soldier.easy_create({place: Place.top_right})
      const old_board = Board.create_from_soldiers([soldier])
      const new_board = old_board.square_shuffle(4)
      expect(old_board.to_sfen).toEqual("8K/9/9/9/9/9/9/9/9")
      expect(new_board.to_sfen.includes("K")).toEqual(true)
    })
  })

  describe("LeaveKingAloneMethods", () => {
    // beforeEach(() => {
    //   soldier = Soldier.create({place: Place.fetch("19"), piece: Piece.fetch("R"), promoted: true})
    // })

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
      const soldier = Soldier.easy_create({place_key: "91", piece_key: "P"})
      expect(board.soldier_drop_then_king_death_p(soldier)).toEqual(true)
    })

    it("#reach_p", () => {
      const board = Board.create_empty()
      const rook_plus = Soldier.easy_create({place_key: "19", piece_key: "R", promoted: true})
      expect(board.reach_p(rook_plus, Place.fetch("28"))).toEqual(true)
      expect(board.reach_p(rook_plus, Place.fetch("37"))).toEqual(false)
      expect(board.reach_p(rook_plus, Place.fetch("17"))).toEqual(true)
    })

    it("#reach_count", () => {
      const board = Board.create_empty()
      const rook_plus = Soldier.easy_create({place_key: "19", piece_key: "R", promoted: true})
      expect(board.reach_count(rook_plus, Place.fetch("28"))).toEqual(1)
      expect(board.reach_count(rook_plus, Place.fetch("37"))).toEqual(0)
      expect(board.reach_count(rook_plus, Place.fetch("17"))).toEqual(2)
    })

    it("#once_reach_count", () => {
      const board = Board.create_empty()
      const rook_plus = Soldier.easy_create({place_key: "19", piece_key: "R", promoted: true})
      expect(board.once_reach_count(rook_plus, Place.fetch("28"))).toEqual(1)
      expect(board.once_reach_count(rook_plus, Place.fetch("37"))).toEqual(0)
      expect(board.once_reach_count(rook_plus, Place.fetch("17"))).toEqual(0)
    })

    it("#repeat_reach_count", () => {
      const board = Board.create_empty()
      const rook_plus = Soldier.easy_create({place_key: "19", piece_key: "R", promoted: true})
      expect(board.repeat_reach_count(rook_plus, Place.fetch("28"))).toEqual(0)
      expect(board.repeat_reach_count(rook_plus, Place.fetch("37"))).toEqual(0)
      expect(board.repeat_reach_count(rook_plus, Place.fetch("17"))).toEqual(2)
    })

    it("#repeat_reach_count (間に駒がある場合)", () => {
      const soldier_18P = Soldier.create({place: Place.fetch("18"), piece: Piece.fetch("P")})
      const board = Board.create_from_soldiers([soldier_18P])
      const rook_plus = Soldier.easy_create({place_key: "19", piece_key: "R", promoted: true})
      expect(board.repeat_reach_count(rook_plus, Place.fetch("17"), {ghost_move: true})).toEqual(2)
      expect(board.repeat_reach_count(rook_plus, Place.fetch("17"))).toEqual(0)
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
