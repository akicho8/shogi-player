import Soldier from "../soldier"

export default {
  methods: {
    api_random_puton() {
      const soldier = Soldier.random()
      this.mediator.board.clear()
      this.mediator.board.place_on(soldier)
      return soldier
    },
  },
}
