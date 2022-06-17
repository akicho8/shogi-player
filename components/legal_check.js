import { Place } from "./models/place.js"

export const legal_check = {
  methods: {
    soldier_movable_to_goal(board, soldier, goal) {
      if (this.soldier_movable_once_vectors_to_goal(board, soldier, goal)) {   // 1マス動いて玉を取れる
        return true
      }
      if (this.soldier_movable_repeat_vectors_to_goal(board, soldier, goal)) { // 連続で動いて玉を取れる
        return true
      }
      return false
    },

    soldier_movable_once_vectors_to_goal(board, soldier, goal) {
      let success = false
      const vectors = soldier.once_vectors
      if (vectors) {
        success = vectors.some(vector => {
          if (vector) {
            return this.soldier_movable_once_vector_to_goal(board, soldier, vector, goal)
          }
        })
      }
      return success
    },

    soldier_movable_once_vector_to_goal(board, soldier, vector, goal) {
      const vx = vector[0]
      const vy = vector[1] * soldier.location.value_sign
      const x = soldier.place.x + vx
      const y = soldier.place.y + vy
      return x === goal.x && y === goal.y
    },

    // mode: "non_stop" // 障害物を素通り
    soldier_movable_repeat_vectors_to_goal(board, soldier, goal, options = {}) {
      let success = false
      const vectors = soldier.repeat_vectors
      if (vectors) {
        success = vectors.some(vector => {
          if (vector) {
            return this.soldier_movable_repeat_vector_to_goal(board, soldier, vector, goal, options)
          }
        })
      }
      return success
    },

    // vector の方向に進んでいくと他の駒に衝突せずに goal まで一直線に進めるか？
    // 言い替えると vector の方向の goal が見えるか？
    soldier_movable_repeat_vector_to_goal(board, soldier, vector, goal, options = {}) {
      const ox = soldier.place.x
      const oy = soldier.place.y

      const vx = vector[0]
      const vy = vector[1] * soldier.location.value_sign

      let x = ox + vx
      let y = oy + vy

      let success = false
      while (true) {
        if (Place.xy_invalid_p(x, y)) { // 外に出てしまった
          break
        }
        if (x === goal.x && y === goal.y) { // 目的地に着いた
          success = true
          break
        }
        const place = Place.fetch([x, y])
        const other = board.lookup(place)
        if (other) { // 他の駒に衝突した
          if (options.mode == "non_stop") {
          } else {
            break
          }
        }
        x += vx
        y += vy
      }
      return success
    },

    gyokutorareru_p(board, old_soldier, new_soldier, goal) {
      const vboard = board.shallow_clone
      vboard.delete_at(old_soldier.place)
      vboard.place_on(new_soldier)

      let soldiers = vboard.soldiers
      const my_location_key = old_soldier.location.key
      const my_king = soldiers.find(e => (e.piece.key == "K" && e.location.key == my_location_key))
      if (my_king == null) { // 自分の玉がないので玉は取られない
        return false
      }
      const op_location_key = old_soldier.location.flip.key
      const op_soldiers = soldiers.filter(e => e.location.key == op_location_key)
      return op_soldiers.some(soldier => this.soldier_movable_to_goal(vboard, soldier, my_king.place))
    },
  },
}
