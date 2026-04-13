import _ from "lodash"

import { MoveInfo } from "./models/move_info.js"
import { Place } from "./models/place.js"
import { Board } from "./models/board.js"
import { Soldier } from "./models/soldier.js"
import { Location } from "./models/location.js"
import { LiftCancelActionInfo } from "./models/lift_cancel_action_info.js"
import { ClickResponseTimingInfo } from "./models/click_response_timing_info.js"

export const mod_interaction = {
  props: {
    sp_legal_move_only:           { type: Boolean, default: true, },       // play で駒の移動を制限する
    sp_piece_auto_promote:        { type: Boolean, default: true, },       // play で死に駒になるときは自動的に成る
    sp_my_piece_only_move:        { type: Boolean, default: true, },       // play では自分手番とき自分の駒しか動かせないようにする
    sp_my_piece_kill_disabled:    { type: Boolean, default: true, },       // play では自分の駒で同じ仲間の駒を取れないようにする
    sp_double_click_threshold_ms: { type: Number,  default: 350, validator(value) { return Number.isInteger(value) }, }, // edit で駒を反転するときのダブルクリックと認識する時間(ms)
    sp_view_mode_piece_movable:   { type: Boolean, default: true, },       // view でも駒を動かせる(ただし本筋は破壊しない)

    // 駒キャンセル方法
    sp_lift_cancel_action: {
      type: String,
      default: "standard",
      validator(value) { return LiftCancelActionInfo.keys.includes(value) },
    },

    // 盤が反応するタイミング
    sp_click_response_timing: {
      type: String,
      default: "slow",
      validator(value) { return ClickResponseTimingInfo.keys.includes(value) },
    },
  },

  data() {
    return {
      // |------------------------+------------+------------+---------------------|
      // | どこの駒を持ち上げた？ | pick_place | pick_piece | pick_location |
      // |------------------------+------------+------------+---------------------|
      // | 盤上                   | ○         |            |                     |
      // | 駒台                   |            | ○         | ○                  |
      // | 駒箱                   |            | ○         |                     |
      // |------------------------+------------+------------+---------------------|
      pick_place: null,    // 盤上ら動かそうとしているときの元位置
      pick_piece: null,    // 駒台 or 駒箱から持った駒
      pick_location: null, // 駒台から持ったときだけ先後が入っている。駒箱から取り出しているときは null
      pick_promoted: null, // 持ったとき成った状態にするか？

      dialog_soldier: null,     // 成り確認ダイアログ表示中か？
      _last_clicked_cell: null,        // 最後にクリックした要素

      _double_tap_time: null,   // ダブルクリック判定用

      last_move_info: null, // 最後に動かした駒の情報
      killed_soldier: null, // 移動先にある相手の駒
    }
  },

  watch: {
    mut_mode() {
      this.current_turn_finish("モードが切り替え") // モードが切り替わったときに持ち上げた駒を元に戻す(こうしないとカーソルから駒が離れない)
    },
  },

  methods: {
    // // 盤を押した瞬間
    // board_cell_pointerdown_handle(xy, e) {
    //   const place = Place.fetch(xy)
    //
    //   this.event_call("ev_action_board_cell_pointerdown", place, e)
    //
    //   const params = {
    //     general_mark_pos_key: place.general_mark_pos_key, // これだけあればいいけど
    //     place: place,                        // 他のも入れとく
    //   }
    //   this.event_call("ev_think_mark_click", params, e)
    // },

    // // 盤面クリック時に反応する部分
    // //
    // // 本来は、
    // // @pointerdown.stop.prevent.left="TheSP.board_cell_left_click(logical_xy(x, y), $event)"
    // // @pointerdown.stop.prevent.right="TheSP.board_cell_right_click(logical_xy(x, y), 'transform_all', $event)"
    // // として書いていたが、pointerdown の部分を pointerdown か click 動的に切り替えると stop.prevent.xxx が利かなくなるため
    // // 一つのメソッドだけが反応するようにしている
    // //
    // interactive_board_cell_click_entry(xy, e) {
    //   if (e.button === 0) {
    //     this.board_cell_left_click(xy, e)
    //   } else {
    //     this.board_cell_right_click(xy, "transform_all", e)
    //   }
    //
    //   e.preventDefault()
    //   e.stopPropagation()
    // },

    // 盤をクリック
    board_cell_left_click(place, e) {
      this.event_call("ev_action_board_cell_pointerdown", place, e)
      this.board_cell_left_click_think_mark_event(place, e)
      this.board_cell_left_click_piece_move(place, e)
    },

    // マークしたいとき用のイベントを発行する
    board_cell_left_click_think_mark_event(place, e) {
      // if (!this.piece_pick_p) {
      const params = {
        general_mark_pos_key: place.general_mark_pos_key, // これだけあればいいけど
        place: place,                        // 他のも入れとく
      }
      // if (this.meta_p(e)) {
      this.event_call("ev_think_mark_click", params, e)
      // }
    },

    board_cell_left_click_piece_move(place, e) {
      this.log("board_cell_left_click")
      this.log(`shiftKey: ${e.shiftKey}`)

      this.checkmate_init()
      // this.checkmate_init2()

      this.$data._last_clicked_cell = e.target
      this.illegal_init()

      // if (this.play_p) {
      //   if (this.meta_p(e)) {
      //     return
      //   }
      // }

      // @pointerdown="TheSP.board_cell_pointerdown_handle(logical_xy(x, y), $event)"

      if (this.sp_board_cell_left_click_disabled) {
        this.log(`セルをクリックしたときの通常処理を無効化する`)
        return
      }

      if (this.break_if_view_mode) {
        return
      }

      // 移動後の取れる駒
      this.killed_soldier = this.xcontainer.board.lookup(place)

      // 移動後の駒
      let new_soldier = null
      let promotable_p = null
      if (this.origin_soldier1) {
        new_soldier = this.origin_soldier1.clone_with({place: place})
        // 入って成る？ それとも出てなる？
        promotable_p = new_soldier.promotable_p || this.origin_soldier1.promotable_p
      }

      // -------------------------------------------------------------------------------- Validation

      if (this.cpu_location_p) {
        this.log("片方の手番だけを操作できるようにする sp_human_side の指定があってCPU側なので無効とする")
        this.event_call("ev_illegal_click_but_self_is_not_turn", e)
        return
      }

      if (this.sp_my_piece_only_move) {
        if (this.play_p) {
          if (!this.piece_pick_p) {
            if (this.killed_soldier) {
              if (this.killed_soldier.location !== this.xcontainer.current_location) {
                this.log("自分の手番で相手の駒を持ち上げようとしたので無効とする")
                this.event_call("ev_illegal_my_turn_but_oside_click")
                return
              }
            }
          }
        }
      }

      if (this.play_p && this.pick_piece && this.killed_soldier) {
        this.log("駒台や駒箱から持ち上げた駒を盤上の駒の上に置こうとしたので無効とする")
        this.if_standard_then_unhold(e) // ←元の位置に戻す場合
        return
      }

      if (this.sp_illegal_validate) {
        if (this.play_p && this.pick_piece && !this.killed_soldier) {
          const new_soldier = this.soldier_create_from_stand_or_box_on(place)
          if (new_soldier.dead_place_p) {
            this.log("駒台や駒箱から持ち上げた駒を置こうとしたけど死に駒なので無効とする")
            const last_move_info = this.move_info_create({type: "put", to: new_soldier})
            if (this.illegal_call("illegal_dead_piece", last_move_info) === "__cancel__") { // 死に駒
              return
            }
          }
        }
      }

      if (!this.piece_pick_p && !this.killed_soldier) {
        this.log("持たずに何もないところをクリックしたので無効とする")
        return
      }

      if (this.play_p) {
        if (this.sp_my_piece_kill_disabled) {
          if (this.put_on_my_soldier_p(this.killed_soldier)) {
            this.log("自分の駒の上に駒を重ねようとしたので無効とする(盤上の移動元の駒を含まない)")

            if (this.lift_cancel_action_info.key === "rehold") {
              this.log("盤上の駒を持って別の盤上の駒に持ち直した")
              this.soldier_hold(place, e)
              return
            }

            this.if_standard_then_unhold(e) // ←元の位置に戻す場合
            return
          }
        }
      }

      // ダブルタップで裏返すとシングルクリックの遅延がすさまじいことになるためダブルタップは使ってはいけない
      if (this.edit_p) {
        const old = this.$data._double_tap_time
        this.$data._double_tap_time = Date.now()
        if (this.killed_soldier) {
          if (_.isEqual(this.pick_place, place)) { // この処理をスキップすると3連打で2回反転できるが誤操作が頻発するのでやめ
            if (old) {
              const gap = this.$data._double_tap_time - old
              const enable = gap < this.sp_double_click_threshold_ms
              this.log(`ダブルクリック判定: (${gap} ms < ${this.sp_double_click_threshold_ms}) -> ${enable}`)
              if (enable) {
                this.log(`操作モードで盤上の駒を持って同じ位置に戻したときに盤上の駒を裏返す`)
                this.xcontainer.board.soldier_drop$(this.killed_soldier.transform_all)
                this.piece_hold_and_put_for_bug(place, e) // 不具合対策
                return
              }
            }
          }
        }
      }

      if (_.isEqual(this.pick_place, place)) {
        this.log("盤上の駒を持って同じ位置に戻したので状況キャンセル")
        this.interactive_lifted_piece_cancel(e)
        return
      }

      // --------------------------------------------------------------------------------

      if (this.edit_p) {
        this.log(`lifted_from_p: ${this.piece_pick_p}`)
        if (this.meta_p(e)) {
          if (!this.piece_pick_p && this.killed_soldier) { // 持ってなくて、駒がある
            this.log("盤上の駒を裏返す")
            this.xcontainer.board.soldier_drop$(this.killed_soldier.transform_all)
            this.piece_hold_and_put_for_bug(place, e) // 不具合対策
            return
          }
        }
      }

      // 盤上の駒を持ちあげる
      if (!this.piece_pick_p) {
        this.log("盤上の駒を持ちあげる")

        // if (this.meta_p(e)) {
        //   this.log("しかしシフトキーを押しているので持ち上げない")
        //   return
        // }

        this.soldier_hold(place, e)
        return
      }

      // 盤上から移動させようとしたとき移動を制限する
      if (this.sp_legal_move_only && this.play_p && this.pick_place) {
        let found = false

        // 1つだけ動ける系
        if (!found) {
          found = this.xcontainer.board.once_reach_count(this.origin_soldier1, place) > 0
        }

        // 連続で動ける系
        if (!found) {
          if (this.xcontainer.board.repeat_reach_count(this.origin_soldier1, place, {ghost_move: true}) > 0) {
            this.log("障害物を素通りすれば目的地に行ける")
            if (this.sp_illegal_validate) {
              if (this.xcontainer.board.repeat_reach_count(this.origin_soldier1, place) > 0) {
                this.log("障害物なく目的地に行ける")
              } else {
                this.log("障害物を飛び越えれば目的地に行ける")
                const last_move_info = this.move_info_create({type: "move", from: this.origin_soldier1, to: new_soldier, killed_soldier: this.killed_soldier})
                if (this.illegal_call("illegal_warp_move", last_move_info) === "__cancel__") { // 駒ワープ
                  return
                }
              }
            }
            found = true
          } else {
            this.log("目的地に対して効きがずれている")
          }
        }

        if (!found) {
          this.log("操作モードで盤上の駒を動かし中だが動けないセルをタップしたので無効")
          this.if_standard_then_unhold(e) // ←元の位置に戻す場合
          return
        }

        // [王手放置判定] 駒を移動したとき
        if (this.sp_illegal_validate) {
          if (this.xcontainer.board.soldier_move_then_king_death_p(this.origin_soldier1, new_soldier)) {
            this.log("駒を動かしたあとの状態が自玉王手になっている")
            const last_move_info = this.move_info_create({type: "move", from: this.origin_soldier1, to: new_soldier, killed_soldier: this.killed_soldier})
            const illegal_key = this.illegal_key_of_piece_move(this.origin_soldier1.location, this.origin_soldier1.piece)
            if (this.illegal_call(illegal_key, last_move_info) === "__cancel__") { // 王手放置 or 自殺手
              return
            }
          }
        }
      }

      // 盤上から移動
      if (this.pick_place) {
        this.log("盤上から移動")
        if (this.killed_soldier) {
          this.xcontainer.hold_pieces_add$(this.origin_soldier1.location, this.killed_soldier.piece) // 相手の駒があれば取る
          // this.$forceUpdate()
        }

        // 「入って成る」と「出て成る」の両方で発動
        // 元々 play モードだけで発動だった
        // しかし view モードでオーバーレイ操作を無効にしたときは play モード同様に成れないといけない
        if ((this.view_p || this.play_p) && promotable_p) {
          let must_dialog = true
          if (this.sp_piece_auto_promote) {
            const force_promote_length = new_soldier.piece.piece_vector.force_promote_length // 死に駒になる上の隙間
            if (force_promote_length != null) {                                              // チェックしない場合は null
              if (new_soldier.top_spaces <= force_promote_length) {                          // 実際の上の隙間 <= 死に駒になる上の隙間
                this.promotable_piece_moved(new_soldier, true)                               // 死に駒になるなら自動的に成る
                must_dialog = false                                                          // ダイアログを表示する必要はなくなった
              }
            }
          }

          if (must_dialog) {
            this.lp_mouse_stick_p = false // ダイアログ選択時時は動かしている駒を止める
            this.dialog_soldier = new_soldier
            this.lp_destroy()

            // this.$buefy.dialog.confirm({
            //   message: '成りますか？',
            //   confirmText: '成る',
            //   cancelText: '成らない',
            //   onConfirm: () => { this.promotable_piece_moved(new_soldier, true)  },
            //   onCancel:  () => { this.promotable_piece_moved(new_soldier, false) },
            // })
          }
        } else {
          if (this.play_p) {
            this.last_move_info_set({type: "move", from: this.origin_soldier1, to: new_soldier, killed_soldier: this.killed_soldier})
            this.moves_set()
          }
          this.move_then_checkmate_check(new_soldier)
          this.xcontainer.board.soldier_drop$(new_soldier) // 置く
          this.xcontainer.board.delete_at$(this.pick_place)
          this.current_turn_commit()
          this.current_turn_finish("盤上の駒を移動する")
        }

        return
      }

      // 持駒を置く
      if (this.pick_piece) {
        this.log("持駒を置く")

        const drop_soldier = this.soldier_create_from_stand_or_box_on(place)

        // [王手放置判定] 持駒を打ったとき
        if (this.sp_illegal_validate) {
          if (this.play_p) {
            if (this.xcontainer.board.soldier_drop_then_king_death_p(drop_soldier)) {
              const last_move_info = this.move_info_create({type: "put", to: drop_soldier})
              const illegal_key = this.illegal_key_of_piece_move(drop_soldier.location, drop_soldier.piece)
              if (this.illegal_call(illegal_key, last_move_info) === "__cancel__") { // 王手放置
                return
              }
            }
          }
        }

        // 二歩判定
        if (this.sp_illegal_validate) {
          if (this.play_p) {
            if (this.pick_piece.key === "P") {
              if (this.pick_location) {
                // 駒台から動かしている状態
                if (this.xcontainer.board.double_pawn_violation_p(drop_soldier)) {
                  // 二歩をブロックしたとき、これまで "二歩" の文字列だけを発行していたが
                  // これだと何を指してどのような局面になったのかわからない
                  // したがって二歩ブロックであっても通常の指し手と同じような情報を用意しないといけない
                  // しかし副作用で moves などを更新してしまうと棋譜が二歩で上書きされてしまうので注意する
                  // 持駒の増減に関して SFEN は指し手だけ繋げればよいのでこのままでよい
                  const last_move_info = this.move_info_create({type: "put", to: drop_soldier})
                  if (this.illegal_call("illegal_double_pawn", last_move_info) === "__cancel__") { // 二歩
                    return
                  }
                }
              }
            }
          }
        }

        // 駒の上に置いた場合は取る
        if (this.killed_soldier) {
          if (this.pick_location) {
            // pick_location の駒台から移動した駒で取ったので pick_location の方に置く
            this.xcontainer.hold_pieces_add$(this.pick_location, this.killed_soldier.piece)
          } else {
            // 駒箱から移動した駒で取ったので this.killed_soldier.location に返すとする場合
            if (false) {
              this.xcontainer.hold_pieces_add$(this.killed_soldier.location, this.killed_soldier.piece)
            } else {
              // 駒の向きは先手と同じなのでわかりやすいように 先手に返す
              this.xcontainer.hold_pieces_add$(Location.fetch("black"), this.killed_soldier.piece)
            }
          }
        }

        // 打ち歩詰めチェック
        // ・詰みチェックは別に行う
        // ・玉の頭に歩を打つ場面は滅多にないため重複しても問題ない (絶対に共通化するな)
        if (this.sp_illegal_validate) {
          if (this.xcontainer.board.pawn_drop_on_king_front_p(drop_soldier)) { // まず玉の頭に歩を打ったか？ の判定を先に入れる
            const hold_pieces = this.xcontainer.hold_pieces[drop_soldier.location.flip.key]
            if (this.xcontainer.board.soldier_drop_then_checkmate_p(drop_soldier, {hold_pieces: hold_pieces})) {
              const last_move_info = this.move_info_create({type: "put", to: drop_soldier})
              if (this.illegal_call("illegal_pawn_drop_mate", last_move_info) === "__cancel__") {
                return
              }
            }
          }
        }

        // 詰み
        this.drop_then_checkmate_check(drop_soldier)

        // FIXME: 設計ミス。this.xcontainer が安全に複製できないせいで指す前に連続王手の千日手になっているかの判定ができない
        // 本当は xcontainer の完全な複製に対して指して連続王手の千日手判定を行い、反則ブロック条件なら、emit しないといけない

        this.piece_decriment()
        this.xcontainer.board.soldier_drop$(drop_soldier) // 置く
        this.last_move_info_set({type: "put", to: drop_soldier})
        this.moves_set()
        this.current_turn_commit()
        this.current_turn_finish("駒台の駒を盤上に置く")
        return
      }

      throw new Error("must not happen")
    },

    // board_cell_left_dblclick(xy, e) {
    //   if (this.break_if_view_mode) {
    //     return
    //   }
    //
    //   const place = Place.fetch(xy)
    //   const soldier = this.xcontainer.board.lookup(place)
    //
    //   if (this.edit_p) {
    //     if (!this.piece_pick_p) {
    //       if (soldier) {
    //         this.log("操作モードでダブルタップしたので裏返す")
    //         // this.xcontainer.board.soldier_drop$(soldier.transform_all)
    //         // this.piece_hold_and_put_for_bug(place, e) // 不具合対策
    //         return
    //       }
    //     }
    //   }
    //
    //   return "eslint対策のreturn"
    // },

    promotable_piece_moved2(promoted) {
      this.promotable_piece_moved(this.dialog_soldier, promoted)
    },

    // 成れる状態の駒をどうするか
    promotable_piece_moved(new_soldier, promoted) {
      new_soldier = new_soldier.clone_with({promoted: promoted})
      this.last_move_info_set({type: "promotable", from: this.origin_soldier1, to: new_soldier})
      this.moves_set() // 7g7f+
      this.move_then_checkmate_check(new_soldier)
      this.xcontainer.board.soldier_drop$(new_soldier) // 置く
      this.xcontainer.board.delete_at$(this.pick_place)
      this.current_turn_commit()
      this.current_turn_finish("盤上の駒を移動して成り不成選択後")
    },

    // 最後に操作した駒の情報を作る
    last_move_info_set(attrs) {
      this.last_move_info = this.move_info_create(attrs)
    },

    // 最後に操作した駒の情報を作る
    move_info_create(attrs) {
      return new MoveInfo({
        ...attrs,
        next_turn_offset: this.turn_offset + 1,           // この手を指した直後の手数。初手76歩なら1
        player_location: this.xcontainer.current_location,  // 指した人の色。駒の色ではない
        killed_soldier: this.killed_soldier,              // 取った駒 (無い場合もある)
        // illegal_hv_list: this.illegal_hv_list,
      })
    },

    board_cell_right_click(xy, method, e) {
      this.log("盤のセルを右クリック")
      const place = Place.fetch(xy)

      if (place.middle_center_p) {
        if (e.shiftKey && e.altKey && (e.metaKey || e.ctrlKey)) {
          this.dev_tools_toggle_handle()
          return
        }
      }

      if (this.break_if_view_mode) {
        return
      }

      const soldier = this.xcontainer.board.lookup(place)

      if (this.hold_cancel(e)) {
        return
      }

      if (this.edit_p) {
        if (!this.piece_pick_p && soldier) {
          this.log("盤上の駒を裏返す")
          this.xcontainer.board.soldier_drop$(soldier[method]) // method: transform_all | transform_location | transform_promote
          this.piece_hold_and_put_for_bug(place, e) // 不具合対策
        }
      }

      // 右クリックでの思考印
      if (this.play_p) {
        this.board_cell_left_click_think_mark_event(place, e)
      }
    },

    // board_cell_right_click2(xy, e) {
    //   this.log("盤のセルを右クリック")
    //
    //   if (this.break_if_view_mode) {
    //     return
    //   }
    //
    //   const place = Place.fetch(xy)
    //   const soldier = this.xcontainer.board.lookup(place)
    //
    //   if (this.hold_cancel(e)) {
    //     return
    //   }
    //
    //   if (this.edit_p) {
    //     if (!this.piece_pick_p && soldier) {
    //       this.log("盤上の駒を裏返す")
    //       this.xcontainer.board.soldier_drop$(soldier.transform_all)
    //       this.piece_hold_and_put_for_bug(place, e) // 不具合対策
    //     }
    //   }
    // },

    // 駒台 or 駒台の駒をクリックしたときの共通処理
    membership_left_click_handle(location, e) {
      if (this.break_if_view_mode) {
        return
      }

      if (this.pick_piece) {                         // 盤上からではない駒を持っているか？
        if (this.pick_location === location) { // 駒台からの駒か？
          this.log("自分の駒台から駒を持ち上げているならキャンセル")
          this.interactive_lifted_piece_cancel(e)
          return true
        }
      }

      // 相手の駒台から自分の駒台、または駒箱から自分の駒台へ移動
      if (this.edit_p) {
        // if (this.pick_location !== location && this.pick_piece) {
        if (this.pick_piece) {
          // 相手の持駒を自分の駒台に移動
          this.hold_pieces_move_to_my_hold_pieces(e, location)
          return true
        }
      }

      if (this.play_p) {
        if (this.origin_soldier1) {
          this.log("play では盤上の駒を駒台に置くことはできない")
          this.if_standard_then_unhold(e)
          return true
        }
      }

      // 盤上の駒を駒台に置く
      if (this.origin_soldier1) {
        this.log("盤上の駒を駒台に置く")
        this.board_soldir_to_hold_pieces(location)
        return true
      }

      return false
    },

    // 副ボタンクリックの場合は
    membership_right_click_handle(location, e) {
      if (this.piece_pick_p) {
        this.interactive_lifted_piece_cancel(e)
        return true
      }
    },

    // 駒台の駒を押した瞬間
    piece_stand_piece_click_with_mark_event(location, piece, pick_promoted, e) {
      this.event_call("ev_action_stand_cell_pointerdown", location, piece, e) // 共有将棋盤では未使用

      // 思考印は左クリックと右クリックのどちらを使って有効にしようとしているか関与しないためどちらのクリックであってイベントを発生させる
      this.piece_stand_markable_event(location, piece, e)

      // 【重要】
      // ・駒の持ち上げ処理なので「左クリックに限定」すること
      // ・限定しなかった場合、右クリックで「駒を持つ」「持ち上げ駒キャンセル」のイベントが同時に発生してしまう
      // ・そうなると共有将棋盤側で左クリックして思考印をつけると3つ「思考印をつける」「駒を持つ」「持ち上げ駒キャンセル」の効果音が鳴ってしまう
      if (e.button === 0) {
        this.piece_stand_piece_left_click(location, piece, pick_promoted, e)
      }
    },

    // piece_stand_piece_pointerdown_handle(location, piece, e) {
    //   this.piece_stand_piece_pointerdown_event(location, piece, e)
    // },

    piece_stand_markable_event(location, piece, e) {
      const params = {
        general_mark_pos_key: location.general_mark_pos_key(piece), // これだけあればいいけど
        location: location,                    // 何かに使うかもしれないので
        piece: piece,                          // 他のも入れとく
      }
      this.event_call("ev_think_mark_click", params, e)
    },

    // 駒台の駒をクリック
    piece_stand_piece_left_click(location, piece, pick_promoted, e) {
      this.log("駒台の駒を左クリック")

      if (this.break_if_view_mode) {
        return
      }

      if (this.view_p && this.sp_overlay_nav) {
        this.log("盤面左右で移動する場合は盤面で駒を動かせないのだから駒台の操作も禁止する")
        return
      }

      // if (this.membership_left_click_handle(location, e)) {
      //   return
      // }

      // クリックしたけど持駒がない
      if (this.xcontainer.hold_pieces_count(location, piece) <= 0) {
        this.log("クリックしたけど持駒がない")
        return
      }

      // 相手の持駒を持とうとしたときは無効
      if (this.sp_my_piece_only_move) {
        if (this.play_p) {
          if (location !== this.xcontainer.current_location) {
            this.log("相手の持駒を持とうとしたときは無効")
            return
          }
        }
      }

      if (this.cpu_location_p) {
        this.log("片方の手番だけを操作できるようにする sp_human_side の指定があってCPU側なので無効とする")
        this.event_call("ev_illegal_click_but_self_is_not_turn", e)
        return
      }

      // 駒を持った状態で駒台を触るといったん離すにすれば↓これらは必要ない
      //
      // if (this.pick_piece && this.pick_piece.key === piece.key) {
      //   if (this.pick_location === location) {
      //     this.log("駒台の駒を持った状態で同じ駒台の同じ駒を持ったのでキャンセルする")
      //     this.current_turn_reset_all()
      //     return
      //   }
      // }
      //
      // if (this.pick_piece && this.pick_location) {
      //   this.log("駒を持った状態で再び駒を持とうとしているため無効とする")
      //   return
      // }

      this.log("駒台の駒を持つ")
      this.pick_piece = piece
      this.pick_location = location
      this.pick_promoted = pick_promoted
      this.lp_create(e, this.origin_soldier2)

      this.origin_mark_jump_invoke_event(e)
    },

    // 駒箱の駒を持ち上げている？
    piece_box_have_p(piece) {
      return _.isNil(this.pick_location) && this.pick_piece === piece
    },

    // FIXME: 駒を持っているときは「駒箱の駒」に対して一切反応しないようにしたい。そうすると駒箱だけの判定で済む
    piece_box_other_click(e) {
      this.log("piece_box_other_click:駒箱クリック")

      if (_.isNil(this.pick_location) && this.pick_piece) {
        this.log("持っているならキャンセル")
        this.current_turn_reset_all()
        return true
      }

      if (this.pick_location && this.pick_piece) {
        this.log("駒台から駒箱に移動")
        const count = this.hold_piece_source_cut(e)               // 相手の持駒を減らして減らした分だけ
        this.xcontainer.piece_box_add$(this.pick_piece, count) // 駒箱に加算する
        this.current_turn_reset_all()
        return true
      }

      if (this.origin_soldier1) {
        this.log("盤上の駒を駒箱に移動")
        this.xcontainer.piece_box_add$(this.origin_soldier1.piece)
        this.xcontainer.board.delete_at$(this.origin_soldier1.place)
        this.current_turn_reset_all()
        return true
      }

      return false
    },

    // 駒箱の駒をクリック
    piece_box_piece_click(piece, e) {
      // 駒をクリックしたとき駒箱をクリックするのと同じ処理を実行
      if (this.piece_box_other_click(e)) {
        return
      }

      this.log("piece_box_piece_click:駒箱の駒を持つ")
      this.pick_piece = piece
      this.pick_location = null
      this.pick_promoted = false
      this.lp_create(e, this.origin_soldier2)
    },

    // // 成り不成り選択ダイアログ表示中はキャンセルできない
    // interactive_hold_cancel(e) {
    //   if (e.button !== 0) {     // 右クリック
    //     e.preventDefault()
    //     e.stopPropagation()
    //     return this.hold_cancel(e)
    //   }
    // },

    // 成り不成り選択ダイアログ表示中はキャンセルできない
    hold_cancel(e) {
      this.log("hold_cancel")

      if (!this.dialog_soldier) {
        if (this.piece_pick_p) {
          this.log("持ち上げた駒を元に戻す")
          this.interactive_lifted_piece_cancel(e)
          return true
        }
      }

      return false
    },

    // 盤上の駒を駒台に置く
    board_soldir_to_hold_pieces(location) {
      this.xcontainer.hold_pieces_add$(location, this.origin_soldier1.piece) // 駒台にプラス
      this.xcontainer.board.delete_at$(this.origin_soldier1.place)
      this.current_turn_reset_all()
    },

    hold_pieces_move_to_my_hold_pieces(e, location) {
      this.log("相手の持駒を自分の駒台に移動")
      const count = this.hold_piece_source_cut(e)                           // 相手の持駒を減らして減らした分だけ
      this.xcontainer.hold_pieces_add$(location, this.pick_piece, count) // 自分に加算する
      this.current_turn_reset_all()
    },

    // 持ち上げている駒を元の場所から減らす
    hold_piece_source_cut(e) {
      let count = 1

      if (this.pick_location) {
        this.log("相手の駒台から移動")
        if (this.meta_p(e)) {
          this.log("シフトが押されていたので全部移動")
          count = this.xcontainer.hold_pieces_count(this.pick_location, this.pick_piece)
        }
        count = this.xcontainer.hold_pieces_can_be_reduced_count(this.pick_location, this.pick_piece, count)
        this.xcontainer.hold_pieces_add$(this.pick_location, this.pick_piece, -count)
      } else {
        this.log("駒箱から移動")
        if (this.meta_p(e)) {
          this.log("シフトが押されていたので全部移動")
          count = this.xcontainer.piece_box.count(this.pick_piece)
        }
        count = this.xcontainer.piece_box.can_be_reduced_count(this.pick_piece, count) // 減らせる数を clamp する。そうしないと駒箱から移動するときに駒が増えいく
        this.xcontainer.piece_box_add$(this.pick_piece, -count)
      }

      // 実際に減らせれた数を返す(重要)
      return count
    },

    // 駒を1つ減らす
    piece_decriment() {
      if (this.pick_location) {
        this.xcontainer.hold_pieces_add$(this.pick_location, this.pick_piece, -1)
      } else {
        this.xcontainer.piece_box_add$(this.pick_piece, -1)
      }
    },

    // 自分の駒の上に重ねた？ (移動元にある駒を含まない)
    // つまり27の歩を持った状態で28の飛を持ったとき
    put_on_my_soldier_p(soldier) {
      if (this.piece_pick_p) {
        if (soldier) {
          if (soldier.location === this.xcontainer.current_location) {
            if (_.isEqual(this.pick_place, soldier.place)) {
              // 持ち上げた駒と同じ位置
            } else {
              // 持ち上げた駒とは異なる
              return true
            }
          }
        }
      }
    },

    // 盤面の駒を持ち上げる
    soldier_hold(place, e) {
      this.pick_place = place
      this.lp_create(e, this.origin_soldier1)
      this.origin_mark_jump_invoke_event(e)
    },

    // ユーザーの操作で故意に駒を持ってない状態にする (イベント発生)
    interactive_lifted_piece_cancel(e) {
      this.event_call("ev_action_piece_cancel")
      this.origin_mark_jump_cancel_event(e)
      this.current_turn_reset_all()
    },

    // 駒を持ってない状態にする
    current_turn_reset_all(e = null) {
      this.log("current_turn_reset_all: 駒を持ってない状態にする")

      // 前処理
      // this.origin_mark_jump_cancel_event(e)

      // 本当のクリア処理
      this.picked_vars_clear()
      this.checkmate_init()
      this.illegal_clear()
      this.lp_destroy()
    },

    current_turn_finish(message = "") {
      this.log(`${message} → 移動元印を消去しつつ持ち上げ駒情報もリセットする`)

      this.mut_origin_mark_list.clear$()
      this.mut_think_mark_list.clear$()

      this.current_turn_reset_all()
    },

    picked_vars_clear() {
      this.pick_piece     = null
      this.pick_place     = null
      this.pick_location  = null
      this.pick_promoted  = null

      this.dialog_soldier = null
      this.killed_soldier = null
    },

    // 持った状態で他の駒をタップするとキャンセルする場合はキャンセル
    if_standard_then_unhold(e) {
      if (this.lift_cancel_action_info.smooth_cancel) {
        this.log("持った状態で自分の非合法セルタップでキャンセル")
        this.interactive_lifted_piece_cancel(e)
      }
    },

    // 駒を持つ → そのまま置く
    // これは Vue がリアクティブにならない対策として入れているのでできれば外したい
    piece_hold_and_put_for_bug(place, e) {
      // this.soldier_hold(place, e)
      this.current_turn_reset_all() // ←これは絶対にいる
      // emitされない不具合の暫定対策でちょうどここが共通処理になっているのでつっこんでおく
      // this.emit_update_edit_mode_short_sfen()
    },

    // -------------------------------------------------------------------------------- PieceBox

    // --------------------------------------------------------------------------------

    // FIXME: xcontainer.half_spin_self() のメソッドにする
    fn_half_spin() {
      // 盤面反転
      this.xcontainer.board = this.xcontainer.board.half_spin

      // 持駒反転
      this.xcontainer.hold_pieces = _.reduce(Location.values, (a, e) => {
        a[e.key] = this.xcontainer.hold_pieces[e.flip.key]
        return a
      }, {})
    },

    fn_flop() {
      // 盤面左右反転
      this.xcontainer.board = this.xcontainer.board.flop
    },

    init_location_toggle() {
      this.init_location_key = this.init_location.flip.key
    },

    // 駒箱や駒台から持ち上げている駒
    soldier_create_from_stand_or_box_on(place) {
      return Soldier.create({
        piece: this.pick_piece,
        place: place,
        promoted: this.pick_promoted || false,
        location: this.pick_location || Location.fetch("black"),
      })
    },

    meta_p(e) {
      return e.shiftKey | e.ctrlKey | e.altKey | e.metaKey
    },

    ////////////////////////////////////////////////////////////////////////////////

    // ここでの処理はすでに反則がわかっている状態なので多少遅くてもよい
    illegal_key_of_piece_move(location, piece) {
      if (this.xcontainer.board.king_dead_p(location)) {
        this.log("駒を動かす前から自玉王手だった → つまり王手放置")
        if (piece.key === "K") {
          this.log("王手に対して王を動かしたのに王手状態なのは放置ではなく故意の「王手解除せず」というべきか")
          return "illegal_no_check_escape"
        } else {
          this.log("王手に対して他の駒を動かした → 王手だと気づいていない → つまり王手放置 (これはしっくりくる)")
          return "illegal_check_ignored"
        }
      } else {
        this.log("駒を動したことで自玉王手になった (玉を動かしたかどうかにかかわらず自殺手)")
        if (piece.key === "K") {
          this.log("玉を動かして即死した → つまり自殺手")
          return "illegal_self_check"
        } else {
          this.log("玉以外の駒を動かして即死した → つまりピン外し自殺手")
          return "illegal_pin_break_check"
        }
      }
    },

    drop_then_checkmate_check(new_soldier) {
      this.checkmate_block(() => {
        const hold_pieces = this.xcontainer.hold_pieces[new_soldier.location.flip.key]
        return this.xcontainer.board.soldier_drop_then_checkmate_p(new_soldier, {hold_pieces: hold_pieces})
      })
    },

    move_then_checkmate_check(new_soldier) {
      this.checkmate_block(() => {
        const hold_pieces = this.xcontainer.hold_pieces[new_soldier.location.flip.key]
        return this.xcontainer.board.soldier_move_then_checkmate_p(this.origin_soldier1, new_soldier, {hold_pieces: hold_pieces})
      })
    },
  },

  computed: {
    LiftCancelActionInfo()    { return LiftCancelActionInfo                                   },
    lift_cancel_action_info() { return LiftCancelActionInfo.fetch(this.sp_lift_cancel_action) },

    ClickResponseTimingInfo()    { return ClickResponseTimingInfo                                      },
    click_response_timing_info() { return ClickResponseTimingInfo.fetch(this.sp_click_response_timing) },

    // 移動元の駒(盤上から)
    origin_soldier1() {
      if (this.pick_place) {
        return this.xcontainer.board.lookup(this.pick_place)
      }
    },

    // 移動元の駒(駒台 or 駒箱から)
    // place に中途半端なインスタンスを設定してはいけない
    // null を設定することで盤上からではないことがわかる
    origin_soldier2() {
      if (this.pick_piece) {
        return this.soldier_create_from_stand_or_box_on(null)
      }
    },

    // |------------------------+------------+------------+---------------------|
    // | どこの駒を持ち上げた？ | pick_place | pick_piece | pick_location |
    // |------------------------+------------+------------+---------------------|
    // | 盤上                   | ○         |            |                     |
    // | 駒台                   |            | ○         | ○                  |
    // | 駒箱                   |            | ○         |                     |
    // |------------------------+------------+------------+---------------------|
    piece_pick_p()            { return this.pick_place || this.pick_piece                                         }, // 駒を持ち上げているか？
    piece_pick_from_board_p() { return this.pick_place                                                              }, // 盤の駒を持ち上げているか？
    piece_pick_from_stand_p() { return this.pick_location                                                           }, // 駒台の駒を持ち上げているか？
    piece_pick_from_box_p()   { return this.pick_place == null && this.pick_piece && this.pick_location == null }, // 駒箱の駒を持ち上げているか？

    piece_pick_inspect() {
      return [
        this.piece_pick_from_board_p ? "盤" : "",
        this.piece_pick_from_stand_p ? "台" : "",
        this.piece_pick_from_box_p   ? "箱" : "",
      ].join("")
    },

    current_general_mark_pos_key() {
      if (this.piece_pick_from_board_p) {
        return this.pick_place.general_mark_pos_key
      } if (this.piece_pick_from_stand_p) {
        return this.pick_location.general_mark_pos_key(this.pick_piece)
      } else {
        // 持駒をもっていない or 駒箱の駒を持っている
      }
    },

    // 片方の手番だけを操作できるようにする sp_human_side の指定があってCPUの手番？
    cpu_location_p() {
      if (this.play_p) {
        return !_.includes(this.human_locations, this.xcontainer.current_location)
      }
    },

    // view のときは駒を動かせるようにしない
    break_if_view_mode() {
      if (this.view_p) {
        if (this.sp_view_mode_piece_movable) {
        } else {
          return true
        }
      }
    },
  },
}
