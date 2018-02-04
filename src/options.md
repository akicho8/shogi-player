| 名前                       | 意味                        | 備考                                                 | 初期値              |
|----------------------------|-----------------------------|------------------------------------------------------|---------------------|
| kifu_body                  | 棋譜の本体                  | KIF と SFEN に対応。駒落ちは SFEN のみ               | 'position startpos' |
| kifu_url                   | 棋譜ファイルURL             |                                                      | null                |
| theme                      | テーマ名                    | none:なし simple:シンプル real:木目                  | 'simple'            |
| variation                  | テーマ内の亜種              | a, b, c, ...                                         | 'a'                 |
| size                       | サイズ                      | none x-small small default medium large x-large      | 'default'           |
| start_turn                 | N手目の局面を表示           | 例 0:開始前 1:初手 -1:投了図 -2:投了一手前           | -1                  |
| slider_show                | スライダー表示              |                                                      | false               |
| controller_show            | 前後移動用のボタン類表示    |                                                      | false               |
| sfen_show                  | 局面を sfen で表示          | 主に局面ペディア用                                   | false               |
| sound_effect               | 駒音                        |                                                      | false               |
| volume                     | 駒音ボリューム              |                                                      | false               |
| key_event_capture          | キーボード操作を監視        | どこにもフォーカスしていないときでも左右キーが反応   | false               |
| polling_interval           | ポーリング間隔(秒)          | 1以上で有効。30 なら30秒間隔で kifu_url を読み直す   | 0                   |
| last_after_polling         | ポーリング後に最終手に移動  |                                                      | true                |
| shift_key_mag              | shiftキー押下時の倍速       | 1 または null 指定で無効にできる                     | 10                  |
| system_key_mag             | システムキー押下時の倍速    | 1 または null 指定で無効にできる                     | 50                  |
| url_embed_turn             | URLのハッシュに手番を埋める | 固定URLを作りたいときの実験用の機能                  | false               |
| debug_mode                 | デバッグモード              |                                                      | false               |

<article class="message is-info">
  <div class="message-header">
    <p>備考</p>
  </div>
  <div class="message-body">
    <ul>
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
