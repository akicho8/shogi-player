// 画面幅で判定するのではなく実際の挙動で判定する
//
// |---------+------------+-------------------|
// | 端末    | 動作       | 判定              |
// |---------+------------+-------------------|
// | iPhone  | touchstart | is_device_touch   |
// | PC      | mousemove  | is_device_desktop |
// | Surface | touchstart | is_device_touch   |
// |         | mousemove  | is_device_desktop |
// |---------+------------+-------------------|
//
import { DeviseInfo } from "./models/devise_info.js"

export const device_detect = {
  props: {
    sp_device: { type: String, default: null, }, // デバイスを強制的に指定する (is_device_touch is_device_desktop) 自動判別するので基本そのままでよい
  },
  data() {
    return {
      default_device: null,
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
        this.default_device = "is_device_touch"
      } else {
        this.default_device = "is_device_desktop" // bulma のクラスと合わせるため mouse ではなく desktop で統一している
      }
      this.device_detect_destroy()
    },
  },
  computed: {
    new_devise_key() {
      return this.sp_device || this.default_device || "is_device_desktop"
    },
    devise_info() {
      return DeviseInfo.fetch(this.new_devise_key)
    },
  },
}
