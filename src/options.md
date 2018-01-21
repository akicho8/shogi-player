| 名前                       | 意味                        | 備考                                                 | 初期値            |
|----------------------------|-----------------------------|------------------------------------------------------|-------------------|
| kifu_body                  | 棋譜の本体                  | KIF と SFEN に対応。駒落ちは SFEN のみ               | position startpos |
| turn_start                 | N手目                       | 例 0:初手 3:3手目 -1:最終手 -2:投了一手前            | 0                 |
| controller_show            | 操作用のボタン類を表示する  |                                                      | false             |
| slider_show                | スライダーを表示する        |                                                      | false             |
| sfen_show                  | 下に sfen 表記を表示        | 主に局面ペディア用                                   | false             |
| global_key_event_capture  | キーボード操作を奪う        | どこにもフォーカスしていないときでも左右キーが反応   | false             |
| location_hash_embed_turn   | URLのハッシュに手番を埋める | 固定URLを作りたいときの実験用の機能                  | false             |
| debug_mode                 | デバッグモード              |                                                      | false             |

<article class="message is-warning">
  <div class="message-header">
    <p>注意点</p>
  </div>
  <div class="message-body">
    **global_key_event_capture** は副作用があります。有効にするとどこにもフォーカスしていないときでも左右ボタンに反応するようになって便利な面もありますが、他のプログラムの操作を奪ってしまうことになるかもしれません。なので基本は false にしておいた方がよいです。
  </div>
</article>
