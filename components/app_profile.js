export const app_profile = {
  // props: {
  //   sp_sound_body_changed: { type: Boolean, default: true,  }, // sp_body をあとから変更して内容が変わったときに音を出すか？
  //   sp_sound_volume:       { type: Number,  default: 0.5,   }, // ボリューム
  // },
  data() {
    return {
      _before_update_call_count: 0,
    }
  },
  beforeUpdate() {
    this.$data._before_update_call_count += 1
  },
}
