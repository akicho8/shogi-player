<template lang="pug">
.StyleEditor.is-relative(:class="component_class")
  .StyleEditor-Background.is-overlay(:class="component_background_class")

  div(is="style" v-text="comment_removed_css")
  div(is="style" v-text="user_css")

  b-sidebar.StyleEditor-Sidebar(fullheight right v-model="sidebar_p" position="fixed")
    .mx-4.my-4
      .is-flex.is-justify-content-start.is-align-items-center
        b-button(@click="sidebar_toggle_handle" icon-left="menu")
        .mx-3.has-text-weight-bold スタイルエディタ

      .my_controls
        .box
          .short_cut_buttons
            template(v-for="e in SeConfig.section_names")
              a.button.is-small.is-marginless(v-scroll-to="{container: '.sidebar-content', element: `#${e}`}") {{e}}
        .box
          SeTitle(name="基本")
          b-field(custom-class="is-small" label="コンテナ幅")
            b-slider(v-bind="slider_attrs" v-model="se_frame_width" :min="1" :max="100")
          b-field(custom-class="is-small" label="レイアウト")
            b-radio-button(size="is-small" v-model="sp_layout" native-value="is_layout_horizontal") 左右
            b-radio-button(size="is-small" v-model="sp_layout" native-value="is_layout_vertical") 上下
          b-field(custom-class="is-small" label="モード")
            b-radio-button(size="is-small" v-model="sp_run_mode" native-value="view_mode") 再生
            b-radio-button(size="is-small" v-model="sp_run_mode" native-value="play_mode") 操作
            b-radio-button(size="is-small" v-model="sp_run_mode" native-value="edit_mode") 編集
          b-field(custom-class="is-small" label="レイヤー確認")
            b-radio-button(size="is-small" v-model="sp_layer" native-value="is_layer_off") OFF
            b-radio-button(size="is-small" v-model="sp_layer" native-value="is_layer_on") ON
          b-field(custom-class="is-small" label="プリセット")
            .control
              .buttons
                b-button(@click="paper_style_handle" size="is-small") 紙面風
                //- b-button(@click="all_reset_handle" size="is-small") 初期化
        .box
          SeTitle(name="背景")

          b-field(custom-class="is-small" label="")
            MyColorPicker(v-model="se_ws_color" :has_alpha="false")

          ImageUpload(@input="se_ws_image_input_handle")

          b-field(custom-class="is-small" label="色相")
            b-slider(v-bind="slider_attrs" v-model="se_ws_hue" :min="-0.5" :max="0.5" :step="0.001")
          b-field(custom-class="is-small" label="彩度")
            b-slider(v-bind="slider_attrs" v-model="se_ws_saturate" :min="0" :max="4.0" :step="0.001")
          b-field(custom-class="is-small" label="彩度(強)")
            b-slider(v-bind="slider_attrs" v-model="se_ws_saturate2" :min="0" :max="5000" :step="1")
          b-field(custom-class="is-small" label="輝度")
            b-slider(v-bind="slider_attrs" v-model="se_ws_brightness" :min="0" :max="2.0" :step="0.001")
          b-field(custom-class="is-small" label="ぼかし")
            b-slider(v-bind="slider_attrs" v-model="se_ws_blur" :min="0" :max="30" :step="0.001")
          b-field(custom-class="is-small" label="セピア")
            b-slider(v-bind="slider_attrs" v-model="se_ws_sepia" :min="0" :max="1.0" :step="0.001")
          b-field(custom-class="is-small" label="グレースケール")
            b-slider(v-bind="slider_attrs" v-model="se_ws_grayscale" :min="0" :max="1.0" :step="0.001")
          b-field(custom-class="is-small" label="コントラスト")
            b-slider(v-bind="slider_attrs" v-model="se_ws_contrast" :min="0" :max="2.0" :step="0.001")
          b-field(custom-class="is-small" label="反転")
            b-slider(v-bind="slider_attrs" v-model="se_ws_invert" :min="0" :max="1.0" :step="0.001")
          //- b-field(custom-class="is-small" label="非透輝度")
          //-   b-slider(v-bind="slider_attrs" v-model="se_ws_opacity" :min="0" :max="1.0" :step="0.001")

        .box
          SeTitle(name="盤テクスチャ")

          b-field(custom-class="is-small" label="")
            MyColorPicker(v-model="sp_board_color")

          b-field.my-4(custom-class="is-small" label="プリセット画像")
            b-select(size="is-small" v-model="sp_bg_variant")
              template(v-for="e in BgVariantInfo.values")
                option(:value="e.key") {{e.name}}

          ImageUpload(@input="sp_board_image_input_handle")

        .box
          SeTitle(name="盤")
          b-field(custom-class="is-small" label="角丸め" message="紙面風なら0にする")
            b-slider(v-bind="slider_attrs" v-model="sp_board_radius" :min="0" :max="50" :step="0.01")
          b-field(custom-class="is-small" label="余白" message="紙面風なら0にする")
            b-slider(v-bind="slider_attrs" v-model="sp_board_padding" :min="0" :max="0.05" :step="0.001")
          b-field(custom-class="is-small" label="アスペクト比")
            b-slider(v-bind="slider_attrs" v-model="sp_board_aspect_ratio" :min="0.5" :max="1.5" :step="0.001")
          b-field(custom-class="is-small" label="左右余白(横レイアウト時有効)" message="盤と持駒の間にタップできない領域ができてしまうため基本0で良い。座標を表示するときのみ少し空けると良いかもしれない")
            b-slider(v-bind="slider_attrs" v-model="sp_board_horizontal_gap" :min="0" :max="1.0" :step="0.01")
          b-field(custom-class="is-small" label="上下余白(縦レイアウト時有効)" message="基本0で良い" v-if="development_p")
            b-slider(v-bind="slider_attrs" v-model="sp_board_vertical_gap" :min="0" :max="1.0" :step="0.01")
          .columns.mt-4.mb-2
            .column.py-0
              b-field(custom-class="is-small" label="セル数(W)")
                b-slider(v-bind="slider_attrs" v-model="sp_board_dimension_w" :min="1" :max="12")
            .column.py-0
              b-field(custom-class="is-small" label="セル数(H)")
                b-slider(v-bind="slider_attrs" v-model="sp_board_dimension_h" :min="1" :max="12")

        .box
          SeTitle(name="盤グリッド")
          b-field(custom-class="is-small" label="グリッドカラー")
            MyColorPicker(v-model="sp_grid_color")
          b-field(custom-class="is-small" label="星・グリッド外枠カラー")
            MyColorPicker(v-model="sp_grid_outer_color")
          b-field(custom-class="is-small" label="グリッドの太さ")
            b-slider(v-bind="slider_attrs" v-model="sp_grid_stroke" :min="0" :max="5" :step="0.5")
          b-field(custom-class="is-small" label="グリッド外枠の太さ")
            b-slider(v-bind="slider_attrs" v-model="sp_grid_outer_stroke" :min="0" :max="10" :step="0.5")
          b-field(custom-class="is-small" label="星の大きさ")
            b-slider(v-bind="slider_attrs" v-model="sp_grid_star_size" :min="0" :max="2.0" :step="0.001")
          b-field(custom-class="is-small" label="星の z-index" message="-1のときは盤の奥に描画するため盤が透明でなければ見えない点に注意。星が巨大でセルのイベントを奪ってしまうかつ盤が透明なときのみ-1にする")
            b-radio-button(size="is-small" v-model="sp_grid_star_z_index" :native-value="-1") -1
            b-radio-button(size="is-small" v-model="sp_grid_star_z_index" :native-value="0") 0

        .box
          SeTitle(name="駒")
          b-field(custom-class="is-small" label="プリセット")
            b-select(size="is-small" v-model="sp_piece_variant")
              template(v-for="e in PiVariantInfo.values")
                option(:value="e.key") {{e.name}}
          b-field(custom-class="is-small" label="大きさ")
            b-slider(v-bind="slider_attrs" v-model="sp_board_piece_size" :min="0" :max="1.0" :step="0.001")
          b-field(custom-class="is-small" label="テクスチャ領域内のマッピンング縦位置(揃える位置)" message="下にすると駒の底辺が揃う(ただし駒の種類による)")
            b-radio-button(size="is-small" v-model="sp_board_piece_position" native-value="top") ↑
            b-radio-button(size="is-small" v-model="sp_board_piece_position" native-value="center") ・
            b-radio-button(size="is-small" v-model="sp_board_piece_position" native-value="bottom") ↓

        .box
          SeTitle(name="駒台")
          b-field(custom-class="is-small" label="レイアウト")
            b-radio-button(size="is-small" v-model="sp_stand_gravity" native-value="is_stand_gravity_bottom") 下寄せ
            b-radio-button(size="is-small" v-model="sp_stand_gravity" native-value="is_stand_gravity_top") 上寄せ
          //- .columns.mt-4
          //-   .column.py-0
          //-     b-field(custom-class="is-small" label="セル(W)" message="盤の左右の(見た目の)隙間に影響する")
          //-       b-slider(v-bind="slider_attrs" v-model="sp_base_w" :min="1" :max="80" :step="1")
          //-   .column.py-0
          //-     b-field(custom-class="is-small" label="セル(H)" message="駒と駒の隙間に影響する")
          //-       b-slider(v-bind="slider_attrs" v-model="sp_base_h" :min="1" :max="80" :step="1")
          b-field(custom-class="is-small" label="駒の大きさ")
            b-slider(v-bind="slider_attrs" v-model="sp_stand_piece_size" :min="0" :max="1.0" :step="0.01")
          b-field(custom-class="is-small" label="持駒をhoverさせたときのborder色")
            MyColorPicker(v-model="sp_stand_hover_border_color")
          b-field(custom-class="is-small" label="背景色")
            MyColorPicker(v-model="sp_stand_bg_color")

        .box
          SeTitle(name="対局者名")
          b-field(custom-class="is-small" label="縦・横書き(全体レイアウトが横の場合のみ有効)" message="英字も考慮して縦書きにするなら横書きのままで1文字ずつ<br>を入れた方が正しく縦書きになる。日本語しか使わないのであれば単に縦書きでもよい。モバイルの場合は狭いので横書きの方がよい")
            b-radio-button(size="is-small" v-model="sp_player_name_direction" native-value="is_player_name_direction_horizontal") 横書き
            b-radio-button(size="is-small" v-model="sp_player_name_direction" native-value="is_player_name_direction_vertical") 縦書き

          b-field(custom-class="is-small" label="名前の大きさ")
            b-slider(v-bind="slider_attrs" v-model="sp_player_name_size" :min="0" :max="0.5" :step="0.001")

          b-field(custom-class="is-small" label="時間の大きさ")
            b-slider(v-bind="slider_attrs" v-model="sp_player_time_size" :min="0" :max="0.5" :step="0.001")

          b-field(custom-class="is-small" label="テキストの視認性を上げる(駒数の背景を適用)")
            b-radio-button(size="is-small" v-model="sp_balloon" native-value="is_balloon_off") OFF
            b-radio-button(size="is-small" v-model="sp_balloon" native-value="is_balloon_on") ON

          .columns
            .column
              b-field(custom-class="is-small" label="☗")
                b-input(size="is-small" v-model.trim="sp_player_info.black.name" type="text")
            .column
              b-field(custom-class="is-small" label="時間")
                b-input(size="is-small" v-model.trim="sp_player_info.black.time" type="text")
          .columns
            .column
              b-field(custom-class="is-small" label="☖")
                b-input(size="is-small" v-model.trim="sp_player_info.white.name" type="text")
            .column
              b-field(custom-class="is-small" label="時間")
                b-input(size="is-small" v-model.trim="sp_player_info.white.time" type="text")

        .box
          SeTitle(name="駒数")

          .columns.mt-4.is-multiline
            .column.is-12.py-0
              b-field(custom-class="is-small" label="横レイアウト時の相対位置")
            .column.is-6.py-0
              b-field(custom-class="is-small" label="X")
                b-slider(v-bind="slider_attrs" v-model="sp_piece_count_horizontal_x" :min="-1.0" :max="1.0" :step="0.001")
            .column.is-6.py-0
              b-field(custom-class="is-small" label="Y")
                b-slider(v-bind="slider_attrs" v-model="sp_piece_count_horizontal_y" :min="-1.0" :max="1.0" :step="0.001")

          .columns.mt-4.is-multiline
            .column.is-12.py-0
              b-field(custom-class="is-small" label="縦レイアウト時の相対位置")
            .column.is-6.py-0
              b-field(custom-class="is-small" label="X")
                b-slider(v-bind="slider_attrs" v-model="sp_piece_count_vertical_x" :min="-1.0" :max="1.0" :step="0.001")
            .column.is-6.py-0
              b-field(custom-class="is-small" label="Y")
                b-slider(v-bind="slider_attrs" v-model="sp_piece_count_vertical_y" :min="-1.0" :max="1.0" :step="0.001")

          b-field(custom-class="is-small" label="余白")
            b-slider(v-bind="slider_attrs" v-model="sp_piece_count_padding" :min="0" :max="1.0" :step="0.01")

          b-field(custom-class="is-small" label="大きさ")
            b-slider(v-bind="slider_attrs" v-model="sp_piece_count_size" :min="0" :max="1.0" :step="0.01")
          b-field(custom-class="is-small" label="テキスト色 (対局者名にも適用)")
            MyColorPicker(v-model="sp_piece_count_font_color")
          b-field(custom-class="is-small" label="背景")
            MyColorPicker(v-model="sp_piece_count_bg_color")

        .box
          SeTitle(name="駒箱")
          b-field(custom-class="is-small" label="駒の大きさ")
            b-slider(v-bind="slider_attrs" v-model="sp_piece_box_piece_size" :min="0" :max="1.0" :step="0.01")
          b-field(custom-class="is-small" label="")
            MyColorPicker(v-model="sp_piece_box_color")
          //- .columns.mt-4
          //-   .column.py-0
          //-     b-field(custom-class="is-small" label="セル(W)")
          //-       b-slider(v-bind="slider_attrs" v-model="sp_base_w" :min="1" :max="80" :step="1")
          //-   .column.py-0
          //-     b-field(custom-class="is-small" label="セル(H)")
          //-       b-slider(v-bind="slider_attrs" v-model="sp_base_h" :min="1" :max="80" :step="1")

          //- .columns.mt-4
          //-   .column.py-0
          //-     b-field(custom-class="is-small" label="持駒画像(W)")
          //-       b-slider(v-bind="slider_attrs" v-model="sp_base_w" :min="1" :max="80" :step="1")
          //-   .column.py-0
          //-     b-field(custom-class="is-small" label="持駒画像(H)")
          //-       b-slider(v-bind="slider_attrs" v-model="sp_base_h" :min="1" :max="80" :step="1")

        //- .box
        //-   SeTitle(name="モバイル
        //-   b-field(custom-class="is-small" label="縦配置にする")
        //-     b-radio-button(size="is-small" v-model="sp_mobile_vertical" native-value="is_mobile_vertical_off") OFF
        //-     b-radio-button(size="is-small" v-model="sp_mobile_vertical" native-value="is_mobile_vertical_on") ON

        .box
          SeTitle(name="成り不成り選択")
          b-field(custom-class="is-small" label="背景")
            MyColorPicker(v-model="sp_promote_select_modal_bg_color")
          b-field(custom-class="is-small" label="hover色")
            MyColorPicker(v-model="sp_promote_select_modal_hover_color")

        .box
          SeTitle(name="駒を操作中の移動元スタイル")
          b-field(custom-class="is-small" label="背景")
            MyColorPicker(v-model="sp_lifted_origin_bg_color_desktop")
          b-field(custom-class="is-small" label="駒の非透明度")
            b-slider(v-bind="slider_attrs" v-model="sp_lifted_origin_opacity_desktop" :min="0" :max="1.0" :step="0.001")

        .box
          SeTitle(name="座標")
          b-field(custom-class="is-small" label="表示")
            b-radio-button(size="is-small" v-model="sp_digit_label" native-value="is_digit_label_off") OFF
            b-radio-button(size="is-small" v-model="sp_digit_label" native-value="is_digit_label_on") ON
          b-field(custom-class="is-small" label="右の表記")
            b-radio-button(size="is-small" v-model="sp_digit_label_variant" native-value="is_digit_label_variant_kanji") 漢字
            b-radio-button(size="is-small" v-model="sp_digit_label_variant" native-value="is_digit_label_variant_number") 数字
            b-radio-button(size="is-small" v-model="sp_digit_label_variant" native-value="is_digit_label_variant_alphabet") アルファベット

          .columns.mt-5
            .column.py-0
              b-field(custom-class="is-small" label="上の大きさ")
                b-slider(v-bind="slider_attrs" v-model="sp_digit_xlabel_size" :min="0" :max="1.0" :step="0.001")
            .column.py-0
              b-field(custom-class="is-small" label="右の大きさ")
                b-slider(v-bind="slider_attrs" v-model="sp_digit_ylabel_size" :min="0" :max="1.0" :step="0.001")

          .columns.mt-5
            .column.py-0
              b-field(custom-class="is-small" label="上の位置")
                b-slider(v-bind="slider_attrs" v-model="sp_digit_xlabel_push" :min="-0.5" :max="0.5" :step="0.001")
            .column.py-0
              b-field(custom-class="is-small" label="右の位置")
                b-slider(v-bind="slider_attrs" v-model="sp_digit_ylabel_push" :min="-0.5" :max="0.5" :step="0.001")

          b-field(custom-class="is-small" label="色")
            MyColorPicker(v-model="sp_digit_label_color")

        .box
          SeTitle(name="Transform")
          b-tabs(size="is-small" v-model="transform_tab_index" expanded)
            b-tab-item(label="背景")
              b-field(custom-class="is-small" label="")
                b-radio-button(size="is-small" v-model="se_tf0_mode" native-value="is_tf0_mode_off") OFF
                b-radio-button(size="is-small" v-model="se_tf0_mode" native-value="is_tf0_mode_on") ON
              b-field(custom-class="is-small" label="視点との距離")
                b-slider(v-bind="tf0_slider_attrs" v-model="se_tf0_perspective" :min="0" :max="400" :step="0.001")
              b-field(custom-class="is-small" label="移動 X")
                b-slider(v-bind="tf0_slider_attrs" v-model="se_tf0_translate_x" :min="-1000" :max="1000" :step="1")
              b-field(custom-class="is-small" label="移動 Y")
                b-slider(v-bind="tf0_slider_attrs" v-model="se_tf0_translate_y" :min="-1000" :max="1000" :step="1")
              b-field(custom-class="is-small" label="移動 Z")
                b-slider(v-bind="tf0_slider_attrs" v-model="se_tf0_translate_z" :min="-1000" :max="1000" :step="1")
              b-field(custom-class="is-small" label="回転 X")
                b-slider(v-bind="tf0_slider_attrs" v-model="se_tf0_rotate_x" :min="-1" :max="1" :step="0.001")
              b-field(custom-class="is-small" label="回転 Y")
                b-slider(v-bind="tf0_slider_attrs" v-model="se_tf0_rotate_y" :min="-1" :max="1" :step="0.001")
              b-field(custom-class="is-small" label="回転 Z")
                b-slider(v-bind="tf0_slider_attrs" v-model="se_tf0_rotate_z" :min="-1" :max="1" :step="0.001")
              b-field(custom-class="is-small" label="拡縮")
                b-slider(v-bind="tf0_slider_attrs" v-model="se_tf0_scale" :min="0" :max="2.0" :step="0.001")
              b-field(custom-class="is-small")
                .control
                  b-button(size="is-small" @click="se_tf0_reset") リセット

            b-tab-item(label="盤")
              b-field(custom-class="is-small" label="" message="有効にすると背景とのブレンドは効かなくなる")
                b-radio-button(size="is-small" v-model="se_tf1_mode" native-value="is_tf1_mode_off") OFF
                b-radio-button(size="is-small" v-model="se_tf1_mode" native-value="is_tf1_mode_on") ON
              b-field(custom-class="is-small" label="視点との距離")
                b-slider(v-bind="tf1_slider_attrs" v-model="se_tf1_perspective" :min="0" :max="400" :step="0.001")
              b-field(custom-class="is-small" label="移動 X")
                b-slider(v-bind="tf1_slider_attrs" v-model="se_tf1_translate_x" :min="-1000" :max="1000" :step="1")
              b-field(custom-class="is-small" label="移動 Y")
                b-slider(v-bind="tf1_slider_attrs" v-model="se_tf1_translate_y" :min="-1000" :max="1000" :step="1")
              b-field(custom-class="is-small" label="移動 Z")
                b-slider(v-bind="tf1_slider_attrs" v-model="se_tf1_translate_z" :min="-1000" :max="1000" :step="1")
              b-field(custom-class="is-small" label="回転 X")
                b-slider(v-bind="tf1_slider_attrs" v-model="se_tf1_rotate_x" :min="-1" :max="1" :step="0.001")
              b-field(custom-class="is-small" label="回転 Y")
                b-slider(v-bind="tf1_slider_attrs" v-model="se_tf1_rotate_y" :min="-1" :max="1" :step="0.001")
              b-field(custom-class="is-small" label="回転 Z")
                b-slider(v-bind="tf1_slider_attrs" v-model="se_tf1_rotate_z" :min="-1" :max="1" :step="0.001")
              b-field(custom-class="is-small" label="拡縮")
                b-slider(v-bind="tf1_slider_attrs" v-model="se_tf1_scale" :min="0" :max="2.0" :step="0.001")
              b-field(custom-class="is-small")
                .control
                  b-button(size="is-small" @click="se_tf1_reset") リセット
            b-tab-item(label="駒")
              b-field(custom-class="is-small" label="" message="有効にすると盤とのブレンドは効かなくなる")
                b-radio-button(size="is-small" v-model="se_tf2_mode" native-value="is_tf2_mode_off") OFF
                b-radio-button(size="is-small" v-model="se_tf2_mode" native-value="is_tf2_mode_on") ON
              b-field(custom-class="is-small" label="視点との距離")
                b-slider(v-bind="tf2_slider_attrs" v-model="se_tf2_perspective" :min="0" :max="400" :step="0.001")
              b-field(custom-class="is-small" label="移動 X")
                b-slider(v-bind="tf2_slider_attrs" v-model="se_tf2_translate_x" :min="-1000" :max="1000" :step="1")
              b-field(custom-class="is-small" label="移動 Y")
                b-slider(v-bind="tf2_slider_attrs" v-model="se_tf2_translate_y" :min="-1000" :max="1000" :step="1")
              b-field(custom-class="is-small" label="移動 Z")
                b-slider(v-bind="tf2_slider_attrs" v-model="se_tf2_translate_z" :min="-1000" :max="1000" :step="1")
              b-field(custom-class="is-small" label="回転 X")
                b-slider(v-bind="tf2_slider_attrs" v-model="se_tf2_rotate_x" :min="-1" :max="1" :step="0.001")
              b-field(custom-class="is-small" label="回転 Y")
                b-slider(v-bind="tf2_slider_attrs" v-model="se_tf2_rotate_y" :min="-1" :max="1" :step="0.001")
              b-field(custom-class="is-small" label="回転 Z")
                b-slider(v-bind="tf2_slider_attrs" v-model="se_tf2_rotate_z" :min="-1" :max="1" :step="0.001")
              b-field(custom-class="is-small" label="拡縮")
                b-slider(v-bind="tf2_slider_attrs" v-model="se_tf2_scale" :min="0" :max="2.0" :step="0.001")
              b-field(custom-class="is-small")
                .control
                  b-button(size="is-small" @click="se_tf2_reset") リセット

        .box
          SeTitle(name="コントローラー＆スライダー")

          b-field(custom-class="is-small" label="横幅")
            b-slider(v-bind="slider_attrs" v-model="sp_controller_width" :min="0" :max="1.0" :step="0.001")

          b-field(custom-class="is-small" label="横幅(モバイル時)")
            b-slider(v-bind="slider_attrs" v-model="sp_controller_width_mobile" :min="0" :max="1.0" :step="0.001")

          b-field(custom-class="is-small" label="コントローラー表示")
            b-radio-button(size="is-small" v-model="sp_controller" native-value="is_controller_off") OFF
            b-radio-button(size="is-small" v-model="sp_controller" native-value="is_controller_on") ON

          b-field(custom-class="is-small" label="スライダー表示")
            b-radio-button(size="is-small" v-model="sp_slider" native-value="is_slider_off") OFF
            b-radio-button(size="is-small" v-model="sp_slider" native-value="is_slider_on") ON

        .box
          SeTitle(name="その他")

          b-field(custom-class="is-small" label="手番でないときの☗☖の大きさ(%)")
            b-slider(v-bind="slider_attrs" v-model="sp_location_mark_inactive_size" :min="0" :max="1.5" :step="0.01")

          b-field(custom-class="is-small" label="共通の隙間" message="駒セル縦幅に対する割合")
            b-slider(v-bind="slider_attrs" v-model="sp_common_gap" :min="0" :max="1.0" :step="0.01")

          b-field(custom-class="is-small" label="モバイル時に縦配置にする")
            b-radio-button(size="is-small" v-model="sp_mobile_vertical" native-value="is_mobile_vertical_off") OFF
            b-radio-button(size="is-small" v-model="sp_mobile_vertical" native-value="is_mobile_vertical_on") ON

          b-field(custom-class="is-small" label="視点")
            b-radio-button(size="is-small" v-model="sp_viewpoint" native-value="black") ☗
            b-radio-button(size="is-small" v-model="sp_viewpoint" native-value="white") ☖

          b-field(custom-class="is-small" label="手数表示")
            b-radio-button(size="is-small" v-model="sp_summary" native-value="is_summary_off") OFF
            b-radio-button(size="is-small" v-model="sp_summary" native-value="is_summary_on") ON

          b-field(custom-class="is-small" label="KIFコメ表示")
            b-radio-button(size="is-small" v-model="sp_comment" native-value="is_comment_off") OFF
            b-radio-button(size="is-small" v-model="sp_comment" native-value="is_comment_on") ON

          b-field(custom-class="is-small" label="操作モードでは合法手に絞る(二歩・ワープ・王手放置等を除く)")
            b-radio-button(size="is-small" v-model="sp_play_mode_legal_move_only" :native-value="false") OFF
            b-radio-button(size="is-small" v-model="sp_play_mode_legal_move_only" :native-value="true") ON

          b-field(custom-class="is-small" label="操作モードでは飛角香は駒を跨げない")
            b-radio-button(size="is-small" v-model="sp_play_mode_foul_check_p" :native-value="false") OFF
            b-radio-button(size="is-small" v-model="sp_play_mode_foul_check_p" :native-value="true") ON

          b-field(custom-class="is-small" label="操作モードでは二歩ができない")
            b-radio-button(size="is-small" v-model="sp_play_mode_foul_check_p" :native-value="false") OFF
            b-radio-button(size="is-small" v-model="sp_play_mode_foul_check_p" :native-value="true") ON

          b-field(custom-class="is-small" label="持駒のキャンセル方法")
            b-radio-button(size="is-small" v-model="sp_move_cancel" native-value="is_move_cancel_reality") 元位置
            b-radio-button(size="is-small" v-model="sp_move_cancel" native-value="is_move_cancel_standard") 別駒
            b-radio-button(size="is-small" v-model="sp_move_cancel" native-value="is_move_cancel_rehold") 持替

          b-field(custom-class="is-small" label="チェッカー背景")
            b-radio-button(size="is-small" v-model="se_bg_pattern" :native-value="false") OFF
            b-radio-button(size="is-small" v-model="se_bg_pattern" :native-value="true") ON

        .box
          SeTitle(name="棋譜")
          b-field.my-4(custom-class="is-small" label="プリセット")
            b-select(size="is-small" v-model="kifu_sample_key" @input="kifu_sample_key_input_handle")
              option(:value="null")
              template(v-for="e in KifuBookInfo.values")
                option(:value="e.key") {{e.name}}
          b-field(custom-class="is-small" label="棋譜")
            b-input(size="is-small" v-model="sp_body" type="textarea" :rows="8")

        .box
          SeTitle(name="コンポーネント引数確認")
          pre
            | {{sp_params}}
        .box
          SeTitle(name="CSS変数確認")
          pre
            | {{human_css}}
          pre(v-if="development_p")
            | {{comment_removed_css}}
        .box
          SeTitle(name="カスタムCSS")
          b-field(custom-class="is-small" label="")
            b-input(size="is-small" v-model="user_css" type="textarea" :rows="8")

  b-button.sidebar_toggle_button(@click="sidebar_toggle_handle" icon-left="menu" size="is-medium" type="is-text")

    //- b-navbar(type="is-primary" :mobile-burger="false" wrapper-class="container" spaced)
    //-   template(slot="brand")
    //-     b-navbar-item.has-text-weight-bold 将棋盤エディター
    //-   template(slot="end")
    //-     b-navbar-item(@click="sidebar_toggle_handle")
    //-       b-icon(icon="menu")

    //- .section
    //-   .container.is-fluid
    //-     .buttons
    //-     .columns.is-multiline

  .Workspace.is-overlay
    .WorkspaceBackground.is-overlay
    .ShogiPlayerWrap
      ShogiPlayer(v-bind="sp_params")
</template>

<script>
const DEVELOPMENT_P = process.env.NODE_ENV === "development"
const IS_TRANSPARENT = "rgba(0,0,0,0)"    // chroma は "transparent" をパースできないため
const IS_WHITE       = "rgb(255,255,255)"

import chroma from "chroma-js"

import { HumanSideInfo }    from "../models/human_side_info.js"
import { RunModeInfo }      from "../models/run_mode_info.js"
import { BgVariantInfo }    from "../models/bg_variant_info.js"
import { PiVariantInfo }    from "../models/pi_variant_info.js"
import { KifuBookInfo }     from "../models/kifu_book_info.js"
import { MixBlendModeInfo } from "../models/mix_blend_mode_info.js"

import ShogiPlayer   from "../ShogiPlayer.vue"
import MyColorPicker from "./MyColorPicker.vue"
import ImageUpload   from "./ImageUpload.vue"
import SeTitle   from "./SeTitle.vue"
import { SeConfig }   from "./SeConfig.js"

export default {
  name: "StyleEditor",
  components: {
    ShogiPlayer,
    MyColorPicker,
    ImageUpload,
    SeTitle,
  },

  data() {
    return {
      sidebar_p: true,
      kifu_sample_key: null,
      transform_tab_index: 0,
      user_css: "",

      ////////////////////////////////////////////////////////////////////////////////
      se_frame_width: 80,
      se_ws_image: null,
      se_bg_pattern: true,
      sp_board_image: null,
      sp_controller_width:        0.5,
      sp_controller_width_mobile: 0.8,

      se_ws_color: "hsl(100, 41%, 80%)",
      se_ws_blur: 0,
      se_ws_grayscale: 0,
      se_ws_contrast: 1.0,
      se_ws_invert: 0,
      se_ws_hue:        0,
      se_ws_saturate:   1.0,
      se_ws_saturate2:   0,
      se_ws_brightness: 1.0,
      se_ws_sepia: 0,

      sp_board_color: "rgba(0, 0, 0, 0.2)",

      sp_board_horizontal_gap: 0,
      sp_board_vertical_gap: 0,
      sp_board_aspect_ratio: 1.097,
      sp_board_piece_size: 0.9,
      sp_board_piece_position: "center",
      sp_board_radius: 5,
      sp_board_padding: 0.015,

      sp_board_dimension_w: 9,
      sp_board_dimension_h: 9,
      sp_layout: "is_layout_horizontal",
      sp_run_mode: DEVELOPMENT_P ? "edit_mode" : "view_mode",
      sp_mobile_vertical: "is_mobile_vertical_on",

      // 成り不成り選択
      sp_promote_select_modal_bg_color: "rgba(0, 0, 0, 0.5)",
      sp_promote_select_modal_hover_color: "hsla(0, 0%, 100%, 0.5)",

      // 駒を操作中の移動元スタイル
      sp_lifted_origin_bg_color_desktop: "hsla(0, 0%, 0%, 0.15)",
      sp_lifted_origin_opacity_desktop: 0.0,

      sp_balloon: "is_balloon_on",

      //////////////////////////////////////////////////////////////////////////////// 駒台
      //- sp_base_w: 1,
      //- sp_base_h: 1,
      sp_stand_piece_size: 0.8,
      sp_stand_hover_border_color: "rgba(0, 0, 0, 0.2)",
      sp_stand_bg_color: "rgba(0, 0, 0, 0.0)",
      sp_stand_gravity: DEVELOPMENT_P ? "is_stand_gravity_top" : "is_stand_gravity_bottom",

      sp_turn: -1,
      sp_viewpoint: "black",
      sp_debug_mode: DEVELOPMENT_P ? "is_debug_mode_off" : "is_debug_mode_off",
      sp_piece_count_size: 0.2,
      sp_piece_count_font_color:  "rgba(0, 0, 0, 0.75)",
      sp_piece_count_bg_color: "rgba(255, 255, 255, 0.9)",
      sp_piece_count_padding: 0.08,

      sp_piece_count_horizontal_x: 0.43,
      sp_piece_count_horizontal_y: 0.30,
      sp_piece_count_vertical_x:   0.00,
      sp_piece_count_vertical_y:   0.47,

      sp_grid_outer_stroke: 0,
      sp_grid_outer_color: "rgba(0, 0, 0, 0.5)",
      sp_grid_color: "rgba(0, 0, 0, 0.5)",
      sp_grid_stroke: 1,
      sp_grid_star_size: 0.1,
      sp_grid_star_z_index: 0,

      sp_piece_box_color: "rgba(0, 0, 0, 0.2)",
      sp_piece_box_piece_size: 0.8,

      sp_location_mark_inactive_size: 0.5,

      sp_comment: "is_comment_off",
      sp_common_gap: 0.18,
      sp_layer: DEVELOPMENT_P ? "is_layer_off" : "is_layer_off",
      sp_piece_variant: "is_piece_variant_a",    // is_piece_variant_d
      sp_bg_variant: "is_bg_variant_none", // is_bg_variant_a

      //////////////////////////////////////////////////////////////////////////////// 座標
      sp_digit_label: DEVELOPMENT_P ? "is_digit_label_on" : "is_digit_label_off",
      sp_digit_label_variant: DEVELOPMENT_P ? "is_digit_label_variant_alphabet" : "is_digit_label_variant_kanji",
      sp_digit_xlabel_size: 0.125,
      sp_digit_ylabel_size: 0.168,
      sp_digit_xlabel_push: 0.014,
      sp_digit_ylabel_push: -0.034,
      sp_digit_label_color: "hsla(0,0%,0%,0.75)",

      ////////////////////////////////////////////////////////////////////////////////

      sp_player_info: {
        black: { name: "先手", time: "", },
        white: { name: "後手", time: "", },
      },
      sp_player_name_direction: DEVELOPMENT_P ? "is_player_name_direction_vertical" : "is_player_name_direction_horizontal",
      sp_player_name_size: 0.25,
      sp_player_time_size: 0.25,
      ////////////////////////////////////////////////////////////////////////////////

      sp_body: null,

      sp_summary:    DEVELOPMENT_P ? "is_summary_on" : "is_summary_off",

      sp_slider:     DEVELOPMENT_P ? "is_slider_on" : "is_slider_on",
      sp_controller: DEVELOPMENT_P ? "is_controller_on" : "is_controller_off",
      sp_play_mode_legal_move_only: false,
      sp_play_mode_foul_check_p: false,
      sp_play_mode_foul_check_p: false,
      sp_move_cancel: "is_move_cancel_reality",

      se_tf0_mode: "is_tf0_mode_off",
      se_tf0_perspective: 200,
      se_tf0_translate_x: 0,
      se_tf0_translate_y: 0,
      se_tf0_translate_z: 0,
      se_tf0_rotate_x: 0.03,
      se_tf0_rotate_y: 0,
      se_tf0_rotate_z: 0,
      se_tf0_scale: 1.0,

      se_tf1_mode: "is_tf1_mode_off",
      se_tf1_perspective: 200,
      se_tf1_translate_x: 0,
      se_tf1_translate_y: -55,
      se_tf1_translate_z: 0,
      se_tf1_rotate_x: 0.015,
      se_tf1_rotate_y: 0,
      se_tf1_rotate_z: 0,
      se_tf1_scale: 1.0,

      se_tf2_mode: "is_tf2_mode_off",
      se_tf2_perspective: 200,
      se_tf2_translate_x: 0,
      se_tf2_translate_y: 0,
      se_tf2_translate_z: 0,
      se_tf2_rotate_x: 0,
      se_tf2_rotate_y: 0,
      se_tf2_rotate_z: 0,
      se_tf2_scale: 1.0,
    }
  },

  created() {
    const query = this.$route.query
    const { body, black, white } = query

    if (body) {
      this.sp_body = body
    }
    if (black) {
      this.sp_player_info.black = black
    }
    if (white) {
      this.sp_player_info.white = white
    }
    if ("turn" in query) {
      this.sp_turn = Number(query.turn)
    }
    if ("viewpoint" in query) {
      this.sp_viewpoint = query.viewpoint
    }

    if (!body) {
      this.kifu_sample_key = this.KifuBookInfo.values[1].key
      this.kifu_sample_key = this.KifuBookInfo.fetch("KIF_15733").key
      this.kifu_sample_key_input_handle()
    }

    if (false) {
      this.sp_player_info = {
        black: { name: "先手", time: "12:34", },
        white: { name: "後手", time: "56:78", },
      }
    }
  },

  mounted() {
    // FIXME: 動かない
    if (true) {
      const hash = this.$route.hash
      if (hash.length > 0) {
        this.sidebar_p = true
        this.$nextTick(() => {
          this.$scrollTo({container: '.sidebar-content', element: hash})
        })
      }
    }
  },

  methods: {
    tfx_slider_attrs(value) {
      return { ...this.slider_attrs, disabled: value }
    },

    kifu_sample_key_input_handle() {
      if (this.kifu_book_info) {
        this.sp_body = this.kifu_book_info.sp_body
        this.sp_player_info.black.name = this.kifu_book_info.black
        this.sp_player_info.white.name = this.kifu_book_info.white
      }
    },

    sidebar_toggle_handle() {
      this.sidebar_p = !this.sidebar_p
    },
    se_ws_image_input_handle(v) {
      this.se_ws_image = v
    },
    sp_board_image_input_handle(v) {
      this.sp_board_image = v
      this.sp_bg_variant = "is_bg_variant_none" // 背景画像プリセットを選択してない状態に戻しておく
    },
    all_reset_handle() {
    },
    paper_style_handle() {
      this.se_ws_color                    = "rgb(255,255,255)"            // 背景
      this.sp_piece_variant                  = "is_piece_variant_b"             // 紙面風駒
      this.sp_board_radius                = 0                             // 角を丸くしない
      this.sp_board_padding               = 0                             // 隙間なし
      this.sp_board_color                 = IS_WHITE                      // 盤透過
      this.sp_grid_stroke                 = 1                             // グリッド線(細)
      this.sp_grid_outer_stroke           = 2                             // グリッド枠(太)
      this.sp_stand_gravity                = "is_stand_gravity_top"      // 駒台の位置
      this.sp_player_name_direction             = "is_player_name_direction_vertical" // 縦横書き
      this.sp_balloon                     = "is_balloon_off"              // 名前の下に吹き出し背景を入れない
      this.sp_location_mark_inactive_size = 1.0                      // 手番でないときの☗☖を小さくしない
      this.sp_player_info.black.name      = "先手"
      this.sp_player_info.white.name      = "後手"

      this.sp_digit_label                 = "is_digit_label_on"            // 座標を表示する
      this.sp_digit_label_variant         = "is_digit_label_variant_kanji" // 座標の種類
      this.sp_board_horizontal_gap        = 0.2                            // 座標があるため盤面の左右を空ける
      this.sp_digit_xlabel_push           = 0.05                          // 座標調整
      this.sp_digit_ylabel_push           = 0.01                           // 座標調整
    },
    hsla_format(v) {
      return chroma(v).css("hsla")
    },
    se_tf0_reset() {
      this.se_tf0_perspective = 200
      this.se_tf0_translate_x = 0
      this.se_tf0_translate_y = 0
      this.se_tf0_translate_z = 0
      this.se_tf0_rotate_x    = 0
      this.se_tf0_rotate_y    = 0
      this.se_tf0_rotate_z    = 0
      this.se_tf0_scale       = 1.0
    },
    se_tf1_reset() {
      this.se_tf1_perspective = 200
      this.se_tf1_translate_x = 0
      this.se_tf1_translate_y = 0
      this.se_tf1_translate_z = 0
      this.se_tf1_rotate_x    = 0
      this.se_tf1_rotate_y    = 0
      this.se_tf1_rotate_z    = 0
      this.se_tf1_scale       = 1.0
    },
    se_tf2_reset() {
      this.se_tf2_perspective = 200
      this.se_tf2_translate_x = 0
      this.se_tf2_translate_y = 0
      this.se_tf2_translate_z = 0
      this.se_tf2_rotate_x    = 0
      this.se_tf2_rotate_y    = 0
      this.se_tf2_rotate_z    = 0
      this.se_tf2_scale       = 1.0
    },
  },
  computed: {
    HumanSideInfo()  { return HumanSideInfo  },
    RunModeInfo()    { return RunModeInfo    },
    BgVariantInfo()  { return BgVariantInfo  },
    PiVariantInfo()  { return PiVariantInfo  },
    KifuBookInfo() { return KifuBookInfo },
    MixBlendModeInfo() { return MixBlendModeInfo },
    SeConfig() { return SeConfig },

    kifu_book_info() {
      if (this.kifu_sample_key) {
        return KifuBookInfo.fetch(this.kifu_sample_key)
      }
    },

    chroma() { return chroma },

    ////////////////////////////////////////////////////////////////////////////////

    slider_attrs() {
      return {
        indicator: true,
        tooltip: false,
        size: "is-small",
      }
    },

    tf0_slider_attrs() { return this.tfx_slider_attrs(this.se_tf0_mode === "is_tf0_mode_off") },
    tf1_slider_attrs() { return this.tfx_slider_attrs(this.se_tf1_mode === "is_tf1_mode_off") },
    tf2_slider_attrs() { return this.tfx_slider_attrs(this.se_tf2_mode === "is_tf2_mode_off") },

    ////////////////////////////////////////////////////////////////////////////////

    component_class() {
      return [
        {
          sidebar_p: this.sidebar_p
        },
        this.se_tf0_mode,
        this.se_tf1_mode,
        this.se_tf2_mode,
      ]
    },

    // sp_grid_star_z_index が -1 のときこちらが勝ってしまうので se_bg_pattern を false にすること
    component_background_class() {
      if (this.se_bg_pattern) {
        return ["pattern-checks-md", "has-text-black-bis", "has-background-black-ter"]
      }
    },

    sp_board_image_url() {
      if (!this.sp_board_image) {
        return "none"
      }
      return `url(${this.sp_board_image})`
    },

    se_ws_bg_url() {
      if (!this.se_ws_image) {
        return "none"
      }
      return `url(${this.se_ws_image})`
    },

    sp_params() {
      let params = {}
      params.sp_board_dimension_w = this.sp_board_dimension_w
      params.sp_board_dimension_h = this.sp_board_dimension_h
      params.sp_layout            = this.sp_layout
      params.sp_balloon           = this.sp_balloon
      params.sp_layer             = this.sp_layer
      params.sp_piece_variant        = this.sp_piece_variant
      params.sp_bg_variant        = this.sp_bg_variant
      params.sp_mobile_vertical   = this.sp_mobile_vertical
      params.sp_run_mode          = this.sp_run_mode
      params.sp_viewpoint         = this.sp_viewpoint
      params.sp_debug_mode             = this.sp_debug_mode,
      params.sp_comment           = this.sp_comment,
      params.sp_turn              = this.sp_turn
      params.sp_body              = this.sp_body
      params.sp_setting           = "is_setting_off"
      params.sp_summary           = this.sp_summary
      params.sp_digit_label             = this.sp_digit_label
      params.sp_digit_label_variant = this.sp_digit_label_variant
      params.sp_stand_gravity             = this.sp_stand_gravity
      params.sp_player_name_direction             = this.sp_player_name_direction
      params.sp_slider            = this.sp_slider
      params.sp_controller        = this.sp_controller
      params.sp_player_info       = this.sp_player_info
      params.sp_play_mode_legal_move_only = this.sp_play_mode_legal_move_only
      params.sp_play_mode_foul_check_p = this.sp_play_mode_foul_check_p
      params.sp_play_mode_foul_check_p = this.sp_play_mode_foul_check_p
      params.sp_move_cancel       = this.sp_move_cancel
      return params
    },

    human_css() {
      let s = this.raw_css
      s = s.replace(/url\(.*\)/g, "url(...)")
      s = s.replace(/\s*.Workspace.*\n/, "")
      s = s.replace(/\s}\s*\n/, "")
      s = s.replace(/;/g, "")
      s = s.replace(/^ +/mg, "")
      s = s.replace(/:\s*/g, ": ")
      // s = s.replace(/^--/gm, "")
      // s = s.replace(/^\/\//gm, "\n//")
      return s.trim()
    },

    comment_removed_css() {
      let s = this.raw_css
      s = s.replace(/ *\/\/.*\n/gm, "")
      return s
    },

    raw_css() {
      return `
        .Workspace {
          // --sp_* は ShogiPlayer のスタイル
          // --se_* はスタイルエディタ自身のスタイル
          // なので他で ShogiPlayer を組み込むときは --sp_* のものだけで良い

          // 盤テクスチャ
          --sp_board_color:              ${this.hsla_format(this.sp_board_color)};
          --sp_board_image:              ${this.sp_board_image_url};

          // 盤
          --sp_board_padding:            ${this.sp_board_padding};
          --sp_board_radius:             ${this.sp_board_radius};
          --sp_board_aspect_ratio:       ${this.sp_board_aspect_ratio};
          --sp_board_piece_size:         ${this.sp_board_piece_size};
          --sp_board_piece_position:     ${this.sp_board_piece_position};
          --sp_board_horizontal_gap:     ${this.sp_board_horizontal_gap};
          --sp_board_vertical_gap:       ${this.sp_board_vertical_gap};

          // 盤グリッド
          --sp_grid_color:               ${this.hsla_format(this.sp_grid_color)};
          --sp_grid_outer_color:         ${this.hsla_format(this.sp_grid_outer_color)};
          --sp_grid_stroke:              ${this.sp_grid_stroke};
          --sp_grid_outer_stroke:        ${this.sp_grid_outer_stroke};
          --sp_grid_star_size:           ${this.sp_grid_star_size};
          --sp_grid_star_z_index:        ${this.sp_grid_star_z_index};

          // 駒数
          --sp_piece_count_size: ${this.sp_piece_count_size};
          --sp_piece_count_font_color:     ${this.hsla_format(this.sp_piece_count_font_color)};
          --sp_piece_count_bg_color:       ${this.hsla_format(this.sp_piece_count_bg_color)};
          --sp_piece_count_padding:   ${this.sp_piece_count_padding};
          --sp_piece_count_horizontal_x:   ${this.sp_piece_count_horizontal_x};
          --sp_piece_count_horizontal_y:   ${this.sp_piece_count_horizontal_y};
          --sp_piece_count_vertical_x:     ${this.sp_piece_count_vertical_x};
          --sp_piece_count_vertical_y:     ${this.sp_piece_count_vertical_y};

          // 駒台
          --sp_stand_piece_size:         ${this.sp_stand_piece_size};
          --sp_stand_hover_border_color: ${this.hsla_format(this.sp_stand_hover_border_color)};
          --sp_stand_bg_color: ${this.hsla_format(this.sp_stand_bg_color)};

          --sp_player_name_size: ${this.sp_player_name_size}; // 対局者の名前のフォントサイズ
          --sp_player_time_size: ${this.sp_player_time_size}; // 対局者の時間のフォントサイズ

          // 駒箱
          --sp_piece_box_piece_size:     ${this.sp_piece_box_piece_size};
          --sp_piece_box_color:          ${this.hsla_format(this.sp_piece_box_color)};

          // ☗☖の大きさ
          --sp_location_mark_inactive_size: ${this.sp_location_mark_inactive_size};

          // 成り不成り選択
          --sp_promote_select_modal_bg_color:    ${this.hsla_format(this.sp_promote_select_modal_bg_color)};
          --sp_promote_select_modal_hover_color: ${this.hsla_format(this.sp_promote_select_modal_hover_color)};

          // 駒を操作中の移動元スタイル
          --sp_lifted_origin_bg_color_desktop: ${this.hsla_format(this.sp_lifted_origin_bg_color_desktop)};
          --sp_lifted_origin_opacity_desktop: ${this.sp_lifted_origin_opacity_desktop};

          // 駒台横配置のときの盤の上下の隙間
          --sp_common_gap:              ${this.sp_common_gap};

          // 将棋盤全体の外側の横幅(コンテナ幅)
          --se_frame_width:             ${this.se_frame_width}vmin;

          // コントローラー
          --sp_controller_width:        ${this.sp_controller_width};
          --sp_controller_width_mobile: ${this.sp_controller_width_mobile};

          // 座標表記
          --sp_digit_xlabel_size: ${this.sp_digit_xlabel_size};
          --sp_digit_xlabel_push: ${this.sp_digit_xlabel_push};
          --sp_digit_ylabel_size: ${this.sp_digit_ylabel_size};
          --sp_digit_ylabel_push: ${this.sp_digit_ylabel_push};
          --sp_digit_label_color: ${this.sp_digit_label_color};

          //////////////////////////////////////////////////////////////////////////////// スタイルエディタ側
          // --se_* で始まるものはスタイルエディタ側で用意したスタイルなので
          // 別で ShogiPlayer 使う場合は定義する必要はない

          // 背景
          --se_ws_color:             ${this.hsla_format(this.se_ws_color)};
          --se_ws_image:             ${this.se_ws_bg_url};
          --se_ws_blur:              ${this.se_ws_blur};
          --se_ws_grayscale:         ${this.se_ws_grayscale};
          --se_ws_contrast:          ${this.se_ws_contrast};
          --se_ws_invert:            ${this.se_ws_invert};

          --se_ws_hue:               ${this.se_ws_hue};
          --se_ws_saturate:          ${this.se_ws_saturate + this.se_ws_saturate2};
          --se_ws_brightness:        ${this.se_ws_brightness};
          --se_ws_sepia:       ${this.se_ws_sepia};

          // Transform 背景
          --se_tf0_perspective: ${this.se_tf0_perspective}px;
          --se_tf0_translate_x: ${this.se_tf0_translate_x}px;
          --se_tf0_translate_y: ${this.se_tf0_translate_y}px;
          --se_tf0_translate_z: ${this.se_tf0_translate_z}px;
          --se_tf0_rotate_x:    ${this.se_tf0_rotate_x}turn;
          --se_tf0_rotate_y:    ${this.se_tf0_rotate_y}turn;
          --se_tf0_rotate_z:    ${this.se_tf0_rotate_z}turn;
          --se_tf0_scale:       ${this.se_tf0_scale};

          // Transform 盤
          --se_tf1_perspective: ${this.se_tf1_perspective}px;
          --se_tf1_translate_x: ${this.se_tf1_translate_x}px;
          --se_tf1_translate_y: ${this.se_tf1_translate_y}px;
          --se_tf1_translate_z: ${this.se_tf1_translate_z}px;
          --se_tf1_rotate_x:    ${this.se_tf1_rotate_x}turn;
          --se_tf1_rotate_y:    ${this.se_tf1_rotate_y}turn;
          --se_tf1_rotate_z:    ${this.se_tf1_rotate_z}turn;
          --se_tf1_scale:       ${this.se_tf1_scale};

          // Transform 駒
          --se_tf2_perspective: ${this.se_tf2_perspective}px;
          --se_tf2_translate_x: ${this.se_tf2_translate_x}px;
          --se_tf2_translate_y: ${this.se_tf2_translate_y}px;
          --se_tf2_translate_z: ${this.se_tf2_translate_z}px;
          --se_tf2_rotate_x:    ${this.se_tf2_rotate_x}turn;
          --se_tf2_rotate_y:    ${this.se_tf2_rotate_y}turn;
          --se_tf2_rotate_z:    ${this.se_tf2_rotate_z}turn;
          --se_tf2_scale:       ${this.se_tf2_scale};
        }
      `
    },
  },
}
</script>

<style lang="sass">
@import "pattern.css/pattern.scss"

$sidebar_width_desktop: 30%
$sidebar_width_tablet:  40%
$sidebar_width_mobile:  100% * 3 / 4

.StyleEditor-Sidebar
  .sidebar-content
    +mobile
      width: $sidebar_width_mobile
    +tablet
      width: $sidebar_width_tablet
    +desktop
      width: $sidebar_width_desktop

  .box
    margin-top: 1rem
    margin-bottom: 0

  .short_cut_buttons
    display: flex
    flex-wrap: wrap
    gap: 8px
    a
      display: inline

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

.StyleEditor
  .sidebar_toggle_button
    position: fixed
    top: 0
    right: 0
    z-index: 1

  min-height: 100vh

  &.sidebar_p
    .Workspace
      +tablet
        width: unquote("calc(100% - #{$sidebar_width_tablet})")
      +desktop
        width: unquote("calc(100% - #{$sidebar_width_desktop})")

  .StyleEditor-Background
    height: 100%
    z-index: -200               // sp_grid_star_z_index が -1 のときチェッカー背景より前面になるようにするため -1 未満にする

  .Workspace
    display: flex
    align-items: center
    justify-content: center
    flex-direction: column

  .WorkspaceBackground
    z-index: -100              // sp_grid_star_z_index が -1 のとき背景より前面なるようにするため -1 未満にする
    background-color: var(--se_ws_color)
    background-image: var(--se_ws_image)
    background-position: center
    background-repeat: no-repeat
    background-size: cover
    filter: unquote('invert(var(--se_ws_invert)) sepia(var(--se_ws_sepia)) hue-rotate(calc(var(--se_ws_hue) * 1turn)) saturate(var(--se_ws_saturate)) grayscale(var(--se_ws_grayscale)) brightness(var(--se_ws_brightness)) contrast(var(--se_ws_contrast)) blur(calc(var(--se_ws_blur) * 1px))')

  .ShogiPlayerWrap
    // width: 100%
    // +tablet
    //   width: var(--se_frame_width)
    width: var(--se_frame_width)

  // 背景の変形
  &.is_tf0_mode_on
    .Workspace
      transform: perspective(var(--se_tf0_perspective)) translate3d(var(--se_tf0_translate_x), var(--se_tf0_translate_y), var(--se_tf0_translate_z)) rotateX(var(--se_tf0_rotate_x)) rotateY(var(--se_tf0_rotate_y)) rotateZ(var(--se_tf0_rotate_z)) scale(var(--se_tf0_scale))

  // 盤の変形
  &.is_tf1_mode_on
    .ShogiPlayerTransformBlock
      transform: perspective(var(--se_tf1_perspective)) translate3d(var(--se_tf1_translate_x), var(--se_tf1_translate_y), var(--se_tf1_translate_z)) rotateX(var(--se_tf1_rotate_x)) rotateY(var(--se_tf1_rotate_y)) rotateZ(var(--se_tf1_rotate_z)) scale(var(--se_tf1_scale))

  // 駒の変形は先後対称。何を先後対称にするかは感覚で決める
  =def_tf2($dir)
    transform: unquote('perspective(var(--se_tf2_perspective)) translate3d(calc(var(--se_tf2_translate_x) * #{$dir}), calc(var(--se_tf2_translate_y) * #{$dir}), var(--se_tf2_translate_z)) rotateX(calc(var(--se_tf2_rotate_x) * #{$dir})) rotateY(calc(var(--se_tf2_rotate_y) * 1)) rotateZ(calc(var(--se_tf2_rotate_z) * 1)) scale(var(--se_tf2_scale))')
  &.is_tf2_mode_on
    .is_position_north
      .PieceTexture
        +def_tf2(-1)
    .is_position_south
      .PieceTexture
        +def_tf2(1)
</style>
