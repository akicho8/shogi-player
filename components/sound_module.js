import { SoundPresetInfo } from "./models/sound_preset_info.js"
import { Howl, Howler } from "howler"

export const sound_module = {
  props: {
    sp_sound_enabled:      { type: Boolean, default: false, }, // サウンド
    sp_sound_body_changed: { type: Boolean, default: true,  }, // sp_body をあとから変更して内容が変わったときに音を出すか？
    sp_sound_volume:       { type: Number,  default: 0.5,   }, // ボリューム
  },
  methods: {
    sound_play(key, options = {}) {
      this.$emit("sound_play", key)

      if (this.sp_sound_enabled) {
        const e = SoundPresetInfo.fetch(key)
        const params = {
          src: e.source,
          volume: e.volume * this.sp_sound_volume,
          autoplay: true,
          ...options,
        }
        // https://github.com/goldfire/howler.js#documentation
        return new Howl(params)
      }
    },

    // スマホで音が出なくなったのを直す
    // これが必要だということは、ここの Howler と他で import した Howler は別ものなのか……？？？
    sp_sound_resume_all() {
      Howler.unload()
    },
  },
}
