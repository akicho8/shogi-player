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
        black: {},
        white: {},
      },
      have_piece: null,
      turn_index: 0,
      rules: {
        rule1: false, // 相手の駒を持ち上げれないようにする
        rule2: false, // 自分の駒の上に重ねたら持ってない状態にする
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
    hold_piece_click: function(location, piece, e) {
      if (this.motteiru()) {
        this.mottenaijoutainisuru()
        return
      }

      // 持駒があれば持ち上げる
      const count = (this.hold_pieces[location][piece] || 0)
      if (count >= 1) {
        this.have_piece = piece
        e.target.classList.add("active")
        this.from_dom = e.target
      }
    },

    // 盤をクリック
    board_click: function(place, e) {
      if (_.isNil(this.have_piece)) {
        // 持駒を持ちあげてない状態

        if (_.isNil(this.place_from)) {
          // 盤上の駒を持ちあげる
          const soldier = this.board[place]
          if (soldier) {
            if (this.rules["rule1"] && soldier.location !== this.current_player) {
              return
            }
            // 盤面の駒を持ち上げる
            this.banmenno_koma_mochiageru(place, e)
          } else {
            // 盤面になにもないところをクリック
          }
        } else {
          // 盤上の駒を移動
          if (this.place_from === place) {
            // 持ってから同じところに戻した
            this.mottenaijoutainisuru()
          } else {
            const soldier = this.board[place]

            // 持ってから別のところに置いた

            // 自分の駒の上に重ねたら持ってない状態にする
            if (this.rules["rule2"] && soldier && soldier.location === this.current_player) {
              this.mottenaijoutainisuru()
              return
            }

            // 相手の駒があれば取って持駒とする
            if (soldier) {
              // 相手の駒を取った
              const count = (this.hold_pieces[this.current_player][soldier.piece] || 0) + 1
              Vue.set(this.hold_pieces[this.current_player], soldier.piece, count)
            }

            Vue.set(this.board, place, this.board[this.place_from]) // 移動
            Vue.set(this.board, this.place_from, null)          // 元の位置を消す

            this.mottenaijoutainisuru()
            this.next_turn()
          }
        }
      } else {
        // 持駒を持ちあげている状態

        const soldier = this.board[place]
        if (soldier && soldier.location === this.current_player) {
          // 自分の駒の上に重ねたら持ってない状態にする
          this.mottenaijoutainisuru()
          // this.banmenno_koma_mochiageru(place, e)
          return
        }

        if (soldier) {
          // 駒台の駒を相手の駒の上に置いたらキャンセル
          this.mottenaijoutainisuru()
          return
        }

        // 置く
        Vue.set(this.board, place, {piece: this.have_piece, location: this.current_player})

        // 持駒を減らす
        const count = (this.hold_pieces[this.current_player][this.have_piece] || 0) - 1
        Vue.set(this.hold_pieces[this.current_player], this.have_piece, count)
        if (count <= 0) {
          // 要素が0になるキーは削除する
          delete this.hold_pieces[this.current_player][this.have_piece]
        }

        // 持ってない状態にする
        this.mottenaijoutainisuru()
        this.next_turn()
      }
    },

    banmenno_koma_mochiageru: function(place, e) {
      // 盤面の駒を持ち上げる
      this.place_from = place
      this.from_dom = e.target
      e.target.classList.add("active")
    },

    mottenaijoutainisuru: function() {
      this.place_from = null // 持ってない状態にする
      this.have_piece = null
      if (this.from_dom) {
        this.from_dom.classList.remove("active")
        this.from_dom = null
      }
    },

    motteiru: function() {
      return !_.isNil(this.place_from) || !_.isNil(this.have_piece)
    },

    next_turn: function() {
      this.turn_index += 1
    },
  },

  computed: {
    current_player: function() {
      const locatios = ["black", "white"]
      return locatios[this.turn_index % locatios.length]
    }
  },
})
