import Soldier from "../soldier"

export default {
  methods: {
    api_random_puton() {
      const soldier = Soldier.random()
      this.mediator.board.clear()
      this.mediator.board.place_on(soldier)
      return soldier
    },

    api_place_on(soldier) {
      this.mediator.board.place_on(soldier)
    },

    api_board_clear() {
      this.mediator.board.clear()
    },
  },
}
