import { GX } from "../models/gx.js"

export const mod_callback = {
  methods: {
    sp_board_cell_class_fn(p) {
      if (p => p.human_x === 5 && p.human_y === 5) {
        return "天王山"
      }
    },
  },
}
