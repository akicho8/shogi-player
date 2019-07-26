import Mediator from "../mediator"
import PresetInfo from "../preset_info"

export default {
  /* eslint-disable */
  props: {
    preset_key: { type: String,  default: null, },
  },
  /* eslint-enable */

  data() {
    return {
      current_preset_key: this.preset_key, // 選択中の初期配置
    }
  },

  created() {
  },

  mounted() {
  },

  watch: {
    preset_key(v) { this.current_preset_key = v },              // 引数の変更を反映
    current_preset_key(v) { this.mediator_setup_by_preset(v) }, // 設定での変更を反映
  },

  methods: {
    mediator_setup_by_preset(value) {
      if (value) {
        const preset_info = PresetInfo.fetch(value)
        this.mediator_setup_by_preset_info(preset_info)
      }
    },

    // FIXME: pulldown から選択したときに2回呼ばれてしまう
    mediator_setup_by_preset_info(preset_info) {
      this.mediator = new Mediator()
      if (preset_info.sfen) {
        this.mediator.data_source = this.data_source_by(preset_info.sfen)
      }
      this.mediator.piece_box_reset_by_preset(preset_info)
      this.mediator.run()

      // 駒落ちのときは△の手番から始まるので edit_mode での手番に反映する
      // mediator の current_turn が 0 のまま run しているので mediator.current_location.key で最初の手番がわかる
      this.init_location_key = this.mediator.current_location.key
    },
  },

  computed: {
    // テンプレートの中で PresetInfo を簡単に参照できないVueの制約のため
    preset_info_values() {
      return PresetInfo.values
    },

    // 初期配置指定がある場合、その sfen を返す
    init_preset_sfen() {
      if (this.preset_key) {
        return PresetInfo.fetch(this.preset_key).sfen
      }
    },
  },
}
