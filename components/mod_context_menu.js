// 右クリックメニューを無効化 (contextmenu)
// 長押しによる全選択・メニュー表示を防ぐ (touchstart)
// ドラッグを禁止 (dragstart)
//
// これと合わせてトップで user-select: none を入れる

export const mod_context_menu = {
  mounted() {
    this.context_menu_disabled(this.$el)
  },
  beforeDestroy() {
    this.context_menu_enabled(this.$el)
  },
  methods: {
    context_menu_disabled(el) {
      this.log("コンテキストメニューの無効化")
      el.addEventListener("contextmenu", event => event.preventDefault())
      el.addEventListener("touchstart", event => event.preventDefault(), {passive: false})
      el.addEventListener("dragstart", event => event.preventDefault())
    },
    context_menu_enabled(el) {
      this.log("コンテキストメニューの有効化")
      el.removeEventListener("contextmenu", event => event.preventDefault())
      el.removeEventListener("touchstart", event => event.preventDefault())
      el.removeEventListener("dragstart", event => event.preventDefault())
    },
  },
  // directives: {
  //   // v-no-context-menu に対応する
  //   noContextMenu: {
  //     bind(el) {
  //       this.context_menu_disabled(el)
  //     },
  //     unbind(el) {
  //       this.context_menu_enabled(el)
  //     },
  //   },
  // },
}
