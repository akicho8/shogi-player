import DevTools from "./DevTools.vue"

import { mod_dev_tools_storage } from "./mod_dev_tools_storage.js"

import { ModeInfo              } from "../models/mode_info.js"
import { BgVariantInfo         } from "../models/bg_variant_info.js"
import { PieceVariantInfo      } from "../models/piece_variant_info.js"

import { DevToolsGroupInfo     } from "./dev_tools_group_info.js"
import { DevToolsPositionInfo    } from "./dev_tools_position_info.js"
import { DevToolsVariableInfo    } from "./dev_tools_variable_info.js"

export const mod_dev_tools = {
  mixins: [mod_dev_tools_storage],

  props: {
    sp_dev_tools: {
      type: Boolean,
      default: false,
    },
    sp_dev_tools_position: {
      type: String,
      default: "bottom",
      validator(value) { return DevToolsPositionInfo.keys.includes(value) },
    },
    sp_dev_tools_group: {
      type: String,
      default: "basic",
      validator(value) { return DevToolsGroupInfo.keys.includes(value) },
    },
  },

  data() {
    return {
      mut_dev_tools:          this.sp_dev_tools,
      mut_dev_tools_position: this.sp_dev_tools_position,
      mut_dev_tools_group:    this.sp_dev_tools_group,
    }
  },

  methods: {
    dev_tools_open_handle() {
      this.mut_dev_tools = true
    },
    dev_tools_close_handle() {
      this.mut_dev_tools = false
    },
  },
  computed: {
    DevToolsGroupInfo() { return DevToolsGroupInfo  },
    dev_tools_group_info() { return DevToolsGroupInfo.lookup_or_first(this.mut_dev_tools_group) },

    DevToolsPositionInfo()    { return DevToolsPositionInfo },
    dev_tools_position_info() { return DevToolsPositionInfo.lookup_or_first(this.mut_dev_tools_position) },

    DevToolsVariableInfo()    { return DevToolsVariableInfo },

    ModeInfo()          { return ModeInfo         },
    BgVariantInfo()     { return BgVariantInfo    },
    PieceVariantInfo()  { return PieceVariantInfo },

  },
}
