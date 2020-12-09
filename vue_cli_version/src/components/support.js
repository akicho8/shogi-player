import { root_support } from "./root_support.js"

export const support = {
  mixins: [root_support],
  props: {
    base: { type: Object, required: false },
  },
}
