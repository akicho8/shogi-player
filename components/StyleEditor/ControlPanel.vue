<template lang="pug">
.ControlPanel.mx-4.my-4
  .is-flex.is-justify-content-start.is-align-items-center
    b-button(@click="AppContext.sidebar_toggle_handle" icon-left="menu")
    .mx-3.has-text-weight-bold スタイルエディタ

  .ControlPanelBoxes
    .box
      b-field(custom-class="is-small" label="カテゴリー")
        .control
          .short_cut_buttons
            template(v-for="e in AppContext.CategoryInfo.values")
              template(v-if="e.enable_p")
                a.button.is-small.is-marginless(v-scroll-to="AppContext.v_scroll_to_params(e)")
                  | {{e.display_name}}

      b-field(custom-class="is-small" label="プリセット")
        .control
          .buttons.mb-0
            template(v-for="e in AppContext.SePresetInfo.values")
              b-button(@click="e.call(AppContext)" size="is-small") {{e.name}}

      b-field(custom-class="is-small" label="永続化")
        template(#message)
          a(:href="AppContext.xstore_autoload_link") 自動復元URL
        .control
          .buttons.mb-0.are-small.storage_buttons
            b-button.mb-0(@click="AppContext.xstore_save_handle") 保存
            b-button.mb-0(@click="AppContext.xstore_load_handle") 復元

    CategoryBox(category_key="動作モード")
      SmartRadio(variable_key="sp_mode")

    CategoryBox(category_key="レイアウト")
      SmartSlider(variable_key="se_frame_width" label="大きさ")
        template(#message)
          | 親要素の横幅で大きさが変わる

    CategoryBox(category_key="背景")
      SmartColor(variable_key="se_ws_color")

      ImageUploader(@input="AppContext.se_ws_image_input_handle")

      SmartSlider(variable_key="se_ws_hue" label="色相")
      SmartSlider(variable_key="se_ws_saturate" label="彩度")
      SmartSlider(variable_key="se_ws_brightness" label="輝度")
      SmartSlider(variable_key="se_ws_blur" label="ぼかし")
      SmartSlider(variable_key="se_ws_sepia" label="セピア")
      SmartSlider(variable_key="se_ws_grayscale" label="グレースケール")
      SmartSlider(variable_key="se_ws_contrast" label="コントラスト")
      SmartSlider(variable_key="se_ws_invert" label="反転")

      hr

      p.help
        | 背景はスタイルエディタ側の設定であって ShogiPlayer とはなんも関係無い

    CategoryBox(category_key="盤テクスチャ")
      SmartRadio(variable_key="sp_board_variant" label="素材" class="wrap_layout")
        template(#message)
          | アップロード画像を有効にするには none にする

      ImageUploader(@input="AppContext.sp_board_image_input_handle")

      SmartColor(variable_key="sp_board_color" label="単色")
        template(#message)
          | 単色は素材の裏にあるため素材の不透明度が100%だと見えない

    CategoryBox(category_key="盤")

      SmartSlider(variable_key="sp_board_radius" label="角丸め" message="紙面風なら0にする")
      SmartSlider(variable_key="sp_board_padding" label="余白" message="紙面風なら0にする")
      SmartSlider(variable_key="sp_board_aspect_ratio" label="アスペクト比" message="将棋盤は正方形ではない")
      SmartSlider(variable_key="sp_board_horizontal_gap" label="左右余白 (左右レイアウト時有効)" message="盤と持駒の間にクリックできない領域ができてしまうため基本0でよい。座標を表示するときのみ少し空けるとよいかもしれない。")
      SmartSlider(variable_key="sp_board_vertical_gap" label="上下余白 (上下レイアウト時有効)" message="縦幅は貴重なので基本0でよい")

    CategoryBox(category_key="グリッド")
      SmartSlider(variable_key="sp_grid_inner_stroke" label="太さ (内側)")
      SmartSlider(variable_key="sp_grid_outer_stroke" label="太さ (外枠)")
      SmartSlider(variable_key="sp_board_edge_stroke" label="太さ (エッジ)")
      SmartColor(variable_key="sp_grid_inner_color" label="内側")
      SmartColor(variable_key="sp_grid_outer_color" label="外枠・エッジ・星")

    CategoryBox(category_key="星")
      SmartSlider(variable_key="sp_star_size" label="大きさ")
      SmartSlider(variable_key="sp_star_step" label="配置間隔")
      SmartRadio(variable_key="sp_star_z_index" label="表示優先度" message="技術的な問題で入れた設定だが現在は -1 にする利点はない")

    CategoryBox(category_key="カメラ")
      b-field.mt-1(custom-class="is-small" label="プリセット")
        .control
          .buttons.mb-0
            template(v-for="e in AppContext.BoardSizePresetInfo.values")
              b-button(@click="AppContext.se_board_size_preset_apply_handle(e)" size="is-small") {{e.name}}
      .columns.mt-1.mb-2
        .column.py-0
          SmartSlider(variable_key="sp_board_view_x" label="左上(X)")
        .column.py-0
          SmartSlider(variable_key="sp_board_view_y" label="左上(Y)")
      .columns.mt-4.mb-2
        .column.py-0
          SmartSlider(variable_key="sp_board_view_w" label="セル数(W)")
        .column.py-0
          SmartSlider(variable_key="sp_board_view_h" label="セル数(H)")

      hr

      p.help.content
        ul
          li 内部は<b>符号座標</b>９一を左上とした本将棋のままである
          li 右上だけの表示でいいなら<b>配列座標</b>で左上を(4,0)でセル数を5x5などとする
          li セル数を小さくすると壊れる

    CategoryBox(category_key="座標")
      SmartRadio(variable_key="sp_coordinate" label="表示")

      .columns.mt-5
        .column.py-0
          SmartSlider(variable_key="sp_coordinate_x_size" label="大きさ(列)")
        .column.py-0
          SmartSlider(variable_key="sp_coordinate_x_push" label="位置(列)")
        .column.py-0
          SmartRadio(variable_key="sp_coordinate_variant_h" label="表記(列)")

      .columns.mt-5
        .column.py-0
          SmartSlider(variable_key="sp_coordinate_y_size" label="大きさ(行)")
        .column.py-0
          SmartSlider(variable_key="sp_coordinate_y_push" label="位置(行)")
        .column.py-0
          SmartRadio(variable_key="sp_coordinate_variant_v" label="表記(行)")

      SmartColor(variable_key="sp_coordinate_color" label="色" :disabled="!AppContext.sp_coordinate")

    CategoryBox(category_key="盤セル")

      SmartColor(variable_key="sp_board_even_cell_color" label="偶数")
      SmartColor(variable_key="sp_board_odd_cell_color" label="奇数")

      p.help
        | 黒のままで透明度の調整するのがおすすめ

    CategoryBox(category_key="駒の種類")
      SmartRadio(variable_key="sp_piece_variant" label="プリセット")
        template(#message)
          | 「紙面風」や「ぬれよん」などは元が巨大なため少し小さく表示した方がよい<br>
          | 「Portella」は調整済みのため原寸(1.0)が望ましい<br>

      SmartRadio(variable_key="sp_piece_vertical_position" label="配置位置" message="基本中央でよい")

    CategoryBox(category_key="駒の大きさ")

      //- b-field.grouped(custom-class="is-small" label="セル (駒台)" message="盤に対する割合")
      //-   b-slider(v-bind="AppContext.slider_options" v-model="AppContext.sp_stand_cell_size" :min="0" :max="1.0" :step="0.0001")
      //-   b-slider(v-bind="AppContext.slider_options" v-model="AppContext.sp_stand_piece_size" :min="0" :max="1.0" :step="0.01")
      //-
      //- hr

      .columns.mt-1
        .column.py-0
          b-field(custom-class="is-small" label="セル (盤内)" message="最大で固定。縮小する利点はない。")
        .column.py-0
          SmartSlider(variable_key="sp_board_piece_size" label="駒 (盤内)" message="")

      .columns.mt-4
        .column.py-0
          SmartSlider(variable_key="sp_stand_cell_size" label="セル (駒台)" message="盤に対する割合")
        .column.py-0
          SmartSlider(variable_key="sp_stand_piece_size" label="駒 (駒台)")

      .columns.mt-4
        .column.py-0
          SmartSlider(variable_key="sp_piece_box_cell_size" label="セル (駒箱)" message="0.1 ぐらいですべての駒が収まる")
        .column.py-0
          SmartSlider(variable_key="sp_piece_box_piece_size" label="駒 (駒箱)")

      hr

      p.help
        | セルはクリックできる領域のことでその中に駒がある。<br>
        | もともとは盤内のセルと駒台のセルは同じ大きさだった。<br>
        | しかし盤を5x5にしてしまうと、8種類の駒がどうやっても駒台に乗らなくなってしまった。<br>
        | そこで盤の大きさを基準にするようにした。<br>

    CategoryBox(category_key="駒台")
      SmartRadio(variable_key="sp_layout" label="盤のどこに配置する？")
      SmartRadio(variable_key="sp_stand_gravity" label="左右配置時の上下位置")
      SmartRadio(variable_key="sp_stand_flip" label="相手側を反転")
      SmartColor(variable_key="sp_stand_bg_color" label="背景色")
      SmartColor(variable_key="sp_stand_hover_border_color" label="持駒をhoverさせたときのborder色" message="編集モード時のみ有効。駒箱にも適用する。")

    CategoryBox(category_key="持駒表示")
      .columns
        .column
          SmartRadio(variable_key="sp_player_info_black_piece_visibility" label="☗")
        .column
          SmartRadio(variable_key="sp_player_info_white_piece_visibility" label="☖")

      p.help.content
        ul
          li <b>玉方の持駒を隠す</b>目的で入れた詰将棋向けの機能 (実験的)
          li 単に玉方の駒を駒箱に移せば済むのだから余計な機能かもしれない

    CategoryBox(category_key="対局者")

      SmartSlider(variable_key="sp_location_mark_active_size" label="☗☖の大きさ (手番のとき)")
      SmartSlider(variable_key="sp_location_mark_inactive_size" label="☗☖の大きさ (手番でないとき)")

      SmartRadio(variable_key="sp_name_direction" label="名前の向き")
        template(#message)
          | 横書きは持駒を左右に置くレイアウトのときのみ有効

      SmartSlider(variable_key="sp_player_name_size" label="名前の大きさ")
      SmartSlider(variable_key="sp_player_time_size" label="時間の大きさ")

      SmartRadio(variable_key="sp_balloon" label="テキストの視認性を上げる" message="駒数の背景を適用する")

      .columns
        .column
          b-field(custom-class="is-small" label="☗")
            b-input(size="is-small" v-model.trim="AppContext.sp_player_info.black.name" type="text" placeholder="先手")
        .column
          b-field(custom-class="is-small" label="時間")
            b-input(size="is-small" v-model.trim="AppContext.sp_player_info.black.time" type="text" placeholder="12:34")
      .columns
        .column
          b-field(custom-class="is-small" label="☖")
            b-input(size="is-small" v-model.trim="AppContext.sp_player_info.white.name" type="text" placeholder="後手")
        .column
          b-field(custom-class="is-small" label="時間")
            b-input(size="is-small" v-model.trim="AppContext.sp_player_info.white.time" type="text" placeholder="56:78")

    CategoryBox(category_key="駒数")

      .columns.mt-1
        .column.py-0
          SmartSlider(variable_key="sp_piece_count_horizontal_x" label="左右レイアウト時 (X)")
        .column.py-0
          SmartSlider(variable_key="sp_piece_count_horizontal_y" label="左右レイアウト時 (Y)")

      .columns.mt-4
        .column.py-0
          SmartSlider(variable_key="sp_piece_count_vertical_x" label="上下レイアウト時 (X)")
        .column.py-0
          SmartSlider(variable_key="sp_piece_count_vertical_y" label="上下レイアウト時 (Y)")

      b-field(custom-class="is-small" label="余白")
        b-slider(v-bind="AppContext.slider_options" v-model="AppContext.sp_piece_count_padding" :min="0" :max="1.0" :step="0.01")

      b-field(custom-class="is-small" label="大きさ")
        b-slider(v-bind="AppContext.slider_options" v-model="AppContext.sp_piece_count_size" :min="0" :max="1.0" :step="0.01")
      SmartColor(variable_key="sp_piece_count_font_color" label="テキスト色 (対局者名にも適用)")
      SmartColor(variable_key="sp_piece_count_bg_color" label="背景")

    CategoryBox(category_key="駒箱")
      SmartColor(variable_key="sp_piece_box_color")

    CategoryBox(category_key="成り不成り選択")
      SmartColor(variable_key="sp_promote_select_modal_bg_color" label="背景")
      SmartColor(variable_key="sp_promote_select_modal_hover_color" label="hover色")

    CategoryBox(category_key="駒を操作中の移動元")
      SmartColor(variable_key="sp_mouse_lifted_origin_bg_color" label="背景")
      SmartSlider(variable_key="sp_mouse_lifted_origin_opacity" label="駒の不透明度")

    CategoryBox(category_key="transform")
      b-tabs(size="is-small" v-model="AppContext.transform_tab_index" expanded)

        b-tab-item(label="盤")
          .columns
            .column
              b-field(grouped)
                b-field.mb-0(custom-class="is-small")
                  SmartRadio(variable_key="se_tf_board_p")
                b-field.mb-0(custom-class="is-small")
                  .control
                    b-button(size="is-small" @click="AppContext.transform_reset('tf_board')") リセット
          .columns
            .column
              SmartSlider(variable_key="se_tf_board_perspective" label="視点との距離")
            .column
              SmartSlider(variable_key="se_tf_board_scale" label="スケール")
          .columns
            .column
              SmartSlider(variable_key="se_tf_board_rotate_x" label="回転 X")
            .column
              SmartSlider(variable_key="se_tf_board_rotate_y" label="回転 Y")
            .column
              SmartSlider(variable_key="se_tf_board_rotate_z" label="回転 Z")
          .columns
            .column
              SmartSlider(variable_key="se_tf_board_translate_x" label="移動 X")
            .column
              SmartSlider(variable_key="se_tf_board_translate_y" label="移動 Y")
            .column
              SmartSlider(variable_key="se_tf_board_translate_z" label="移動 Z")

        b-tab-item(label="駒")
          .columns
            .column
              b-field(grouped)
                SmartRadio(variable_key="se_tf_piece_p")
                b-field.mb-0(custom-class="is-small")
                  .control
                    b-button(size="is-small" @click="AppContext.transform_reset('tf_piece')") リセット
          .columns
            .column
              SmartSlider(variable_key="se_tf_piece_perspective" label="視点との距離")
            .column
              SmartSlider(variable_key="se_tf_piece_scale" label="スケール")
          .columns
            .column
              SmartSlider(variable_key="se_tf_piece_rotate_x" label="回転 X")
            .column
              SmartSlider(variable_key="se_tf_piece_rotate_y" label="回転 Y")
            .column
              SmartSlider(variable_key="se_tf_piece_rotate_z" label="回転 Z")
          .columns
            .column
              SmartSlider(variable_key="se_tf_piece_translate_x" label="移動 X")
            .column
              SmartSlider(variable_key="se_tf_piece_translate_y" label="移動 Y")
            .column
              SmartSlider(variable_key="se_tf_piece_translate_z" label="移動 Z")

        b-tab-item(label="全体")
          .columns
            .column
              b-field(grouped)
                SmartRadio(variable_key="se_tf_wall_p")
                b-field.mb-0(custom-class="is-small")
                  .control
                    b-button(size="is-small" @click="AppContext.transform_reset('tf_wall')") リセット
          .columns
            .column
              SmartSlider(variable_key="se_tf_wall_perspective" label="視点との距離")
            .column
              SmartSlider(variable_key="se_tf_wall_scale" label="スケール")
          .columns
            .column
              SmartSlider(variable_key="se_tf_wall_rotate_x" label="回転 X")
            .column
              SmartSlider(variable_key="se_tf_wall_rotate_y" label="回転 Y")
            .column
              SmartSlider(variable_key="se_tf_wall_rotate_z" label="回転 Z")
          .columns
            .column
              SmartSlider(variable_key="se_tf_wall_translate_x" label="移動 X")
            .column
              SmartSlider(variable_key="se_tf_wall_translate_y" label="移動 Y")
            .column
              SmartSlider(variable_key="se_tf_wall_translate_z" label="移動 Z")

      hr

      p.help.content
        | 基本的に<b>回転X</b>・<b>視点との距離</b>・<b>移動Z</b>の3つで調整する。
        | これらはスタイルエディタ側でスタイルを適用しているだけで ShogiPlayer が用意している機能ではない。

    CategoryBox(category_key="コントローラー")

      SmartRadio(variable_key="sp_controller" label="コントローラー表示")

      SmartRadio(variable_key="sp_slider" label="スライダー表示")

      SmartSlider(variable_key="sp_controller_width" label="横幅(PC)")

      SmartSlider(variable_key="sp_controller_width_mobile" label="横幅(モバイル時)")

    CategoryBox(category_key="操作感")

      SmartRadio(variable_key="sp_lift_cancel_action" label="持ち上げた駒のキャンセル方法")

    CategoryBox(category_key="反則")

      SmartRadio(variable_key="sp_legal_move_only" label="移動制限")
        template(#message)
          | 駒の特性を考慮する親切オプションで例えば玉は1マスしか動けなくなる。
          | ただし反則のロジックには関与しないためそれが自殺手になっているかはわからない。

      SmartRadio(variable_key="sp_illegal_validate" label="反則検知")
        template(#message)
          | 反則が起きていないかチェックする。
          | 例えば王手ではない状態から利きがあるところに玉を動かせば<b>自殺手</b>の情報を、着手イベント ev_play_mode_move に含める。
          | これを有効にするときは移動制限も有効にすること。

      SmartRadio(variable_key="sp_illegal_cancel" label="反則ブロック")
        template(#message)
          | 反則できないようにするオプション。
          | 反則検知オプション有効時に反則を検知しても ev_play_mode_move に含めない。
          | 代わりに ev_illegal_illegal_accident イベントで反則を投げるが無視してもよい。

      p.help
        | 以上はすべて操作モードでのみ有効である

    CategoryBox(category_key="千日手")

      SmartRadio(variable_key="sp_request_snapshot_hash" label="現局面のハッシュをイベントに含めるか？")
        template(#message)
          | 有効にすると ev_play_mode_move イベントに含める。
          | 同じハッシュの4回目を発生させた側を反則とするかどうかはイベントを受け取った側に任せてある。
          | また設計ミスにより(いまのところは)反則検知ができない。

      SmartRadio(variable_key="sp_request_op_king_check" label="操作モードで王手しているかどうかの結果をイベントに含めるか？")
        template(#message)
          | 連続王手の千日手の判定サポート用

      p.help
        | 以上はすべて操作モードでのみ有効である

    CategoryBox(category_key="デバッグ")
      SmartRadio(variable_key="sp_layer" label="レイヤー確認")
      SmartRadio(variable_key="sp_dev_tools" label="Dev Tools")
      SmartRadio(variable_key="sp_turn_show" label="手数表示")

    CategoryBox(category_key="その他")

      SmartRadio(variable_key="sp_request_checkmate_stat" label="操作モードでの詰み判定")

      SmartSlider(variable_key="sp_common_gap" label="共通の隙間" message="盤の縦幅に対する割合")

      SmartRadio(variable_key="sp_mobile_vertical" label="モバイル時に上下配置にする")
      SmartRadio(variable_key="sp_viewpoint" label="視点" message="☗☖をクリックしても切り替わる")
      SmartRadio(variable_key="sp_overlay_nav" label="盤面左右で局面変更" message="再生モード時のみ有効")

      //- b-field(custom-class="is-small" label="盤が反応するタイミング")
      //-   template(v-for="e in AppContext.ClickResponseTimingInfo.values")
      //-     b-radio-button(size="is-small" v-model="AppContext.sp_click_response_timing" :native-value="e.key") {{e.name}}

    CategoryBox(category_key="棋譜")

      b-field(custom-class="is-small" label="プリセット1")
        b-select(size="is-small" v-model="AppContext.kifu_book_key" @input="AppContext.kifu_book_change_handle")
          option(:value="null")
          template(v-for="e in AppContext.KifuBookInfo.values")
            option(:value="e.key") {{e.name}}

      b-field(custom-class="is-small" label="プリセット2")
        b-select(size="is-small" v-model="AppContext.sfen_book_key" @input="AppContext.sfen_book_change_handle")
          option(:value="null")
          template(v-for="e in AppContext.SfenBookInfo.values")
            option(:value="e.key") {{e.name}}

      b-field.mb-0(custom-class="is-small" label="棋譜")
        b-input(size="is-small" v-model="AppContext.user_body" type="textarea" :rows="8")
      b-field.mt-2(custom-class="is-small" position="is-right")
        .control
          b-button(size="is-small" @click="AppContext.user_body_apply_handle" type="is-primary") 読み込む

      template(v-if="development_p && false")
        b-field(custom-class="is-small" label="反映済みの棋譜")
          b-input(size="is-small" v-model="AppContext.sp_body" type="textarea" :rows="4" readonly)

      SmartRadio(variable_key="sp_comment" label="棋譜コメント表示")

    CategoryBox(category_key="カスタムCSS")
      b-field(custom-class="is-small" label="プリセット")
        .control
          .buttons.mb-0
            template(v-for="e in AppContext.UserCustomCssPresetInfo.values")
              b-button(@click="AppContext.se_user_custom_css_preset_apply_handle(e)" size="is-small") {{e.name}}
      b-field(custom-class="is-small" label="CSS")
        b-input(size="is-small" v-model="AppContext.user_custom_css" type="textarea" :rows="8")

    CategoryBox(category_key="コンポーネント引数確認")
      SmartRadio(variable_key="component_parmas_show_all")
      pre
        | {{AppContext.sp_component_bind_attrs}}
      p.help
        a(href="https://shogi-player.netlify.app/reference/props/" target="_blank") ドキュメント

    CategoryBox(category_key="CSS変数確認")
      SmartRadio(variable_key="css_params_show_all_sp")
      pre
        | {{AppContext.sp_css_human}}
      p.help
        a(href="https://shogi-player.netlify.app/reference/css-variables/" target="_blank") ドキュメント

    CategoryBox(category_key="SE側CSS変数確認")
      SmartRadio(variable_key="css_params_show_all_se")
      pre
        | {{AppContext.se_component_style_human}}
      p.help
        | 実際には StyleEditor(style="...") で渡している

    CategoryBox(category_key="ショートカット")
      pre
        | 0 - 初期化
        | s - 保存
        | l - 復元
        | # - レイヤー ON / OFF
        | d - dev tools ON / OFF
        | c - コントローラー類 ON / OFF
        | Enter / Space / Escape - MENU
        | v - 再生モード
        | p - 操作モード
        | e - 編集モード
        | L - レアイウト切り替え
        |
        | ※編集モードのときは ShogiPlayer 側のショートカットを優先する

    CategoryBox(category_key="開発環境限定")
      SmartRadio(variable_key="se_checkerboard_p" label="チェッカー背景")
      //- b-switch(v-model="AppContext.se_checkerboard_p" size="is-small") チェッカー背景を有効にする
      //- BinarySwitch(variable_key="se_checkerboard_p") チェッカー背景を有効にする
      b-field(label="StyleEditor(:class='...')")
        .control
          pre
            | {{AppContext.se_component_class}}
</template>

<script>
import PureColorPicker from "./PureColorPicker.vue"
import SmartColor from "./SmartColor.vue"
import ImageUploader from "./ImageUploader.vue"
import CategoryBox from "./CategoryBox.vue"
import CategoryName from "./CategoryName.vue"
import SmartSlider from "./SmartSlider.vue"
import SmartRadio from "./SmartRadio.vue"

export default {
  name: "ControlPanel",
  inject: ["AppContext"],
  components: {
    PureColorPicker,
    SmartColor,
    ImageUploader,
    CategoryBox,
    CategoryName,
    SmartSlider,
    SmartRadio,
  },
}
</script>

<style lang="sass">
@import "./support.scss"

.StyleEditorSidebar .ControlPanel
  .box
    margin-top: 1rem
    margin-bottom: 0

  .short_cut_buttons
    display: flex
    flex-wrap: wrap
    gap: 8px
    a
      display: inline

  .storage_buttons
    button
      min-width: 6rem

  .field:not(:last-child)
    margin-bottom: 1.25rem

  pre
    padding: 0.75rem
    font-size: $size-7
    white-space: pre-wrap
    word-break: break-all
</style>
