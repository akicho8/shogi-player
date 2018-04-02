import _ from "lodash"

import { Place } from "../place"
import { Piece } from "../piece"
import { Soldier } from "../soldier"
import { SfenParser } from "../sfen_parser"
import { Mediator } from "../mediator"
import { PresetInfo } from "../preset_info"
import { Location } from "../location"

export default {
  /* eslint-disable */
  props: {
  },
  /* eslint-enable */

  data() {
    return {
      place_from: null,           // 盤上ら動かそうとしているときの元位置
      have_piece: null,           // 駒台 or 駒箱から持った駒
      have_piece_location: null,  // 駒台から持ったときだけ先後が入ている
      current_preset: null,       // 選択中の初期配置
      moves: [],                  // play_mode 時の棋譜
      init_sfen: null,            // play_mode に入ったときの最初の状態
      init_location_key: "black", // play_mode に入ったときの最初の手番
    }
  },

  created() {
  },

  mounted() {
    window.addEventListener("mousemove", this.mousemove_hook, false)
  },

  watch: {
    current_preset(value) {
      if (value) {
        const preset_info = PresetInfo.fetch(value)
        const data_source = new SfenParser()
        data_source.kifu_body = preset_info.sfen
        data_source.parse()

        this.mediator = new Mediator()
        this.mediator.data_source = data_source
        preset_info.piece_box.forEach(([e, c]) => {
          this.mediator.piece_box_add(Piece.fetch(e), c)
        })
        this.mediator.run()
      }
    },
  },

  methods: {
    // -------------------------------------------------------------------------------- play_mode

    // 駒箱の駒を持ち上げている？
    piece_box_have_p(piece) {
      return _.isNil(this.have_piece_location) && this.have_piece === piece
    },

    // FIXME: 駒を持っているときは「駒箱の駒」に対して一切反応しないようにしたい。そうすると駒箱だけの判定で済む
    piece_box_other_click(e) {
      console.log("駒箱クリック")

      if (_.isNil(this.have_piece_location) && this.have_piece) {
        console.log("持っているならキャンセル")
        this.state_reset()
        return true
      }

      if (this.have_piece_location && this.have_piece) {
        console.log("駒台から駒箱に移動")
        this.sound_call("piece_sound")
        this.mediator.piece_box_add(this.have_piece)
        this.mediator.hold_pieces_add(this.have_piece_location, this.have_piece, -1)
        this.state_reset()
        return true
      }

      if (this.origin_soldier) {
        console.log("盤上の駒を駒箱に移動")
        this.sound_call("piece_sound")
        this.mediator.piece_box_add(this.origin_soldier.piece)
        this.mediator.board.delete_at(this.origin_soldier.place)
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

      // // クリックしたけど持駒がない
      // if (this.mediator.piece_boxs_count(location, piece) <= 0) {
      //   console.log("クリックしたけど持駒がない")
      //   return
      // }

      console.log("駒台の駒を持つ")
      this.have_piece = piece
      this.have_piece_location = null
      this.virtual_piece_create(this.origin_soldier2(Place.fetch([0, 0])).to_class_list)
      // e.target.classList.add("active")
      // this.from_dom = e.target
    },

    // 駒台クリック
    piece_stand_click(location, e) {
      console.log("駒台クリック")

      if (this.have_piece_location === location && this.have_piece) {
        console.log("持っているならキャンセル")
        this.state_reset()
        return
      }

      if (this.have_piece_location !== location && this.have_piece) {
        this.opponent_hold_pieces_move_to_my_hold_pieces(location)
        return
      }

      if (this.origin_soldier) {
        console.log("盤上の駒を駒台に置く")
        this.board_soldir_to_hold_pieces(location)
      }
    },

    // 駒台の駒をクリック
    piece_stand_piece_click(location, piece, e) {
      console.log("駒台の駒をクリック")

      // 自分の駒をすでに持っているならキャンセル
      if (this.have_piece_location === location && this.have_piece) {
        console.log("持っているならキャンセル")
        this.state_reset()
        return
      }

      // 相手の持駒を自分の駒台に移動
      if (this.have_piece_location !== location && this.have_piece) {
        this.opponent_hold_pieces_move_to_my_hold_pieces(location)
        return
      }

      // 相手の持駒を持とうとしたときは無効
      if (this.run_mode2 === "play_mode" && !this.holding_p && location !== this.mediator.current_location) {
        console.log("相手の持駒を持とうとしたときは無効")
        return
      }

      // 盤上の駒を駒台に置く
      if (this.origin_soldier) {
        console.log("盤上の駒を駒台に置く")
        this.board_soldir_to_hold_pieces(location)
        return
      }

      // クリックしたけど持駒がない
      if (this.mediator.hold_pieces_count(location, piece) <= 0) {
        console.log("クリックしたけど持駒がない")
        return
      }

      console.log("駒台の駒を持つ")
      this.have_piece = piece
      this.have_piece_location = location
      this.virtual_piece_create(this.origin_soldier2(Place.fetch([0, 0])).to_class_list)

      // e.target.classList.add("active")
      // this.from_dom = e.target
    },

    // 盤をクリック
    board_click(xy, e) {
      this.log("board_click")
      console.log(`shiftKey: ${e.shiftKey}`)

      const place = Place.fetch(xy)
      const soldier = this.mediator.board.lookup(place)

      // -------------------------------------------------------------------------------- Validation

      // 自分の手番で相手の駒を持ち上げようとしたので無効とする
      if (this.run_mode2 === "play_mode" && !this.holding_p && soldier && soldier.location !== this.mediator.current_location) {
        console.log("自分の手番で相手の駒を持ち上げようとしたので無効とする")
        return
      }

      // 持たずに何もないところをクリックしたので無効とする
      if (!this.holding_p && !soldier) {
        console.log("持たずに何もないところをクリックしたので無効とする")
        return
      }

      // 自分の駒の上に駒を重ねようとしたので状況キャンセル
      if (this.run_mode2 === "play_mode" && this.put_on_my_piece_p(soldier)) {
        console.log("自分の駒の上に駒を重ねようとしたので状況キャンセル")
        this.state_reset()
        return
      }

      // 盤上の駒を持って同じ位置に戻したので状況キャンセル
      if (_.isEqual(this.place_from, place)) {
        console.log("盤上の駒を持って同じ位置に戻したので状況キャンセル")
        this.state_reset()
        return
      }

      // --------------------------------------------------------------------------------

      const shift_key = e.shiftKey | e.ctrlKey | e.altKey | e.metaKey | (e.button !== 0)
      console.log(`holding_p: ${this.holding_p}`)
      if (!this.holding_p && soldier && shift_key) {
        console.log("盤上の駒を裏返す")
        this.mediator.board.place_on(soldier.piece_transform)
        return
      }

      // 盤上の駒を持ちあげる
      if (!this.holding_p) {
        console.log("盤上の駒を持ちあげる")
        this.soldier_hold(place, e)
        return
      }

      // 盤上から移動
      if (this.place_from) {
        console.log("盤上から移動")
        if (soldier) {
          this.mediator.hold_pieces_add(this.origin_soldier.location, soldier.piece) // 相手の駒があれば取る
          // this.$forceUpdate()
        }

        const new_soldier = new Soldier({
          piece: this.origin_soldier.piece,
          place: place,
          promoted: this.origin_soldier.promoted,
          location: this.origin_soldier.location,
        })

        if (this.run_mode2 === "play_mode" && (new_soldier.promotable_p || this.origin_soldier.promotable_p)) { // 入って成る or 出て成る
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
              this.moves.push(this.origin_soldier.place.to_sfen + place.to_sfen + (new_soldier.promoted ? "+" : "")) // 7g7f+
              this.mediator.board.place_on(new_soldier)                             // 置く
              this.mediator.board.delete_at(this.place_from)
              this.state_reset()
              this.turn_next()
            },
          })
        } else {
          if (this.run_mode2 === "play_mode") {
            this.moves.push(this.origin_soldier.place.to_sfen + place.to_sfen) // 7g7f
          }
          this.mediator.board.place_on(new_soldier)                          // 置く
          this.mediator.board.delete_at(this.place_from)
          this.state_reset()
          this.turn_next()
        }

        return
      }

      // 持駒を置く
      if (this.have_piece) {
        this.sound_call("piece_sound")
        const soldier = this.origin_soldier2(place)
        this.piece_decriment()
        this.mediator.board.place_on(soldier) // 置く
        this.moves.push(soldier.piece.key + "*" + place.to_sfen) // P*7g
        this.state_reset()
        this.turn_next()
        return
      }

      throw new Error("must not happen")
    },

    // board_click_right(xy, e) {
    //   console.log("盤を右クリック")
    //
    //   // const place = Place.fetch(xy)
    //   // const soldier = this.mediator.board_place_at(place)
    //   //
    //   // if (soldier) {
    //   //   this.mediator.place_on(soldier.piece_transform)
    //   //   this.state_reset()
    //   //   return
    //   // }
    //
    //   throw new Error("must not happen")
    // },

    // 盤上の駒を駒台に置く
    board_soldir_to_hold_pieces(location) {
      this.sound_call("piece_sound")
      this.mediator.hold_pieces_add(location, this.origin_soldier.piece) // 駒台にプラス
      this.mediator.board.delete_at(this.origin_soldier.place)
      this.state_reset()
    },

    opponent_hold_pieces_move_to_my_hold_pieces(location) {
      console.log("相手の持駒を自分の駒台に移動")
      this.sound_call("piece_sound")
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
      this.virtual_piece_create(this.origin_soldier.to_class_list)
    },

    state_reset() {
      console.log("state_reset")
      this.place_from = null // 持ってない状態にする
      this.have_piece = null
      this.have_piece_location = null
      this.virtual_piece_destroy()
    },

    turn_next() {
      this.sound_call("piece_sound")

      if (this.run_mode2 === "play_mode") {
        const data_source = new SfenParser()
        data_source.kifu_body = this.play_mode_current_sfen
        data_source.parse()

        this.mediator = new Mediator()
        this.mediator.data_source = data_source
        this.mediator.current_turn = -1
        this.mediator.run()
        this.current_turn = this.mediator.normalized_turn

        // this.current_turn = -1
      }

      // console.log("turn_next")

      // this.mediator_update()
    },

    // -------------------------------------------------------------------------------- piece_box

    piece_box_piece_outer_class(piece) {
      let list = []
      if (this.piece_box_have_p(piece)) {
        list.push("holding_p")
      } else if (this.run_mode2 === "edit_mode") {
        list.push("selectable_p")
      }
      return list
    },

    piece_box_piece_inner_class(piece) {
      let list = []
      list = _.concat(list, piece.css_class_list)
      // list.push("piece_inner")
      list.push(`location_black`) // 本当は this.location.key を埋めるべきだけど後手の駒台は180度反転するため先手の向きとする
      list.push("promoted_false")

      // if (this.piece_box_have_p(piece)) {
      //   list.push("holding_p")
      // } else if (this.$parent.mediator.current_location === this.location || this.$parent.run_mode2 === "edit_mode") {
      //   list.push("selectable_p")
      // }

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

    modal_trigger_dots_click() {
    },

    mousemove_hook(e) {
      // this.cx = e.clientX
      // this.cy = e.clientY
      // console.log(e.clientX)
      this.last_event = e
      this.set_pos()
    },
    // onclick_func(e) {
    //   this.last_event = e
    //   this.virtual_piece_exist = !this.virtual_piece_exist
    // },
    set_pos() {
      if (this.cursor_elem && this.last_event) {
        this.cursor_elem.style.left = `${this.last_event.clientX}px`
        this.cursor_elem.style.top = `${this.last_event.clientY}px`
      }
    },

    // .piece_outer.cursor_elem
    //   .piece_inner
    virtual_piece_create(class_list) {
      this.virtual_piece_destroy()

      this.cursor_elem = document.createElement("div")
      this.cursor_elem.classList.add("piece_outer", "cursor_elem")
      const piece_inner = document.createElement("div")
      const list = _.concat(class_list, ["piece_inner"])
      piece_inner.classList.add(...list)
      this.cursor_elem.appendChild(piece_inner)
      this.$el.appendChild(this.cursor_elem)
      this.set_pos()
    },

    virtual_piece_destroy() {
      if (this.cursor_elem) {
        this.$el.removeChild(this.cursor_elem)
        this.cursor_elem = null
      }
    },

    // 駒箱から持ち上げている駒
    origin_soldier2(place) {
      return new Soldier({
        piece: this.have_piece,
        place: place,
        promoted: false,
        location: this.have_piece_location || Location.fetch("black"),
      })
    },
  },

  computed: {
    // 移動元の駒
    origin_soldier() {
      if (this.place_from) {
        return this.mediator.board.lookup(this.place_from)
      }
    },

    // 駒を持ち上げている状態？
    holding_p() {
      return !_.isNil(this.place_from) || !_.isNil(this.have_piece)
    },

    //
    play_mode_current_sfen() {
      if (this.init_sfen) {
        return this.init_sfen + " moves " + this.moves.join(" ")
      } else {
        return null
      }
    },

    init_location() {
      return Location.fetch(this.init_location_key)
    },

    // テンプレートの中で PresetInfo を簡単に参照できないVueの制約のため
    preset_info_values() {
      return PresetInfo.values
    },

  },
}
