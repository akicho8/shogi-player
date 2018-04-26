import { Piece } from "../piece"
import { Mediator } from "../mediator"
import { PresetInfo } from "../preset_info"

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

        this.mediator = new Mediator()
        this.mediator.data_source = this.data_source_by(preset_info.sfen)
        preset_info.piece_box.forEach(([e, c]) => { // preset_info には特別に駒箱の情報もある
          this.mediator.piece_box_add(Piece.fetch(e), c)
        })
        this.mediator.run()

        // 駒落ちのときは△の手番から始まるので edit_mode での手番に反映する
        this.init_location_key = this.mediator.current_location.key
      }
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
