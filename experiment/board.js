new Vue({
  el: '#app',
  data: function () {
    return {
      dimension: 5,
      index_from: null,
      from_dom: null,
      board: ["玉", "金", null, "銀"],
      stand_pieces: {"飛": 1, "角": 2},
      have_piece: null,
    }
  },
  methods: {
    bar: function(e) {
      // e.target.classList.add("active")
    },
    do_have_piece: function(piece, e) {
      if (this.have_piece) {
        // もう持ってたのでリセットする
        this.have_piece = null
        this.from_dom.classList.remove("active")
      }

      // 持駒があれば持ち上げる
      const count = (this.stand_pieces[piece] || 0)
      if (count >= 1) {
        this.have_piece = piece
        e.target.classList.add("active")
        this.from_dom = e.target
      }
    },
    foo: function(x, e) {
      if (this.have_piece) {
        if (this.board[x]) {
          // alert("駒の上には打てません")
        } else {
          // 置く
          Vue.set(this.board, x, this.have_piece)

          // 持駒を減らす
          const count = (this.stand_pieces[this.have_piece] || 0) - 1
          Vue.set(this.stand_pieces, this.have_piece, count)
          if (count <= 0) {
            // 要素が0になるキーは削除する
            delete this.stand_pieces[this.have_piece]
          }

          // 持ってない状態にする
          this.have_piece = null
          this.from_dom.classList.remove("active")
        }
      } else {
        if (this.index_from === null) {
          if (this.board[x]) {
            // 盤面の駒を持ち上げる
            this.index_from = x
            this.from_dom = e.target
            e.target.classList.add("active")
          } else {
            // 盤面になにもないところをクリック
          }
        } else {
          if (this.index_from === x) {
            // 持ってから同じところに戻した
            this.index_from = null
            this.from_dom.classList.remove("active")
          } else {
            // 持ってから別のところに置いた

            // 相手の駒があれば取って持駒とする
            const piece = this.board[x]
            if (piece) {
              const count = (this.stand_pieces[piece] || 0) + 1
              Vue.set(this.stand_pieces, piece, count)
            }

            Vue.set(this.board, x, this.board[this.index_from]) // 移動
            Vue.set(this.board, this.index_from, null)          // 元の位置を消す

            this.index_from = null // 持ってない状態にする

            this.from_dom.classList.remove("active")
          }
        }
      }
    },
  },
})
