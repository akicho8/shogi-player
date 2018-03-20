const vm = new Vue({
  el: '#app',
  data: function () {
    return {
      dimension: 9,
      place_from: null,
      from_dom: null,
      board: {
        "0,0": {piece: "香", location: "white"},
        "1,0": {piece: "桂", location: "white"},
        "2,0": {piece: "銀", location: "white"},
        "3,0": {piece: "金", location: "white"},
        "4,0": {piece: "玉", location: "white"},
        "5,0": {piece: "金", location: "white"},
        "6,0": {piece: "銀", location: "white"},
        "7,0": {piece: "桂", location: "white"},
        "8,0": {piece: "香", location: "white"},
        "1,1": {piece: "飛", location: "white"},
        "7,1": {piece: "角", location: "white"},
        "0,2": {piece: "歩", location: "white"},
        "1,2": {piece: "歩", location: "white"},
        "2,2": {piece: "歩", location: "white"},
        "3,2": {piece: "歩", location: "white"},
        "4,2": {piece: "歩", location: "white"},
        "5,2": {piece: "歩", location: "white"},
        "6,2": {piece: "歩", location: "white"},
        "7,2": {piece: "歩", location: "white"},
        "8,2": {piece: "歩", location: "white"},

        "0,8": {piece: "香", location: "black"},
        "1,8": {piece: "桂", location: "black"},
        "2,8": {piece: "銀", location: "black"},
        "3,8": {piece: "金", location: "black"},
        "4,8": {piece: "玉", location: "black"},
        "5,8": {piece: "金", location: "black"},
        "6,8": {piece: "銀", location: "black"},
        "7,8": {piece: "桂", location: "black"},
        "8,8": {piece: "香", location: "black"},
        "7,7": {piece: "飛", location: "black"},
        "1,7": {piece: "角", location: "black"},
        "0,6": {piece: "歩", location: "black"},
        "1,6": {piece: "歩", location: "black"},
        "2,6": {piece: "歩", location: "black"},
        "3,6": {piece: "歩", location: "black"},
        "4,6": {piece: "歩", location: "black"},
        "5,6": {piece: "歩", location: "black"},
        "6,6": {piece: "歩", location: "black"},
        "7,6": {piece: "歩", location: "black"},
        "8,6": {piece: "歩", location: "black"},
      },
      hold_pieces: {
        black: {"歩": 2},
        white: {"歩": 2},
      },
      have_piece: null,
      turn_counter: 0,
      rules: {
        rule1: true, // 自分の手番で相手の駒を持ち上げれないようにする
        rule2: true, // 自分の駒の上に重ねたら持ってない状態にする(falseなら自分の駒で自分の駒をとれる)
        rule3: true, // 駒台をクリックしたとき持っているならキャンセル
      },
    }
  },
  methods: {
    cell_str: function(place) {
      const soldier = this.board[place]
      if (!soldier) {
        return ""
      }
      return soldier.piece
    },
    cell_class: function(place) {
      const soldier = this.board[place]
      if (!soldier) {
        return {}
      }
      return [soldier.location]
    },

    mouse_over_func: function(e) {
      // e.target.classList.add("active")
    },

    // 駒台をクリック
    piece_stand_piece_click: function(location, piece, e) {
      // 持っているならキャンセル
      if (this.rules["rule3"] && this.hold_p) {
        this.state_reset()
        return
      }

      // 相手の持駒を持とうとしたときは無効
      if (this.rules["rule1"] && !this.hold_p && location !== this.current_player) {
        return
      }

      // 盤上の駒を駒台に置く
      if (this.origin_soldier) {
        const count = (this.hold_pieces[location][this.origin_soldier.piece] || 0) + 1
        Vue.set(this.hold_pieces[location], this.origin_soldier.piece, count)
        Vue.set(this.board, this.place_from, null)      // 元の位置を消す
        this.state_reset()
        this.turn_next()
        return
      }

      if (_.isNil(this.hold_piece)) {
        // 持駒があれば持ち上げる
        const count = (this.hold_pieces[location][piece] || 0)
        if (count >= 1) {
          this.have_piece = piece
          e.target.classList.add("active")
          this.from_dom = e.target
        }
        return
      }

      throw new Error("must not happen")
    },

    // 盤をクリック
    board_click: function(place, e) {
      const soldier = this.board[place]

      //////////////////////////////////////////////////////////////////////////////// Validation

      // 自分の手番で相手の駒を持ち上げようとしたので無効とする
      if (!this.hold_p && this.rules["rule1"] && soldier && soldier.location !== this.current_player) {
        return
      }

      // 持たずに何もないところをクリックしたので無効とする
      if (!this.hold_p && !soldier) {
        return
      }

      // 自分の駒の上に駒を重ねようとしたので状況キャンセル
      if (this.put_on_my_piece_p(soldier)) {
        this.state_reset()
        return
      }

      // 盤上の駒を持って同じ位置に戻したので状況キャンセル
      if (_.isEqual(this.place_from, place)) {
        this.state_reset()
        return
      }

      ////////////////////////////////////////////////////////////////////////////////

      // 盤上の駒を持ちあげる
      if (!this.hold_p) {
        this.soldier_hold(place, e)
        return
      }

      // 置く
      if (this.place_from) {
        this.piece_capture(soldier)                     // 相手の駒があれば取る
        Vue.set(this.board, place, this.origin_soldier) // 移動
        Vue.set(this.board, this.place_from, null)      // 元の位置を消す
        this.state_reset()
        this.turn_next()
        return
      }

      // 持駒を置く
      if (this.have_piece) {
        const soldier = {piece: this.have_piece, location: this.current_player}
        Vue.set(this.board, place, soldier) // 置く
        this.mochigoma_herasu()             // 持駒を減らす
        this.state_reset()
        this.turn_next()
        return
      }

      throw new Error("must not happen")
    },

    // 持駒減らす
    mochigoma_herasu: function() {
      const count = (this.hold_pieces[this.current_player][this.have_piece] || 0) - 1
      Vue.set(this.hold_pieces[this.current_player], this.have_piece, count)
      if (count <= 0) {
        delete this.hold_pieces[this.current_player][this.have_piece] // 要素が0になるキーは削除
      }
    },

    // 自分の駒の上に重ねた？
    put_on_my_piece_p: function(soldier) {
      return this.hold_p && this.rules["rule2"] && soldier && soldier.location === this.current_player
    },

    // 駒があれば持駒とする
    piece_capture: function(soldier) {
      if (soldier) {
        const count = (this.hold_pieces[soldier.location][soldier.piece] || 0) + 1
        Vue.set(this.hold_pieces[this.current_player], soldier.piece, count)
      }
    },

    // 盤面の駒を持ち上げる
    soldier_hold: function(place, e) {
      this.place_from = place
      this.from_dom = e.target
      e.target.classList.add("active")
    },

    state_reset: function() {
      this.place_from = null // 持ってない状態にする
      this.have_piece = null
      if (this.from_dom) {
        this.from_dom.classList.remove("active")
        this.from_dom = null
      }
    },

    turn_next: function() {
      this.turn_counter += 1
    },

    location_flip: function(location) {
      return location === "black" ? "white" : "black"
    },

    current_player_diff: function(diff) {
      const locatios = ["black", "white"]
      return locatios[(this.turn_counter + diff) % locatios.length]
    },
  },

  computed: {
    current_player: function() {
      return this.current_player_diff(0)
    },

    opponent_player: function() {
      return this.current_player_diff(1)
    },

    origin_soldier: function() {
      return this.board[this.place_from]
    },

    hold_p: function() {
      return !_.isNil(this.place_from) || !_.isNil(this.have_piece)
    },
  },
})
