<template lang="pug">
.EditorUI.mx-4.my-4
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
              b-button.mb-0(@click="TheSe.se_preset_apply_handle(e)" size="is-small") {{e.name}}

      b-field(custom-class="is-small" label="永続化")
        .control
          .buttons.are-small.storage_buttons
            b-button.mb-0(@click="TheSe.xstore_save_handle") SAVE
            b-button.mb-0(@click="TheSe.xstore_load_handle") LOAD
    .box
      SeTitle(name="基本")
      b-field(custom-class="is-small" label="コンテナ幅")
        template(#message)
          | 入れ物の横幅で盤の大きさが決まる。
          | 高さでも調整できるようにしたい。

        b-slider(v-bind="TheSe.slider_attrs" v-model="TheSe.se_frame_width" :min="1" :max="100")
      b-field(custom-class="is-small" label="レイアウト" message="駒台の配置位置。左右=PC 上下=モバイル 向け")
        b-radio-button(size="is-small" v-model="TheSe.sp_layout" native-value="horizontal") 左右
        b-radio-button(size="is-small" v-model="TheSe.sp_layout" native-value="vertical") 上下
      b-field(custom-class="is-small" label="モード")
        b-radio-button(size="is-small" v-model="TheSe.sp_mode" native-value="view") 再生
        b-radio-button(size="is-small" v-model="TheSe.sp_mode" native-value="play") 操作
        b-radio-button(size="is-small" v-model="TheSe.sp_mode" native-value="edit") 編集
    .box
      SeTitle(name="背景")

      b-field(custom-class="is-small" label="")
        MyColorPicker(v-model="TheSe.se_ws_color" :alpha="false")

      ImageUpload(@input="TheSe.se_ws_image_input_handle")

      b-field(custom-class="is-small" label="色相")
        b-slider(v-bind="TheSe.slider_attrs" v-model="TheSe.se_ws_hue" :min="-0.5" :max="0.5" :step="0.001")
      b-field(custom-class="is-small" label="彩度")
        b-slider(v-bind="TheSe.slider_attrs" v-model="TheSe.se_ws_saturate" :min="0" :max="2.0" :step="0.001")
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

      hr

      p.help
        | 背景は使う側の設定であって ShogiPlayer とは直接関係が無い

    .box
      SeTitle(name="盤テクスチャ")

      b-field(custom-class="is-small" label="単色")
        MyColorPicker(v-model="TheSe.sp_board_color")

      b-field.my-4(custom-class="is-small" label="プリセット画像")
        b-select(size="is-small" v-model="TheSe.sp_board_variant")
          template(v-for="e in TheSe.BoardVariantInfo.values")
            option(:value="e.key") {{e.name}}

      ImageUpload(@input="TheSe.sp_board_image_input_handle")

    .box
      SeTitle(name="盤")
      b-field(custom-class="is-small" label="角丸め" message="紙面風なら0にする")
        b-slider(v-bind="TheSe.slider_attrs" v-model="TheSe.sp_board_radius" :min="0" :max="50" :step="0.01")
      b-field(custom-class="is-small" label="余白" message="紙面風なら0にする")
        b-slider(v-bind="TheSe.slider_attrs" v-model="TheSe.sp_board_padding" :min="0" :max="0.05" :step="0.001")
      b-field(custom-class="is-small" label="アスペクト比" message="将棋盤は正方形ではない")
        b-slider(v-bind="TheSe.slider_attrs" v-model="TheSe.sp_board_aspect_ratio" :min="0.5" :max="1.5" :step="0.001")
      b-field(custom-class="is-small" label="左右余白 (横レイアウト時有効)" message="盤と持駒の間にクリックできない領域ができてしまうため基本0でよい。座標を表示するときのみ少し空けるとよいかもしれない。")
        b-slider(v-bind="TheSe.slider_attrs" v-model="TheSe.sp_board_horizontal_gap" :min="0" :max="1.0" :step="0.01")
      b-field(custom-class="is-small" label="上下余白 (縦レイアウト時有効)" message="縦幅は貴重なので基本0でよい" v-if="development_p")
        b-slider(v-bind="TheSe.slider_attrs" v-model="TheSe.sp_board_vertical_gap" :min="0" :max="1.0" :step="0.01")

    .box
      SeTitle(name="グリッド")
      b-field(custom-class="is-small" label="内側")
        MyColorPicker(v-model="TheSe.sp_grid_inner_color")
      b-field(custom-class="is-small" label="外枠・エッジ・星")
        MyColorPicker(v-model="TheSe.sp_grid_outer_color")
      b-field(custom-class="is-small" label="太さ (内側)")
        b-slider(v-bind="TheSe.slider_attrs" v-model="TheSe.sp_grid_inner_stroke" :min="0" :max="10" :step="0.5")
      b-field(custom-class="is-small" label="太さ (外枠)")
        b-slider(v-bind="TheSe.slider_attrs" v-model="TheSe.sp_grid_outer_stroke" :min="0" :max="10" :step="0.5")
      b-field(custom-class="is-small" label="太さ (エッジ)")
        b-slider(v-bind="TheSe.slider_attrs" v-model="TheSe.sp_board_edge_stroke" :min="0" :max="10" :step="0.5")

    .box
      SeTitle(name="星")
      b-field(custom-class="is-small" label="大きさ")
        b-slider(v-bind="TheSe.slider_attrs" v-model="TheSe.sp_star_size" :min="0" :max="1.0" :step="0.001")
      b-field(custom-class="is-small" label="配置間隔")
        b-slider(v-bind="TheSe.slider_attrs" v-model="TheSe.sp_star_step" :min="0" :max="10")
      b-field(custom-class="is-small" label="表示優先度" message="これは星を巨大化させたときに「駒に重なってその下にある駒を持つイベントを奪ってしまう」対策として入れたものだが、あとでイベントを奪わない方法に気づいたため、現在は -1 にする利点はとくにない。-1のときは盤の奥に描画するため盤が透明でない場合に見えなくなる点に注意する。")
        b-radio-button(size="is-small" v-model="TheSe.sp_star_z_index" :native-value="-1") -1
        b-radio-button(size="is-small" v-model="TheSe.sp_star_z_index" :native-value="0") 0

    .box
      SeTitle(name="カメラ")
      b-field.mt-1(custom-class="is-small" label="プリセット")
        .control
          .buttons.mb-0
            template(v-for="e in TheSe.SeBoardSizePresetInfo.values")
              b-button(@click="TheSe.se_board_size_preset_apply_handle(e)" size="is-small") {{e.name}}
      .columns.mt-1.mb-2
        .column.py-0
          b-field(custom-class="is-small" label="左上(X)")
            b-slider(v-bind="TheSe.slider_attrs" v-model="TheSe.sp_board_view_x" :min="-9" :max="9")
        .column.py-0
          b-field(custom-class="is-small" label="左上(Y)")
            b-slider(v-bind="TheSe.slider_attrs" v-model="TheSe.sp_board_view_y" :min="-9" :max="9")
      .columns.mt-4.mb-2
        .column.py-0
          b-field(custom-class="is-small" label="セル数(W)")
            b-slider(v-bind="TheSe.slider_attrs" v-model="TheSe.sp_board_view_w" :min="0" :max="19")
        .column.py-0
          b-field(custom-class="is-small" label="セル数(H)")
            b-slider(v-bind="TheSe.slider_attrs" v-model="TheSe.sp_board_view_h" :min="0" :max="19")

      hr

      p.help.content
        ul
          li 内部は<b>符号座標</b>９一を左上とした本将棋のままである
          li 右上だけの表示でいいなら<b>配列座標</b>で左上を(4,0)でセル数を5x5などとする
          li セル数を小さくすると壊れる

    .box
      SeTitle(name="座標")
      b-field(custom-class="is-small" label="表示")
        b-radio-button(size="is-small" v-model="TheSe.sp_coordinate" :native-value="false") OFF
        b-radio-button(size="is-small" v-model="TheSe.sp_coordinate" :native-value="true") ON

      .columns.mt-5
        .column.py-0
          b-field(custom-class="is-small" label="上の表記(X)")
            template(v-for="e in TheSe.CoordinateInfo.values")
              b-radio-button(size="is-small" v-model="TheSe.sp_coordinate_variant_h" :native-value="e.key") {{e.name}}
        .column.py-0
          b-field(custom-class="is-small" label="右の表記(Y)")
            template(v-for="e in TheSe.CoordinateInfo.values")
              b-radio-button(size="is-small" v-model="TheSe.sp_coordinate_variant_v" :native-value="e.key") {{e.name}}

      .columns.mt-5
        .column.py-0
          b-field(custom-class="is-small" label="上の大きさ(X)")
            b-slider(v-bind="TheSe.slider_attrs" v-model="TheSe.sp_coordinate_x_size" :min="0" :max="1.0" :step="0.001")
        .column.py-0
          b-field(custom-class="is-small" label="右の大きさ(Y)")
            b-slider(v-bind="TheSe.slider_attrs" v-model="TheSe.sp_coordinate_y_size" :min="0" :max="1.0" :step="0.001")

      .columns.mt-5
        .column.py-0
          b-field(custom-class="is-small" label="位置(X)")
            b-slider(v-bind="TheSe.slider_attrs" v-model="TheSe.sp_coordinate_x_push" :min="-0.5" :max="0.5" :step="0.001")
        .column.py-0
          b-field(custom-class="is-small" label="位置(Y)")
            b-slider(v-bind="TheSe.slider_attrs" v-model="TheSe.sp_coordinate_y_push" :min="-0.5" :max="0.5" :step="0.001")

      b-field(custom-class="is-small" label="色")
        MyColorPicker(v-model="TheSe.sp_coordinate_color")

    .box
      SeTitle(name="盤セル")

      b-field(custom-class="is-small" label="偶数")
        MyColorPicker(v-model="TheSe.sp_board_even_cell_color")

      b-field(custom-class="is-small" label="奇数")
        MyColorPicker(v-model="TheSe.sp_board_odd_cell_color")

      p.help
        | 黒のままで透明度の調整するのがおすすめ

    .box
      SeTitle(name="駒の種類")

      b-field(custom-class="is-small" label="プリセット")
        template(#message)
          | 「紙面風」や「ぬれよん」などは元が巨大なため少し小さく表示した方がよい<br>
          | 「Portella」は調整済みのため原寸(1.0)が望ましい<br>
        b-select(size="is-small" v-model="TheSe.sp_piece_variant")
          template(v-for="e in TheSe.PieceVariantInfo.values")
            option(:value="e.key") {{e.name}}

      b-field(custom-class="is-small" label="テクスチャ領域内のマッピンング縦位置" message="下にすると駒の底辺が揃う (ただし駒の種類による)")
        b-radio-button(size="is-small" v-model="TheSe.sp_piece_vertical_position" native-value="top") ↑
        b-radio-button(size="is-small" v-model="TheSe.sp_piece_vertical_position" native-value="center") ・
        b-radio-button(size="is-small" v-model="TheSe.sp_piece_vertical_position" native-value="bottom") ↓

    .box
      SeTitle(name="駒の大きさ")

      //- b-field.grouped(custom-class="is-small" label="セル (駒台)" message="盤に対する割合")
      //-   b-slider(v-bind="TheSe.slider_attrs" v-model="TheSe.sp_stand_cell_size" :min="0" :max="1.0" :step="0.0001")
      //-   b-slider(v-bind="TheSe.slider_attrs" v-model="TheSe.sp_stand_piece_size" :min="0" :max="1.0" :step="0.01")
      //-
      //- hr

      .columns.mt-1
        .column.py-0
          b-field(custom-class="is-small" label="セル (盤内)" message="最大で固定。縮小する利点はない。")
            //- b-slider(v-bind="TheSe.slider_attrs" :value="1.0" :min="0" :max="1.0" disabled)
        .column.py-0
          b-field(custom-class="is-small" label="駒 (盤内)" message="")
            b-slider(v-bind="TheSe.slider_attrs" v-model="TheSe.sp_board_piece_size" :min="0" :max="1.0" :step="0.001")

      .columns.mt-4
        .column.py-0
          b-field(custom-class="is-small" label="セル (駒台)" message="盤に対する割合")
            b-slider(v-bind="TheSe.slider_attrs" v-model="TheSe.sp_stand_cell_size" :min="0" :max="1.0" :step="0.0001")
        .column.py-0
          b-field(custom-class="is-small" label="駒 (駒台)")
            b-slider(v-bind="TheSe.slider_attrs" v-model="TheSe.sp_stand_piece_size" :min="0" :max="1.0" :step="0.01")

      .columns.mt-4
        .column.py-0
          b-field(custom-class="is-small" label="セル (駒箱)" message="0.1 ぐらいですべての駒が収まる")
            b-slider(v-bind="TheSe.slider_attrs" v-model="TheSe.sp_piece_box_cell_size" :min="0" :max="1.0" :step="0.0001")
        .column.py-0
          b-field(custom-class="is-small" label="駒 (駒箱)")
            b-slider(v-bind="TheSe.slider_attrs" v-model="TheSe.sp_piece_box_piece_size" :min="0" :max="1.0" :step="0.01")

      hr

      p.help
        | セルはクリックできる領域のことでその中に駒がある。<br>
        | もともとは盤内のセルと駒台のセルは同じ大きさだった。<br>
        | しかし盤を5x5にしてしまうと、8種類の駒がどうやっても駒台に乗らなくなってしまった。<br>
        | そこで盤の大きさを基準にするようにした。<br>

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
      //-       b-slider(v-bind="TheSe.slider_attrs" v-model="TheSe.sp_board_cell_current_w" :min="1" :max="80" :step="1")
      //-   .column.py-0
      //-     b-field(custom-class="is-small" label="セル(H)" message="駒と駒の隙間に影響する")
      //-       b-slider(v-bind="TheSe.slider_attrs" v-model="TheSe.sp_board_cell_current_h" :min="1" :max="80" :step="1")
      b-field(custom-class="is-small" label="背景色")
        MyColorPicker(v-model="TheSe.sp_stand_bg_color")
      b-field(custom-class="is-small" label="持駒をhoverさせたときのborder色" message="編集モード時のみ有効。駒箱にも適用する。")
        MyColorPicker(v-model="TheSe.sp_stand_hover_border_color")

    .box
      SeTitle(name="持駒表示")

      .columns
        .column
          b-field(custom-class="is-small" label="☗")
            template(v-for="e in TheSe.SePieceVisibilityInfo.values")
              b-radio-button(size="is-small" v-model="TheSe.sp_player_info.black.piece_visibility" :native-value="e.key") {{e.radio_button_name}}
        .column
          b-field(custom-class="is-small" label="☖")
            template(v-for="e in TheSe.SePieceVisibilityInfo.values")
              b-radio-button(size="is-small" v-model="TheSe.sp_player_info.white.piece_visibility" :native-value="e.key") {{e.radio_button_name}}

      p.help.content
        ul
          li <b>玉方の持駒を隠す</b>目的で入れた詰将棋向けの機能 (実験的)
          li 単に玉方の駒を駒箱に移せば済むのだから余計な機能かもしれない

    .box
      SeTitle(name="対局者")

      b-field(custom-class="is-small" label="手番のときの☗☖の大きさ")
        b-slider(v-bind="TheSe.slider_attrs" v-model="TheSe.sp_location_mark_active_size" :min="0" :max="1.5" :step="0.01")

      b-field(custom-class="is-small" label="手番でないときの☗☖の大きさ")
        b-slider(v-bind="TheSe.slider_attrs" v-model="TheSe.sp_location_mark_inactive_size" :min="0" :max="1.5" :step="0.01")

      b-field(custom-class="is-small" label="名前の向き")
        template(#message)
          | 横書きは持駒を左右に置くレイアウトのときのみ有効

        b-radio-button(size="is-small" v-model="TheSe.sp_name_direction" native-value="horizontal") 横書き
        b-radio-button(size="is-small" v-model="TheSe.sp_name_direction" native-value="vertical") 縦書き

      b-field(custom-class="is-small" label="名前の大きさ")
        b-slider(v-bind="TheSe.slider_attrs" v-model="TheSe.sp_player_name_size" :min="0" :max="0.5" :step="0.001")

      b-field(custom-class="is-small" label="時間の大きさ")
        b-slider(v-bind="TheSe.slider_attrs" v-model="TheSe.sp_player_time_size" :min="0" :max="0.5" :step="0.001")

      b-field(custom-class="is-small" label="テキストの視認性を上げる" message="駒数の背景を適用する")
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

      .columns.mt-1.is-multiline
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
      b-field(custom-class="is-small" label="")
        MyColorPicker(v-model="TheSe.sp_piece_box_color")
      //- .columns.mt-4
      //-   .column.py-0
      //-     b-field(custom-class="is-small" label="セル(W)")
      //-       b-slider(v-bind="TheSe.slider_attrs" v-model="TheSe.sp_board_cell_current_w" :min="1" :max="80" :step="1")
      //-   .column.py-0
      //-     b-field(custom-class="is-small" label="セル(H)")
      //-       b-slider(v-bind="TheSe.slider_attrs" v-model="TheSe.sp_board_cell_current_h" :min="1" :max="80" :step="1")

      //- .columns.mt-4
      //-   .column.py-0
      //-     b-field(custom-class="is-small" label="持駒画像(W)")
      //-       b-slider(v-bind="TheSe.slider_attrs" v-model="TheSe.sp_board_cell_current_w" :min="1" :max="80" :step="1")
      //-   .column.py-0
      //-     b-field(custom-class="is-small" label="持駒画像(H)")
      //-       b-slider(v-bind="TheSe.slider_attrs" v-model="TheSe.sp_board_cell_current_h" :min="1" :max="80" :step="1")

    .box
      SeTitle(name="成り不成り選択")
      b-field(custom-class="is-small" label="背景")
        MyColorPicker(v-model="TheSe.sp_promote_select_modal_bg_color")
      b-field(custom-class="is-small" label="hover色")
        MyColorPicker(v-model="TheSe.sp_promote_select_modal_hover_color")

    .box
      SeTitle(name="駒を操作中の移動元")
      b-field(custom-class="is-small" label="背景")
        MyColorPicker(v-model="TheSe.sp_mouse_lifted_origin_bg_color")
      b-field(custom-class="is-small" label="駒の非透明度")
        b-slider(v-bind="TheSe.slider_attrs" v-model="TheSe.sp_mouse_lifted_origin_opacity" :min="0" :max="1.0" :step="0.001")

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

      hr

      b-field(custom-class="is-small" label="チェッカー背景")
        b-radio-button(size="is-small" v-model="TheSe.se_bg_pattern" :native-value="false") OFF
        b-radio-button(size="is-small" v-model="TheSe.se_bg_pattern" :native-value="true") ON

      hr

      p.help.content
        | Transform 関連はスタイルエディタ側で ShogiPlayer の要素にCSSを適用しているだけ

    .box
      SeTitle(name="コントローラー")

      b-field(custom-class="is-small" label="コントローラー表示")
        b-radio-button(size="is-small" v-model="TheSe.sp_controller" :native-value="false") OFF
        b-radio-button(size="is-small" v-model="TheSe.sp_controller" :native-value="true") ON

      b-field(custom-class="is-small" label="スライダー表示")
        b-radio-button(size="is-small" v-model="TheSe.sp_slider" :native-value="false") OFF
        b-radio-button(size="is-small" v-model="TheSe.sp_slider" :native-value="true") ON

      b-field(custom-class="is-small" label="横幅(PC)")
        b-slider(v-bind="TheSe.slider_attrs" v-model="TheSe.sp_controller_width" :min="0" :max="1.0" :step="0.001")

      b-field(custom-class="is-small" label="横幅(モバイル時)")
        b-slider(v-bind="TheSe.slider_attrs" v-model="TheSe.sp_controller_width_mobile" :min="0" :max="1.0" :step="0.001")

    .box
      SeTitle(name="操作感")

      b-field(custom-class="is-small" label="持ち上げた駒のキャンセル方法")
        template(v-for="e in TheSe.LiftCancelActionInfo.values")
          b-radio-button(size="is-small" v-model="TheSe.sp_lift_cancel_action" :native-value="e.key") {{e.radio_button_name}}

    .box
      SeTitle(name="反則")

      b-field(custom-class="is-small" label="移動制限")
        template(#message)
          | 駒の特性を考慮する親切オプションで例えば玉は1マスしか動けなくなる。
          | ただし反則のロジックには関与しないためそれが自殺手になっているかはわからない。
        b-radio-button(size="is-small" v-model="TheSe.sp_legal_move_only" :native-value="false") OFF
        b-radio-button(size="is-small" v-model="TheSe.sp_legal_move_only" :native-value="true") ON

      b-field(custom-class="is-small" label="反則検知")
        template(#message)
          | 反則が起きていないかチェックする。
          | 例えば王手ではない状態から利きがあるところに玉を動かせば<b>自殺手</b>の情報を、着手イベント ev_play_mode_move に含める。
          | これを有効にするときは移動制限も有効にすること。
        b-radio-button(size="is-small" v-model="TheSe.sp_illegal_validate" :native-value="false") OFF
        b-radio-button(size="is-small" v-model="TheSe.sp_illegal_validate" :native-value="true") ON

      b-field(custom-class="is-small" label="反則ブロック")
        template(#message)
          | 反則できないようにするオプション。
          | 反則検知オプション有効時に反則を検知しても ev_play_mode_move に含めない。
          | 代わりに ev_illegal_illegal_accident イベントで反則を投げるが無視してもよい。
        b-radio-button(size="is-small" v-model="TheSe.sp_illegal_cancel" :native-value="false") OFF
        b-radio-button(size="is-small" v-model="TheSe.sp_illegal_cancel" :native-value="true") ON

      p.help
        | 以上はすべて操作モードでのみ有効である

    .box
      SeTitle(name="千日手")

      b-field(custom-class="is-small" label="現局面のハッシュをイベントに含めるか？")
        template(#message)
          | 有効にすると ev_play_mode_move イベントに含める。
          | 同じハッシュの4回目を発生させた側を反則とするかどうかはイベントを受け取った側に任せてある。
          | また設計ミスにより(いまのところは)反則検知ができない。
        b-radio-button(size="is-small" v-model="TheSe.sp_request_snapshot_hash" :native-value="false") OFF
        b-radio-button(size="is-small" v-model="TheSe.sp_request_snapshot_hash" :native-value="true") ON

      b-field(custom-class="is-small" label="操作モードで王手しているかどうかの結果をイベントに含めるか？")
        template(#message)
          | 連続王手の千日手の判定サポート用
        b-radio-button(size="is-small" v-model="TheSe.sp_request_op_king_check" :native-value="false") OFF
        b-radio-button(size="is-small" v-model="TheSe.sp_request_op_king_check" :native-value="true") ON

      p.help
        | 以上はすべて操作モードでのみ有効である

    .box
      SeTitle(name="デバッグ")

      b-field(custom-class="is-small" label="レイヤー確認")
        b-radio-button(size="is-small" v-model="TheSe.sp_layer" :native-value="false") OFF
        b-radio-button(size="is-small" v-model="TheSe.sp_layer" :native-value="true") ON

      b-field(custom-class="is-small" label="Dev Tools")
        b-radio-button(size="is-small" v-model="TheSe.sp_dev_tools" :native-value="false") OFF
        b-radio-button(size="is-small" v-model="TheSe.sp_dev_tools" :native-value="true") ON

      b-field(custom-class="is-small" label="手数表示")
        b-radio-button(size="is-small" v-model="TheSe.sp_turn_show" :native-value="false") OFF
        b-radio-button(size="is-small" v-model="TheSe.sp_turn_show" :native-value="true") ON

    .box
      SeTitle(name="その他")

      b-field(custom-class="is-small" label="操作モードでの詰み判定")
        b-radio-button(size="is-small" v-model="TheSe.sp_request_checkmate_stat" :native-value="false") OFF
        b-radio-button(size="is-small" v-model="TheSe.sp_request_checkmate_stat" :native-value="true") ON

      b-field(custom-class="is-small" label="共通の隙間" message="盤の縦幅に対する割合")
        b-slider(v-bind="TheSe.slider_attrs" v-model="TheSe.sp_common_gap" :min="0" :max="0.1" :step="0.0001")

      b-field(custom-class="is-small" label="モバイル時に縦配置にする")
        b-radio-button(size="is-small" v-model="TheSe.sp_mobile_vertical" :native-value="false") OFF
        b-radio-button(size="is-small" v-model="TheSe.sp_mobile_vertical" :native-value="true") ON

      b-field(custom-class="is-small" label="視点" message="☗☖をクリックしても切り替わる")
        b-radio-button(size="is-small" v-model="TheSe.sp_viewpoint" native-value="black") ☗
        b-radio-button(size="is-small" v-model="TheSe.sp_viewpoint" native-value="white") ☖

      b-field(custom-class="is-small" label="盤面左右で局面変更" message="再生モード時のみ有効")
        b-radio-button(size="is-small" v-model="TheSe.sp_overlay_nav" :native-value="false") OFF
        b-radio-button(size="is-small" v-model="TheSe.sp_overlay_nav" :native-value="true") ON

      //- b-field(custom-class="is-small" label="盤が反応するタイミング")
      //-   template(v-for="e in TheSe.ClickResponseTimingInfo.values")
      //-     b-radio-button(size="is-small" v-model="TheSe.sp_click_response_timing" :native-value="e.key") {{e.name}}

    .box
      SeTitle(name="棋譜")

      b-field(custom-class="is-small" label="プリセット1")
        b-select(size="is-small" v-model="TheSe.kifu_book_key" @input="TheSe.kifu_book_key_change_handle")
          option(:value="null")
          template(v-for="e in TheSe.KifuBookInfo.values")
            option(:value="e.key") {{e.name}}

      b-field(custom-class="is-small" label="プリセット2")
        b-select(size="is-small" v-model="TheSe.sfen_book_info_key" @input="TheSe.sfen_book_info_key_change_handle")
          option(:value="null")
          template(v-for="e in TheSe.SfenBookInfo.values")
            option(:value="e.key") {{e.name}}

      b-field.mb-0(custom-class="is-small" label="棋譜")
        b-input(size="is-small" v-model="TheSe.user_body" type="textarea" :rows="8")
      b-field.mt-2(custom-class="is-small" position="is-right")
        .control
          b-button(size="is-small" @click="TheSe.user_body_apply_handle" type="is-primary") 読み込む

      template(v-if="development_p && false")
        b-field(custom-class="is-small" label="反映済みの棋譜")
          b-input(size="is-small" v-model="TheSe.sp_body" type="textarea" :rows="4" readonly)

      b-field(custom-class="is-small" label="KIFコメ表示")
        b-radio-button(size="is-small" v-model="TheSe.sp_comment" :native-value="false") OFF
        b-radio-button(size="is-small" v-model="TheSe.sp_comment" :native-value="true") ON

    .box
      SeTitle(name="カスタムCSS")
      b-field(custom-class="is-small" label="プリセット")
        .control
          .buttons.mb-0
            template(v-for="e in TheSe.SeUserCustomCssPresetInfo.values")
              b-button(@click="TheSe.se_user_custom_css_preset_apply_handle(e)" size="is-small") {{e.name}}
      b-field(custom-class="is-small" label="CSS")
        b-input(size="is-small" v-model="TheSe.user_custom_css" type="textarea" :rows="8")

    .box
      SeTitle(name="コンポーネント引数確認")
      b-field(custom-class="is-small" label="デフォルト値の表示")
        b-radio-button(size="is-small" v-model="TheSe.component_parmas_show_all" :native-value="false") しない
        b-radio-button(size="is-small" v-model="TheSe.component_parmas_show_all" :native-value="true") する
      pre
        | {{TheSe.sp_component_attributes}}
    .box
      SeTitle(name="CSS変数確認")
      b-field(custom-class="is-small" label="デフォルト値の表示")
        b-radio-button(size="is-small" v-model="TheSe.css_params_show_all" :native-value="false") しない
        b-radio-button(size="is-small" v-model="TheSe.css_params_show_all" :native-value="true") する
      pre
        | {{TheSe.sp_css_human}}
      //- .block(v-if="development_p")
      //-   p.help sp_css_raw
      //-   pre
      //-     | {{TheSe.sp_css_raw}}
</template>

<script>
import MyColorPicker from "./MyColorPicker.vue"
import ImageUpload   from "./ImageUpload.vue"
import SeTitle       from "./SeTitle.vue"

export default {
  name: "EditorUI",
  inject: ["TheSe"],
  components: {
    MyColorPicker,
    ImageUpload,
    SeTitle,
  },
}
</script>

<style lang="sass">
@import "./support.sass"

.EditorUI
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
