# リリースノート

## 1.1.33 → 2.0.0

201件のコミットをまとめたメジャーリリースです。
モデル層のリファクタリング・詰み判定等の機能追加・軽微な修正が主な内容です。
あまりに変更点が多く影響範囲が広いため 2.0.0 としています。
通常の使い方であればそのままアップデートして問題ないはずですが、何かが動かなくなっていた場合は一度 1 系に戻すか一報ください。

また、あわせてスタイルエディタの大幅な刷新も行っています。

### 新機能

- 詰み判定を追加しました。 (デフォルトでは機能OFF)
- 詰み判定を追加できたことで打歩詰め等の反則判定もできるようになりました。
- オプションにより盤上の特定の領域だけを表示できるようにしました。(例えば左上の5x5など)
- 星の位置をカスタマイズできるようにしました (いらん機能)
- カーソル形状を整理しました。（駒を持ってない・駒を持つことできる・駒を持っている の3つの状態に合わせて形状が適切に変化する）
- 盤テクスチャの種類に SVG エフェクトをいくつか追加しました。
- ボードバリアントを追加・拡充しました。
- 移動元印機能を実装しました。指し手の移動元を盤上に表示できます。(が、一般的な機能ではないのでドキュメントにも詳しく書いてない)
- 思考印にバリアント機能を追加しました。(が、一般的な機能ではないのでドキュメントにも詳しく書いてない)
- 反則ブロック時にも局面・手数・指し手の情報をイベントに含めるようにしました。(主に共有将棋盤用)
- `sp_request_*` なオプションをいろいろ有効にしたとき、`ev_play_mode_move` に追加情報を含めるようにしました。
- 持駒が空のときは `MembershipStand` コンポーネントを表示しないようにしました。(CSSを当てやすくするため)

#### 内部的なもの

- 棋譜を正しくパースできないときに alert を表示するようにしました。
- 縦配置のときは、プレイヤー名の背景バルーンの角を丸めないようにしました。
- `.ShogiPlayer` で `container-type: inline-size` を指定するようにしました。
- `GeneralMark` の基本色を CSS 変数 `sp_general_mark_base_color` で制御できるようにしました。
- `sp_board_variant_to_stand` prop を追加しました。
- 明示的に ☗☖▲△ を返す `Location#pentagon_char` / `Location#polygon_char` を追加しました。
- 盤面だけを見て手合割を推測する `guess_preset_info` を追加しました。
- `illegal_info` に千日手のレコードを追加しました。
- `ev_illegal_click_but_self_is_not_turn` イベントの引数に `event` を渡すようにしました（右クリック判定用）。
- 持駒を非表示にできる機能を追加しました（実験的）。
- リサイズ監視の機能を prop `sp_resize_observer_feature` で ON / OFF できるようにしました。
- `PieceCount` にボーダー機能を追加しました。
- `Membership` に `sp_membership_vertical_gap` / `sp_membership_horizontal_gap` を追加しました。

### 修正

- プレイヤー名が英字のとき縦書きにすると文字の頭が右を向いてしまう問題を修正しました。
- 座標表示がクリックイベントを奪ってしまう問題を修正しました。
- 予期しないイベントが発生していたため、持駒操作を主ボタンに限定しました。
- `sp_lift_cancel_action` のデフォルト値を `standard` に変更しました。
- SVG の `hsl()` 表記からパーセント記号を削除しました。
- 操作モード用の API を再生モード用と誤記していたドキュメントを修正しました。
- `DeviseHelper.mouse_click_event_p` が呼べない問題を修正しました。
- `DomHelper.focus_on_input_tag_p` で radio ボタンにフォーカスしているときも `true` になるように修正しました。
- `OpDisabledBlock.vue` で `is_layer_on` が指定する階層がずれていた問題を修正しました。

### 内部変更・リファクタリング

- 盤の上と右に表示する符号をただの飾りではないく本当の位置を表示するようにしました。
- 神クラス化していた `Xcontainer` を関心事ごとにファイル分割しました（持駒・手数・シリアライズ等）。
- `xcontainer` の `piece_box` を Hash 型から Value Object の `PieceBox` 型に置き換えました。
- `beetleshine` を根元で `GX` に置き換えました。
- `mod_vector` を Vue.js に依存しない `Vec2d` に置き換え、マジックナンバーを削減しました。
- `Xcontainer` / `Soldier` / `Place` などのインスタンスを `new` で直接生成せず、適切なファクトリメソッド経由で生成するようにしました。
- 千日手判定用のハッシュを `to_sfen_without_turn` から `position_hash`（旧 snapshot_hash）に統一しました。
- 「読み上げ」に関するコードをすべて削除しました。
- `deep-object-diff` への依存を整理しました。
- CSS を全面的に見直しました（`100vh` などを `100dvh` 表記に統一、`AspectRatioFixedBlock` を padding-top ハックから `aspect-ratio` プロパティに置換、CSS カラー形式を `hsl(h s% l% / a)` に統一）。
- `TheSp` を `TheSP` に統一しました。
- 各種モデル（`Board` / `Piece` / `Place` / `Soldier` / `Xcontainer` 等）のテストを大幅に追加・強化しました。
- `sp_request_snapshot_hash` を `sp_request_position_hash` にリネームしました。あわせてモデル内部の `snapshot_hash` も `position_hash` に統一しています。
- `sp_request_snapshot_hash`（現 `sp_request_position_hash`）の初期値を `false` に変更しました。
- `OriginMark` / `ThinkMark` のバリアントを color / gray 分離から単一に統合しました（`square_color` / `square_gray` → `square`、`circle_color` / `circle_gray` → `circle`）。
- `GeneralMark` 系コンポーネントの属性キーを `general_mark_*` から `gm_*` に短縮しました。
- `sp_origin_mark_list` / `sp_think_mark_list` を `*_collection` にリネームしました（`GeneralMarkList` → `GeneralMarkCollection`）。
- `OriginMark` / `ThinkMark` の prop 名を専用名に変更しました（`general_mark_pos_key` → `origin_mark_pos_key` / `think_mark_pos_key`）。

### スタイルエディタの変更

スタイルエディタを大きく刷新しました。

- 色変換ライブラリを chroma-js から colorjs.io に移行しました。あわせて `GeneralMark` の色システムを hsl から oklch に移行しています。
- Smart 系コンポーネントを新規導入し、旧コンポーネントを置き換えました（`VariableSwitch` / `VariableRadio` / `VariableSlider` 等）。
- `VariableInfo` に `relative_model` と min / max / step を追加し、コントロールパネルを整理しました。
- コンポーネント引数や CSS 変数について、デフォルトから変化した差分だけを表示するオプションを追加しました。
- 移動元印の確認をできるようにしました（System Spec も追加）。
- 思考印の管理機能を追加しました。思考印カテゴリーに「全消し」「所有者消去」ボタンを追加しました。
- 印設定を共通化し（`se_current_user_name` / `se_color_index`）、印・リサイズのカテゴリー UI を追加しました。
- 3D 関連を改善しました（値をなるべく係数化、`tf0` → `wall` / `tf1` → `board` / `tf2` → `piece` のリネーム、カメラプリセットに「初期値」を追加）。
- カスタム CSS のプリセットを大幅に追加・更新しました（「ノイズ盤」「ノイズビニ盤」「木目」「紙面風」など）。
- プリセットを SVG ファイル読み込みに移行しました。
- 盤のどこを表示するかを指定できるようにしました。
- `se_tf_*_mode` を `se_tf_*_switch` にリネームしました。
- モード切替ショートカット（v / p / e）にトースト通知を追加しました。
- 設定の永続化バージョンを 8 に更新しました。以前のバージョンで保存した設定は初期化される場合があります。

#### スタイルエディタの修正

- 自由入力で色を変更しても emit イベントが起きない問題を修正しました（PureColorPicker）。
- プリセット「3D」を押しても 3D にならない問題を修正しました。
- 「ランダム」を押してもコンポーネントの呼び出し側が変化しない問題を修正しました。
- `SmartRadio` からデバッグ用コードを削除しました。
- `variable_info` の演算子まわりのスペースを修正しました。
- `ControlPanel` の名前フィールドのラベルを「所有者名」に修正しました。
