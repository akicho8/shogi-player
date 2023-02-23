// 画面幅で判定するのではなく実際の挙動で判定する
//
// |---------+------------+-------|
// | 端末    | 動作       | 判定  |
// |---------+------------+-------|
// | iPhone  | touchstart | touch |
// | PC      | mousemove  | mouse |
// | Surface | touchstart | touch |
// |         | mousemove  | mouse |
// |---------+------------+-------|
//
import { DeviseInfo } from "./models/devise_info.js"

export const mod_device_detector = {
  props: {
    // デバイスを強制的に指定する (touch mouse) 自動判別するので基本そのままでよい
    sp_device: {
      type: String,
      default: null,
      validator(value) { return DeviseInfo.keys.includes(value) },
    },
  },
  data() {
    return {
      detected_real_device: null,
    }
  },
  beforeMount() {
    this.device_detect_create()
  },
  beforeDestroy() {
    this.device_detect_destroy()
  },
  methods: {
    device_detect_create() {
      document.addEventListener("touchstart", this.device_detect_hook)
      document.addEventListener("mousemove", this.device_detect_hook)
    },
    device_detect_destroy() {
      document.removeEventListener("touchstart", this.device_detect_hook)
      document.removeEventListener("mousemove", this.device_detect_hook)
    },
    device_detect_hook(e) {
      if ("changedTouches" in e) {
        this.detected_real_device = "touch"
      } else {
        this.detected_real_device = "mouse"
      }
      this.device_detect_destroy()
    },
  },
  computed: {
    any_devise_key() { return this.sp_device || this.detected_real_device || "mouse" },
    devise_info()    { return DeviseInfo.fetch(this.any_devise_key)                  },
  },
}
