import { Place } from "./models/place.js"

export const legal_check = {
  methods: {
    soldier_movable_once_vectors_to_goal(soldier, goal) {
      const vectors = soldier.once_vectors
      let success = false
      if (vectors) {
        success = vectors.some(vector => {
          if (vector) {
            return this.soldier_movable_once_vector_to_goal(soldier, vector, goal)
          }
        })
      }
      return success
    },

    soldier_movable_once_vector_to_goal(soldier, vector, goal) {
      const vx = vector[0]
      const vy = vector[1] * soldier.location.value_sign
      const x = soldier.place.x + vx
      const y = soldier.place.y + vy
      return x === goal.x && y === goal.y
    },

    // mode: "non_stop" // 障害物を素通り
    // mode: "stop"     // 障害物で止まる
    soldier_movable_repeat_vectors_to_goal(soldier, goal, options = {}) {
      const vectors = soldier.repeat_vectors
      let success = false
      if (vectors) {
        success = vectors.some(vector => {
          if (vector) {
            return this.soldier_movable_repeat_vector_to_goal(soldier, vector, goal, options)
          }
        })
      }
      return success
    },

    // private

    // vector の方向に進んでいくと他の駒に衝突せずに goal まで一直線に進めるか？
    // 言い替えると vector の方向の goal が見えるか？
    soldier_movable_repeat_vector_to_goal(soldier, vector, goal, options = {}) {
      const ox = soldier.place.x
      const oy = soldier.place.y

      const vx = vector[0]
      const vy = vector[1] * soldier.location.value_sign

      let x = ox + vx
      let y = oy + vy

      let success = false
      while (true) {
        if (!Place.xy_valid_p(x, y)) { // 外に出てしまった
          break
        }
        if (x === goal.x && y === goal.y) { // 目的地に着いた
          success = true
          break
        }
        const next_place = Place.fetch([x, y])
        const other_soldier = this.mediator.board.lookup(next_place)
        if (other_soldier) { // 他の駒に衝突した
          if (options.mode == "stop") {
            break
          }
        }
        x += vx
        y += vy
      }
      return success
    },
  },
}
