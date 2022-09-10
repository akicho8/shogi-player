// 持ち上げた駒
// ・PC のときだけ見える

const HOVER_PIECE_ELEMENT_POSITION_UPDATE_60FPS = true

import { PositionInfo } from "./models/position_info.js"

export const hover_piece_module = {
  data() {
    return {
      // プレフィクスに_をつけるとVueに監視されない
      pos_update_need_p: false,  // mousemove イベント緩和用
      _me_last_event: null,      // mousemove イベント

      _HoverPieceElement: null,  // 持ちあげている駒のDOM
      mouse_stick_p: false,      // 持ち上げている駒をマウスに追随させるか？
    }
  },

  beforeDestroy() {
    this.hover_piece_element_destroy()
  },

  methods: {
    // 持ち上げた駒の位置を更新する
    hover_piece_element_position_update() {
      if (this.$data._HoverPieceElement && this.$data._me_last_event && this.mouse_stick_p) {
        // if (this.devise_info.key === "is_device_desktop") {
        const x = this.$data._me_last_event.clientX
        const y = this.$data._me_last_event.clientY
        this.element_vector_set(this.$data._HoverPieceElement, {x, y})
        // }
      }
    },

    // マウス位置に表示する駒の生成
    hover_piece_element_create(event, soldier) {
      this.hover_piece_element_destroy()
      this.hover_piece_dom_create_by(soldier)

      this.mouse_stick_p = true   // マウスに追随する

      // キーボードイベントの場合は null が来るようにしている
      // マウスを動かしてはじめて座標が取れるのでキーボードの場合はすぐに駒は表示されない
      if (event) {
        this.$data._me_last_event = event
        this.hover_piece_element_position_update()
      }

      this.$el.addEventListener("mousemove", this.mousemove_hook)
      this.$el.addEventListener("click", this.click_hook)
    },

    // 持ち上げる駒を作る
    //
    // .HoverPieceElement                   // マウスの (x, y) を反映
    //   .PieceTap.is_position_north        // or is_position_south
    //     .PieceTexture
    //       .PieceTextureSelf(駒の種類を定義するクラスたち)
    //
    // FIXME: これ自力で作る必要あった？
    hover_piece_dom_create_by(soldier) {
      this.$data._HoverPieceElement = this.el_create(["HoverPieceElement"])
      const PieceTap           = this.el_create(["PieceTap"])
      const PieceTexture       = this.el_create(["PieceTexture"])
      const PieceTextureSelf   = this.el_create(["PieceTextureSelf", ...soldier.css_class_list])

      PieceTap.classList.add(soldier.location.flip_if(this.fliped).position_key)

      PieceTexture.appendChild(PieceTextureSelf)
      PieceTap.appendChild(PieceTexture)
      this.$data._HoverPieceElement.appendChild(PieceTap)

      const position_key = soldier.location.flip_if(this.fliped).position_key
      const position_info = PositionInfo.fetch(position_key)
      if (soldier.place) {
        // 盤上から動かそうとしている駒
        // devise_info.gap が 0.25 でちょうど左上にすこしずれる
        const ci = this.place_to_cell_info(soldier.place)                                        // place から実際のセルの位置情報を取得
        const gap = this.vector_scale(ci.radius, this.devise_info.gap * position_info.sign * -1) // 左上にずらす度合いを計算
        const vec = this.vector_add(ci.center, gap)                                              // 中央から左上にずらす
        this.element_vector_set(this.$data._HoverPieceElement, vec)                                   // カーソル座標とする
      } else {
        // 駒箱や駒台から取り出した駒
        // マウスイベントが発生するまでは画面内に表示されてしまうので画面外に出す
        this.$data._HoverPieceElement.style.left = "-50%"
        this.$data._HoverPieceElement.style.top  = "-50%"
      }

      this.$refs.ShogiPlayerGround.$el.appendChild(this.$data._HoverPieceElement)
    },

    // 持ち上げた駒を破棄する
    hover_piece_element_destroy() {
      if (this.$data._HoverPieceElement) {
        this.$refs.ShogiPlayerGround.$el.removeChild(this.$data._HoverPieceElement)

        this.$data._HoverPieceElement = null
        this.mouse_stick_p = false

        this.$el.removeEventListener("mousemove", this.mousemove_hook)
        this.$el.removeEventListener("click", this.click_hook)
      }
    },

    mousemove_hook(e) {
      this.$data._me_last_event = e

      // 連続で呼ばれるイベント処理を緩和する方法
      // https://qiita.com/noplan1989/items/9333faad731f5ecaaccd
      // ※試してみているけどあまり効果がない
      if (HOVER_PIECE_ELEMENT_POSITION_UPDATE_60FPS) {
        // 呼び出されるまで何もしない
        if (!this.pos_update_need_p) {
          this.pos_update_need_p = true // 呼んでいい

          // 描画する前のタイミングで呼び出してもらう
          window.requestAnimationFrame(() => {
            this.hover_piece_element_position_update()
            this.pos_update_need_p = false // もう呼ぶな
          })
        }
      } else {
        this.hover_piece_element_position_update()
      }
    },

    // 右クリックならキャンセル(動いてないっぽい)
    click_hook(e) {
      if (e.which !== 1) {
        this.state_reset()
      }
    },

    el_create(classes) {
      const e = document.createElement("div")
      e.classList.add(...classes)
      return e
    },
  },
}
