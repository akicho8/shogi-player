| 名前                       | 意味                        | 備考                                                     | 初期値              | .sync          |
|----------------------------|-----------------------------|----------------------------------------------------------|---------------------|----------------|
| run_mode                   | 実行モード                  | view_mode:再生 play_mode:操作 編集:edit_mode。           | 'view_mode'         | ○             |
| human_side_key             | 人間が操作する側            | play_mode時のみ有効 both, black, white, none             | 'both'              |                |
| kifu_body                  | 棋譜の本体                  | KIF と SFEN に対応。駒落ちは SFEN のみ                   | null                |                |
| kifu_url                   | 棋譜ファイルURL             |                                                          | null                |                |
| theme                      | テーマ名                    | none:なし simple:シンプル real:木目                      | 'real'              | ○             |
| variation                  | realテーマ内の亜種          | a, b, c, ...                                             | 'a'                 | ○             |
| size                       | 盤面の大きさ                | none xx-small x-small small default medium large x-large xx-large xxx-large | 'default'           | ○             |
| start_turn                 | N手目の局面から表示         | 例 0:開始前 1:初手 -1:投了図 -2:投了一手前               | -1                  |                |
| slider_show                | 局面スライダー表示          |                                                          | false               |                |
| controller_show            | 前後移動用のボタン類の表示  |                                                          | false               |                |
| sfen_show                  | 局面を sfen で表示          | 主に局面ペディア用                                       | false               |                |
| sound_effect               | 駒音の有無                  |                                                          | false               |                |
| volume                     | 駒音の大きさ                | 0 から 1.0                                               | 0.5                 |                |
| key_event_capture          | キーボード操作を監視        | どこにもフォーカスしていないときでも左右キーが反応       | false               |                |
| polling_interval           | ポーリング間隔(秒)          | 1以上で有効。30 なら30秒間隔で kifu_url を読み直す       | 0                   |                |
| shift_key_mag              | shiftキー押下時の倍速       | 1 または null 指定で無効にできる                         | 10                  |                |
| system_key_mag             | システムキー押下時の倍速    | 1 または null 指定で無効にできる                         | 50                  |                |
| url_embed_turn             | URLのハッシュに手番を埋める | 固定URLを作りたいときの実験用の機能                      | false               |                |
| debug_mode                 | デバッグモード              | 主に開発用                                               | false               |  ○            |
| flip                       | 盤面を反転する              | △が下にくる                                             | false               |  ○            |
| digit_show                 | 盤面の側面に位置を表示      | 上に数字、右端に漢数字を表示する                         | false               |                |
| final_label                | 結果の文字列                | 空だと「○の勝ち」                                       | null                |                |
| preset_key                 | 盤面の初期配置              | kifu_body の代わりに指定するとその配置になる             | null                |                |

<br>

<article class="message is-info">
  <div class="message-header">
    <p>備考</p>
  </div>
  <div class="message-body">
    <ul>
      <li>kifu_body も preset_key も指定がない場合は 'position startpos' (平手) が初期配置になります</li>
      <li>**kifu_url** や **kifu_body** をあとから変更したときも同期して再読み込みします。</li>
      <li>theme や size の値に **none** を指定したときは何もスタイルを設定しません。</li>
    </ul>
  </div>
</article>

<article class="message is-warning">
  <div class="message-header">
    <p>注意点</p>
  </div>
  <div class="message-body">
    **key_event_capture** は副作用があります。有効にするとどこにもフォーカスしていないときでも左右ボタンに反応するようになって便利な面もありますが、他のプログラムの操作を奪ってしまうことになるかもしれません。なので基本は false にしておいた方がよいです。
  </div>
</article>

## イベント

| 名前                        | 意味                                                    |
|-----------------------------|---------------------------------------------------------|
| update:play_mode_long_sfen  | 操作モードで指した直後の局面を発行(movesあり)           |                   
| update:play_mode_short_sfen | 操作モードで指した直後の局面を発行(movesなし)           |
| update:play_mode_move       | 操作モードで指した手(sfenのmovesの最後の1つ)            |
| update:run_mode             | 設定ダイアログでモードが変更されたとき                  |
| update:kifu_body            | 設定ダイアログで棋譜が変更されたとき                    |
| update:debug_mode           | 設定ダイアログでデバッグモードが変更されたとき          |
| update:flip                 | 盤面を反転したとき                                      |
| update:theme                | テーマ変更                                              |
| update:variation            | バリエーション変更                                      |
| update:size                 | サイズ変更                                              |
