<template lang="pug">
.StyleEditor.is-relative(:class="component_class")
  .StyleEditor-Background.is-overlay.pattern-checks-md.has-text-black-bis.has-background-black-ter
  //- .StyleEditor-Background.is-overlay

  div(is="style" v-text="comment_removed_css")
  div(is="style" v-text="user_css")

  b-sidebar.StyleEditor-Sidebar(fullheight right v-model="sidebar_p" position="fixed")
    .mx-4.my-4
      .is-flex.is-justify-content-start.is-align-items-center
        b-button(@click="sidebar_toggle_handle" icon-left="menu")
        .mx-3.has-text-weight-bold スタイルエディタ

      .my_controls
        .box
          .title.is-5 基本
          b-field(custom-class="is-small" label="コンテナ幅")
            b-slider(indicator :tooltip="false" size="is-small" v-model="se_frame_width" :min="1" :max="100")
          b-field(custom-class="is-small" label="レイアウト")
            b-radio-button(size="is-small" v-model="sp_layout" native-value="is_horizontal") 左右
            b-radio-button(size="is-small" v-model="sp_layout" native-value="is_vertical") 上下
          b-field(custom-class="is-small" label="モード")
            b-radio-button(size="is-small" v-model="sp_run_mode" native-value="view_mode") 再生
            b-radio-button(size="is-small" v-model="sp_run_mode" native-value="play_mode") 操作
            b-radio-button(size="is-small" v-model="sp_run_mode" native-value="edit_mode") 編集
          b-field(custom-class="is-small" label="レイヤー確認")
            b-radio-button(size="is-small" v-model="sp_layer" native-value="is_layer_off") OFF
            b-radio-button(size="is-small" v-model="sp_layer" native-value="is_layer_on") ON
        .box
          .title.is-5 背景

          b-field(custom-class="is-small" label="")
            ColorPicker(v-model="se_ws_color" :disableAlpha="true")

          ImageUpload(@input="se_ws_image_input_handle")

          b-field(custom-class="is-small" label="色相")
            b-slider(indicator :tooltip="false" size="is-small" v-model="se_ws_hue" :min="-0.5" :max="0.5" :step="0.001")
          b-field(custom-class="is-small" label="彩度")
            b-slider(indicator :tooltip="false" size="is-small" v-model="se_ws_saturate" :min="0" :max="4.0" :step="0.001")
          b-field(custom-class="is-small" label="輝度")
            b-slider(indicator :tooltip="false" size="is-small" v-model="se_ws_brightness" :min="0" :max="2.0" :step="0.001")
          b-field(custom-class="is-small" label="ぼかし")
            b-slider(indicator :tooltip="false" size="is-small" v-model="se_ws_blur" :min="0" :max="30" :step="0.001")
          b-field(custom-class="is-small" label="グレースケール")
            b-slider(indicator :tooltip="false" size="is-small" v-model="se_ws_grayscale" :min="0" :max="1.0" :step="0.001")
          b-field(custom-class="is-small" label="コントラスト")
            b-slider(indicator :tooltip="false" size="is-small" v-model="se_ws_contrast" :min="0" :max="2.0" :step="0.001")
          b-field(custom-class="is-small" label="反転")
            b-slider(indicator :tooltip="false" size="is-small" v-model="se_ws_invert" :min="0" :max="1.0" :step="0.001")
          //- b-field(custom-class="is-small" label="非透輝度")
          //-   b-slider(indicator :tooltip="false" size="is-small" v-model="se_ws_opacity" :min="0" :max="1.0" :step="0.001")

        .box
          .title.is-5 盤テクスチャ

          b-field(custom-class="is-small" label="")
            ColorPicker(v-model="sp_board_color")

          b-field.my-4(custom-class="is-small" label="プリセット画像")
            b-select(size="is-small" v-model="sp_bg_variant")
              template(v-for="e in BgVariantInfo.values")
                option(:value="e.key") {{e.name}}

          ImageUpload(@input="sp_board_image_input_handle")

          b-field(custom-class="is-small" label="色相")
            b-slider(indicator :tooltip="false" size="is-small" v-model="sp_board_hue" :min="-0.5" :max="0.5" :step="0.001")
          b-field(custom-class="is-small" label="彩度")
            b-slider(indicator :tooltip="false" size="is-small" v-model="sp_board_saturate" :min="0" :max="4.0" :step="0.001")
          b-field(custom-class="is-small" label="輝度")
            b-slider(indicator :tooltip="false" size="is-small" v-model="sp_board_brightness" :min="0" :max="2.0" :step="0.001")
          b-field(custom-class="is-small" label="ぼかし")
            b-slider(indicator :tooltip="false" size="is-small" v-model="sp_board_blur" :min="0" :max="30" :step="0.001")
          b-field(custom-class="is-small" label="グレースケール")
            b-slider(indicator :tooltip="false" size="is-small" v-model="sp_board_grayscale" :min="0" :max="1.0" :step="0.001")
          b-field(custom-class="is-small" label="コントラスト")
            b-slider(indicator :tooltip="false" size="is-small" v-model="sp_board_contrast" :min="0" :max="2.0" :step="0.001")
          b-field(custom-class="is-small" label="反転")
            b-slider(indicator :tooltip="false" size="is-small" v-model="sp_board_invert" :min="0" :max="1.0" :step="0.001")
          b-field(custom-class="is-small" label="非透輝度")
            b-slider(indicator :tooltip="false" size="is-small" v-model="sp_board_opacity" :min="0" :max="1.0" :step="0.001")
          b-field(custom-class="is-small" label="ブレンドモード")
            b-select(size="is-small" v-model="sp_board_blend")
              template(v-for="e in MixBlendModeInfo.values")
                option(:value="e.key") {{e.key}}

        .box
          .title.is-5 盤
          b-field(custom-class="is-small" label="角丸め")
            b-slider(indicator :tooltip="false" size="is-small" v-model="sp_board_radius" :min="0" :max="50" :step="0.01")
          b-field(custom-class="is-small" label="余白")
            b-slider(indicator :tooltip="false" size="is-small" v-model="sp_board_padding" :min="0" :max="10" :step="0.01")
          b-field(custom-class="is-small" label="アスペクト比(縦長度合)")
            b-slider(indicator :tooltip="false" size="is-small" v-model="sp_board_aspect_ratio" :min="0.5" :max="1.5" :step="0.001")
          .columns.mt-4.mb-2
            .column.py-0
              b-field(custom-class="is-small" label="セル数(W)")
                b-slider(indicator :tooltip="false" size="is-small" v-model="sp_board_dimension_w" :min="0" :max="12")
            .column.py-0
              b-field(custom-class="is-small" label="セル数(H)")
                b-slider(indicator :tooltip="false" size="is-small" v-model="sp_board_dimension_h" :min="0" :max="12")

        .box
          .title.is-5 盤グリッド
          b-field(custom-class="is-small" label="グリッドカラー")
            ColorPicker(v-model="sp_grid_color")
          b-field(custom-class="is-small" label="グリッド外枠カラー")
            ColorPicker(v-model="sp_grid_outer_color")
          b-field(custom-class="is-small" label="グリッドの太さ")
            b-slider(indicator :tooltip="false" size="is-small" v-model="sp_grid_stroke" :min="0" :max="5" :step="0.5")
          b-field(custom-class="is-small" label="グリッド外枠の太さ" message="最も細い線はブラウザ依存 Safari: 1.5px, Chrome: 2.0px")
            b-slider(indicator :tooltip="false" size="is-small" v-model="sp_grid_outer_stroke" :min="0" :max="10" :step="0.5")
          b-field(custom-class="is-small" label="星")
            b-slider(indicator :tooltip="false" size="is-small" v-model="sp_grid_star_size" :min="0" :max="100" :step="0.01")

        .box
          .title.is-5 駒
          b-field(custom-class="is-small" label="プリセット")
            b-select(size="is-small" v-model="sp_pi_variant")
              template(v-for="e in PiVariantInfo.values")
                option(:value="e.key") {{e.name}}
          b-field(custom-class="is-small" label="盤上のセルに対するテクスチャ領域の割合")
            b-slider(indicator :tooltip="false" size="is-small" v-model="sp_board_piece_rate" :min="0" :max="100" :step="0.1")
          b-field(custom-class="is-small" label="テクスチャ領域内のマッピンング縦位置(揃える位置)" message="下にすると駒の底辺が揃う(ただし駒の種類による)")
            b-radio-button(size="is-small" v-model="sp_board_piece_position" native-value="top") ↑
            b-radio-button(size="is-small" v-model="sp_board_piece_position" native-value="center") ・
            b-radio-button(size="is-small" v-model="sp_board_piece_position" native-value="bottom") ↓

          b-field(custom-class="is-small" label="色相")
            b-slider(indicator :tooltip="false" size="is-small" v-model="sp_piece_hue" :min="-0.5" :max="0.5" :step="0.001")
          b-field(custom-class="is-small" label="彩度")
            b-slider(indicator :tooltip="false" size="is-small" v-model="sp_piece_saturate" :min="0" :max="4.0" :step="0.001")
          b-field(custom-class="is-small" label="輝度")
            b-slider(indicator :tooltip="false" size="is-small" v-model="sp_piece_brightness" :min="0" :max="2.0" :step="0.001")
          b-field(custom-class="is-small" label="ぼかし")
            b-slider(indicator :tooltip="false" size="is-small" v-model="sp_piece_blur" :min="0" :max="30" :step="0.001")
          b-field(custom-class="is-small" label="グレースケール")
            b-slider(indicator :tooltip="false" size="is-small" v-model="sp_piece_grayscale" :min="0" :max="1.0" :step="0.001")
          b-field(custom-class="is-small" label="コントラスト")
            b-slider(indicator :tooltip="false" size="is-small" v-model="sp_piece_contrast" :min="0" :max="2.0" :step="0.001")
          b-field(custom-class="is-small" label="反転")
            b-slider(indicator :tooltip="false" size="is-small" v-model="sp_piece_invert" :min="0" :max="1.0" :step="0.001")
          b-field(custom-class="is-small" label="非透輝度")
            b-slider(indicator :tooltip="false" size="is-small" v-model="sp_piece_opacity" :min="0" :max="1.0" :step="0.001")
          b-field(custom-class="is-small" label="ブレンドモード")
            b-select(size="is-small" v-model="sp_piece_blend")
              template(v-for="e in MixBlendModeInfo.values")
                option(:value="e.key") {{e.key}}

        .box
          .title.is-5 駒台
          .columns.mt-4
            .column.py-0
              b-field(custom-class="is-small" label="セル(W)")
                b-slider(indicator :tooltip="false" size="is-small" v-model="sp_stand_piece_w" :min="1" :max="80" :step="1")
            .column.py-0
              b-field(custom-class="is-small" label="セル(H)")
                b-slider(indicator :tooltip="false" size="is-small" v-model="sp_stand_piece_h" :min="1" :max="80" :step="1")
          b-field(custom-class="is-small" label="セル内の駒の大きさ")
            b-slider(indicator :tooltip="false" size="is-small" v-model="sp_stand_piece_rate" :min="0" :max="100" :step="0.1")
          b-field(custom-class="is-small" label="持駒をhoverさせたときのborder色")
            ColorPicker(v-model="sp_stand_hover_border_color")

        .box
          .title.is-5 駒数
          b-field(custom-class="is-small" label="サイズ")
            b-slider(indicator :tooltip="false" size="is-small" v-model="sp_piece_count_font_size" :min="0" :max="20" :step="0.01")
          b-field(custom-class="is-small" label="フォント色")
            ColorPicker(v-model="sp_piece_count_font_color")
          b-field(custom-class="is-small" label="背景")
            ColorPicker(v-model="sp_piece_count_bg_color")
          b-field(custom-class="is-small" label="余白")
            b-slider(indicator :tooltip="false" size="is-small" v-model="sp_piece_count_padding" :min="0" :max="20" :step="0.01")
          b-field(custom-class="is-small" label="左右レイアウト時の位置")
            b-slider(indicator :tooltip="false" size="is-small" v-model="sp_piece_count_gap_right" :min="-100" :max="100" :step="0.1" :disabled="sp_layout === 'is_vertical'")
          b-field(custom-class="is-small" label="上下レイアウト時の位置")
            b-slider(indicator :tooltip="false" size="is-small" v-model="sp_piece_count_gap_bottom" :min="-100" :max="100" :step="0.1" :disabled="sp_layout === 'is_horizontal'")

        .box
          .title.is-5 駒箱
          b-field(custom-class="is-small" label="")
            ColorPicker(v-model="sp_piece_box_color")
          .columns.mt-4
            .column.py-0
              b-field(custom-class="is-small" label="セル(W)")
                b-slider(indicator :tooltip="false" size="is-small" v-model="sp_piece_box_piece_w" :min="1" :max="80" :step="1")
            .column.py-0
              b-field(custom-class="is-small" label="セル(H)")
                b-slider(indicator :tooltip="false" size="is-small" v-model="sp_piece_box_piece_h" :min="1" :max="80" :step="1")
          b-field(custom-class="is-small" label="セル内の駒の大きさ(%)")
            b-slider(indicator :tooltip="false" size="is-small" v-model="sp_piece_box_piece_rate" :min="0" :max="100" :step="0.1")

        .box
          .title.is-5 影
          b-field(custom-class="is-small" label="右下方向へのずれ")
            b-slider(indicator :tooltip="false" size="is-small" v-model="sp_shadow_offset" :min="-10" :max="10")
          b-field(custom-class="is-small" label="ぶれ度合い")
            b-slider(indicator :tooltip="false" size="is-small" v-model="sp_shadow_blur" :min="-1" :max="20")
          b-field(custom-class="is-small" label="色")
            ColorPicker(v-model="sp_shadow_color")
          b-field(custom-class="is-small" label="盤と駒台への適用方法" message="dropは透明度を継承するので元が透明だと影も薄い")
            b-radio-button(size="is-small" v-model="sp_board_shadow" native-value="is_board_shadow_drop") drop
            b-radio-button(size="is-small" v-model="sp_board_shadow" native-value="is_board_shadow_box") box
            b-radio-button(size="is-small" v-model="sp_board_shadow" native-value="is_board_shadow_none") none

        .box(v-if="false")
          .title.is-5 画面位置
          .columns
            .column
              b-field(custom-class="is-small" label="垂直位置" expanded)
                b-radio-button(size="is-small" v-model="sp_vpos" native-value="is_top") ↑
                b-radio-button(size="is-small" v-model="sp_vpos" native-value="is_vcentered") ・
                b-radio-button(size="is-small" v-model="sp_vpos" native-value="is_bottom") ↓
            .column
              b-field(custom-class="is-small" label="水平位置" expanded)
                b-radio-button(size="is-small" v-model="sp_hpos" native-value="is_left") ←
                b-radio-button(size="is-small" v-model="sp_hpos" native-value="is_hcentered") ・
                b-radio-button(size="is-small" v-model="sp_hpos" native-value="is_right") →

          //- .columns.mt-4
          //-   .column.py-0
          //-     b-field(custom-class="is-small" label="持駒画像(W)")
          //-       b-slider(indicator :tooltip="false" size="is-small" v-model="sp_stand_piece_w" :min="1" :max="80" :step="1")
          //-   .column.py-0
          //-     b-field(custom-class="is-small" label="持駒画像(H)")
          //-       b-slider(indicator :tooltip="false" size="is-small" v-model="sp_stand_piece_h" :min="1" :max="80" :step="1")

          b-field(custom-class="is-small" label="領域縦幅")
            b-radio-button(size="is-small" v-model="sp_fullheight" native-value="is_fullheight_on") 画面サイズ
            b-radio-button(size="is-small" v-model="sp_fullheight" native-value="is_fullheight_off") none

        //- .box
        //-   .title.is-5 モバイル
        //-   b-field(custom-class="is-small" label="持駒等のサイズを縮小する" v-if="false")
        //-     b-radio-button(size="is-small" v-model="sp_mobile_fit" native-value="is_mobile_fit_off") OFF
        //-     b-radio-button(size="is-small" v-model="sp_mobile_fit" native-value="is_mobile_fit_on") ON
        //-   b-field(custom-class="is-small" label="縦配置にする")
        //-     b-radio-button(size="is-small" v-model="sp_mobile_vertical" native-value="is_mobile_vertical_off") OFF
        //-     b-radio-button(size="is-small" v-model="sp_mobile_vertical" native-value="is_mobile_vertical_on") ON

        .box
          .title.is-5 Transform
          b-tabs(size="is-small" v-model="transform_tab_index" expanded)
            b-tab-item(label="背景")
              b-field(custom-class="is-small" label="")
                b-radio-button(size="is-small" v-model="se_tf0_mode" native-value="is_tf0_mode_off") OFF
                b-radio-button(size="is-small" v-model="se_tf0_mode" native-value="is_tf0_mode_on") ON
              b-field(custom-class="is-small" label="視点との距離")
                b-slider(indicator :tooltip="false" size="is-small" v-model="se_tf0_perspective" :min="0" :max="400" :step="0.001")
              b-field(custom-class="is-small" label="移動 X")
                b-slider(indicator :tooltip="false" size="is-small" v-model="se_tf0_translate_x" :min="-1000" :max="1000" :step="1")
              b-field(custom-class="is-small" label="移動 Y")
                b-slider(indicator :tooltip="false" size="is-small" v-model="se_tf0_translate_y" :min="-1000" :max="1000" :step="1")
              b-field(custom-class="is-small" label="移動 Z")
                b-slider(indicator :tooltip="false" size="is-small" v-model="se_tf0_translate_z" :min="-1000" :max="1000" :step="1")
              b-field(custom-class="is-small" label="回転 X")
                b-slider(indicator :tooltip="false" size="is-small" v-model="se_tf0_rotate_x" :min="-1" :max="1" :step="0.001")
              b-field(custom-class="is-small" label="回転 Y")
                b-slider(indicator :tooltip="false" size="is-small" v-model="se_tf0_rotate_y" :min="-1" :max="1" :step="0.001")
              b-field(custom-class="is-small" label="回転 Z")
                b-slider(indicator :tooltip="false" size="is-small" v-model="se_tf0_rotate_z" :min="-1" :max="1" :step="0.001")
              b-field(custom-class="is-small" label="拡縮")
                b-slider(indicator :tooltip="false" size="is-small" v-model="se_tf0_scale" :min="0" :max="2.0" :step="0.001")
              b-field(custom-class="is-small")
                .control
                  b-button(size="is-small" @click="se_tf0_reset") リセット

            b-tab-item(label="盤")
              b-field(custom-class="is-small" label="" message="有効にすると背景とのブレンドは効かなくなる")
                b-radio-button(size="is-small" v-model="se_tf1_mode" native-value="is_tf1_mode_off") OFF
                b-radio-button(size="is-small" v-model="se_tf1_mode" native-value="is_tf1_mode_on") ON
              b-field(custom-class="is-small" label="視点との距離")
                b-slider(indicator :tooltip="false" size="is-small" v-model="se_tf1_perspective" :min="0" :max="400" :step="0.001")
              b-field(custom-class="is-small" label="移動 X")
                b-slider(indicator :tooltip="false" size="is-small" v-model="se_tf1_translate_x" :min="-1000" :max="1000" :step="1")
              b-field(custom-class="is-small" label="移動 Y")
                b-slider(indicator :tooltip="false" size="is-small" v-model="se_tf1_translate_y" :min="-1000" :max="1000" :step="1")
              b-field(custom-class="is-small" label="移動 Z")
                b-slider(indicator :tooltip="false" size="is-small" v-model="se_tf1_translate_z" :min="-1000" :max="1000" :step="1")
              b-field(custom-class="is-small" label="回転 X")
                b-slider(indicator :tooltip="false" size="is-small" v-model="se_tf1_rotate_x" :min="-1" :max="1" :step="0.001")
              b-field(custom-class="is-small" label="回転 Y")
                b-slider(indicator :tooltip="false" size="is-small" v-model="se_tf1_rotate_y" :min="-1" :max="1" :step="0.001")
              b-field(custom-class="is-small" label="回転 Z")
                b-slider(indicator :tooltip="false" size="is-small" v-model="se_tf1_rotate_z" :min="-1" :max="1" :step="0.001")
              b-field(custom-class="is-small" label="拡縮")
                b-slider(indicator :tooltip="false" size="is-small" v-model="se_tf1_scale" :min="0" :max="2.0" :step="0.001")
              b-field(custom-class="is-small")
                .control
                  b-button(size="is-small" @click="se_tf1_reset") リセット
            b-tab-item(label="駒")
              b-field(custom-class="is-small" label="" message="有効にすると盤とのブレンドは効かなくなる")
                b-radio-button(size="is-small" v-model="se_tf2_mode" native-value="is_tf2_mode_off") OFF
                b-radio-button(size="is-small" v-model="se_tf2_mode" native-value="is_tf2_mode_on") ON
              b-field(custom-class="is-small" label="視点との距離")
                b-slider(indicator :tooltip="false" size="is-small" v-model="se_tf2_perspective" :min="0" :max="400" :step="0.001")
              b-field(custom-class="is-small" label="移動 X")
                b-slider(indicator :tooltip="false" size="is-small" v-model="se_tf2_translate_x" :min="-1000" :max="1000" :step="1")
              b-field(custom-class="is-small" label="移動 Y")
                b-slider(indicator :tooltip="false" size="is-small" v-model="se_tf2_translate_y" :min="-1000" :max="1000" :step="1")
              b-field(custom-class="is-small" label="移動 Z")
                b-slider(indicator :tooltip="false" size="is-small" v-model="se_tf2_translate_z" :min="-1000" :max="1000" :step="1")
              b-field(custom-class="is-small" label="回転 X")
                b-slider(indicator :tooltip="false" size="is-small" v-model="se_tf2_rotate_x" :min="-1" :max="1" :step="0.001")
              b-field(custom-class="is-small" label="回転 Y")
                b-slider(indicator :tooltip="false" size="is-small" v-model="se_tf2_rotate_y" :min="-1" :max="1" :step="0.001")
              b-field(custom-class="is-small" label="回転 Z")
                b-slider(indicator :tooltip="false" size="is-small" v-model="se_tf2_rotate_z" :min="-1" :max="1" :step="0.001")
              b-field(custom-class="is-small" label="拡縮")
                b-slider(indicator :tooltip="false" size="is-small" v-model="se_tf2_scale" :min="0" :max="2.0" :step="0.001")
              b-field(custom-class="is-small")
                .control
                  b-button(size="is-small" @click="se_tf2_reset") リセット
        .box
          .title.is-5 その他

          b-field(custom-class="is-small" label="共通の隙間")
            b-slider(indicator :tooltip="false" size="is-small" v-model="sp_common_gap" :min="0" :max="100" :step="0.1")

          b-field(custom-class="is-small" label="モバイル時に縦配置にする")
            b-radio-button(size="is-small" v-model="sp_mobile_vertical" native-value="is_mobile_vertical_off") OFF
            b-radio-button(size="is-small" v-model="sp_mobile_vertical" native-value="is_mobile_vertical_on") ON

          b-field(custom-class="is-small" label="プリセット")
            .control
              .buttons
                b-button(@click="force_paper_style" size="is-small") 紙面風

          b-field(custom-class="is-small" label="テキストの視認性を上げる(駒数の背景を適用)")
            b-radio-button(size="is-small" v-model="sp_balloon" native-value="is_balloon_off") OFF
            b-radio-button(size="is-small" v-model="sp_balloon" native-value="is_balloon_on") ON

          b-field(custom-class="is-small" label="移動先セルの明滅")
            b-radio-button(size="is-small" v-model="sp_blink" native-value="is_blink_off") OFF
            b-radio-button(size="is-small" v-model="sp_blink" native-value="is_blink_on") ON

          b-field(custom-class="is-small" label="視点")
            b-radio-button(size="is-small" v-model="sp_flip" :native-value="false") ☗
            b-radio-button(size="is-small" v-model="sp_flip" :native-value="true") ☖

          b-field(custom-class="is-small" label="コントローラー表示")
            b-radio-button(size="is-small" v-model="controller_show" :native-value="false") OFF
            b-radio-button(size="is-small" v-model="controller_show" :native-value="true") ON

          b-field(custom-class="is-small" label="スライダー表示")
            b-radio-button(size="is-small" v-model="slider_show" :native-value="false") OFF
            b-radio-button(size="is-small" v-model="slider_show" :native-value="true") ON

          b-field(custom-class="is-small" label="手数表示")
            b-radio-button(size="is-small" v-model="summary_show" :native-value="false") OFF
            b-radio-button(size="is-small" v-model="summary_show" :native-value="true") ON

        .box
          .title.is-5 カスタムCSS
          b-field(custom-class="is-small" label="")
            b-input(size="is-small" v-model="user_css" type="textarea" :rows="8")

        .box
          .title.is-5 棋譜
          b-field.my-4(custom-class="is-small" label="プリセット")
            b-select(size="is-small" v-model="kifu_sample_key" @input="kifu_sample_key_input_handle")
              option(:value="null")
              template(v-for="e in KifuBookInfo.values")
                option(:value="e.key") {{e.name}}
          b-field(custom-class="is-small" label="棋譜")
            b-input(size="is-small" v-model="new_kifu_body" type="textarea" :rows="8")

        .box
          .title.is-5 対局者情報
          .columns
            .column
              b-field(custom-class="is-small" label="☗")
                b-input(size="is-small" v-model.trim="new_player_info.black.name" type="text")
            .column
              b-field(custom-class="is-small" label="時間")
                b-input(size="is-small" v-model.trim="new_player_info.black.time" type="text")
          .columns
            .column
              b-field(custom-class="is-small" label="☖")
                b-input(size="is-small" v-model.trim="new_player_info.white.name" type="text")
            .column
              b-field(custom-class="is-small" label="時間")
                b-input(size="is-small" v-model.trim="new_player_info.white.time" type="text")

        .box
          .title.is-5 コンポーネント引数確認
          pre
            | {{sp_params}}
        .box
          .title.is-5 CSS変数確認
          pre
            | {{human_css}}

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
const IS_TRANSPARENT = "rgba(0,0,0,0)" // chroma は "transparent" をパースできないため

import chroma from "chroma-js"
import { Slider, Chrome } from "vue-color"

import HumanSideInfo  from "./models/human_side_info.js"
import RunModeInfo    from "./models/run_mode_info.js"
import BgVariantInfo  from "./models/bg_variant_info.js"
import PiVariantInfo  from "./models/pi_variant_info.js"
import KifuBookInfo from "./models/KifuBookInfo.js"
import { MixBlendModeInfo } from "./models/MixBlendModeInfo.js"

import ShogiPlayer from "./ShogiPlayer.vue"
import ColorPicker from "./ColorPicker.vue"
import ImageUpload from "./ImageUpload.vue"

export default {
  name: "StyleEditor",
  components: {
    ShogiPlayer,
    ColorPicker,
    ImageUpload,
  },
  props: {
    kifu_body:   { type: String, required: false, default: null, },
    player_info: { type: Object, required: false, default: null, },
  },

  data() {
    return {
      html_background_color: null,
      sidebar_p: true,

      ////////////////////////////////////////////////////////////////////////////////
      se_frame_width: 80,
      se_ws_image: null,
      sp_board_image: null,

      se_ws_color: "#C6E1B8",
      se_ws_blur: 0,
      se_ws_grayscale: 0,
      se_ws_contrast: 1.0,
      se_ws_invert: 0,
      se_ws_hue:        0,
      se_ws_saturate:   1.0,
      se_ws_brightness: 1.0,

      sp_piece_blur: 0,
      sp_piece_grayscale: 0,
      sp_piece_contrast: 1.0,
      sp_piece_invert: 0,
      sp_piece_opacity: 1.0,
      sp_piece_hue:        0,
      sp_piece_saturate:   1.0,
      sp_piece_brightness: 1.0,

      sp_board_color: "rgba(0, 0, 0, 0.2)",
      sp_board_blur: 0,
      sp_board_grayscale: 0,
      sp_board_contrast: 1.0,
      sp_board_invert: 0,
      sp_board_opacity: 1.0,
      sp_board_hue:        0,
      sp_board_saturate:   1.0,
      sp_board_brightness: 1.0,

      sp_board_aspect_ratio: 1.097,
      sp_board_piece_rate: 90,
      sp_board_piece_position: "center",
      sp_piece_blend: "normal",
      sp_board_blend: "normal",
      sp_board_radius: 5,
      sp_board_padding: 1.5,

      sp_board_dimension_w: 9,
      sp_board_dimension_h: 9,
      sp_hpos: "is_hcentered",
      sp_vpos: "is_vcentered",
      sp_layout: "is_horizontal",
      sp_run_mode: DEVELOPMENT_P ? "edit_mode" : "view_mode",
      sp_mobile_fit: "is_mobile_fit_on",
      sp_mobile_vertical: "is_mobile_vertical_on",

      // 影
      sp_shadow_offset: 2,
      sp_shadow_blur: 3,
      sp_shadow_color: "rgba(0, 0, 0, 0.4)",

      sp_fullheight: "is_fullheight_off",
      sp_balloon: "is_balloon_on",

      sp_stand_piece_w: 47,
      sp_stand_piece_h: 50,
      sp_stand_piece_rate: 80,
      sp_stand_hover_border_color: "rgba(0, 0, 0, 0.2)",

      sp_flip: false,
      sp_piece_count_gap_right: 62.0,
      sp_piece_count_gap_bottom: 47.0,
      sp_piece_count_font_size: 8,
      sp_piece_count_font_color:  "rgba(0, 0, 0, 0.75)",
      sp_piece_count_bg_color: "rgba(255, 255, 255, 0.75)",
      sp_piece_count_padding: 2,

      sp_grid_outer_stroke: 1.5,
      sp_grid_outer_color: "rgba(0, 0, 0, 0.5)",
      sp_grid_color: "rgba(0, 0, 0, 0.5)",
      sp_grid_stroke: 1,
      sp_grid_star_size: 10,

      sp_piece_box_color: "rgba(0, 0, 0, 0.2)",
      sp_piece_box_piece_w: 38,
      sp_piece_box_piece_h: 46,
      sp_piece_box_piece_rate: 90,

      sp_common_gap: 12,
      sp_layer: DEVELOPMENT_P ? "is_layer_off" : "is_layer_off",
      sp_board_shadow: "is_board_shadow_drop",
      sp_blink: "is_blink_on",
      sp_pi_variant: "is_pi_variant_a1by",
      sp_bg_variant: "is_bg_variant_none",
      ////////////////////////////////////////////////////////////////////////////////

      kifu_sample_key: null,

      ////////////////////////////////////////////////////////////////////////////////

      new_player_info: {
        black: { name: "先手", time: "", },
        white: { name: "後手", time: "", },
      },

      new_kifu_body: null,

//       user_css: `.StyleEditor {
//   background-color: black;
// }`,
      user_css: "",

      summary_show:    DEVELOPMENT_P,
      slider_show:     DEVELOPMENT_P,
      controller_show: DEVELOPMENT_P,

      transform_tab_index: 0,

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
      se_tf1_translate_y: -70,
      se_tf1_translate_z: 0,
      se_tf1_rotate_x: 0.05,
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
    if (this.kifu_body) {
      this.new_kifu_body = this.kifu_body
    } else {
      this.kifu_sample_key = this.KifuBookInfo.values[1].key
      this.kifu_sample_key = this.KifuBookInfo.fetch("KIF_15733").key
      this.kifu_sample_key_input_handle()
    }

    if (this.player_info) {
      this.new_player_info = {...this.player_info}
    } else {
      if (false) {
        this.new_player_info = {
          black: { name: "先手", time: "12:34", },
          white: { name: "後手", time: "56:78", },
        }
      }
    }
  },

  // mounted() {
  //   const el = document.querySelector("html")
  //   this.html_background_color = el.style.backgroundColor
  //   el.style.backgroundColor = "black"
  // },
  //
  // beforeDestroy() {
  //   const el = document.querySelector("html")
  //   el.style.backgroundColor = this.html_background_color
  // },

  methods: {
    kifu_sample_key_input_handle() {
      if (this.kifu_book_info) {
        this.new_kifu_body = this.kifu_book_info.kifu_body
        this.new_player_info.black.name = this.kifu_book_info.black
        this.new_player_info.white.name = this.kifu_book_info.white
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
    force_paper_style() {
      this.sp_pi_variant        = "is_pi_variant_b" // 紙面風駒
      this.sp_board_padding     = 0                 // 隙間なし
      this.se_ws_color      = IS_TRANSPARENT    // 背景透過
      this.sp_board_color       = IS_TRANSPARENT    // 盤透過
      this.sp_grid_stroke       = 1                 // グリッド線(細)
      this.sp_grid_outer_stroke = 1.5               // グリッド枠(細)
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

    kifu_book_info() {
      if (this.kifu_sample_key) {
        return KifuBookInfo.fetch(this.kifu_sample_key)
      }
    },

    chroma() { return chroma },

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
      params.sp_board_dimension_w      = this.sp_board_dimension_w
      params.sp_board_dimension_h      = this.sp_board_dimension_h
      params.sp_layout           = this.sp_layout
      params.sp_blink            = this.sp_blink
      params.sp_hpos             = this.sp_hpos
      params.sp_vpos             = this.sp_vpos
      params.sp_fullheight       = this.sp_fullheight
      params.sp_balloon          = this.sp_balloon
      params.sp_layer            = this.sp_layer
      params.sp_board_shadow     = this.sp_board_shadow
      params.sp_pi_variant       = this.sp_pi_variant
      params.sp_bg_variant       = this.sp_bg_variant
      params.sp_mobile_fit       = this.sp_mobile_fit
      params.sp_mobile_vertical  = this.sp_mobile_vertical
      params.run_mode            = this.sp_run_mode
      params.flip                = this.sp_flip
      params.debug_mode_p        = false
      params.start_turn          = -1
      params.kifu_body           = this.new_kifu_body
      params.sound_effect        = true
      params.setting_button_show = false
      params.summary_show        = this.summary_show
      params.slider_show         = this.slider_show
      params.controller_show     = this.controller_show
      params.player_info         = this.new_player_info
      return params
    },

    human_css() {
      let s = this.raw_css
      s = s.replace(/url\(.*\)/g, "url(...)")
      s = s.replace(/\s*.Workspace.*\n/, "")
      s = s.replace(/\s}\s*\n/, "")
      s = s.replace(/;/g, "")
      s = s.replace(/^\s*/gm, "")
      s = s.replace(/:\s*/g, ": ")
      // s = s.replace(/^--/gm, "")
      s = s.replace(/^\/\//gm, "\n//")
      return s
    },

    comment_removed_css() {
      let s = this.raw_css
      s = s.replace(/^\s*\/\/.*\n/gm, "")
      return s
    },

    raw_css() {
      return `
        .Workspace {
          // 背景
          --se_ws_color:             ${this.hsla_format(this.se_ws_color)};
          --se_ws_image:             ${this.se_ws_bg_url};
          --se_ws_blur:              ${this.se_ws_blur};
          --se_ws_grayscale:         ${this.se_ws_grayscale};
          --se_ws_contrast:          ${this.se_ws_contrast};
          --se_ws_invert:            ${this.se_ws_invert};

          --se_ws_hue:               ${this.se_ws_hue};
          --se_ws_saturate:          ${this.se_ws_saturate};
          --se_ws_brightness:        ${this.se_ws_brightness};

          // 盤テクスチャ
          --sp_board_color:              ${this.hsla_format(this.sp_board_color)};
          --sp_board_image:              ${this.sp_board_image_url};
          --sp_board_blur:               ${this.sp_board_blur};
          --sp_board_grayscale:          ${this.sp_board_grayscale};
          --sp_board_contrast:           ${this.sp_board_contrast};
          --sp_board_invert:             ${this.sp_board_invert};
          --sp_board_opacity:            ${this.sp_board_opacity};
          --sp_board_hue:                ${this.sp_board_hue};
          --sp_board_saturate:           ${this.sp_board_saturate};
          --sp_board_brightness:         ${this.sp_board_brightness};
          --sp_board_blend:          ${this.sp_board_blend};

          // 盤
          --sp_board_padding:            ${this.sp_board_padding};
          --sp_board_radius:             ${this.sp_board_radius};
          --sp_board_aspect_ratio:       ${this.sp_board_aspect_ratio};
          --sp_board_piece_rate:         ${this.sp_board_piece_rate}%;
          --sp_board_piece_position:     ${this.sp_board_piece_position};

          // 盤グリッド
          --sp_grid_color:               ${this.hsla_format(this.sp_grid_color)};
          --sp_grid_outer_color:              ${this.hsla_format(this.sp_grid_outer_color)};
          --sp_grid_stroke:              ${this.sp_grid_stroke};
          --sp_grid_outer_stroke:        ${this.sp_grid_outer_stroke};
          --sp_grid_star_size:                ${this.sp_grid_star_size}%;

          // 駒
          --sp_piece_blur:               ${this.sp_piece_blur};
          --sp_piece_grayscale:          ${this.sp_piece_grayscale};
          --sp_piece_contrast:           ${this.sp_piece_contrast};
          --sp_piece_invert:             ${this.sp_piece_invert};
          --sp_piece_opacity:            ${this.sp_piece_opacity};
          --sp_piece_hue:                ${this.sp_piece_hue};
          --sp_piece_saturate:           ${this.sp_piece_saturate};
          --sp_piece_brightness:         ${this.sp_piece_brightness};
          --sp_piece_blend:              ${this.sp_piece_blend};

          // 駒数
          --sp_piece_count_gap_right:    ${this.sp_piece_count_gap_right}%;
          --sp_piece_count_gap_bottom:   ${this.sp_piece_count_gap_bottom}%;
          --sp_piece_count_font_size:    ${this.sp_piece_count_font_size}px;
          --sp_piece_count_font_color:   ${this.hsla_format(this.sp_piece_count_font_color)};
          --sp_piece_count_bg_color:     ${this.hsla_format(this.sp_piece_count_bg_color)};
          --sp_piece_count_padding:      ${this.sp_piece_count_padding}px;

          // 駒台
          --sp_stand_piece_rate:         ${this.sp_stand_piece_rate}%;
          --sp_stand_hover_border_color: ${this.hsla_format(this.sp_stand_hover_border_color)};
          --sp_stand_piece_w:            ${this.sp_stand_piece_w}px;
          --sp_stand_piece_h:            ${this.sp_stand_piece_h}px;

          // 駒箱
          --sp_piece_box_piece_w:        ${this.sp_piece_box_piece_w}px;
          --sp_piece_box_piece_h:        ${this.sp_piece_box_piece_h}px;
          --sp_piece_box_piece_rate:     ${this.sp_piece_box_piece_rate}%;
          --sp_piece_box_color:          ${this.hsla_format(this.sp_piece_box_color)};

          // 影
          --sp_shadow_offset:            ${this.sp_shadow_offset};
          --sp_shadow_blur:              ${this.sp_shadow_blur};
          --sp_shadow_color:             ${this.hsla_format(this.sp_shadow_color)};

          // Other
          --sp_common_gap:            ${this.sp_common_gap}px;
          --se_frame_width:           ${this.se_frame_width}vmin;

          // Transform
          --se_tf0_perspective: ${this.se_tf0_perspective}px;
          --se_tf0_translate_x: ${this.se_tf0_translate_x}px;
          --se_tf0_translate_y: ${this.se_tf0_translate_y}px;
          --se_tf0_translate_z: ${this.se_tf0_translate_z}px;
          --se_tf0_rotate_x:    ${this.se_tf0_rotate_x}turn;
          --se_tf0_rotate_y:    ${this.se_tf0_rotate_y}turn;
          --se_tf0_rotate_z:    ${this.se_tf0_rotate_z}turn;
          --se_tf0_scale:       ${this.se_tf0_scale};

          --se_tf1_perspective: ${this.se_tf1_perspective}px;
          --se_tf1_translate_x: ${this.se_tf1_translate_x}px;
          --se_tf1_translate_y: ${this.se_tf1_translate_y}px;
          --se_tf1_translate_z: ${this.se_tf1_translate_z}px;
          --se_tf1_rotate_x:    ${this.se_tf1_rotate_x}turn;
          --se_tf1_rotate_y:    ${this.se_tf1_rotate_y}turn;
          --se_tf1_rotate_z:    ${this.se_tf1_rotate_z}turn;
          --se_tf1_scale:       ${this.se_tf1_scale};

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

  .title
    margin-top: 0.4rem
    margin-bottom: 1rem

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
    background-color: transparent

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

  .Workspace
    display: flex
    align-items: center
    justify-content: center
    flex-direction: column

  .WorkspaceBackground
    background-color: var(--se_ws_color)
    background-image: var(--se_ws_image)
    background-position: center
    background-repeat: no-repeat
    background-size: cover
    filter: unquote('invert(var(--se_ws_invert)) hue-rotate(calc(var(--se_ws_hue) * 1turn)) saturate(var(--se_ws_saturate)) grayscale(var(--se_ws_grayscale)) brightness(var(--se_ws_brightness)) contrast(var(--se_ws_contrast)) blur(calc(var(--se_ws_blur) * 1px))')

  .ShogiPlayerWrap
    // width: 100%
    // +tablet
    //   width: var(--se_frame_width)
    width: var(--se_frame_width)

  &.is_tf0_mode_on
    .Workspace
      transform: perspective(var(--se_tf0_perspective)) translate3d(var(--se_tf0_translate_x), var(--se_tf0_translate_y), var(--se_tf0_translate_z)) rotateX(var(--se_tf0_rotate_x)) rotateY(var(--se_tf0_rotate_y)) rotateZ(var(--se_tf0_rotate_z)) scale(var(--se_tf0_scale))

  &.is_tf1_mode_on
    .ShogiPlayerTransformBlock
      transform: perspective(var(--se_tf1_perspective)) translate3d(var(--se_tf1_translate_x), var(--se_tf1_translate_y), var(--se_tf1_translate_z)) rotateX(var(--se_tf1_rotate_x)) rotateY(var(--se_tf1_rotate_y)) rotateZ(var(--se_tf1_rotate_z)) scale(var(--se_tf1_scale))

  &.is_tf2_mode_on
    .PieceTexture
      transform: perspective(var(--se_tf2_perspective)) translate3d(var(--se_tf2_translate_x), var(--se_tf2_translate_y), var(--se_tf2_translate_z)) rotateX(var(--se_tf2_rotate_x)) rotateY(var(--se_tf2_rotate_y)) rotateZ(var(--se_tf2_rotate_z)) scale(var(--se_tf2_scale))
</style>
