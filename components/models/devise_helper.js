export class DeviseHelper {
  // そのイベントはマウスでクリックしたのか？
  // 本当は pointerType === "mouse" だけでいい
  // しかし iPad の Google Chrome と iPad の Safari でも pointerType === "mouse" になってしまう
  // したがって maxTouchPoints でタッチ可能なデバイスならマウスではないとする
  static mouse_click_event_p(e) {
    if (e) {
      const touch_capable_p = navigator.maxTouchPoints > 0
      return e.pointerType === "mouse" && !touch_capable_p
    }
  }
}
