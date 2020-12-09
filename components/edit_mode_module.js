import _ from "lodash"

import Place from "./models/place"
import Board from "./models/board"
import PieceVector from "./models/piece_vector.js"
import Soldier from "./models/soldier"
import Location from "./models/location"

const PLAY_MODE_LEGAL_MOVE_ONLY = true // play-mode で合法手のみに絞る
const AUTO_PROMOTE              = true // 死に駒になるときは自動的に成る
const NOT_PUT_IF_DEATH_SOLDIER  = true // 死に駒になるときは置けないようにする
const DOUBLE_CLICK_TIME = 350

export default {
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

      // プレフィクスに_をつけるとVueに監視されない
      me_running_p: false,        // mousemove イベント緩和用
      $me_last_event: null,        // mousemove イベント

      $CursorObject: null,        // 持ちあげている駒のDOM
      mouse_stick: false,       // 持ち上げている駒をマウスに追随させるか？
      dialog_p: false,          // 成り確認ダイアログ表示中か？

      $double_tap_time: null,   // ダブルクリック判定用
    }
  },

  watch: {
    new_run_mode() {
      this.state_reset() // モードが切り替わったときに持ち上げた駒を元に戻す(こうしないとカーソルから駒が離れない)
    },
  },

  beforeDestroy() {
    this.virtual_piece_destroy()
  },

  methods: {
    // 盤を押した瞬間
    board_cell_pointerdown_handle(xy, e) {
      const place = Place.fetch(xy)
      const handle = this.board_cell_pointerdown_user_handle
      if (handle) {
        if (handle(place, e)) {
          return
        }
      }
    },

    // 盤をクリック
    board_cell_left_click(xy, e) {
      this.log("board_cell_left_click")
      this.log(`shiftKey: ${e.shiftKey}`)

      const place = Place.fetch(xy)

      const handle = this.board_cell_left_click_user_handle
      if (handle) {
        this.log(`ユーザー指定のクリックハンドル実行: ${place.human_digits}`)
        if (handle(place, e)) {
          return
        }
      }

      if (this.if_view_mode_break) {
        return
      }

      // 移動後の取れる駒
      const soldier = this.mediator.board.lookup(place)

      // 移動後の駒
      let new_soldier = null
      let promotable_p = null
      if (this.origin_soldier1) {
        new_soldier = new Soldier({
          piece: this.origin_soldier1.piece,
          place: place,
          promoted: this.origin_soldier1.promoted,
          location: this.origin_soldier1.location,
        })
        // 入って成る？ それとも出てなる？
        promotable_p = new_soldier.promotable_p || this.origin_soldier1.promotable_p
      }

      // -------------------------------------------------------------------------------- Validation

      if (this.cpu_location_p) {
        this.log("片方の手番だけを操作できるようにする human_side_key の指定があってCPU側なので無効とする")
        return
      }

      if (this.play_p && !this.holding_p && soldier && soldier.location !== this.mediator.current_location) {
        this.log("自分の手番で相手の駒を持ち上げようとしたので無効とする")
        return
      }

      if (this.play_p && this.have_piece && soldier) {
        this.log("駒台や駒箱から持ち上げた駒を盤上の駒の上に置こうとしたので無効とする")
        return
      }

      if (NOT_PUT_IF_DEATH_SOLDIER && this.play_p && this.have_piece && !soldier) {
        const new_soldier = this.soldier_create_from_stand_or_box_on(place)
        const force_promote_length = new_soldier.piece.piece_vector.force_promote_length // 死に駒になる上の隙間
        if (force_promote_length != null) {                                              // チェックしない場合は null
          if (new_soldier.top_spaces <= force_promote_length) {                          // 実際の上の隙間 <= 死に駒になる上の隙間
            this.log("駒台や駒箱から持ち上げた駒を置こうとしたけど死に駒なので無効とする")
            return
          }
        }
      }

      if (!this.holding_p && !soldier) {
        this.log("持たずに何もないところをクリックしたので無効とする")
        return
      }

      if (this.play_p && this.put_on_my_soldier_p(soldier)) {
        this.log("自分の駒の上に駒を重ねようとしたので無効とする(盤上の移動元の駒を含まない)")
        // this.state_reset() // ←元の位置に戻す場合
        return
      }

      // ダブルタップで裏返すとシングルクリックの遅延がすさまじいことになるためダブルタップは使ってはいけない
      if (this.edit_p) {
        const old = this.$double_tap_time
        this.$double_tap_time = Date.now()
        if (soldier) {
          if (_.isEqual(this.place_from, place)) { // この処理をスキップすると3連打で2回反転できるが誤操作が頻発するのでやめ
            if (old) {
              const gap = this.$double_tap_time - old
              const enable = gap < DOUBLE_CLICK_TIME
              this.log(`ダブルクリック判定: (${gap} ms < ${DOUBLE_CLICK_TIME}) -> ${enable}`)
              if (enable) {
                this.log(`操作モードで盤上の駒を持って同じ位置に戻したときに盤上の駒を裏返す`)
                this.mediator.board.place_on(soldier.piece_transform)
                this.piece_hold_and_put_for_bug(place, e) // 不具合対策
                return
              }
            }
          }
        }
      }

      if (_.isEqual(this.place_from, place)) {
        this.log("盤上の駒を持って同じ位置に戻したので状況キャンセル")
        this.state_reset()
        return
      }

      // --------------------------------------------------------------------------------

      if (this.edit_p) {
        this.log(`holding_p: ${this.holding_p}`)
        if (this.meta_p(e)) {
          if (!this.holding_p && soldier) { // 持ってなくて、駒がある
            this.log("盤上の駒を裏返す")
            this.mediator.board.place_on(soldier.piece_transform)
            this.piece_hold_and_put_for_bug(place, e) // 不具合対策
            return
          }
        }
      }

      // 盤上の駒を持ちあげる
      if (!this.holding_p) {
        this.log("盤上の駒を持ちあげる")
        this.soldier_hold(place, e)
        return
      }

      // 盤上から移動させようとしたとき合法手以外は指せないようにする
      if (PLAY_MODE_LEGAL_MOVE_ONLY && this.play_p && this.place_from) {
        const piece_vector = PieceVector.fetch(this.origin_soldier1.piece.key)
        const ox = this.place_from.x
        const oy = this.place_from.y

        let method_key = null
        let found = false

        // 1つだけ動ける系
        if (!found) {
          if (this.origin_soldier1.promoted) {
            method_key = piece_vector.promoted_once_vectors
          } else {
            method_key = piece_vector.basic_once_vectors
          }
          const vectors = PieceVector[method_key]
          if (vectors) {
            found = vectors.some(e => {
              if (e) {
                const vx = e[0]
                const vy = e[1] * this.origin_soldier1.location.value_sign
                const x = ox + vx
                const y = oy + vy
                return x === place.x && y === place.y
              }
            })
          }
        }

        //
        if (!found) {
          if (this.origin_soldier1.promoted) {
            method_key = piece_vector.promoted_repeat_vectors
          } else {
            method_key = piece_vector.basic_repeat_vectors
          }
          const vectors = PieceVector[method_key]
          if (vectors) {
            found = vectors.some(e => {
              if (e) {
                const vx = e[0]
                const vy = e[1] * this.origin_soldier1.location.value_sign

                let x = ox + vx
                let y = oy + vy

                while (true) {
                  if (!Place.xy_valid_p(x, y)) {
                    break
                  }
                  if (x === place.x && y === place.y) {
                    return true
                  }
                  const next_place = Place.fetch([x, y])
                  const next_soldier = this.mediator.board.lookup(next_place)
                  if (next_soldier) {
                    break
                  }
                  x += vx
                  y += vy
                }
              }
            })
          }
        }

        if (!found) {
          return
        }
      }

      // 盤上から移動
      if (this.place_from) {
        this.log("盤上から移動")
        if (soldier) {
          this.mediator.hold_pieces_add(this.origin_soldier1.location, soldier.piece) // 相手の駒があれば取る
          // this.$forceUpdate()
        }

        if (this.play_p && promotable_p) { // 入って成る or 出て成る

          let must_dialog = true
          if (AUTO_PROMOTE) {
            const force_promote_length = new_soldier.piece.piece_vector.force_promote_length // 死に駒になる上の隙間
            if (force_promote_length != null) {                                              // チェックしない場合は null
              if (new_soldier.top_spaces <= force_promote_length) {                          // 実際の上の隙間 <= 死に駒になる上の隙間
                this.promotable_piece_moved(new_soldier, true)                               // 死に駒になるなら自動的に成る
                must_dialog = false                                                          // ダイアログを表示する必要はなくなった
              }
            }
          }

          if (must_dialog) {
            this.mouse_stick = false // ダイアログ選択時時は動かしている駒を止める
            this.dialog_p = true
            this.$buefy.dialog.confirm({
              message: '成りますか？',
              confirmText: '成る',
              cancelText: '成らない',
              onConfirm: () => { this.promotable_piece_moved(new_soldier, true)  },
              onCancel:  () => { this.promotable_piece_moved(new_soldier, false) },
            })
          }
        } else {
          if (this.play_p) {
            this.moves_set(this.origin_soldier1.place.to_sfen + place.to_sfen) // 7g7f
          }
          this.mediator.board.place_on(new_soldier) // 置く
          this.mediator.board.delete_at(this.place_from)
          this.state_reset()
          this.turn_next()
        }

        return
      }

      // 持駒を置く
      if (this.have_piece) {
        this.log("持駒を置く")

        // 駒の上に置いた場合は取る
        if (soldier) {
          if (this.have_piece_location) {
            // have_piece_location の駒台から移動した駒で取ったので have_piece_location の方に置く
            this.mediator.hold_pieces_add(this.have_piece_location, soldier.piece)
          } else {
            // 駒箱から移動した駒で取ったので soldier.location に返すとする場合
            if (false) {
              this.mediator.hold_pieces_add(soldier.location, soldier.piece)
            } else {
              // 駒の向きは先手と同じなのでわかりやすいように 先手に返す
              this.mediator.hold_pieces_add(Location.fetch("black"), soldier.piece)
            }
          }
        }

        const new_soldier = this.soldier_create_from_stand_or_box_on(place)
        this.piece_decriment()
        this.mediator.board.place_on(new_soldier) // 置く
        this.moves_set(new_soldier.piece.key + "*" + place.to_sfen) // P*7g
        this.state_reset()
        this.turn_next()
        return
      }

      throw new Error("must not happen")
    },

    // board_cell_left_dblclick(xy, e) {
    //   if (this.if_view_mode_break) {
    //     return
    //   }
    //
    //   const place = Place.fetch(xy)
    //   const soldier = this.mediator.board.lookup(place)
    //
    //   if (this.edit_p) {
    //     if (!this.holding_p) {
    //       if (soldier) {
    //         this.log("操作モードでダブルタップしたので裏返す")
    //         // this.mediator.board.place_on(soldier.piece_transform)
    //         // this.piece_hold_and_put_for_bug(place, e) // 不具合対策
    //         return
    //       }
    //     }
    //   }
    //
    //   return "eslint対策のreturn"
    // },

    // 成れる状態の駒をどうするか
    promotable_piece_moved(new_soldier, promoted) {
      this.dialog_p = false

      this.$set(new_soldier, "promoted", promoted)

      this.moves_set(this.origin_soldier1.place.to_sfen + new_soldier.place.to_sfen + (new_soldier.promoted ? "+" : "")) // 7g7f+
      this.mediator.board.place_on(new_soldier) // 置く
      this.mediator.board.delete_at(this.place_from)
      this.state_reset()
      this.turn_next()
    },

    board_cell_right_click(xy, e) {
      this.log("盤のセルを右クリック")

      if (this.if_view_mode_break) {
        return
      }

      const place = Place.fetch(xy)
      const soldier = this.mediator.board.lookup(place)

      if (this.hold_cancel(e)) {
        return
      }

      if (this.edit_p) {
        if (!this.holding_p && soldier) {
          this.log("盤上の駒を裏返す")
          this.mediator.board.place_on(soldier.piece_transform)
          this.piece_hold_and_put_for_bug(place, e) // 不具合対策
        }
      }
    },

    // board_cell_right_click2(xy, e) {
    //   this.log("盤のセルを右クリック")
    //
    //   if (this.if_view_mode_break) {
    //     return
    //   }
    //
    //   const place = Place.fetch(xy)
    //   const soldier = this.mediator.board.lookup(place)
    //
    //   if (this.hold_cancel(e)) {
    //     return
    //   }
    //
    //   if (this.edit_p) {
    //     if (!this.holding_p && soldier) {
    //       this.log("盤上の駒を裏返す")
    //       this.mediator.board.place_on(soldier.piece_transform)
    //       this.piece_hold_and_put_for_bug(place, e) // 不具合対策
    //     }
    //   }
    // },

    // 駒台 or 駒台の駒をクリックしたときの共通処理
    piece_stand_click_shared(location, e) {
      if (this.have_piece_location === location && this.have_piece) {
        this.log("自分の駒台から駒を持ち上げているならキャンセル")
        this.state_reset()
        return true
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
          this.log("play_mode では盤上の駒を駒台に置くことはできない")
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

    // 駒台クリック
    piece_stand_click(location, e) {
      this.piece_stand_click_shared(location, e)
    },

    // 駒台の駒をクリック
    piece_stand_piece_click(location, piece, have_piece_promoted, e) {
      this.log("駒台の駒をクリック")

      if (this.piece_stand_click_shared(location, e)) {
        return
      }

      // クリックしたけど持駒がない
      if (this.mediator.hold_pieces_count(location, piece) <= 0) {
        this.log("クリックしたけど持駒がない")
        return
      }

      // 相手の持駒を持とうとしたときは無効
      if (this.play_p && location !== this.mediator.current_location) {
        this.log("相手の持駒を持とうとしたときは無効")
        return
      }

      if (this.cpu_location_p) {
        this.log("片方の手番だけを操作できるようにする human_side_key の指定があってCPU側なので無効とする")
        return
      }

      this.log("駒台の駒を持つ")
      this.have_piece = piece
      this.have_piece_location = location
      this.have_piece_promoted = have_piece_promoted
      this.virtual_piece_create(e, this.origin_soldier2)
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
        this.mediator.piece_box_add(this.have_piece, count) // 駒箱に加算する
        this.state_reset()
        return true
      }

      if (this.origin_soldier1) {
        this.log("盤上の駒を駒箱に移動")
        this.mediator.piece_box_add(this.origin_soldier1.piece)
        this.mediator.board.delete_at(this.origin_soldier1.place)
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
      this.virtual_piece_create(e, this.origin_soldier2)
    },

    // FIXME: click_hook のところだけで行いたい
    // 成り選択ダイアログ表示中に Escape でこれが呼ばれるので dialog_p のときは実行しない
    hold_cancel(e) {
      if (!this.dialog_p) {
        if (this.holding_p) {
          this.log("持ち上げた駒を元に戻す")
          this.state_reset()
          return true
        }
      }

      return false
    },

    // 盤上の駒を駒台に置く
    board_soldir_to_hold_pieces(location) {
      this.mediator.hold_pieces_add(location, this.origin_soldier1.piece) // 駒台にプラス
      this.mediator.board.delete_at(this.origin_soldier1.place)
      this.state_reset()
    },

    hold_pieces_move_to_my_hold_pieces(e, location) {
      this.log("相手の持駒を自分の駒台に移動")
      const count = this.hold_piece_source_cut(e)                           // 相手の持駒を減らして減らした分だけ
      this.mediator.hold_pieces_add(location, this.have_piece, count) // 自分に加算する
      this.state_reset()
    },

    // 持ち上げている駒を元の場所から減らす
    hold_piece_source_cut(e) {
      let count = 1

      if (this.have_piece_location) {
        this.log("相手の駒箱から移動")
        if (this.meta_p(e)) {
          this.log("シフトが押されていたので全部移動")
          count = this.mediator.hold_pieces_count(this.have_piece_location, this.have_piece)
        }
        count = this.mediator.hold_pieces_can_be_reduced_count(this.have_piece_location, this.have_piece, count)
        this.mediator.hold_pieces_add(this.have_piece_location, this.have_piece, -count)
      } else {
        this.log("駒箱から移動")
        if (this.meta_p(e)) {
          this.log("シフトが押されていたので全部移動")
          count = this.mediator.piece_box_count(this.have_piece)
        }
        count = this.mediator.piece_box_can_be_reduced_count(this.have_piece, count) // 減らせる数を clamp する。そうしないと駒箱から移動するときに駒が増えいく
        this.mediator.piece_box_add(this.have_piece, -count)
      }

      // 実際に減らせれた数を返す(重要)
      return count
    },

    // 駒を1つ減らす
    piece_decriment() {
      if (this.have_piece_location) {
        this.mediator.hold_pieces_add(this.have_piece_location, this.have_piece, -1)
      } else {
        this.mediator.piece_box_add(this.have_piece, -1)
      }
    },

    // 自分の駒の上に重ねた？ (移動元にある駒を含まない)
    put_on_my_soldier_p(soldier) {
      if (this.holding_p) {
        if (soldier && soldier.location === this.mediator.current_location) {
          if (_.isEqual(this.place_from, soldier.place)) {
          } else {
            return true
          }
        }
      }
    },

    // 盤面の駒を持ち上げる
    soldier_hold(place, e) {
      this.place_from = place
      this.virtual_piece_create(e, this.origin_soldier1)
    },

    // 駒を持ってない状態にする
    state_reset() {
      if (this.dialog_p) {
        alert("ダイアログ表示中に state_reset が呼ばれてはいけない")
      }
      this.log("state_reset")
      this.place_from = null // 持ってない状態にする
      this.have_piece = null
      this.have_piece_location = null
      this.have_piece_promoted = null
      this.virtual_piece_destroy()
    },

    // 駒を持つ → そのまま置く
    // これは Vue がリアクティブにならない対策として入れているのでできれば外したい
    piece_hold_and_put_for_bug(place, e) {
      // this.soldier_hold(place, e)
      this.state_reset() // ←これは絶対にいる
      // emitされない不具合の暫定対策でちょうどここが共通処理になっているのでつっこんでおく
      // this.emit_update_edit_mode_snapshot_sfen()
    },

    // -------------------------------------------------------------------------------- PieceBox

    // 駒箱の駒
    piece_box_piece_control_class(piece) {
      let list = []
      if (this.piece_box_have_p(piece)) {
        list.push("holding_p")
      } else if (this.edit_p) {
        if (!this.holding_p) {
          list.push("selectable_p")
        }
      }

      // list = _.concat(list, piece.css_class_list)
      // list.push("location_black")
      // list.push("promoted_false")

      return list
    },

    // 駒箱の駒のテクスチャ
    piece_box_piece_texture_class(piece) {
      let list = []
      list = _.concat(list, piece.css_class_list)
      list.push("location_black")
      list.push("promoted_false")
      return list
    },

    // --------------------------------------------------------------------------------

    fn_flip_all() {
      // 盤面反転
      this.mediator.board = this.mediator.board.flip_all

      // 持駒反転
      this.mediator.hold_pieces = _.reduce(Location.values, (a, e) => {
        a[e.key] = this.mediator.hold_pieces[e.flip.key]
        return a
      }, {})
    },

    fn_flip_h() {
      // 盤面左右反転
      this.mediator.board = this.mediator.board.flip_h
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

    mousemove_hook(e) {
      this.$me_last_event = e

      // 連続で呼ばれるイベント処理を緩和する方法
      // https://qiita.com/noplan1989/items/9333faad731f5ecaaccd
      // ※試してみているけどあまり効果がない
      if (true) {
        // 呼び出されるまで何もしない
        if (!this.me_running_p) {
          this.me_running_p = true

          // 描画する前のタイミングで呼び出してもらう
          window.requestAnimationFrame(() => {
            this.cursor_object_xy_update()

            this.me_running_p = false
          })
        }
      } else {
        this.cursor_object_xy_update()
      }
    },

    // 右クリックならキャンセル(動いてないっぽい)
    click_hook(e) {
      if (e.which !== 1) {
        this.state_reset()
      }
    },

    cursor_object_xy_update() {
      if (this.$CursorObject && this.$me_last_event && this.mouse_stick) {
        const x = this.$me_last_event.clientX
        const y = this.$me_last_event.clientY
        this.$CursorObject.style.left = `${x}px`
        this.$CursorObject.style.top  = `${y}px`
      }
    },

    // マウス位置に表示する駒の生成
    virtual_piece_create(event, soldier) {
      this.virtual_piece_destroy()
      this.virtual_piece_dom_create(soldier)

      this.mouse_stick = true   // マウスに追随する

      // キーボードイベントの場合は null が来るようにしている
      // マウスを動かしてはじめて座標が取れるのでキーボードの場合はすぐに駒は表示されない
      if (event) {
        this.$me_last_event = event
        this.cursor_object_xy_update()
      }

      window.addEventListener("mousemove", this.mousemove_hook, false)
      window.addEventListener("click", this.click_hook, false)
    },

    // 構造
    //
    // .CursorObject                        // マウスの (x, y) を反映
    //   .PieceObject.CursorObjectFlip     // 反転するときはここ
    //     .PieceTexture
    //       .PieceTextureSelf(駒の種類を定義するクラスたち)
    //
    virtual_piece_dom_create(soldier) {
      this.$CursorObject    = this.el_create(["CursorObject"])
      const PieceObject      = this.el_create(["PieceObject"])
      const PieceTexture     = this.el_create(["PieceTexture"])
      const PieceTextureSelf = this.el_create(["PieceTextureSelf", ...soldier.to_class_list])

      // 反転しているとき(盤上 or 駒台)の駒は持ったときに逆になっているので逆にする
      if (this.new_flip) {
        if (this.soldier_or_stand_p) {
          PieceObject.classList.add("CursorObjectFlip") // 盤面を反転している場合は駒も反転する
        }
      }

      PieceTexture.appendChild(PieceTextureSelf)
      PieceObject.appendChild(PieceTexture)
      this.$CursorObject.appendChild(PieceObject)

      // マウスイベントが発生するまでは画面内に表示されてしまうので画面外に出す
      this.$CursorObject.style.left = "-50%"
      this.$CursorObject.style.top  = "-50%"

      this.$refs.ShogiPlayerGround.$el.appendChild(this.$CursorObject)
    },

    el_create(classes) {
      const e = document.createElement("div")
      e.classList.add(...classes)
      return e
    },

    virtual_piece_destroy() {
      if (this.$CursorObject) {
        this.$refs.ShogiPlayerGround.$el.removeChild(this.$CursorObject)

        this.$CursorObject = null
        this.mouse_stick = false

        window.removeEventListener("mousemove", this.mousemove_hook, false)
        window.removeEventListener("click", this.click_hook, false)
      }
    },

    meta_p(e) {
      return e.shiftKey | e.ctrlKey | e.altKey | e.metaKey
    },
  },

  computed: {
    // 移動元の駒(盤上から)
    origin_soldier1() {
      if (this.place_from) {
        return this.mediator.board.lookup(this.place_from)
      }
    },

    // 移動元の駒(駒台 or 駒箱から)
    origin_soldier2() {
      if (this.have_piece) {
        const place = Place.fetch([0, 0])
        return this.soldier_create_from_stand_or_box_on(place)
      }
    },

    // 盤上または駒台の駒を持ち上げたか？
    soldier_or_stand_p() {
      return this.place_from || this.have_piece_location
    },

    // 駒を持ち上げている状態？
    holding_p() {
      return !_.isNil(this.place_from) || !_.isNil(this.have_piece)
    },

    // 片方の手番だけを操作できるようにする human_side_key の指定があってCPUの手番？
    cpu_location_p() {
      if (this.play_p) {
        return !_.includes(this.human_locations, this.mediator.current_location)
      }
    },

    if_view_mode_break() {
      // return this.view_p
    },

  },
}
