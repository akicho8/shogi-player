import Soldier from "../soldier"

export default {
  methods: {
    // 盤を消してランダムに駒を配置する
    api_random_puton() {
      const soldier = Soldier.random()
      this.mediator.board.clear()
      this.mediator.board.place_on(soldier)
      return soldier
    },

    // 駒を置く
    api_place_on(soldier) {
      this.mediator.board.place_on(soldier)
    },

    // 盤面クリア
    api_board_clear() {
      this.mediator.board.clear()
    },

    // 指定手数の局面に設定
    api_board_turn_set(turn) {
      this.mediator_setup(turn)
    },

    // 反転状態の設定
    api_flip_set(flag) {
      this.$store.state.current_flip = flag
    },
  },
}
