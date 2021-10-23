import { SoundPresetInfo } from "@/components/models/sound_preset_info.js"
import { Howl, Howler } from "howler"

export default {
  methods: {
    sound_play(key, options = {}) {
      const e = SoundPresetInfo.fetch(key)
      const params = {
        src: e.source,
        volume: e.volume,
        autoplay: true,
        ...options,
      }
      // https://github.com/goldfire/howler.js#documentation
      return new Howl(params)
    },

    click_play() {
      this.sound_play("click")
    },
  },
}
