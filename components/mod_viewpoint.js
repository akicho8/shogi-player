import { Location } from "./models/location.js"

export const mod_viewpoint = {
  props: {
    // 視点
    sp_viewpoint: {
      type: String,
      default: "black",
      validator(value) { return Location.keys.includes(value) },
    },

    // 最初に表示した局面が△なら反転
    sp_active_side_viewpoint: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      mut_viewpoint: this.sp_viewpoint,
    }
  },

  watch: {
    sp_viewpoint(v)  { this.mut_viewpoint = v                    }, // 外 -> 中
    mut_viewpoint(v) { this.event_call("update:sp_viewpoint", v) }, // 中 -> 外
  },

  methods: {
    viewpoint_flip_handle() {
      this.viewpoint_flip()
      this.event_call("ev_action_viewpoint_flip")
      this.turn_slider_focus()
    },

    viewpoint_flip() {
      this.mut_viewpoint = Location.fetch(this.mut_viewpoint).flip.key
    },
  },

  computed: {
    fliped() { return this.mut_viewpoint === "white"  },
  },
}
