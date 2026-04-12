import { mod_think_mark } from "./mod_think_mark/mod_think_mark.js"
import { mod_origin_mark } from "./mod_origin_mark/mod_origin_mark.js"

export const mod_general_mark = {
  mixins: [
    mod_think_mark,
    mod_origin_mark,
  ],
  computed: {
    EFFECT_COLOR_OWNER() { return 0 }, // 0:最初の人 -1:最後の人
  },
}
