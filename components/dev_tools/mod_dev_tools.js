import DevTools from "./DevTools.vue"

import { mod_dev_tools_storage } from "./mod_dev_tools_storage.js"

import { DevToolsGroupInfo       } from "./dev_tools_group_info.js"
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
      default: null, // 明示的な指定がないことの判定に使うので本当は初期値はあるけど null にしておく
      validator(value) { return DevToolsPositionInfo.keys.includes(value) },
    },
    sp_dev_tools_group: {
      type: String,
      default: null,
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

  watch: {
    sp_dev_tools(v)          { this.mut_dev_tools = v },
    sp_dev_tools_position(v) { this.mut_dev_tools_position = v },
    sp_dev_tools_group(v)    { this.mut_dev_tools_group = v    },
  },

  methods: {
    dev_tools_toggle_handle() {
      if (this.mut_dev_tools) {
        this.dev_tools_close_handle()
      } else {
        this.dev_tools_open_handle()
      }
    },
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
  },
}
