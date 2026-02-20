<template lang="pug">
.ControlPanel.mx-4.my-4
  .is-flex.is-justify-content-start.is-align-items-center
    b-button(@click="AppContext.sidebar_toggle_handle" icon-left="menu")
    .mx-3.has-text-weight-bold スタイルエディタ

  .ControlPanelBoxes
    .box
      b-field(custom-class="is-small" label="ショートカット")
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
      VariableRadio(variable_key="sp_mode")

    CategoryBox(category_key="レイアウト")
      b-field(custom-class="is-small" label="大きさ")
        template(#message)
          | 親要素の<b>横幅</b>で大きさが変わる
          //- | <b>({{AppContext.se_frame_width}}dvmin)</b>
        VariableSlider(variable_key="se_frame_width")

    CategoryBox(category_key="背景")
      b-field(custom-class="is-small" label="")
        ColorEditor(v-model="AppContext.se_ws_color" :alpha="true")

      ImageUploader(@input="AppContext.se_ws_image_input_handle")

      b-field(custom-class="is-small" label="色相")
        VariableSlider(variable_key="se_ws_hue")
      b-field(custom-class="is-small" label="彩度")
        VariableSlider(variable_key="se_ws_saturate")
      b-field(custom-class="is-small" label="輝度")
        VariableSlider(variable_key="se_ws_brightness")
      b-field(custom-class="is-small" label="ぼかし")
        VariableSlider(variable_key="se_ws_blur")
      b-field(custom-class="is-small" label="セピア")
        VariableSlider(variable_key="se_ws_sepia")
      b-field(custom-class="is-small" label="グレースケール")
        VariableSlider(variable_key="se_ws_grayscale")
      b-field(custom-class="is-small" label="コントラスト")
        VariableSlider(variable_key="se_ws_contrast")
      b-field(custom-class="is-small" label="反転")
        VariableSlider(variable_key="se_ws_invert")

      hr

      p.help
        | 背景はスタイルエディタ側の設定であって ShogiPlayer とはなんも関係無い

    CategoryBox(category_key="盤テクスチャ")
      VariableRadio(variable_key="sp_board_variant" label="素材" class="wrap_layout")
        template(#message)
          | アップロード画像を有効にするには none にする

      ImageUploader(@input="AppContext.sp_board_image_input_handle")

      b-field(custom-class="is-small" label="単色")
        template(#message)
          | 単色は素材の裏にあるため素材の不透明度が100%だと見えない
        ColorEditor(v-model="AppContext.sp_board_color")

    CategoryBox(category_key="盤")

      b-field(custom-class="is-small" label="角丸め" message="紙面風なら0にする")
        VariableSlider(variable_key="sp_board_radius")
      b-field(custom-class="is-small" label="余白" message="紙面風なら0にする")
        VariableSlider(variable_key="sp_board_padding")
      b-field(custom-class="is-small" label="アスペクト比" message="将棋盤は正方形ではない")
        VariableSlider(variable_key="sp_board_aspect_ratio")
      b-field(custom-class="is-small" label="左右余白 (横レイアウト時有効)" message="盤と持駒の間にクリックできない領域ができてしまうため基本0でよい。座標を表示するときのみ少し空けるとよいかもしれない。")
        VariableSlider(variable_key="sp_board_horizontal_gap")
      b-field(custom-class="is-small" label="上下余白 (縦レイアウト時有効)" message="縦幅は貴重なので基本0でよい" v-if="development_p")
        VariableSlider(variable_key="sp_board_vertical_gap")

    CategoryBox(category_key="グリッド")
      b-field(custom-class="is-small" label="太さ (内側)")
        VariableSlider(variable_key="sp_grid_inner_stroke")
      b-field(custom-class="is-small" label="太さ (外枠)")
        VariableSlider(variable_key="sp_grid_outer_stroke")
      b-field(custom-class="is-small" label="太さ (エッジ)")
        VariableSlider(variable_key="sp_board_edge_stroke")
      b-field(custom-class="is-small" label="内側")
        ColorEditor(v-model="AppContext.sp_grid_inner_color")
      b-field(custom-class="is-small" label="外枠・エッジ・星")
        ColorEditor(v-model="AppContext.sp_grid_outer_color")

    CategoryBox(category_key="星")
      b-field(custom-class="is-small" label="大きさ")
        VariableSlider(variable_key="sp_star_size")
      b-field(custom-class="is-small" label="配置間隔")
        VariableSlider(variable_key="sp_star_step")
      b-field(custom-class="is-small" label="表示優先度" message="これは星を巨大化させたときに「駒に重なってその下にある駒を持つイベントを奪ってしまう」対策として入れたものだが、あとでイベントを奪わない方法に気づいたため、現在は -1 にする利点はとくにない。-1のときは盤の奥に描画するため盤が透明でない場合に見えなくなる点に注意する。")
        b-radio-button(size="is-small" v-model="AppContext.sp_star_z_index" :native-value="-1") -1
        b-radio-button(size="is-small" v-model="AppContext.sp_star_z_index" :native-value="0") 0

    CategoryBox(category_key="カメラ")
      b-field.mt-1(custom-class="is-small" label="プリセット")
        .control
          .buttons.mb-0
            template(v-for="e in AppContext.BoardSizePresetInfo.values")
              b-button(@click="AppContext.se_board_size_preset_apply_handle(e)" size="is-small") {{e.name}}
      .columns.mt-1.mb-2
        .column.py-0
          b-field(custom-class="is-small" label="左上(X)")
            VariableSlider(variable_key="sp_board_view_x")
        .column.py-0
          b-field(custom-class="is-small" label="左上(Y)")
            VariableSlider(variable_key="sp_board_view_y")
      .columns.mt-4.mb-2
        .column.py-0
          b-field(custom-class="is-small" label="セル数(W)")
            VariableSlider(variable_key="sp_board_view_w")
        .column.py-0
          b-field(custom-class="is-small" label="セル数(H)")
            VariableSlider(variable_key="sp_board_view_h")

      hr

      p.help.content
        ul
          li 内部は<b>符号座標</b>９一を左上とした本将棋のままである
          li 右上だけの表示でいいなら<b>配列座標</b>で左上を(4,0)でセル数を5x5などとする
          li セル数を小さくすると壊れる

    CategoryBox(category_key="座標")
      b-field(custom-class="is-small" label="表示")
        b-radio-button(size="is-small" v-model="AppContext.sp_coordinate" :native-value="false") OFF
        b-radio-button(size="is-small" v-model="AppContext.sp_coordinate" :native-value="true") ON

      .columns.mt-5
        .column.py-0
          b-field(custom-class="is-small" label="大きさ(列)")
            VariableSlider(variable_key="sp_coordinate_x_size")
        .column.py-0
          b-field(custom-class="is-small" label="位置(列)")
            VariableSlider(variable_key="sp_coordinate_x_push")
        .column.py-0
          VariableRadio(variable_key="sp_coordinate_variant_h" label="表記(列)" :disabled="!AppContext.sp_coordinate")

      .columns.mt-5
        .column.py-0
          b-field(custom-class="is-small" label="大きさ(行)")
            VariableSlider(variable_key="sp_coordinate_y_size")
        .column.py-0
          b-field(custom-class="is-small" label="位置(行)")
            VariableSlider(variable_key="sp_coordinate_y_push")
        .column.py-0
          VariableRadio(variable_key="sp_coordinate_variant_v" label="表記(行)" :disabled="!AppContext.sp_coordinate")

      b-field(custom-class="is-small" label="色")
        ColorEditor(v-model="AppContext.sp_coordinate_color" :disabled="!AppContext.sp_coordinate")

    CategoryBox(category_key="盤セル")

      b-field(custom-class="is-small" label="偶数")
        ColorEditor(v-model="AppContext.sp_board_even_cell_color")

      b-field(custom-class="is-small" label="奇数")
        ColorEditor(v-model="AppContext.sp_board_odd_cell_color")

      p.help
        | 黒のままで透明度の調整するのがおすすめ

    CategoryBox(category_key="駒の種類")
      //- b-field(custom-class="is-small" label="プリセット")
      //-   b-select(size="is-small" v-model="AppContext.sp_piece_variant")
      //-     template(v-for="e in AppContext.PieceVariantInfo.values")
      //-       option(:value="e.key") {{e.name}}
      VariableRadio(variable_key="sp_piece_variant" label="プリセット")
        template(#message)
          | 「紙面風」や「ぬれよん」などは元が巨大なため少し小さく表示した方がよい<br>
          | 「Portella」は調整済みのため原寸(1.0)が望ましい<br>

      //- VariableRadio(variable_key="sp_piece_variant" label="プリセット")
      VariableRadio(variable_key="sp_piece_vertical_position" label="テクスチャ領域内のマッピンング縦位置" message="下にすると駒の底辺が揃う (ただし駒の種類による)")

    CategoryBox(category_key="駒の大きさ")

      //- b-field.grouped(custom-class="is-small" label="セル (駒台)" message="盤に対する割合")
      //-   b-slider(v-bind="AppContext.slider_attrs" v-model="AppContext.sp_stand_cell_size" :min="0" :max="1.0" :step="0.0001")
      //-   b-slider(v-bind="AppContext.slider_attrs" v-model="AppContext.sp_stand_piece_size" :min="0" :max="1.0" :step="0.01")
      //-
      //- hr

      .columns.mt-1
        .column.py-0
          b-field(custom-class="is-small" label="セル (盤内)" message="最大で固定。縮小する利点はない。")
            //- b-slider(v-bind="AppContext.slider_attrs" :value="1.0" :min="0" :max="1.0" disabled)
        .column.py-0
          b-field(custom-class="is-small" label="駒 (盤内)" message="")
            VariableSlider(variable_key="sp_board_piece_size")

      .columns.mt-4
        .column.py-0
          b-field(custom-class="is-small" label="セル (駒台)" message="盤に対する割合")
            VariableSlider(variable_key="sp_stand_cell_size")
        .column.py-0
          b-field(custom-class="is-small" label="駒 (駒台)")
            VariableSlider(variable_key="sp_stand_piece_size")

      .columns.mt-4
        .column.py-0
          b-field(custom-class="is-small" label="セル (駒箱)" message="0.1 ぐらいですべての駒が収まる")
            VariableSlider(variable_key="sp_piece_box_cell_size")
        .column.py-0
          b-field(custom-class="is-small" label="駒 (駒箱)")
            VariableSlider(variable_key="sp_piece_box_piece_size")

      hr

      p.help
        | セルはクリックできる領域のことでその中に駒がある。<br>
        | もともとは盤内のセルと駒台のセルは同じ大きさだった。<br>
        | しかし盤を5x5にしてしまうと、8種類の駒がどうやっても駒台に乗らなくなってしまった。<br>
        | そこで盤の大きさを基準にするようにした。<br>

    CategoryBox(category_key="駒台")
      VariableRadio(variable_key="sp_layout" label="盤のどこに配置する？")
      VariableRadio(variable_key="sp_stand_gravity" label="横配置時の上下位置")
      VariableRadio(variable_key="sp_stand_flip" label="相手側を反転")
      b-field(custom-class="is-small" label="背景色")
        ColorEditor(v-model="AppContext.sp_stand_bg_color")
      b-field(custom-class="is-small" label="持駒をhoverさせたときのborder色" message="編集モード時のみ有効。駒箱にも適用する。")
        ColorEditor(v-model="AppContext.sp_stand_hover_border_color")

    CategoryBox(category_key="持駒表示")
      .columns
        .column
          b-field(custom-class="is-small" label="☗")
            template(v-for="e in AppContext.PieceVisibilityInfo.values")
              b-radio-button(size="is-small" v-model="AppContext.sp_player_info.black.piece_visibility" :native-value="e.key") {{e.radio_button_name}}
        .column
          b-field(custom-class="is-small" label="☖")
            template(v-for="e in AppContext.PieceVisibilityInfo.values")
              b-radio-button(size="is-small" v-model="AppContext.sp_player_info.white.piece_visibility" :native-value="e.key") {{e.radio_button_name}}

      p.help.content
        ul
          li <b>玉方の持駒を隠す</b>目的で入れた詰将棋向けの機能 (実験的)
          li 単に玉方の駒を駒箱に移せば済むのだから余計な機能かもしれない

    CategoryBox(category_key="対局者")

      b-field(custom-class="is-small" label="手番のときの☗☖の大きさ")
        VariableSlider(variable_key="sp_location_mark_active_size")

      b-field(custom-class="is-small" label="手番でないときの☗☖の大きさ")
        VariableSlider(variable_key="sp_location_mark_inactive_size")

      VariableRadio(variable_key="sp_name_direction" label="名前の向き")
        template(#message)
          | 横書きは持駒を左右に置くレイアウトのときのみ有効

      b-field(custom-class="is-small" label="名前の大きさ")
        VariableSlider(variable_key="sp_player_name_size")

      b-field(custom-class="is-small" label="時間の大きさ")
        VariableSlider(variable_key="sp_player_time_size")

      VariableRadio(variable_key="sp_balloon" label="テキストの視認性を上げる" message="駒数の背景を適用する")

      .columns
        .column
          b-field(custom-class="is-small" label="☗")
            b-input(size="is-small" v-model.trim="AppContext.sp_player_info.black.name" type="text")
        .column
          b-field(custom-class="is-small" label="時間")
            b-input(size="is-small" v-model.trim="AppContext.sp_player_info.black.time" type="text")
      .columns
        .column
          b-field(custom-class="is-small" label="☖")
            b-input(size="is-small" v-model.trim="AppContext.sp_player_info.white.name" type="text")
        .column
          b-field(custom-class="is-small" label="時間")
            b-input(size="is-small" v-model.trim="AppContext.sp_player_info.white.time" type="text")

    CategoryBox(category_key="駒数")

      .columns.mt-1.is-multiline
        .column.is-12.py-0
          b-field(custom-class="is-small" label="横レイアウト時の相対位置")
        .column.is-6.py-0
          b-field(custom-class="is-small" label="X")
            VariableSlider(variable_key="sp_piece_count_horizontal_x")
        .column.is-6.py-0
          b-field(custom-class="is-small" label="Y")
            VariableSlider(variable_key="sp_piece_count_horizontal_x")

      .columns.mt-4.is-multiline
        .column.is-12.py-0
          b-field(custom-class="is-small" label="縦レイアウト時の相対位置")
        .column.is-6.py-0
          b-field(custom-class="is-small" label="X")
            VariableSlider(variable_key="sp_piece_count_vertical_x")
        .column.is-6.py-0
          b-field(custom-class="is-small" label="Y")
            VariableSlider(variable_key="sp_piece_count_vertical_y")

      b-field(custom-class="is-small" label="余白")
        b-slider(v-bind="AppContext.slider_attrs" v-model="AppContext.sp_piece_count_padding" :min="0" :max="1.0" :step="0.01")

      b-field(custom-class="is-small" label="大きさ")
        b-slider(v-bind="AppContext.slider_attrs" v-model="AppContext.sp_piece_count_size" :min="0" :max="1.0" :step="0.01")
      b-field(custom-class="is-small" label="テキスト色 (対局者名にも適用)")
        ColorEditor(v-model="AppContext.sp_piece_count_font_color")
      b-field(custom-class="is-small" label="背景")
        ColorEditor(v-model="AppContext.sp_piece_count_bg_color")

    CategoryBox(category_key="駒箱")
      b-field(custom-class="is-small" label="")
        ColorEditor(v-model="AppContext.sp_piece_box_color")
      //- .columns.mt-4
      //-   .column.py-0
      //-     b-field(custom-class="is-small" label="セル(W)")
      //-       b-slider(v-bind="AppContext.slider_attrs" v-model="AppContext.sp_board_cell_current_w" :min="1" :max="80" :step="1")
      //-   .column.py-0
      //-     b-field(custom-class="is-small" label="セル(H)")
      //-       b-slider(v-bind="AppContext.slider_attrs" v-model="AppContext.sp_board_cell_current_h" :min="1" :max="80" :step="1")

      //- .columns.mt-4
      //-   .column.py-0
      //-     b-field(custom-class="is-small" label="持駒画像(W)")
      //-       b-slider(v-bind="AppContext.slider_attrs" v-model="AppContext.sp_board_cell_current_w" :min="1" :max="80" :step="1")
      //-   .column.py-0
      //-     b-field(custom-class="is-small" label="持駒画像(H)")
      //-       b-slider(v-bind="AppContext.slider_attrs" v-model="AppContext.sp_board_cell_current_h" :min="1" :max="80" :step="1")

    CategoryBox(category_key="成り不成り選択")
      b-field(custom-class="is-small" label="背景")
        ColorEditor(v-model="AppContext.sp_promote_select_modal_bg_color")
      b-field(custom-class="is-small" label="hover色")
        ColorEditor(v-model="AppContext.sp_promote_select_modal_hover_color")

    CategoryBox(category_key="駒を操作中の移動元")
      b-field(custom-class="is-small" label="背景")
        ColorEditor(v-model="AppContext.sp_mouse_lifted_origin_bg_color")
      b-field(custom-class="is-small" label="駒の不透明度")
        b-slider(v-bind="AppContext.slider_attrs" v-model="AppContext.sp_mouse_lifted_origin_opacity" :min="0" :max="1.0" :step="0.001")

    CategoryBox(category_key="transform")

      b-tabs(size="is-small" v-model="AppContext.transform_tab_index" expanded)

        b-tab-item(label="盤")
          .columns
            .column
              b-field(grouped)
                b-field.mb-0(custom-class="is-small")
                  b-radio-button(size="is-small" v-model="AppContext.se_tf_board_switch" :native-value="false") OFF
                  b-radio-button(size="is-small" v-model="AppContext.se_tf_board_switch" :native-value="true") ON
                b-field.mb-0(custom-class="is-small")
                  .control
                    b-button(size="is-small" @click="AppContext.transform_reset('tf_board')") リセット
          .columns
            .column
              b-field(custom-class="is-small" label="視点との距離 (px)")
                VariableSlider(variable_key="se_tf_board_perspective")
            .column
              b-field(custom-class="is-small" label="スケール")
                VariableSlider(variable_key="se_tf_board_scale")
          .columns
            .column
              b-field(custom-class="is-small" label="回転 X")
                VariableSlider(variable_key="se_tf_board_rotate_x")
            .column
              b-field(custom-class="is-small" label="回転 Y")
                VariableSlider(variable_key="se_tf_board_rotate_y")
            .column
              b-field(custom-class="is-small" label="回転 Z")
                VariableSlider(variable_key="se_tf_board_rotate_z")
          .columns
            .column
              b-field(custom-class="is-small" label="移動 X")
                VariableSlider(variable_key="se_tf_board_translate_x")
            .column
              b-field(custom-class="is-small" label="移動 Y")
                VariableSlider(variable_key="se_tf_board_translate_y")
            .column
              b-field(custom-class="is-small" label="移動 Z (px)")
                VariableSlider(variable_key="se_tf_board_translate_z")

        b-tab-item(label="駒")
          .columns
            .column
              b-field(grouped)
                b-field.mb-0(custom-class="is-small")
                  b-radio-button(size="is-small" v-model="AppContext.se_tf_piece_switch" :native-value="false") OFF
                  b-radio-button(size="is-small" v-model="AppContext.se_tf_piece_switch" :native-value="true") ON
                b-field.mb-0(custom-class="is-small")
                  .control
                    b-button(size="is-small" @click="AppContext.transform_reset('tf_piece')") リセット
          .columns
            .column
              b-field(custom-class="is-small" label="視点との距離 (px)")
                VariableSlider(variable_key="se_tf_piece_perspective")
            .column
              b-field(custom-class="is-small" label="スケール")
                VariableSlider(variable_key="se_tf_piece_scale")
          .columns
            .column
              b-field(custom-class="is-small" label="回転 X")
                VariableSlider(variable_key="se_tf_piece_rotate_x")
            .column
              b-field(custom-class="is-small" label="回転 Y")
                VariableSlider(variable_key="se_tf_piece_rotate_y")
            .column
              b-field(custom-class="is-small" label="回転 Z")
                VariableSlider(variable_key="se_tf_piece_rotate_z")
          .columns
            .column
              b-field(custom-class="is-small" label="移動 X")
                VariableSlider(variable_key="se_tf_piece_translate_x")
            .column
              b-field(custom-class="is-small" label="移動 Y")
                VariableSlider(variable_key="se_tf_piece_translate_y")
            .column
              b-field(custom-class="is-small" label="移動 Z (px)")
                VariableSlider(variable_key="se_tf_piece_translate_z")

        b-tab-item(label="全体")
          .columns
            .column
              b-field(grouped)
                b-field.mb-0(custom-class="is-small")
                  b-radio-button(size="is-small" v-model="AppContext.se_tf_wall_switch" :native-value="false") OFF
                  b-radio-button(size="is-small" v-model="AppContext.se_tf_wall_switch" :native-value="true") ON
                b-field.mb-0(custom-class="is-small")
                  .control
                    b-button(size="is-small" @click="AppContext.transform_reset('tf_wall')") リセット
          .columns
            .column
              b-field(custom-class="is-small" label="視点との距離 (px)")
                VariableSlider(variable_key="se_tf_wall_perspective")
            .column
              b-field(custom-class="is-small" label="スケール")
                VariableSlider(variable_key="se_tf_wall_scale")
          .columns
            .column
              b-field(custom-class="is-small" label="回転 X")
                VariableSlider(variable_key="se_tf_wall_rotate_x")
            .column
              b-field(custom-class="is-small" label="回転 Y")
                VariableSlider(variable_key="se_tf_wall_rotate_y")
            .column
              b-field(custom-class="is-small" label="回転 Z")
                VariableSlider(variable_key="se_tf_wall_rotate_z")
          .columns
            .column
              b-field(custom-class="is-small" label="移動 X")
                VariableSlider(variable_key="se_tf_wall_translate_x")
            .column
              b-field(custom-class="is-small" label="移動 Y")
                VariableSlider(variable_key="se_tf_wall_translate_y")
            .column
              b-field(custom-class="is-small" label="移動 Z (px)")
                VariableSlider(variable_key="se_tf_wall_translate_z")

      template(v-if="development_p && false")
        hr
        b-field(custom-class="is-small" label="チェッカー背景" )
          b-radio-button(size="is-small" v-model="AppContext.se_checkerboard_pattern" :native-value="false") OFF
          b-radio-button(size="is-small" v-model="AppContext.se_checkerboard_pattern" :native-value="true") ON

      hr

      p.help.content
        | 基本的に<b>回転X</b>・<b>視点との距離</b>・<b>移動Z</b>の3つで調整する。
        | これらはスタイルエディタ側でスタイルを適用しているだけで ShogiPlayer が用意している機能ではない。

    CategoryBox(category_key="コントローラー")

      b-field(custom-class="is-small" label="コントローラー表示")
        b-radio-button(size="is-small" v-model="AppContext.sp_controller" :native-value="false") OFF
        b-radio-button(size="is-small" v-model="AppContext.sp_controller" :native-value="true") ON

      b-field(custom-class="is-small" label="スライダー表示")
        b-radio-button(size="is-small" v-model="AppContext.sp_slider" :native-value="false") OFF
        b-radio-button(size="is-small" v-model="AppContext.sp_slider" :native-value="true") ON

      b-field(custom-class="is-small" label="横幅(PC)")
        b-slider(v-bind="AppContext.slider_attrs" v-model="AppContext.sp_controller_width" :min="0" :max="1.0" :step="0.001")

      b-field(custom-class="is-small" label="横幅(モバイル時)")
        b-slider(v-bind="AppContext.slider_attrs" v-model="AppContext.sp_controller_width_mobile" :min="0" :max="1.0" :step="0.001")

    CategoryBox(category_key="操作感")

      b-field(custom-class="is-small" label="持ち上げた駒のキャンセル方法")
        template(v-for="e in AppContext.LiftCancelActionInfo.values")
          b-radio-button(size="is-small" v-model="AppContext.sp_lift_cancel_action" :native-value="e.key") {{e.radio_button_name}}

    CategoryBox(category_key="反則")

      b-field(custom-class="is-small" label="移動制限")
        template(#message)
          | 駒の特性を考慮する親切オプションで例えば玉は1マスしか動けなくなる。
          | ただし反則のロジックには関与しないためそれが自殺手になっているかはわからない。
        b-radio-button(size="is-small" v-model="AppContext.sp_legal_move_only" :native-value="false") OFF
        b-radio-button(size="is-small" v-model="AppContext.sp_legal_move_only" :native-value="true") ON

      b-field(custom-class="is-small" label="反則検知")
        template(#message)
          | 反則が起きていないかチェックする。
          | 例えば王手ではない状態から利きがあるところに玉を動かせば<b>自殺手</b>の情報を、着手イベント ev_play_mode_move に含める。
          | これを有効にするときは移動制限も有効にすること。
        b-radio-button(size="is-small" v-model="AppContext.sp_illegal_validate" :native-value="false") OFF
        b-radio-button(size="is-small" v-model="AppContext.sp_illegal_validate" :native-value="true") ON

      b-field(custom-class="is-small" label="反則ブロック")
        template(#message)
          | 反則できないようにするオプション。
          | 反則検知オプション有効時に反則を検知しても ev_play_mode_move に含めない。
          | 代わりに ev_illegal_illegal_accident イベントで反則を投げるが無視してもよい。
        b-radio-button(size="is-small" v-model="AppContext.sp_illegal_cancel" :native-value="false") OFF
        b-radio-button(size="is-small" v-model="AppContext.sp_illegal_cancel" :native-value="true") ON

      p.help
        | 以上はすべて操作モードでのみ有効である

    CategoryBox(category_key="千日手")

      b-field(custom-class="is-small" label="現局面のハッシュをイベントに含めるか？")
        template(#message)
          | 有効にすると ev_play_mode_move イベントに含める。
          | 同じハッシュの4回目を発生させた側を反則とするかどうかはイベントを受け取った側に任せてある。
          | また設計ミスにより(いまのところは)反則検知ができない。
        b-radio-button(size="is-small" v-model="AppContext.sp_request_snapshot_hash" :native-value="false") OFF
        b-radio-button(size="is-small" v-model="AppContext.sp_request_snapshot_hash" :native-value="true") ON

      b-field(custom-class="is-small" label="操作モードで王手しているかどうかの結果をイベントに含めるか？")
        template(#message)
          | 連続王手の千日手の判定サポート用
        b-radio-button(size="is-small" v-model="AppContext.sp_request_op_king_check" :native-value="false") OFF
        b-radio-button(size="is-small" v-model="AppContext.sp_request_op_king_check" :native-value="true") ON

      p.help
        | 以上はすべて操作モードでのみ有効である

    CategoryBox(category_key="デバッグ")

      b-field(custom-class="is-small" label="レイヤー確認")
        b-radio-button(size="is-small" v-model="AppContext.sp_layer" :native-value="false") OFF
        b-radio-button(size="is-small" v-model="AppContext.sp_layer" :native-value="true") ON

      b-field(custom-class="is-small" label="Dev Tools")
        b-radio-button(size="is-small" v-model="AppContext.sp_dev_tools" :native-value="false") OFF
        b-radio-button(size="is-small" v-model="AppContext.sp_dev_tools" :native-value="true") ON

      b-field(custom-class="is-small" label="手数表示")
        b-radio-button(size="is-small" v-model="AppContext.sp_turn_show" :native-value="false") OFF
        b-radio-button(size="is-small" v-model="AppContext.sp_turn_show" :native-value="true") ON

    CategoryBox(category_key="その他")

      b-field(custom-class="is-small" label="操作モードでの詰み判定")
        b-radio-button(size="is-small" v-model="AppContext.sp_request_checkmate_stat" :native-value="false") OFF
        b-radio-button(size="is-small" v-model="AppContext.sp_request_checkmate_stat" :native-value="true") ON

      b-field(custom-class="is-small" label="共通の隙間" message="盤の縦幅に対する割合")
        b-slider(v-bind="AppContext.slider_attrs" v-model="AppContext.sp_common_gap" :min="0" :max="0.1" :step="0.0001")

      b-field(custom-class="is-small" label="モバイル時に縦配置にする")
        b-radio-button(size="is-small" v-model="AppContext.sp_mobile_vertical" :native-value="false") OFF
        b-radio-button(size="is-small" v-model="AppContext.sp_mobile_vertical" :native-value="true") ON

      b-field(custom-class="is-small" label="視点" message="☗☖をクリックしても切り替わる")
        b-radio-button(size="is-small" v-model="AppContext.sp_viewpoint" native-value="black") ☗
        b-radio-button(size="is-small" v-model="AppContext.sp_viewpoint" native-value="white") ☖

      b-field(custom-class="is-small" label="盤面左右で局面変更" message="再生モード時のみ有効")
        b-radio-button(size="is-small" v-model="AppContext.sp_overlay_nav" :native-value="false") OFF
        b-radio-button(size="is-small" v-model="AppContext.sp_overlay_nav" :native-value="true") ON

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

      b-field(custom-class="is-small" label="棋譜コメント表示")
        b-radio-button(size="is-small" v-model="AppContext.sp_comment" :native-value="false") OFF
        b-radio-button(size="is-small" v-model="AppContext.sp_comment" :native-value="true") ON

    CategoryBox(category_key="カスタムCSS")
      b-field(custom-class="is-small" label="プリセット")
        .control
          .buttons.mb-0
            template(v-for="e in AppContext.UserCustomCssPresetInfo.values")
              b-button(@click="AppContext.se_user_custom_css_preset_apply_handle(e)" size="is-small") {{e.name}}
      b-field(custom-class="is-small" label="CSS")
        b-input(size="is-small" v-model="AppContext.user_custom_css" type="textarea" :rows="8")

    CategoryBox(category_key="コンポーネント引数確認")
      b-field(custom-class="is-small")
        b-radio-button(size="is-small" v-model="AppContext.component_parmas_show_all" :native-value="false") 差分のみ
        b-radio-button(size="is-small" v-model="AppContext.component_parmas_show_all" :native-value="true") すべて表示する
      pre
        | {{AppContext.sp_component_bind_attrs}}
      p.help
        a(href="https://shogi-player.netlify.app/reference/props/" target="_blank") ドキュメント

    CategoryBox(category_key="CSS変数確認")
      b-field(custom-class="is-small")
        b-radio-button(size="is-small" v-model="AppContext.css_params_show_all_sp" :native-value="false") 差分のみ
        b-radio-button(size="is-small" v-model="AppContext.css_params_show_all_sp" :native-value="true") すべて表示する
      pre
        | {{AppContext.sp_css_human}}
      p.help
        a(href="https://shogi-player.netlify.app/reference/css-variables/" target="_blank") ドキュメント

    CategoryBox(category_key="SE側CSS変数確認")
      b-field(custom-class="is-small")
        b-radio-button(size="is-small" v-model="AppContext.css_params_show_all_se" :native-value="false") 差分のみ
        b-radio-button(size="is-small" v-model="AppContext.css_params_show_all_se" :native-value="true") すべて表示する
      pre
        | {{AppContext.se_component_style_human}}
      p.help
        | 実際には StyleEditor(style="...") で渡している

    CategoryBox(category_key="KBショートカット")
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
        |
        | ※編集モードのときは ShogiPlayer 側のショートカットを優先する
</template>

<script>
import ColorEditor from "./ColorEditor.vue"
import ImageUploader from "./ImageUploader.vue"
import CategoryBox from "./CategoryBox.vue"
import CategoryName from "./CategoryName.vue"
import VariableSlider from "./VariableSlider.vue"
import VariableRadio from "./VariableRadio.vue"

export default {
  name: "ControlPanel",
  inject: ["AppContext"],
  components: {
    ColorEditor,
    ImageUploader,
    CategoryBox,
    CategoryName,
    VariableSlider,
    VariableRadio,
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
    white-space: pre-wrap
    word-break: break-all
</style>
