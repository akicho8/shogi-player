import _ from "lodash"

import { Place } from "../place"
import { Soldier } from "../soldier"
import { Location } from "../location"

export default {
  /* eslint-disable */
  props: {
  },
  /* eslint-enable */

  data() {
    return {
      // |------------------------+------------+------------+---------------------|
      // | どこの駒を持ち上げた？ | place_from | have_piece | have_piece_location |
      // |------------------------+------------+------------+---------------------|
      // | 盤上                   | ○         |            | ○                  |
      // | 駒台                   |            | ○         | ○                  |
      // | 駒箱                   |            | ○         |                     |
      // |------------------------+------------+------------+---------------------|
      place_from: null,           // 盤上ら動かそうとしているときの元位置
      have_piece: null,           // 駒台 or 駒箱から持った駒
      have_piece_location: null,  // 駒台から持ったときだけ先後が入っている。駒箱から取り出しているときは null
    }
  },

  created() {
  },

  mounted() {
  },

  watch: {
  },

  methods: {
    // 盤をクリック
    board_click(xy, e) {
      this.log("board_click")
      this.log(`shiftKey: ${e.shiftKey}`)

      const place = Place.fetch(xy)
      const soldier = this.mediator.board.lookup(place)

      // -------------------------------------------------------------------------------- Validation

      if (this.cpu_location_p) {
        this.log("片方の手番だけを操作できるようにする human_side_key の指定があってCPU側なので無効とする")
        return
      }

      // 自分の手番で相手の駒を持ち上げようとしたので無効とする
      if (this.current_run_mode === "play_mode" && !this.holding_p && soldier && soldier.location !== this.mediator.current_location) {
        this.log("自分の手番で相手の駒を持ち上げようとしたので無効とする")
        return
      }

      // 持たずに何もないところをクリックしたので無効とする
      if (!this.holding_p && !soldier) {
        this.log("持たずに何もないところをクリックしたので無効とする")
        return
      }

      // 自分の駒の上に駒を重ねようとしたので状況キャンセル
      if (this.current_run_mode === "play_mode" && this.put_on_my_piece_p(soldier)) {
        this.log("自分の駒の上に駒を重ねようとしたので状況キャンセル")
        this.state_reset()
        return
      }

      // 盤上の駒を持って同じ位置に戻したので状況キャンセル
      if (_.isEqual(this.place_from, place)) {
        this.log("盤上の駒を持って同じ位置に戻したので状況キャンセル")
        this.state_reset()
        return
      }

      // --------------------------------------------------------------------------------

      const shift_key = e.shiftKey | e.ctrlKey | e.altKey | e.metaKey
      this.log(`holding_p: ${this.holding_p}`)
      if (!this.holding_p && soldier && shift_key) {
        this.log("盤上の駒を裏返す")
        this.mediator.board.place_on(soldier.piece_transform)
        return
      }

      // 盤上の駒を持ちあげる
      if (!this.holding_p) {
        this.log("盤上の駒を持ちあげる")
        this.soldier_hold(place, e)
        return
      }

      // 盤上から移動
      if (this.place_from) {
        this.log("盤上から移動")
        if (soldier) {
          this.mediator.hold_pieces_add(this.origin_soldier1.location, soldier.piece) // 相手の駒があれば取る
          // this.$forceUpdate()
        }

        const new_soldier = new Soldier({
          piece: this.origin_soldier1.piece,
          place: place,
          promoted: this.origin_soldier1.promoted,
          location: this.origin_soldier1.location,
        })

        if (this.current_run_mode === "play_mode" && (new_soldier.promotable_p || this.origin_soldier1.promotable_p)) { // 入って成る or 出て成る
          this.mouse_stick = false // ダイアログ選択時時は動かしている駒を止める

          // 元が成ってないとき
          this.$dialog.confirm({
            message: '成りますか？',
            confirmText: '成',
            cancelText: '不成',
            onConfirm: () => {
              new_soldier.promoted = true
            },
            // 最後に必ず呼ばれる
            onCancel: () => {
              this.moves_set(this.origin_soldier1.place.to_sfen + place.to_sfen + (new_soldier.promoted ? "+" : "")) // 7g7f+
              this.mediator.board.place_on(new_soldier) // 置く
              this.mediator.board.delete_at(this.place_from)
              this.state_reset()
              this.turn_next()
            },
          })
        } else {
          if (this.current_run_mode === "play_mode") {
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
        const soldier = this.origin_soldier2_create(place)
        this.piece_decriment()
        this.mediator.board.place_on(soldier) // 置く
        this.moves_set(soldier.piece.key + "*" + place.to_sfen) // P*7g
        this.state_reset()
        this.turn_next()
        return
      }

      throw new Error("must not happen")
    },

    board_click_right(xy, e) {
      this.log("盤を右クリック")

      const place = Place.fetch(xy)
      const soldier = this.mediator.board.lookup(place)

      if (this.hold_cancel(e)) {
        return
      }

      if (!this.holding_p && soldier) {
        this.log("盤上の駒を裏返す")
        this.mediator.board.place_on(soldier.piece_transform)
      }
    },

    // 駒台 or 駒台の駒をクリックしたときの共通処理
    piece_stand_click_shared(location, e) {
      if (this.have_piece_location === location && this.have_piece) {
        this.log("自分の駒台から駒を持ち上げているならキャンセル")
        this.state_reset()
        return true
      }

      // 相手の持駒を自分の駒台に移動
      if (this.current_run_mode === "edit_mode") {
        if (this.have_piece_location !== location && this.have_piece) {
          this.opponent_hold_pieces_move_to_my_hold_pieces(location)
          return true
        }
      }

      if (this.current_run_mode === "play_mode") {
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
    piece_stand_piece_click(location, piece, e) {
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
      if (this.current_run_mode === "play_mode" && location !== this.mediator.current_location) {
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
      this.virtual_piece_create(e, this.origin_soldier2.to_class_list)
    },

    // 駒箱の駒を持ち上げている？
    piece_box_have_p(piece) {
      return _.isNil(this.have_piece_location) && this.have_piece === piece
    },

    // FIXME: 駒を持っているときは「駒箱の駒」に対して一切反応しないようにしたい。そうすると駒箱だけの判定で済む
    piece_box_other_click(e) {
      this.log("駒箱クリック")

      if (_.isNil(this.have_piece_location) && this.have_piece) {
        this.log("持っているならキャンセル")
        this.state_reset()
        return true
      }

      if (this.have_piece_location && this.have_piece) {
        this.log("駒台から駒箱に移動")
        this.mediator.piece_box_add(this.have_piece)
        this.mediator.hold_pieces_add(this.have_piece_location, this.have_piece, -1)
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

    piece_box_piece_click(piece, e) {
      // 駒をクリックしたとき駒箱をクリックするのと同じ処理を実行
      if (this.piece_box_other_click(e)) {
        return
      }

      this.log("駒台の駒を持つ")
      this.have_piece = piece
      this.have_piece_location = null
      this.virtual_piece_create(e, this.origin_soldier2.to_class_list)
    },

    // FIXME: click_hook のところだけで行いたい
    hold_cancel(e) {
      if (this.holding_p) {
        this.log("持ち上げた駒を元に戻す")
        this.state_reset()
        return true
      }
      return false
    },

    // 盤上の駒を駒台に置く
    board_soldir_to_hold_pieces(location) {
      this.mediator.hold_pieces_add(location, this.origin_soldier1.piece) // 駒台にプラス
      this.mediator.board.delete_at(this.origin_soldier1.place)
      this.state_reset()
    },

    opponent_hold_pieces_move_to_my_hold_pieces(location) {
      this.log("相手の持駒を自分の駒台に移動")
      this.piece_decriment()
      this.mediator.hold_pieces_add(location, this.have_piece)
      this.state_reset()
    },

    // 駒を減らす
    piece_decriment() {
      if (this.have_piece_location) {
        this.mediator.hold_pieces_add(this.have_piece_location, this.have_piece, -1)
      } else {
        this.mediator.piece_box_add(this.have_piece, -1)
      }
    },

    // 自分の駒の上に重ねた？
    put_on_my_piece_p(soldier) {
      return this.holding_p && soldier && soldier.location === this.mediator.current_location
    },

    // 盤面の駒を持ち上げる
    soldier_hold(place, e) {
      this.place_from = place
      this.virtual_piece_create(e, this.origin_soldier1.to_class_list)
    },

    state_reset() {
      this.log("state_reset")
      this.place_from = null // 持ってない状態にする
      this.have_piece = null
      this.have_piece_location = null
      this.virtual_piece_destroy()
    },

    // -------------------------------------------------------------------------------- piece_box

    // 駒箱の駒の四角
    piece_box_piece_outer_class(piece) {
      let list = []
      if (this.piece_box_have_p(piece)) {
        list.push("holding_p")
      } else if (this.current_run_mode === "edit_mode") {
        list.push("selectable_p")
      }
      return list
    },

    // 駒箱の駒のテクスチャ
    piece_box_piece_inner_class(piece) {
      let list = []
      list = _.concat(list, piece.css_class_list)
      list.push("location_black")
      list.push("promoted_false")
      return list
    },

    // --------------------------------------------------------------------------------

    all_flip() {
      // 盤面反転
      this.mediator.board = this.mediator.board.flip

      // 持駒反転
      this.mediator.hold_pieces = _.reduce(Location.values, (a, e) => {
        a[e.key] = this.mediator.hold_pieces[e.flip.key]
        return a
      }, {})
    },

    init_location_toggle() {
      this.init_location_key = this.init_location.flip.key
    },

    // 駒箱や駒台から持ち上げている駒
    origin_soldier2_create(place) {
      return new Soldier({
        piece: this.have_piece,
        place: place,
        promoted: false,
        location: this.have_piece_location || Location.fetch("black"),
      })
    },

    mousemove_hook(e) {
      this.last_event = e
      this.cursor_elem_set_pos()
    },

    // 右クリックならキャンセル(動いてないっぽい)
    click_hook(e) {
      if (e.which !== 1) {
        this.state_reset()
      }
    },

    cursor_elem_set_pos() {
      if (this.cursor_elem && this.last_event && this.mouse_stick) {
        this.cursor_elem.style.left = `${this.last_event.clientX}px`
        this.cursor_elem.style.top = `${this.last_event.clientY}px`
      }
    },

    // マウス位置に表示する駒の生成
    //
    //   .piece_outer.cursor_elem
    //     .piece_inner.virtual_piece_flip
    //
    virtual_piece_create(event, class_list) {
      this.virtual_piece_destroy()

      this.cursor_elem = document.createElement("div")
      this.cursor_elem.classList.add("piece_outer", "cursor_elem")
      const piece_inner = document.createElement("div")
      const list = _.concat(class_list, ["piece_inner"])
      piece_inner.classList.add(...list)
      if (this.current_flip) {
        piece_inner.classList.add("virtual_piece_flip") // 盤面を反転している場合は駒も反転する
      }
      this.cursor_elem.appendChild(piece_inner)
      this.$el.appendChild(this.cursor_elem)

      this.mouse_stick = true   // マウスに追随する

      this.last_event = event
      this.log(this.last_event)
      this.cursor_elem_set_pos()

      window.addEventListener("mousemove", this.mousemove_hook, false)
      window.addEventListener("click", this.click_hook, false)
    },

    virtual_piece_destroy() {
      if (this.cursor_elem) {
        this.$el.removeChild(this.cursor_elem)
        this.cursor_elem = null
        this.mouse_stick = false

        window.removeEventListener("mousemove", this.mousemove_hook)
        window.removeEventListener("click", this.click_hook)
      }
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
        return this.origin_soldier2_create(place)
      }
    },

    // 駒を持ち上げている状態？
    holding_p() {
      return !_.isNil(this.place_from) || !_.isNil(this.have_piece)
    },

    // 片方の手番だけを操作できるようにする human_side_key の指定があってCPUの手番？
    cpu_location_p() {
      if (this.current_run_mode === "play_mode") {
        return !_.includes(this.human_locations, this.mediator.current_location)
      }
    }
  },
}
