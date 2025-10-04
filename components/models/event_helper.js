// for v-sp-disable-interactions

class EventHelper {
  context_menu_disable(el) {
    this.__log(el, "contextmenu", "off")
    el.addEventListener("contextmenu", this.__prevent_default)
  }

  context_menu_enable(el) {
    this.__log(el, "contextmenu", "on")
    el.removeEventListener("contextmenu", this.__prevent_default)
  }

  // iOS で sp_overlay_nav を有効にしたとき ../OverlayNavigations.vue で @click が反応しなくなるのはこれが原因
  // だがこれを無効にするとそれはそれで災いが起きるので @click を @pointerdown に変更する
  // ShogiPlayer の盤面の部分は click より pointerdown に統一したい意図もある
  long_press_disable(el) {
    this.__log(el, "touchstart", "off")
    el.addEventListener("touchstart", this.__prevent_default, { passive: false })
  }

  long_press_enable(el) {
    this.__log(el, "touchstart", "on")
    el.removeEventListener("touchstart", this.__prevent_default)
  }

  drag_disable(el) {
    this.__log(el, "dragstart", "off")
    el.addEventListener("dragstart", this.__prevent_default)
  }

  drag_enable(el) {
    this.__log(el, "dragstart", "on")
    el.removeEventListener("dragstart", this.__prevent_default)
  }

  // 共通の処理: イベントのデフォルト動作を無効化
  __prevent_default(event) {
    event.preventDefault()
  }

  __log(el, event_name, on_or_off) {
    // console.log(`[ShogiPlayer][EventHelper][${el.className}] ${event_name} ${on_or_off}`)
  }
}

export const event_helper = new EventHelper()
