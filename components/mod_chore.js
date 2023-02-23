export const mod_chore = {
  methods: {
    // Placeインスタンスに対応するセルの中央のリアル座標を返す
    place_to_cell_info(place) {
      const key = place.css_place_key              // "place_2_3"
      const el = this.$el.querySelector("." + key) // querySelector(".place_2_3")
      const rc = el.getBoundingClientRect()        // ビューポートの左上を基準とした座標を取得
      const w = rc.width                           // 横軸の直径
      const h = rc.height                          // 縦軸の直径
      const rw = w / 2                             // 横軸の半径
      const rh = h / 2                             // 縦軸の半径
      const x = rc.left + rw                       // 中央(右下方向)に少し移動する
      const y = rc.top  + rh                       // 本当は rc.x, rc.y を使いたいが iOS11未満の Safari にはない
      return {
        center: {
          x: x,
          y: y,
        },
        rect: {
          x: w,
          y: h,
        },
        radius: {
          x: rw,
          y: rh,
        },
      }
    },

    // 指定の要素の x, y 座標を設定
    element_vector_set(elem, vec) {
      elem.style.left = `${vec.x}px`
      elem.style.top  = `${vec.y}px`
    },

    toast_call(message, options = {}) {
      options = {
        container: this.root_container_query,
        message: message,
        position: "is-bottom",
        type: "is-primary",
        duration: 2,
        queue: false,
        ...options,
      }
      options.duration = 1000 * options.duration
      this.$buefy.toast.open(options)
    },

    dialog_call(message, options = {}) {
      options = {
        container: this.root_container_query,
        message: message,
        confirmText: "実行",
        cancelText: "キャンセル",
        trapFocus: true,
        animation: "",
        ...options,
      }
      this.$buefy.dialog.prompt(options)
    },
  },
}
