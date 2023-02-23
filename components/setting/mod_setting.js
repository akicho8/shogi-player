import SettingModal from "./SettingModal.vue"

import { ModeInfo         } from "../models/mode_info.js"
import { BgVariantInfo    } from "../models/bg_variant_info.js"
import { PieceVariantInfo } from "../models/piece_variant_info.js"
import { SettingTabInfo } from "../models/setting_tab_info.js"
import { SettingLayoutInfo } from "../models/setting_layout_info.js"

export const mod_setting = {
  props: {
    // 設定ボタンの表示
    sp_setting: {
      type: Boolean,
      default: false,
    },
    // 設定ボタンの表示
    sp_setting_layout: {
      type: String,
      default: "bottom",
      validator(value) { return SettingLayoutInfo.keys.includes(value) },
    },
  },
  data() {
    return {
      new_setting: this.sp_setting,
      new_setting_layout: this.sp_setting_layout,
    }
  },
  beforeDestroy() {
  },
  methods: {
    setting_modal_open_handle() {
      this.new_setting = true
    },
    setting_modal_close() {
      this.new_setting = false
    },
  },
  computed: {
    SettingTabInfo()   { return SettingTabInfo   },
    ModeInfo()         { return ModeInfo         },
    BgVariantInfo()    { return BgVariantInfo    },
    PieceVariantInfo() { return PieceVariantInfo },

    SettingLayoutInfo()   { return SettingLayoutInfo },
    setting_layout_info() { return SettingLayoutInfo.fetch(this.new_setting_layout) },
  },
}
