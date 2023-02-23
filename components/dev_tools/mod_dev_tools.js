import DevTools from "./DevTools.vue"

import { mod_dev_tools_storage } from "./mod_dev_tools_storage.js"

import { ModeInfo              } from "../models/mode_info.js"
import { BgVariantInfo         } from "../models/bg_variant_info.js"
import { PieceVariantInfo      } from "../models/piece_variant_info.js"

import { DevToolsGroupInfo     } from "./dev_tools_group_info.js"
import { DevToolsLayoutInfo    } from "./dev_tools_layout_info.js"

export const mod_dev_tools = {
  mixins: [mod_dev_tools_storage],

  props: {
    // 設定ボタンの表示
    sp_dev_tools: {
      type: Boolean,
      default: false,
    },
    // 設定ボタンの表示
    sp_dev_tools_layout: {
      type: String,
      default: "bottom",
      validator(value) { return DevToolsLayoutInfo.keys.includes(value) },
    },
  },

  data() {
    return {
      mut_dev_tools: this.sp_dev_tools,
      mut_dev_tools_layout: this.sp_dev_tools_layout,
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

    ModeInfo()          { return ModeInfo         },
    BgVariantInfo()     { return BgVariantInfo    },
    PieceVariantInfo()  { return PieceVariantInfo },

    DevToolsLayoutInfo()    { return DevToolsLayoutInfo },
    dev_tools_layout_info() { return DevToolsLayoutInfo.fetch(this.mut_dev_tools_layout) },
  },
}
