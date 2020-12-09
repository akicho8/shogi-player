import { SoundPreset } from "./models/SoundPreset.js"
import { Howl, Howler } from "howler"

export default {
  props: {
    sound_effect: { type: Boolean, default: false, },
    volume:       { type: Number,  default: 0.5,   },
  },
  methods: {
    sound_play(key, options = {}) {
      this.$emit("sound_play", key)

      if (!this.sound_effect) {
        return
      }
      const e = SoundPreset.fetch(key)
      const params = {
        src: e.source,
        volume: e.volume * this.volume,
        autoplay: true,
        ...options,
      }
      // https://github.com/goldfire/howler.js#documentation
      return new Howl(params)
    },
  },
}
