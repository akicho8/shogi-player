import { VariableInfo } from "./models/variable_info.js"
import { GX } from "../models/gx.js"
import JSON5 from "json5"

export const mod_variables = {
  data() {
    return {
      ...VariableInfo.vue_define_attributes(),
    }
  },

  created() {
    this.var_init_on_create()
  },

  methods: {
    var_init_on_create() {
      this.var_init_for_development()
      this.var_init_by_url_params_specific()
      this.var_init_by_url_params_all()
    },

    var_init_for_development() {
      if (this.development_p) {
        this.VariableInfo.values.forEach(e => {
          const v = e.development_value
          if (v !== null) {
            this[e.key] = v
          }
        })
      }
    },

    var_init_by_url_params_specific() {
      const { body, turn, viewpoint, black, white } = this.$route.query
      if (GX.present_p(body)) {
        this.sp_body = body
      }
      if (GX.present_p(turn)) {
        this.sp_turn = parseInt(turn)
      }
      if (GX.present_p(viewpoint)) {
        this.sp_viewpoint = viewpoint
      }
      if (GX.present_p(black)) {
        this.sp_player_info.black.name = black
      }
      if (GX.present_p(white)) {
        this.sp_player_info.white.name = white
      }
    },

    var_init_by_url_params_all() {
      this.VariableInfo.values.forEach(e => {
        const str = this.$route.query[e.key]
        if (str != null) {
          this[e.key] = e.native_value_from(str)
        }
      })
    },

    transform_reset(group) {
      this.VariableInfo.values.forEach(e => {
        if (e.group === group) {
          this[e.key] = e.default_value_clone
        }
      })
    },
  },

  computed: {
    VariableInfo() { return VariableInfo },

    // 現在値
    sp_component_current_attrs() {
      let hv = {}
      this.VariableInfo.values.forEach(e => {
        if (e.context_type === "sp_var") {
          hv[e.key] = this[e.key]
        }
      })
      return hv
    },

    // 現在値から初期値を除いたものを返す
    sp_component_bind_attrs() {
      const hv = this.sp_component_current_attrs
      if (this.component_parmas_show_all) {
        return hv
      }
      return this.VariableInfo.default_value_reject(hv)
    },
  },
}
