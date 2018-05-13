import _ from "lodash"

import { Sound } from '../sound'

import piece_sound_wav from "../assets/piece_sound.wav"
import flip_sound_wav from "../assets/flip_sound.wav"

export default {
  /* eslint-disable */
  props: {
    sound_effect: { type: Boolean, default: false, },
    volume:       { type: Number,  default: 0.5,   },
  },
  /* eslint-enable */

  data() {
    return {
      piece_sound: null,
    }
  },

  created() {
    this.sound_setup()
  },

  watch: {
    sound_effect() {
      this.sound_setup()
    },

    volume() {
      this.sound_setup()
    },
  },

  methods: {
    sound_call(key) {
      if (this.sound_effect) {
        const object = this[key]
        if (object) {
          object.play()
        }
      }
    },

    sound_setup() {
      this.sound_load("piece_sound", piece_sound_wav)
      this.sound_load("flip_sound", flip_sound_wav)
    },

    sound_load(key, file) {
      if (this.sound_effect) {
        console.log(`sound_load(${key}, ${file})`)

        const object = this[key]
        if (_.isNil(object)) {
          this[key] = new Sound(file)
        }
        this[key].options["volume"] = this.volume
      }
    },
  },
}
