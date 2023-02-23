import { Xcontainer } from "./models/xcontainer.js"
import { PresetInfo } from "./models/preset_info.js"

export const mod_preset = {
  props: {
    sp_preset: { type: String,  default: null, },
  },

  data() {
    return {
      mut_preset_key: this.sp_preset, // 選択中の初期配置
    }
  },

  watch: {
    preset_key(v) { this.mut_preset_key = v },              // 引数の変更を反映 (FIXME: 取る)
    mut_preset_key(v) { this.xcontainer_setup_by_preset(v) }, // 設定での変更を反映
  },

  methods: {
    // FIXME: pulldown から選択したときに2回呼ばれてしまう
    xcontainer_setup_by_preset(preset_info) {
      preset_info = PresetInfo.fetch(preset_info)
      this.xcontainer = new Xcontainer()
      if (preset_info.sfen) {
        this.xcontainer.data_source = this.data_source_by(preset_info.sfen)
      }
      this.xcontainer.run()

      // 足りない駒を preset_info から設定するのは廃止
      // this.xcontainer.piece_box_reset_by_preset(preset_info)

      // 自動的に駒箱を補充
      this.xcontainer.piece_box_piece_counts_adjust()

      // 駒落ちのときは△の手番から始まるので edit での手番に反映する
      // xcontainer の current_turn が 0 のまま run しているので xcontainer.current_location.key で最初の手番がわかる
      this.init_location_key = this.xcontainer.current_location.key
    },
  },

  computed: {
    // テンプレートの中で PresetInfo を簡単に参照できないVueの制約のため
    preset_info_values() {
      return PresetInfo.values
    },

    // 初期配置指定がある場合、その sfen を返す
    init_preset_sfen() {
      if (this.sp_preset) {
        return PresetInfo.fetch(this.sp_preset).sfen
      }
    },
  },
}
