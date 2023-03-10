<template lang="pug">
.SidebarContent.mx-4.my-4
  .is-flex.is-justify-content-start.is-align-items-center
    b-button(@click="TheSe.sidebar_toggle_handle" icon-left="menu")
    .mx-3.has-text-weight-bold スタイルエディタ

  .my_controls
    .box
      b-field(custom-class="is-small" label="ショートカット")
        .control
          .short_cut_buttons
            template(v-for="e in TheSe.SeSectionInfo.values")
              a.button.is-small.is-marginless(v-scroll-to="{container: '.sidebar-content', element: `#${e.key}`}") {{e.name}}

      b-field(custom-class="is-small" label="プリセット")
        .control
          .buttons.mb-0
            template(v-for="e in TheSe.SePresetInfo.values")
              b-button.mb-0(@click="TheSe.paper_style_handle(e)" size="is-small") {{e.name}}

      b-field(custom-class="is-small" label="パラメータ")
        .control
          .buttons.are-small.storage_buttons
            b-button.mb-0(@click="TheSe.xstore_save_handle") SAVE
            b-button.mb-0(@click="TheSe.xstore_load_handle") LOAD
    .box
      SeTitle(name="基本")
      b-field(custom-class="is-small" label="コンテナ幅")
        b-slider(v-bind="TheSe.slider_attrs" v-model="TheSe.se_frame_width" :min="1" :max="100")
      b-field(custom-class="is-small" label="レイアウト")
        b-radio-button(size="is-small" v-model="TheSe.sp_layout" native-value="horizontal") 左右
        b-radio-button(size="is-small" v-model="TheSe.sp_layout" native-value="vertical") 上下
      b-field(custom-class="is-small" label="モード")
        b-radio-button(size="is-small" v-model="TheSe.sp_mode" native-value="view") 再生
        b-radio-button(size="is-small" v-model="TheSe.sp_mode" native-value="play") 操作
        b-radio-button(size="is-small" v-model="TheSe.sp_mode" native-value="edit") 編集
      b-field(custom-class="is-small" label="レイヤー確認")
        b-radio-button(size="is-small" v-model="TheSe.sp_layer" :native-value="false") OFF
        b-radio-button(size="is-small" v-model="TheSe.sp_layer" :native-value="true") ON
    .box
      SeTitle(name="背景")

      b-field(custom-class="is-small" label="")
        MyColorPicker(v-model="TheSe.se_ws_color" :alpha="false")

      ImageUpload(@input="TheSe.se_ws_image_input_handle")

      b-field(custom-class="is-small" label="色相")
        b-slider(v-bind="TheSe.slider_attrs" v-model="TheSe.se_ws_hue" :min="-0.5" :max="0.5" :step="0.001")
      b-field(custom-class="is-small" label="彩度")
        b-slider(v-bind="TheSe.slider_attrs" v-model="TheSe.se_ws_saturate" :min="0" :max="4.0" :step="0.001")
      b-field(custom-class="is-small" label="彩度(強)")
        b-slider(v-bind="TheSe.slider_attrs" v-model="TheSe.se_ws_saturate2" :min="0" :max="5000" :step="1")
      b-field(custom-class="is-small" label="輝度")
        b-slider(v-bind="TheSe.slider_attrs" v-model="TheSe.se_ws_brightness" :min="0" :max="2.0" :step="0.001")
      b-field(custom-class="is-small" label="ぼかし")
        b-slider(v-bind="TheSe.slider_attrs" v-model="TheSe.se_ws_blur" :min="0" :max="30" :step="0.001")
      b-field(custom-class="is-small" label="セピア")
        b-slider(v-bind="TheSe.slider_attrs" v-model="TheSe.se_ws_sepia" :min="0" :max="1.0" :step="0.001")
      b-field(custom-class="is-small" label="グレースケール")
        b-slider(v-bind="TheSe.slider_attrs" v-model="TheSe.se_ws_grayscale" :min="0" :max="1.0" :step="0.001")
      b-field(custom-class="is-small" label="コントラスト")
        b-slider(v-bind="TheSe.slider_attrs" v-model="TheSe.se_ws_contrast" :min="0" :max="2.0" :step="0.001")
      b-field(custom-class="is-small" label="反転")
        b-slider(v-bind="TheSe.slider_attrs" v-model="TheSe.se_ws_invert" :min="0" :max="1.0" :step="0.001")
      //- b-field(custom-class="is-small" label="非透輝度")
      //-   b-slider(v-bind="TheSe.slider_attrs" v-model="TheSe.se_ws_opacity" :min="0" :max="1.0" :step="0.001")

    .box
      SeTitle(name="盤テクスチャ")

      b-field(custom-class="is-small")
        MyColorPicker(v-model="TheSe.sp_board_color")

      b-field.my-4(custom-class="is-small" label="プリセット画像")
        b-select(size="is-small" v-model="TheSe.sp_board_variant")
          template(v-for="e in TheSe.BoardVariantInfo.values")
            option(:value="e.key") {{e.name}}

      ImageUpload(@input="TheSe.sp_board_image_input_handle")

    .box
      SeTitle(name="盤のセル")

      b-field(custom-class="is-small" label="偶数")
        MyColorPicker(v-model="TheSe.sp_board_even_cell_color")

      b-field(custom-class="is-small" label="奇数")
        MyColorPicker(v-model="TheSe.sp_board_odd_cell_color")

    .box
      SeTitle(name="盤")
      b-field(custom-class="is-small" label="角丸め" message="紙面風なら0にする")
        b-slider(v-bind="TheSe.slider_attrs" v-model="TheSe.sp_board_radius" :min="0" :max="50" :step="0.01")
      b-field(custom-class="is-small" label="余白" message="紙面風なら0にする")
        b-slider(v-bind="TheSe.slider_attrs" v-model="TheSe.sp_board_padding" :min="0" :max="0.05" :step="0.001")
      b-field(custom-class="is-small" label="アスペクト比")
        b-slider(v-bind="TheSe.slider_attrs" v-model="TheSe.sp_board_aspect_ratio" :min="0.5" :max="1.5" :step="0.001")
      b-field(custom-class="is-small" label="左右余白(横レイアウト時有効)" message="盤と持駒の間にタップできない領域ができてしまうため基本0で良い。座標を表示するときのみ少し空けると良いかもしれない")
        b-slider(v-bind="TheSe.slider_attrs" v-model="TheSe.sp_board_horizontal_gap" :min="0" :max="1.0" :step="0.01")
      b-field(custom-class="is-small" label="上下余白(縦レイアウト時有効)" message="基本0で良い" v-if="development_p")
        b-slider(v-bind="TheSe.slider_attrs" v-model="TheSe.sp_board_vertical_gap" :min="0" :max="1.0" :step="0.01")
      .columns.mt-4.mb-2
        .column.py-0
          b-field(custom-class="is-small" label="セル数(W)")
            b-slider(v-bind="TheSe.slider_attrs" v-model="TheSe.sp_board_dimension_w" :min="1" :max="12")
        .column.py-0
          b-field(custom-class="is-small" label="セル数(H)")
            b-slider(v-bind="TheSe.slider_attrs" v-model="TheSe.sp_board_dimension_h" :min="1" :max="12")

    .box
      SeTitle(name="盤グリッド")
      b-field(custom-class="is-small" label="グリッドカラー")
        MyColorPicker(v-model="TheSe.sp_grid_inner_color")
      b-field(custom-class="is-small" label="星・グリッド外枠カラー")
        MyColorPicker(v-model="TheSe.sp_grid_outer_color")
      b-field(custom-class="is-small" label="グリッドの太さ")
        b-slider(v-bind="TheSe.slider_attrs" v-model="TheSe.sp_grid_inner_stroke" :min="0" :max="5" :step="0.5")
      b-field(custom-class="is-small" label="グリッド外枠の太さ")
        b-slider(v-bind="TheSe.slider_attrs" v-model="TheSe.sp_grid_outer_stroke" :min="0" :max="10" :step="0.5")
      b-field(custom-class="is-small" label="エッジの太さ")
        b-slider(v-bind="TheSe.slider_attrs" v-model="TheSe.sp_board_edge_stroke" :min="0" :max="10" :step="0.5")
      b-field(custom-class="is-small" label="星の大きさ")
        b-slider(v-bind="TheSe.slider_attrs" v-model="TheSe.sp_star_size" :min="0" :max="2.0" :step="0.001")
      b-field(custom-class="is-small" label="星の z-index" message="-1のときは盤の奥に描画するため盤が透明でなければ見えない点に注意。星が巨大でセルのイベントを奪ってしまうかつ盤が透明なときのみ-1にする")
        b-radio-button(size="is-small" v-model="TheSe.sp_star_z_index" :native-value="-1") -1
        b-radio-button(size="is-small" v-model="TheSe.sp_star_z_index" :native-value="0") 0

    .box
      SeTitle(name="駒")
      b-field(custom-class="is-small" label="プリセット")
        b-select(size="is-small" v-model="TheSe.sp_piece_variant")
          template(v-for="e in TheSe.PieceVariantInfo.values")
            option(:value="e.key") {{e.name}}
      b-field(custom-class="is-small" label="大きさ")
        b-slider(v-bind="TheSe.slider_attrs" v-model="TheSe.sp_board_piece_size" :min="0" :max="1.0" :step="0.001")
      b-field(custom-class="is-small" label="テクスチャ領域内のマッピンング縦位置(揃える位置)" message="下にすると駒の底辺が揃う(ただし駒の種類による)")
        b-radio-button(size="is-small" v-model="TheSe.sp_board_piece_position" native-value="top") ↑
        b-radio-button(size="is-small" v-model="TheSe.sp_board_piece_position" native-value="center") ・
        b-radio-button(size="is-small" v-model="TheSe.sp_board_piece_position" native-value="bottom") ↓

    .box
      SeTitle(name="駒台")
      b-field(custom-class="is-small" label="レイアウト")
        b-radio-button(size="is-small" v-model="TheSe.sp_stand_gravity" native-value="bottom") 下寄せ
        b-radio-button(size="is-small" v-model="TheSe.sp_stand_gravity" native-value="top") 上寄せ
      b-field(custom-class="is-small" label="相手側を反転")
        b-radio-button(size="is-small" v-model="TheSe.sp_stand_flip" :native-value="false") しない
        b-radio-button(size="is-small" v-model="TheSe.sp_stand_flip" :native-value="true") する
      //- .columns.mt-4
      //-   .column.py-0
      //-     b-field(custom-class="is-small" label="セル(W)" message="盤の左右の(見た目の)隙間に影響する")
      //-       b-slider(v-bind="TheSe.slider_attrs" v-model="TheSe.sp_cell_w" :min="1" :max="80" :step="1")
      //-   .column.py-0
      //-     b-field(custom-class="is-small" label="セル(H)" message="駒と駒の隙間に影響する")
      //-       b-slider(v-bind="TheSe.slider_attrs" v-model="TheSe.sp_cell_h" :min="1" :max="80" :step="1")
      b-field(custom-class="is-small" label="駒の大きさ")
        b-slider(v-bind="TheSe.slider_attrs" v-model="TheSe.sp_stand_piece_size" :min="0" :max="1.0" :step="0.01")
      b-field(custom-class="is-small" label="持駒をhoverさせたときのborder色")
        MyColorPicker(v-model="TheSe.sp_stand_hover_border_color")
      b-field(custom-class="is-small" label="背景色")
        MyColorPicker(v-model="TheSe.sp_stand_bg_color")

    .box
      SeTitle(name="対局者名")
      b-field(custom-class="is-small" label="縦・横書き(全体レイアウトが横の場合のみ有効)" message="英字も考慮して縦書きにするなら横書きのままで1文字ずつ<br>を入れた方が正しく縦書きになる。日本語しか使わないのであれば単に縦書きでもよい。モバイルの場合は狭いので横書きの方がよい")
        b-radio-button(size="is-small" v-model="TheSe.sp_name_direction" native-value="horizontal") 横書き
        b-radio-button(size="is-small" v-model="TheSe.sp_name_direction" native-value="vertical") 縦書き

      b-field(custom-class="is-small" label="名前の大きさ")
        b-slider(v-bind="TheSe.slider_attrs" v-model="TheSe.sp_player_name_size" :min="0" :max="0.5" :step="0.001")

      b-field(custom-class="is-small" label="時間の大きさ")
        b-slider(v-bind="TheSe.slider_attrs" v-model="TheSe.sp_player_time_size" :min="0" :max="0.5" :step="0.001")

      b-field(custom-class="is-small" label="テキストの視認性を上げる(駒数の背景を適用)")
        b-radio-button(size="is-small" v-model="TheSe.sp_balloon" :native-value="false") OFF
        b-radio-button(size="is-small" v-model="TheSe.sp_balloon" :native-value="true") ON

      .columns
        .column
          b-field(custom-class="is-small" label="☗")
            b-input(size="is-small" v-model.trim="TheSe.sp_player_info.black.name" type="text")
        .column
          b-field(custom-class="is-small" label="時間")
            b-input(size="is-small" v-model.trim="TheSe.sp_player_info.black.time" type="text")
      .columns
        .column
          b-field(custom-class="is-small" label="☖")
            b-input(size="is-small" v-model.trim="TheSe.sp_player_info.white.name" type="text")
        .column
          b-field(custom-class="is-small" label="時間")
            b-input(size="is-small" v-model.trim="TheSe.sp_player_info.white.time" type="text")

    .box
      SeTitle(name="駒数")

      .columns.mt-4.is-multiline
        .column.is-12.py-0
          b-field(custom-class="is-small" label="横レイアウト時の相対位置")
        .column.is-6.py-0
          b-field(custom-class="is-small" label="X")
            b-slider(v-bind="TheSe.slider_attrs" v-model="TheSe.sp_piece_count_horizontal_x" :min="-1.0" :max="1.0" :step="0.001")
        .column.is-6.py-0
          b-field(custom-class="is-small" label="Y")
            b-slider(v-bind="TheSe.slider_attrs" v-model="TheSe.sp_piece_count_horizontal_y" :min="-1.0" :max="1.0" :step="0.001")

      .columns.mt-4.is-multiline
        .column.is-12.py-0
          b-field(custom-class="is-small" label="縦レイアウト時の相対位置")
        .column.is-6.py-0
          b-field(custom-class="is-small" label="X")
            b-slider(v-bind="TheSe.slider_attrs" v-model="TheSe.sp_piece_count_vertical_x" :min="-1.0" :max="1.0" :step="0.001")
        .column.is-6.py-0
          b-field(custom-class="is-small" label="Y")
            b-slider(v-bind="TheSe.slider_attrs" v-model="TheSe.sp_piece_count_vertical_y" :min="-1.0" :max="1.0" :step="0.001")

      b-field(custom-class="is-small" label="余白")
        b-slider(v-bind="TheSe.slider_attrs" v-model="TheSe.sp_piece_count_padding" :min="0" :max="1.0" :step="0.01")

      b-field(custom-class="is-small" label="大きさ")
        b-slider(v-bind="TheSe.slider_attrs" v-model="TheSe.sp_piece_count_size" :min="0" :max="1.0" :step="0.01")
      b-field(custom-class="is-small" label="テキスト色 (対局者名にも適用)")
        MyColorPicker(v-model="TheSe.sp_piece_count_font_color")
      b-field(custom-class="is-small" label="背景")
        MyColorPicker(v-model="TheSe.sp_piece_count_bg_color")

    .box
      SeTitle(name="駒箱")
      b-field(custom-class="is-small" label="駒の大きさ")
        b-slider(v-bind="TheSe.slider_attrs" v-model="TheSe.sp_piece_box_piece_size" :min="0" :max="1.0" :step="0.01")
      b-field(custom-class="is-small" label="")
        MyColorPicker(v-model="TheSe.sp_piece_box_color")
      //- .columns.mt-4
      //-   .column.py-0
      //-     b-field(custom-class="is-small" label="セル(W)")
      //-       b-slider(v-bind="TheSe.slider_attrs" v-model="TheSe.sp_cell_w" :min="1" :max="80" :step="1")
      //-   .column.py-0
      //-     b-field(custom-class="is-small" label="セル(H)")
      //-       b-slider(v-bind="TheSe.slider_attrs" v-model="TheSe.sp_cell_h" :min="1" :max="80" :step="1")

      //- .columns.mt-4
      //-   .column.py-0
      //-     b-field(custom-class="is-small" label="持駒画像(W)")
      //-       b-slider(v-bind="TheSe.slider_attrs" v-model="TheSe.sp_cell_w" :min="1" :max="80" :step="1")
      //-   .column.py-0
      //-     b-field(custom-class="is-small" label="持駒画像(H)")
      //-       b-slider(v-bind="TheSe.slider_attrs" v-model="TheSe.sp_cell_h" :min="1" :max="80" :step="1")

    .box
      SeTitle(name="成り不成り選択")
      b-field(custom-class="is-small" label="背景")
        MyColorPicker(v-model="TheSe.sp_promote_select_modal_bg_color")
      b-field(custom-class="is-small" label="hover色")
        MyColorPicker(v-model="TheSe.sp_promote_select_modal_hover_color")

    .box
      SeTitle(name="駒を操作中の移動元スタイル")
      b-field(custom-class="is-small" label="背景")
        MyColorPicker(v-model="TheSe.sp_mouse_lifted_origin_bg_color")
      b-field(custom-class="is-small" label="駒の非透明度")
        b-slider(v-bind="TheSe.slider_attrs" v-model="TheSe.sp_mouse_lifted_origin_opacity" :min="0" :max="1.0" :step="0.001")

    .box
      SeTitle(name="座標")
      b-field(custom-class="is-small" label="表示")
        b-radio-button(size="is-small" v-model="TheSe.sp_coordinate" :native-value="false") OFF
        b-radio-button(size="is-small" v-model="TheSe.sp_coordinate" :native-value="true") ON
      b-field(custom-class="is-small" label="右の表記")
        b-radio-button(size="is-small" v-model="TheSe.sp_coordinate_variant_v" native-value="kanji") 漢字
        b-radio-button(size="is-small" v-model="TheSe.sp_coordinate_variant_v" native-value="number") 数字
        b-radio-button(size="is-small" v-model="TheSe.sp_coordinate_variant_v" native-value="alphabet") アルファベット

      .columns.mt-5
        .column.py-0
          b-field(custom-class="is-small" label="上の大きさ")
            b-slider(v-bind="TheSe.slider_attrs" v-model="TheSe.sp_coordinate_x_size" :min="0" :max="1.0" :step="0.001")
        .column.py-0
          b-field(custom-class="is-small" label="右の大きさ")
            b-slider(v-bind="TheSe.slider_attrs" v-model="TheSe.sp_coordinate_y_size" :min="0" :max="1.0" :step="0.001")

      .columns.mt-5
        .column.py-0
          b-field(custom-class="is-small" label="上の位置")
            b-slider(v-bind="TheSe.slider_attrs" v-model="TheSe.sp_coordinate_x_push" :min="-0.5" :max="0.5" :step="0.001")
        .column.py-0
          b-field(custom-class="is-small" label="右の位置")
            b-slider(v-bind="TheSe.slider_attrs" v-model="TheSe.sp_coordinate_y_push" :min="-0.5" :max="0.5" :step="0.001")

      b-field(custom-class="is-small" label="色")
        MyColorPicker(v-model="TheSe.sp_coordinate_color")

    .box
      SeTitle(name="Transform")
      b-tabs(size="is-small" v-model="TheSe.transform_tab_index" expanded)
        b-tab-item(label="背景")
          b-field(custom-class="is-small" label="")
            b-radio-button(size="is-small" v-model="TheSe.se_tf0_mode" native-value="is_tf0_mode_off") OFF
            b-radio-button(size="is-small" v-model="TheSe.se_tf0_mode" native-value="is_tf0_mode_on") ON
          b-field(custom-class="is-small" label="視点との距離")
            b-slider(v-bind="TheSe.tf0_slider_attrs" v-model="TheSe.se_tf0_perspective" :min="0" :max="400" :step="0.001")
          b-field(custom-class="is-small" label="移動 X")
            b-slider(v-bind="TheSe.tf0_slider_attrs" v-model="TheSe.se_tf0_translate_x" :min="-1000" :max="1000" :step="1")
          b-field(custom-class="is-small" label="移動 Y")
            b-slider(v-bind="TheSe.tf0_slider_attrs" v-model="TheSe.se_tf0_translate_y" :min="-1000" :max="1000" :step="1")
          b-field(custom-class="is-small" label="移動 Z")
            b-slider(v-bind="TheSe.tf0_slider_attrs" v-model="TheSe.se_tf0_translate_z" :min="-1000" :max="1000" :step="1")
          b-field(custom-class="is-small" label="回転 X")
            b-slider(v-bind="TheSe.tf0_slider_attrs" v-model="TheSe.se_tf0_rotate_x" :min="-1" :max="1" :step="0.001")
          b-field(custom-class="is-small" label="回転 Y")
            b-slider(v-bind="TheSe.tf0_slider_attrs" v-model="TheSe.se_tf0_rotate_y" :min="-1" :max="1" :step="0.001")
          b-field(custom-class="is-small" label="回転 Z")
            b-slider(v-bind="TheSe.tf0_slider_attrs" v-model="TheSe.se_tf0_rotate_z" :min="-1" :max="1" :step="0.001")
          b-field(custom-class="is-small" label="拡縮")
            b-slider(v-bind="TheSe.tf0_slider_attrs" v-model="TheSe.se_tf0_scale" :min="0" :max="2.0" :step="0.001")
          b-field(custom-class="is-small")
            .control
              b-button(size="is-small" @click="TheSe.se_tf0_reset") リセット

        b-tab-item(label="盤")
          b-field(custom-class="is-small" label="" message="有効にすると背景とのブレンドは効かなくなる")
            b-radio-button(size="is-small" v-model="TheSe.se_tf1_mode" native-value="is_tf1_mode_off") OFF
            b-radio-button(size="is-small" v-model="TheSe.se_tf1_mode" native-value="is_tf1_mode_on") ON
          b-field(custom-class="is-small" label="視点との距離")
            b-slider(v-bind="TheSe.tf1_slider_attrs" v-model="TheSe.se_tf1_perspective" :min="0" :max="400" :step="0.001")
          b-field(custom-class="is-small" label="移動 X")
            b-slider(v-bind="TheSe.tf1_slider_attrs" v-model="TheSe.se_tf1_translate_x" :min="-1000" :max="1000" :step="1")
          b-field(custom-class="is-small" label="移動 Y")
            b-slider(v-bind="TheSe.tf1_slider_attrs" v-model="TheSe.se_tf1_translate_y" :min="-1000" :max="1000" :step="1")
          b-field(custom-class="is-small" label="移動 Z")
            b-slider(v-bind="TheSe.tf1_slider_attrs" v-model="TheSe.se_tf1_translate_z" :min="-1000" :max="1000" :step="1")
          b-field(custom-class="is-small" label="回転 X")
            b-slider(v-bind="TheSe.tf1_slider_attrs" v-model="TheSe.se_tf1_rotate_x" :min="-1" :max="1" :step="0.001")
          b-field(custom-class="is-small" label="回転 Y")
            b-slider(v-bind="TheSe.tf1_slider_attrs" v-model="TheSe.se_tf1_rotate_y" :min="-1" :max="1" :step="0.001")
          b-field(custom-class="is-small" label="回転 Z")
            b-slider(v-bind="TheSe.tf1_slider_attrs" v-model="TheSe.se_tf1_rotate_z" :min="-1" :max="1" :step="0.001")
          b-field(custom-class="is-small" label="拡縮")
            b-slider(v-bind="TheSe.tf1_slider_attrs" v-model="TheSe.se_tf1_scale" :min="0" :max="2.0" :step="0.001")
          b-field(custom-class="is-small")
            .control
              b-button(size="is-small" @click="TheSe.se_tf1_reset") リセット
        b-tab-item(label="駒")
          b-field(custom-class="is-small" label="" message="有効にすると盤とのブレンドは効かなくなる")
            b-radio-button(size="is-small" v-model="TheSe.se_tf2_mode" native-value="is_tf2_mode_off") OFF
            b-radio-button(size="is-small" v-model="TheSe.se_tf2_mode" native-value="is_tf2_mode_on") ON
          b-field(custom-class="is-small" label="視点との距離")
            b-slider(v-bind="TheSe.tf2_slider_attrs" v-model="TheSe.se_tf2_perspective" :min="0" :max="400" :step="0.001")
          b-field(custom-class="is-small" label="移動 X")
            b-slider(v-bind="TheSe.tf2_slider_attrs" v-model="TheSe.se_tf2_translate_x" :min="-1000" :max="1000" :step="1")
          b-field(custom-class="is-small" label="移動 Y")
            b-slider(v-bind="TheSe.tf2_slider_attrs" v-model="TheSe.se_tf2_translate_y" :min="-1000" :max="1000" :step="1")
          b-field(custom-class="is-small" label="移動 Z")
            b-slider(v-bind="TheSe.tf2_slider_attrs" v-model="TheSe.se_tf2_translate_z" :min="-1000" :max="1000" :step="1")
          b-field(custom-class="is-small" label="回転 X")
            b-slider(v-bind="TheSe.tf2_slider_attrs" v-model="TheSe.se_tf2_rotate_x" :min="-1" :max="1" :step="0.001")
          b-field(custom-class="is-small" label="回転 Y")
            b-slider(v-bind="TheSe.tf2_slider_attrs" v-model="TheSe.se_tf2_rotate_y" :min="-1" :max="1" :step="0.001")
          b-field(custom-class="is-small" label="回転 Z")
            b-slider(v-bind="TheSe.tf2_slider_attrs" v-model="TheSe.se_tf2_rotate_z" :min="-1" :max="1" :step="0.001")
          b-field(custom-class="is-small" label="拡縮")
            b-slider(v-bind="TheSe.tf2_slider_attrs" v-model="TheSe.se_tf2_scale" :min="0" :max="2.0" :step="0.001")
          b-field(custom-class="is-small")
            .control
              b-button(size="is-small" @click="TheSe.se_tf2_reset") リセット

    .box
      SeTitle(name="コントローラー＆スライダー")

      b-field(custom-class="is-small" label="横幅")
        b-slider(v-bind="TheSe.slider_attrs" v-model="TheSe.sp_controller_width" :min="0" :max="1.0" :step="0.001")

      b-field(custom-class="is-small" label="横幅(モバイル時)")
        b-slider(v-bind="TheSe.slider_attrs" v-model="TheSe.sp_controller_width_mobile" :min="0" :max="1.0" :step="0.001")

      b-field(custom-class="is-small" label="コントローラー表示")
        b-radio-button(size="is-small" v-model="TheSe.sp_controller" :native-value="false") OFF
        b-radio-button(size="is-small" v-model="TheSe.sp_controller" :native-value="true") ON

      b-field(custom-class="is-small" label="スライダー表示")
        b-radio-button(size="is-small" v-model="TheSe.sp_slider" :native-value="false") OFF
        b-radio-button(size="is-small" v-model="TheSe.sp_slider" :native-value="true") ON

    .box
      SeTitle(name="その他")

      b-field(custom-class="is-small" label="手番のときの☗☖の大きさ")
        b-slider(v-bind="TheSe.slider_attrs" v-model="TheSe.sp_location_mark_active_size" :min="0" :max="1.5" :step="0.01")

      b-field(custom-class="is-small" label="手番でないときの☗☖の大きさ")
        b-slider(v-bind="TheSe.slider_attrs" v-model="TheSe.sp_location_mark_inactive_size" :min="0" :max="1.5" :step="0.01")

      b-field(custom-class="is-small" label="共通の隙間" message="駒セル縦幅に対する割合")
        b-slider(v-bind="TheSe.slider_attrs" v-model="TheSe.sp_common_gap" :min="0" :max="0.1" :step="0.0001")

      b-field(custom-class="is-small" label="モバイル時に縦配置にする")
        b-radio-button(size="is-small" v-model="TheSe.sp_mobile_vertical" :native-value="false") OFF
        b-radio-button(size="is-small" v-model="TheSe.sp_mobile_vertical" :native-value="true") ON

      b-field(custom-class="is-small" label="視点")
        b-radio-button(size="is-small" v-model="TheSe.sp_viewpoint" native-value="black") ☗
        b-radio-button(size="is-small" v-model="TheSe.sp_viewpoint" native-value="white") ☖

      b-field(custom-class="is-small" label="手数表示")
        b-radio-button(size="is-small" v-model="TheSe.sp_turn_show" :native-value="false") OFF
        b-radio-button(size="is-small" v-model="TheSe.sp_turn_show" :native-value="true") ON

      b-field(custom-class="is-small" label="Dev Tools")
        b-radio-button(size="is-small" v-model="TheSe.sp_dev_tools" :native-value="false") OFF
        b-radio-button(size="is-small" v-model="TheSe.sp_dev_tools" :native-value="true") ON

      b-field(custom-class="is-small" label="KIFコメ表示")
        b-radio-button(size="is-small" v-model="TheSe.sp_comment" :native-value="false") OFF
        b-radio-button(size="is-small" v-model="TheSe.sp_comment" :native-value="true") ON

      b-field(custom-class="is-small" label="操作モードでは合法手に絞る(二歩・ワープ・王手放置等を除く)")
        b-radio-button(size="is-small" v-model="TheSe.sp_legal_move_only" :native-value="false") OFF
        b-radio-button(size="is-small" v-model="TheSe.sp_legal_move_only" :native-value="true") ON

      b-field(custom-class="is-small" label="操作モードでの反則判定")
        b-radio-button(size="is-small" v-model="TheSe.sp_illegal_validate" :native-value="false") OFF
        b-radio-button(size="is-small" v-model="TheSe.sp_illegal_validate" :native-value="true") ON

      b-field(custom-class="is-small" label="持駒のキャンセル方法")
        b-radio-button(size="is-small" v-model="TheSe.sp_lift_cancel_action" native-value="reality") 元位置
        b-radio-button(size="is-small" v-model="TheSe.sp_lift_cancel_action" native-value="standard") 別駒
        b-radio-button(size="is-small" v-model="TheSe.sp_lift_cancel_action" native-value="rehold") 持替

      b-field(custom-class="is-small" label="チェッカー背景")
        b-radio-button(size="is-small" v-model="TheSe.se_bg_pattern" :native-value="false") OFF
        b-radio-button(size="is-small" v-model="TheSe.se_bg_pattern" :native-value="true") ON

    .box
      SeTitle(name="棋譜")
      b-field.my-4(custom-class="is-small" label="プリセット")
        b-select(size="is-small" v-model="TheSe.kifu_sample_key" @input="TheSe.kifu_sample_key_input_handle")
          option(:value="null")
          template(v-for="e in TheSe.KifuBookInfo.values")
            option(:value="e.key") {{e.name}}
      b-field(custom-class="is-small" label="棋譜")
        b-input(size="is-small" v-model="TheSe.sp_body" type="textarea" :rows="8")
    .box
      SeTitle(name="カスタムCSS")
      b-field(custom-class="is-small" label="")
        b-input(size="is-small" v-model="TheSe.user_custom_css" type="textarea" :rows="8")
    .box
      SeTitle(name="コンポーネント引数確認")
      pre
        | {{TheSe.sp_params}}
    .box
      SeTitle(name="CSS変数確認")
      pre
        | {{TheSe.sp_css_human}}
    .box(v-if="development_p")
      SeTitle(name="コメントを除去したCSS")
      pre
        | {{TheSe.sp_css_embed}}
</template>

<script>
export default {
  name: "SidebarContent",
  inject: ["TheSe"],
}
</script>

<style lang="sass">
@import "./support.sass"

.SidebarContent
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

  .b-slider
    margin: 0 // .help が下すぎるのを防ぐため
    .help
      margin-top: 0.5rem

    .b-slider-thumb-wrapper.has-indicator
      .b-slider-thumb
        padding: 8px 4px
        font-size: 10px

  pre
    padding: 0.75rem
    font-size: $size-7
</style>
