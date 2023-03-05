// 持ち上げた駒
// ・PC のときだけ見える

const HOVER_PIECE_ELEMENT_POSITION_UPDATE_60FPS = true

import { PositionInfo } from "./models/position_info.js"

export const mod_lifted_piece = {
  data() {
    return {
      // プレフィクスに_をつけるとVueに監視されない
      lp_pos_update_need_p: false, // mousemove イベント緩和用
      _lp_latest_mouse_event: null,     // mousemove イベント

      _LiftedPieceElement: null,   // 持ちあげている駒のDOM
      lp_mouse_stick_p: false,     // 持ち上げている駒をマウスに追随させるか？
    }
  },

  beforeDestroy() {
    this.lp_destroy()
  },

  methods: {
    // 持ち上げた駒の位置を更新する
    lp_pos_update() {
      if (this.$data._LiftedPieceElement && this.$data._lp_latest_mouse_event && this.lp_mouse_stick_p) {
        // if (this.devise_info.key === "mouse") {
        const x = this.$data._lp_latest_mouse_event.clientX
        const y = this.$data._lp_latest_mouse_event.clientY
        this.element_vector_set(this.$data._LiftedPieceElement, {x, y})
        // }
      }
    },

    // マウス位置に表示する駒の生成
    lp_create(event, soldier) {
      this.event_call("ev_action_piece_lift")

      this.lp_destroy()
      this.lp_element_create(soldier)

      this.lp_mouse_stick_p = true   // マウスに追随する

      // キーボードイベントの場合は null が来るようにしている
      // マウスを動かしてはじめて座標が取れるのでキーボードの場合はすぐに駒は表示されない
      if (event) {
        this.$data._lp_latest_mouse_event = event
        this.lp_pos_update()
      }

      this.$el.addEventListener("mousemove", this.lp_mousemove_hook)
      this.$el.addEventListener("click", this.lp_click_hook)
    },

    // private

    // 持ち上げる駒を作る
    //
    // .LiftedPieceElement                   // マウスの (x, y) を反映
    //   .PieceTap.is_position_north        // or is_position_south
    //     .PieceTextureWithCount
    //       .PieceTexture(駒の種類を定義するクラスたち)
    //
    // FIXME: これ自力で作る必要あった？
    lp_element_create(soldier) {
      this.$data._LiftedPieceElement = this.lp_el_create(["LiftedPieceElement"])
      const PieceTap           = this.lp_el_create(["PieceTap"])
      const PieceTextureWithCount       = this.lp_el_create(["PieceTextureWithCount"])
      const PieceTexture   = this.lp_el_create(["PieceTexture", ...soldier.css_class_list])

      PieceTap.classList.add(soldier.location.flip_if(this.fliped).position_key)

      PieceTextureWithCount.appendChild(PieceTexture)
      PieceTap.appendChild(PieceTextureWithCount)
      this.$data._LiftedPieceElement.appendChild(PieceTap)

      const position_key = soldier.location.flip_if(this.fliped).position_key
      const position_info = PositionInfo.fetch(position_key)
      if (soldier.place) {
        // 盤上から動かそうとしている駒
        // devise_info.gap が 0.25 でちょうど左上にすこしずれる
        const ci = this.place_to_cell_info(soldier.place)                                        // place から実際のセルの位置情報を取得
        const gap = this.vector_scale(ci.radius, this.devise_info.gap * position_info.sign * -1) // 左上にずらす度合いを計算
        const vec = this.vector_add(ci.center, gap)                                              // 中央から左上にずらす
        this.element_vector_set(this.$data._LiftedPieceElement, vec)                                   // カーソル座標とする
      } else {
        // 駒箱や駒台から取り出した駒
        // マウスイベントが発生するまでは画面内に表示されてしまうので画面外に出す
        this.$data._LiftedPieceElement.style.left = "-50%"
        this.$data._LiftedPieceElement.style.top  = "-50%"
      }

      this.$el.appendChild(this.$data._LiftedPieceElement)
    },

    // 持ち上げた駒を破棄する
    lp_destroy() {
      if (this.$data._LiftedPieceElement) {
        this.$el.removeChild(this.$data._LiftedPieceElement)

        this.$data._LiftedPieceElement = null
        this.lp_mouse_stick_p = false

        this.$el.removeEventListener("mousemove", this.lp_mousemove_hook)
        this.$el.removeEventListener("click", this.lp_click_hook)
      }
    },

    lp_mousemove_hook(e) {
      this.$data._lp_latest_mouse_event = e

      // 連続で呼ばれるイベント処理を緩和する方法
      // https://qiita.com/noplan1989/items/9333faad731f5ecaaccd
      // ※試してみているけどあまり効果がない
      if (HOVER_PIECE_ELEMENT_POSITION_UPDATE_60FPS) {
        // 呼び出されるまで何もしない
        if (!this.lp_pos_update_need_p) {
          this.lp_pos_update_need_p = true // 呼んでいい

          // 描画する前のタイミングで呼び出してもらう
          window.requestAnimationFrame(() => {
            this.lp_pos_update()
            this.lp_pos_update_need_p = false // もう呼ぶな
          })
        }
      } else {
        this.lp_pos_update()
      }
    },

    // 右クリックならキャンセル(動いてないっぽい)
    lp_click_hook(e) {
      if (e.which !== 1) {
        this.state_reset()
      }
    },

    lp_el_create(classes) {
      const e = document.createElement("div")
      e.classList.add(...classes)
      return e
    },
  },
}
