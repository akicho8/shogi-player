// 画面幅で判定するのではなく実際の挙動で判定する
//
// |---------+------------+---------|
// | 端末    | 動作       | 判定    |
// |---------+------------+---------|
// | iPhone  | touchstart | touch   |
// | PC      | mousemove  | desktop |
// | Surface | touchstart | touch   |
// |         | mousemove  | desktop |
// |---------+------------+---------|
//
import { DeviseInfo } from "./models/devise_info.js"

export const device_detect = {
  props: {
    // デバイスを強制的に指定する (touch desktop) 自動判別するので基本そのままでよい
    sp_device: {
      type: String,
      default: null,
      validator(value) { return ["touch", "desktop"].includes(value) },
    },
  },
  data() {
    return {
      sp_device_default: null,
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
        this.sp_device_default = "touch"
      } else {
        this.sp_device_default = "desktop" // bulma のクラスと合わせるため mouse ではなく desktop で統一している
      }
      this.device_detect_destroy()
    },
  },
  computed: {
    new_devise_key() { return this.sp_device || this.sp_device_default || "desktop" },
    devise_info()    { return DeviseInfo.fetch(this.new_devise_key)                 },
  },
}
