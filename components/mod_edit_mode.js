import _ from "lodash"

import { MoveInfo } from "./models/move_info.js"
import { Place } from "./models/place.js"
import { Board } from "./models/board.js"
import { Soldier } from "./models/soldier.js"
import { Location } from "./models/location.js"
import { LiftCancelActionInfo } from "./models/lift_cancel_action_info.js"

export const mod_edit_mode = {
  props: {
    sp_legal_move_only:           { type: Boolean, default: true, },       // play で合法手のみに絞る
    sp_piece_auto_promote:        { type: Boolean, default: true, },       // play で死に駒になるときは自動的に成る
    sp_my_piece_only_move:        { type: Boolean, default: true, },       // play では自分手番とき自分の駒しか動かせないようにする
    sp_my_piece_kill_disabled:    { type: Boolean, default: true, },       // play では自分の駒で同じ仲間の駒を取れないようにする
    sp_double_click_threshold_ms: { type: Number,  default: 350,  },       // edit で駒を反転するときのダブルクリックと認識する時間(ms)
    sp_view_mode_piece_movable:   { type: Boolean, default: true, },       // view でも駒を動かせる(ただし本筋は破壊しない)

    // 駒キャンセル方法
    sp_lift_cancel_action: {
      type: String,
      default: "standard",
      validator(value) { return LiftCancelActionInfo.keys.includes(value) },
    },
  },

  data() {
    return {
      // |------------------------+------------+------------+---------------------|
      // | どこの駒を持ち上げた？ | place_from | have_piece | have_piece_location |
      // |------------------------+------------+------------+---------------------|
      // | 盤上                   | ○         |            |                     |
      // | 駒台                   |            | ○         | ○                  |
      // | 駒箱                   |            | ○         |                     |
      // |------------------------+------------+------------+---------------------|
      place_from: null,           // 盤上ら動かそうとしているときの元位置
      have_piece: null,           // 駒台 or 駒箱から持った駒
      have_piece_location: null,  // 駒台から持ったときだけ先後が入っている。駒箱から取り出しているときは null
      have_piece_promoted: null,    // 持ったとき成った状態にするか？

      dialog_soldier: null,     // 成り確認ダイアログ表示中か？
      _last_clicked_cell: null,        // 最後にクリックした要素

      _double_tap_time: null,   // ダブルクリック判定用

      last_move_info: null, // 最後に動かした駒の情報
      killed_soldier: null, // 移動先にある相手の駒
    }
  },

  watch: {
    mut_mode() {
      this.state_reset() // モードが切り替わったときに持ち上げた駒を元に戻す(こうしないとカーソルから駒が離れない)
    },
  },

  methods: {
    // 盤を押した瞬間
    board_cell_pointerdown_handle(xy, e) {
      this.event_call("ev_action_board_cell_pointerdown", Place.fetch(xy), e)
    },

    // 盤をクリック
    board_cell_left_click(xy, e) {
      this.log("board_cell_left_click")
      this.log(`shiftKey: ${e.shiftKey}`)
      this.$data._last_clicked_cell = e.target
      this.illegal_init()

      const place = Place.fetch(xy)

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
        new_soldier = this.origin_soldier1.clone_with_attrs({place: place})
        // new_soldier = new Soldier({
        //   piece: this.origin_soldier1.piece,
        //   place: place,
        //   promoted: this.origin_soldier1.promoted,
        //   location: this.origin_soldier1.location,
        // })
        // 入って成る？ それとも出てなる？
        promotable_p = new_soldier.promotable_p || this.origin_soldier1.promotable_p
      }

      // -------------------------------------------------------------------------------- Validation

      if (this.cpu_location_p) {
        this.log("片方の手番だけを操作できるようにする sp_human_side の指定があってCPU側なので無効とする")
        this.event_call("ev_illegal_click_but_self_is_not_turn")
        return
      }

      if (this.sp_my_piece_only_move) {
        if (this.play_p) {
          if (!this.lifted_p) {
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

      if (this.play_p && this.have_piece && this.killed_soldier) {
        this.log("駒台や駒箱から持ち上げた駒を盤上の駒の上に置こうとしたので無効とする")
        this.if_standard_then_unhold() // ←元の位置に戻す場合
        return
      }

      if (this.sp_illegal_validate) {
        if (this.play_p && this.have_piece && !this.killed_soldier) {
          const new_soldier = this.soldier_create_from_stand_or_box_on(place)
          const force_promote_length = new_soldier.piece.piece_vector.force_promote_length // 死に駒になる上の隙間
          if (force_promote_length != null) {                                              // チェックしない場合は null
            if (new_soldier.top_spaces <= force_promote_length) {                          // 実際の上の隙間 <= 死に駒になる上の隙間
              this.log("駒台や駒箱から持ち上げた駒を置こうとしたけど死に駒なので無効とする")
              if (this.illegal_add("illegal_dead_soldier", {soldier: new_soldier}) === "__cancel__") { // 死に駒
                return
              }
            }
          }
        }
      }

      if (!this.lifted_p && !this.killed_soldier) {
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

            this.if_standard_then_unhold() // ←元の位置に戻す場合
            return
          }
        }
      }

      // ダブルタップで裏返すとシングルクリックの遅延がすさまじいことになるためダブルタップは使ってはいけない
      if (this.edit_p) {
        const old = this.$data._double_tap_time
        this.$data._double_tap_time = Date.now()
        if (this.killed_soldier) {
          if (_.isEqual(this.place_from, place)) { // この処理をスキップすると3連打で2回反転できるが誤操作が頻発するのでやめ
            if (old) {
              const gap = this.$data._double_tap_time - old
              const enable = gap < this.sp_double_click_threshold_ms
              this.log(`ダブルクリック判定: (${gap} ms < ${this.sp_double_click_threshold_ms}) -> ${enable}`)
              if (enable) {
                this.log(`操作モードで盤上の駒を持って同じ位置に戻したときに盤上の駒を裏返す`)
                this.xcontainer.board.place_on(this.killed_soldier.transform_clone)
                this.piece_hold_and_put_for_bug(place, e) // 不具合対策
                return
              }
            }
          }
        }
      }

      if (_.isEqual(this.place_from, place)) {
        this.log("盤上の駒を持って同じ位置に戻したので状況キャンセル")
        this.event_call("ev_action_piece_cancel")
        this.state_reset()
        return
      }

      // --------------------------------------------------------------------------------

      if (this.edit_p) {
        this.log(`lifted_from_p: ${this.lifted_p}`)
        if (this.meta_p(e)) {
          if (!this.lifted_p && this.killed_soldier) { // 持ってなくて、駒がある
            this.log("盤上の駒を裏返す")
            this.xcontainer.board.place_on(this.killed_soldier.transform_clone)
            this.piece_hold_and_put_for_bug(place, e) // 不具合対策
            return
          }
        }
      }

      // 盤上の駒を持ちあげる
      if (!this.lifted_p) {
        this.log("盤上の駒を持ちあげる")
        this.soldier_hold(place, e)
        return
      }

      // 盤上から移動させようとしたとき合法手以外は指せないようにする
      if (this.sp_legal_move_only && this.play_p && this.place_from) {
        let found = false

        // 1つだけ動ける系
        if (!found) {
          found = this.xcontainer.board.once_reach(this.origin_soldier1, place)
        }

        // 連続で動ける系
        if (!found) {
          if (this.xcontainer.board.repeat_reach(this.origin_soldier1, place, {mode: "non_stop"})) {
            this.log("障害物を素通りすれば目的地に行ける")
            if (this.sp_illegal_validate) {
              if (this.xcontainer.board.repeat_reach(this.origin_soldier1, place)) {
                this.log("障害物なく目的地に行ける")
              } else {
                this.log("障害物を飛び越えれば目的地に行ける")
                if (this.illegal_add("illegal_piece_warp", {soldier: this.origin_soldier1}) === "__cancel__") { // 駒ワープ
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
          this.if_standard_then_unhold() // ←元の位置に戻す場合
          return
        }

        if (this.sp_illegal_validate) {
          if (this.xcontainer.board.move_then_king_capture_p(this.origin_soldier1, place)) {
            if (this.illegal_add("illegal_death_king", {soldier: this.origin_soldier1, place: place}) === "__cancel__") { // 王手放置
              return
            }
          }
        }
      }

      // 盤上から移動
      if (this.place_from) {
        this.log("盤上から移動")
        if (this.killed_soldier) {
          this.xcontainer.hold_pieces_add(this.origin_soldier1.location, this.killed_soldier.piece) // 相手の駒があれば取る
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
            this.move_info_create({type: "move", from: this.origin_soldier1, to: new_soldier, killed_soldier: this.killed_soldier})
            this.moves_set()
          }
          this.xcontainer.board.place_on(new_soldier) // 置く
          this.xcontainer.board.delete_at(this.place_from)
          this.state_reset()
          this.turn_next()
        }

        return
      }

      // 持駒を置く
      if (this.have_piece) {
        this.log("持駒を置く")

        // 二歩判定
        if (this.sp_illegal_validate) {
          if (this.play_p) {
            if (this.have_piece.key === "P") {
              if (this.have_piece_location) {
                if (this.xcontainer.board.pawn_exist_by_x(place.x, this.have_piece_location)) {
                  if (this.illegal_add("illegal_two_pawn") === "__cancel__") { // 二歩
                    return
                  }
                }
              }
            }
          }
        }

        // 駒の上に置いた場合は取る
        if (this.killed_soldier) {
          if (this.have_piece_location) {
            // have_piece_location の駒台から移動した駒で取ったので have_piece_location の方に置く
            this.xcontainer.hold_pieces_add(this.have_piece_location, this.killed_soldier.piece)
          } else {
            // 駒箱から移動した駒で取ったので this.killed_soldier.location に返すとする場合
            if (false) {
              this.xcontainer.hold_pieces_add(this.killed_soldier.location, this.killed_soldier.piece)
            } else {
              // 駒の向きは先手と同じなのでわかりやすいように 先手に返す
              this.xcontainer.hold_pieces_add(Location.fetch("black"), this.killed_soldier.piece)
            }
          }
        }

        const new_soldier = this.soldier_create_from_stand_or_box_on(place)
        this.piece_decriment()
        this.xcontainer.board.place_on(new_soldier) // 置く
        this.move_info_create({type: "put", to: new_soldier})
        this.moves_set()
        this.state_reset()
        this.turn_next()
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
    //     if (!this.lifted_p) {
    //       if (soldier) {
    //         this.log("操作モードでダブルタップしたので裏返す")
    //         // this.xcontainer.board.place_on(soldier.transform_clone)
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
      new_soldier = new_soldier.clone_with_attrs({promoted: promoted})
      this.move_info_create({type: "promotable", from: this.origin_soldier1, to: new_soldier})
      this.moves_set() // 7g7f+
      this.xcontainer.board.place_on(new_soldier) // 置く
      this.xcontainer.board.delete_at(this.place_from)
      this.state_reset()
      this.turn_next()
    },

    // 最後に操作した駒の情報を作る
    move_info_create(attrs) {
      this.last_move_info = new MoveInfo({
        ...attrs,
        next_turn_offset: this.turn_offset + 1,           // この手を指した直後の手数。初手76歩なら1
        player_location: this.xcontainer.current_location,  // 指した人の色。駒の色ではない
        killed_soldier: this.killed_soldier,              // 取った駒 (無い場合もある)
        illegal_list: this.illegal_list,
      })
    },

    board_cell_right_click(xy, e) {
      this.log("盤のセルを右クリック")
      const place = Place.fetch(xy)

      if (place.tennozan_p) {
        if (e.shiftKey && e.altKey && e.metaKey) {
          this.dev_tools_open_handle()
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
        if (!this.lifted_p && soldier) {
          this.log("盤上の駒を裏返す")
          this.xcontainer.board.place_on(soldier.transform_clone)
          this.piece_hold_and_put_for_bug(place, e) // 不具合対策
        }
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
    //     if (!this.lifted_p && soldier) {
    //       this.log("盤上の駒を裏返す")
    //       this.xcontainer.board.place_on(soldier.transform_clone)
    //       this.piece_hold_and_put_for_bug(place, e) // 不具合対策
    //     }
    //   }
    // },

    // 駒台 or 駒台の駒をクリックしたときの共通処理
    membership_click_handle(location, e) {
      if (this.break_if_view_mode) {
        return
      }

      if (this.have_piece) {                         // 盤上からではない駒を持っているか？
        if (this.have_piece_location === location) { // 駒台からの駒か？
          this.log("自分の駒台から駒を持ち上げているならキャンセル")
          this.event_call("ev_action_piece_cancel")
          this.state_reset()
          return true
        }
      }

      // 相手の駒台から自分の駒台、または駒箱から自分の駒台へ移動
      if (this.edit_p) {
        // if (this.have_piece_location !== location && this.have_piece) {
        if (this.have_piece) {
          // 相手の持駒を自分の駒台に移動
          this.hold_pieces_move_to_my_hold_pieces(e, location)
          return true
        }
      }

      if (this.play_p) {
        if (this.origin_soldier1) {
          this.log("play では盤上の駒を駒台に置くことはできない")
          this.if_standard_then_unhold()
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

    // 駒台の駒をクリック
    piece_stand_piece_click(location, piece, have_piece_promoted, e) {
      this.log("駒台の駒をクリック")

      if (this.break_if_view_mode) {
        return
      }

      // if (this.membership_click_handle(location, e)) {
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
        this.event_call("ev_illegal_click_but_self_is_not_turn")
        return
      }

      // 駒を持った状態で駒台を触るといったん離すにすれば↓これらは必要ない
      //
      // if (this.have_piece && this.have_piece.key === piece.key) {
      //   if (this.have_piece_location === location) {
      //     this.log("駒台の駒を持った状態で同じ駒台の同じ駒を持ったのでキャンセルする")
      //     this.state_reset()
      //     return
      //   }
      // }
      //
      // if (this.have_piece && this.have_piece_location) {
      //   this.log("駒を持った状態で再び駒を持とうとしているため無効とする")
      //   return
      // }

      this.log("駒台の駒を持つ")
      this.have_piece = piece
      this.have_piece_location = location
      this.have_piece_promoted = have_piece_promoted
      this.lp_create(e, this.origin_soldier2)
    },

    // 駒箱の駒を持ち上げている？
    piece_box_have_p(piece) {
      return _.isNil(this.have_piece_location) && this.have_piece === piece
    },

    // FIXME: 駒を持っているときは「駒箱の駒」に対して一切反応しないようにしたい。そうすると駒箱だけの判定で済む
    piece_box_other_click(e) {
      this.log("piece_box_other_click:駒箱クリック")

      if (_.isNil(this.have_piece_location) && this.have_piece) {
        this.log("持っているならキャンセル")
        this.state_reset()
        return true
      }

      if (this.have_piece_location && this.have_piece) {
        this.log("駒台から駒箱に移動")
        const count = this.hold_piece_source_cut(e)               // 相手の持駒を減らして減らした分だけ
        this.xcontainer.piece_box_add(this.have_piece, count) // 駒箱に加算する
        this.state_reset()
        return true
      }

      if (this.origin_soldier1) {
        this.log("盤上の駒を駒箱に移動")
        this.xcontainer.piece_box_add(this.origin_soldier1.piece)
        this.xcontainer.board.delete_at(this.origin_soldier1.place)
        this.state_reset()
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
      this.have_piece = piece
      this.have_piece_location = null
      this.have_piece_promoted = false
      this.lp_create(e, this.origin_soldier2)
    },

    // 成り不成り選択ダイアログ表示中はキャンセルできない
    hold_cancel(e) {
      if (!this.dialog_soldier) {
        if (this.lifted_p) {
          this.log("持ち上げた駒を元に戻す")
          this.state_reset()
          return true
        }
      }

      return false
    },

    // 盤上の駒を駒台に置く
    board_soldir_to_hold_pieces(location) {
      this.xcontainer.hold_pieces_add(location, this.origin_soldier1.piece) // 駒台にプラス
      this.xcontainer.board.delete_at(this.origin_soldier1.place)
      this.state_reset()
    },

    hold_pieces_move_to_my_hold_pieces(e, location) {
      this.log("相手の持駒を自分の駒台に移動")
      const count = this.hold_piece_source_cut(e)                           // 相手の持駒を減らして減らした分だけ
      this.xcontainer.hold_pieces_add(location, this.have_piece, count) // 自分に加算する
      this.state_reset()
    },

    // 持ち上げている駒を元の場所から減らす
    hold_piece_source_cut(e) {
      let count = 1

      if (this.have_piece_location) {
        this.log("相手の駒箱から移動")
        if (this.meta_p(e)) {
          this.log("シフトが押されていたので全部移動")
          count = this.xcontainer.hold_pieces_count(this.have_piece_location, this.have_piece)
        }
        count = this.xcontainer.hold_pieces_can_be_reduced_count(this.have_piece_location, this.have_piece, count)
        this.xcontainer.hold_pieces_add(this.have_piece_location, this.have_piece, -count)
      } else {
        this.log("駒箱から移動")
        if (this.meta_p(e)) {
          this.log("シフトが押されていたので全部移動")
          count = this.xcontainer.piece_box_count(this.have_piece)
        }
        count = this.xcontainer.piece_box_can_be_reduced_count(this.have_piece, count) // 減らせる数を clamp する。そうしないと駒箱から移動するときに駒が増えいく
        this.xcontainer.piece_box_add(this.have_piece, -count)
      }

      // 実際に減らせれた数を返す(重要)
      return count
    },

    // 駒を1つ減らす
    piece_decriment() {
      if (this.have_piece_location) {
        this.xcontainer.hold_pieces_add(this.have_piece_location, this.have_piece, -1)
      } else {
        this.xcontainer.piece_box_add(this.have_piece, -1)
      }
    },

    // 自分の駒の上に重ねた？ (移動元にある駒を含まない)
    // つまり27の歩を持った状態で28の飛を持ったとき
    put_on_my_soldier_p(soldier) {
      if (this.lifted_p) {
        if (soldier) {
          if (soldier.location === this.xcontainer.current_location) {
            if (_.isEqual(this.place_from, soldier.place)) {
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
      this.place_from = place
      this.lp_create(e, this.origin_soldier1)
    },

    // 駒を持ってない状態にする
    state_reset() {
      this.log("state_reset")
      this.dialog_soldier = null
      this.place_from = null // 持ってない状態にする
      this.have_piece = null
      this.have_piece_location = null
      this.have_piece_promoted = null
      this.killed_soldier = null
      this.illegal_clear()
      this.lp_destroy()
    },

    // 持った状態で他の駒をタップするとキャンセルする場合はキャンセル
    if_standard_then_unhold() {
      if (this.lift_cancel_action_info.smooth_cancel) {
        this.log("持った状態で自分の非合法セルタップでキャンセル")
        this.event_call("ev_action_piece_cancel")
        this.state_reset()
      }
    },

    // 駒を持つ → そのまま置く
    // これは Vue がリアクティブにならない対策として入れているのでできれば外したい
    piece_hold_and_put_for_bug(place, e) {
      // this.soldier_hold(place, e)
      this.state_reset() // ←これは絶対にいる
      // emitされない不具合の暫定対策でちょうどここが共通処理になっているのでつっこんでおく
      // this.emit_update_edit_mode_short_sfen()
    },

    // -------------------------------------------------------------------------------- PieceBox

    // --------------------------------------------------------------------------------

    fn_flip_all() {
      // 盤面反転
      this.xcontainer.board = this.xcontainer.board.flip_all

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
      return new Soldier({
        piece: this.have_piece,
        place: place,
        promoted: this.have_piece_promoted || false,
        location: this.have_piece_location || Location.fetch("black"),
      })
    },

    meta_p(e) {
      return e.shiftKey | e.ctrlKey | e.altKey | e.metaKey
    },
  },

  computed: {
    LiftCancelActionInfo()    { return LiftCancelActionInfo                                   },
    lift_cancel_action_info() { return LiftCancelActionInfo.fetch(this.sp_lift_cancel_action) },

    // 移動元の駒(盤上から)
    origin_soldier1() {
      if (this.place_from) {
        return this.xcontainer.board.lookup(this.place_from)
      }
    },

    // 移動元の駒(駒台 or 駒箱から)
    // place に中途半端なインスタンスを設定してはいけない
    // null を設定することで盤上からではないことがわかる
    origin_soldier2() {
      if (this.have_piece) {
        // const place = Place.fetch([0, 0])
        const place = null
        return this.soldier_create_from_stand_or_box_on(place)
      }
    },

    // 盤上または駒台の駒を持ち上げたか？
    soldier_or_stand_p() {
      return this.place_from || this.have_piece_location
    },

    // 駒を持ち上げている状態？
    lifted_p() {
      return !_.isNil(this.place_from) || !_.isNil(this.have_piece)
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
