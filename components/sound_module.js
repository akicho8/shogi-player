import { SoundPresetInfo } from "./models/sound_preset_info.js"

export const sound_module = {
  methods: {
    sound_play(key, options = {}) {
      this.$emit("sound_play", key)
    },
  },
}
