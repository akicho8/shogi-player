import { SeVariableInfo } from "./se_variable_info.js"
import { GX } from "../models/gx.js"
import JSON5 from "json5"

export const mod_variables = {
  data() {
    return {
      ...SeVariableInfo.vue_data_attributes,
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
        SeVariableInfo.values.forEach(e => {
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
      SeVariableInfo.values.forEach(e => {
        let v = this.$route.query[e.key]
        if (v) {
          if (false) {
          } else if (e.type === "String") {
            v = v.trim()
          } else if (e.type === "Bool") {
            v = (v === "true")
          } else if (e.type === "Hash") {
            v = JSON5.parse(v)
          } else if (e.type === "Float") {
            v = parseFloat(v)
          } else if (e.type === "Integer") {
            v = parseInt(v)
          } else {
            throw new Error("must not happen")
          }
          this[e.key] = v
        }
      })
    },
  },

  computed: {
    SeVariableInfo() { return SeVariableInfo },

    sp_component_attributes_current() {
      let hv = {}
      SeVariableInfo.values.forEach(e => {
        if (e.context_type === "sp_var") {
          hv[e.key] = this[e.key]
        }
      })
      return hv
    },

    sp_component_attributes() {
      const hv = this.sp_component_attributes_current
      if (this.component_parmas_show_all) {
        return hv
      }
      return SeVariableInfo.sp_component_attributes(hv)
    },
  },
}
