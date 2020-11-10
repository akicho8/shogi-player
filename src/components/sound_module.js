import _ from "lodash"

import Sound from '../sound'

import piece_sound_wav from "../assets/Universal_Sound_FX/TABLE_TENNIS_Racket_Ball_Hit_07_Hard_mono.wav"
import flip_sound_wav  from "../assets/Universal_Sound_FX/RELOAD_Rechamber_Leaver_Action_stereo.wav"

export default {
  
  props: {
    sound_effect: { type: Boolean, default: false, },
    volume:       { type: Number,  default: 0.5,   },
  },
  

  data() {
    return {
    }
  },

  created() {
    this.sound_setup()
  },

  beforeDestroy() {
    // TODO: ここで何か解放しないといけない気がしている
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
        key = this.as_key(key)
        const object = this[key]
        if (object) {
          object.play()
          this.log(`sound_call("${key}")`)
        }
      }
    },

    sound_setup() {
      this.sound_load("piece_sound", piece_sound_wav, 0.5)
      this.sound_load("flip_sound",  flip_sound_wav,  2.0)
    },

    sound_load(key, file, volume) {
      if (this.sound_effect) {
        key = this.as_key(key)
        const object = this[key]

        if (_.isNil(object)) {
          this[key] = new Sound(file)
        }
        this[key].options["volume"] = volume * this.volume
      }
    },

    // this.piece_sound にすると無意味にリアクティブになるので this.$piece_sound にしておく
    as_key(key) {
      return "$" + key
    },
  },
}
