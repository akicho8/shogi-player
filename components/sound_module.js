import { SoundPresetInfo } from "./models/sound_preset_info.js"

// import { Howl, Howler } from "howler"
//
// ・ここの Howl で再生するとここの Howler._howls.length が増えていく
// ・shogi-player を使っているアプリ側の Howler._howls.length は 0 のまま
// ・だからアプリ側で Howler.unload() しても、shogi-player 側の Howler._howls は残ったままになる (実証済み)
// ・ここの Howler とアプリ側の Howler を同じものにしたいが方法がわからない
// ・なので Howl だけ sp_sound_howl で渡してもらうことにする
// ・↑やめ
// ・window.Howl が定義されていれば渡す ← こっち

export const sound_module = {
  props: {
    sp_sound_enabled:      { type: Boolean, default: false, }, // サウンド
    sp_sound_body_changed: { type: Boolean, default: true,  }, // sp_body をあとから変更して内容が変わったときに音を出すか？
    sp_sound_volume:       { type: Number,  default: 0.5,   }, // ボリューム
    // sp_sound_howl:         { type: Object,  default: null,  }, // Howl を渡してもらう
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

        if (typeof Howl !== 'undefined') {
          return new Howl(params)
        }

        // if (this.sp_sound_howl) {
        //   return new this.sp_sound_howl(params)
        // }
        // return new Howl(params)
      }
    },

    // スマホで音が出なくなったのを直す
    // これが必要だということは、ここの Howler と他で import した Howler は別ものなのか……？？？
    sp_sound_resume_all() {
      if (typeof Howler !== 'undefined') {
        return Howler.unload()
      }
    },

    sp_Howler() {
      if (typeof Howler !== 'undefined') {
        return Howler
      }
    },
  },
}
