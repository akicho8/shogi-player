import SettingModal from "./SettingModal.vue"

import { ModeInfo         } from "../models/mode_info.js"
import { BgVariantInfo    } from "../models/bg_variant_info.js"
import { PieceVariantInfo } from "../models/piece_variant_info.js"

export const mod_setting = {
  props: {
    // 設定ボタンの表示
    sp_setting: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      new_setting: this.sp_setting,
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
    ModeInfo()         { return ModeInfo         },
    BgVariantInfo()    { return BgVariantInfo    },
    PieceVariantInfo() { return PieceVariantInfo },
  },
}
