| 名前                       | 意味                        | 備考                                                 | 初期値     |
|----------------------------|-----------------------------|------------------------------------------------------|------------|
| kifu_body                  | 棋譜の本体                  | KIF と SFEN に対応。駒落ちは SFEN のみ | position startpos       |
| turn_start                 | N手目                       | -1 を指定すると最終手になる                                       | 0 |
| controller_show            | 操作用のボタン類を表示する            | | false |
| slider_show                | スライダーを表示する                  | おすすめ | false |
| sfen_show                  | 下に sfen 表記を表示                  | 主に局面ペディア用 | false |
| global_keyboard_operation  | キーボード操作を奪う        | 盤にフォーカスしていないときでも左右が反応するようになる   | false |
| location_hash_embed_turn   | URLのハッシュに手番を埋める | 固定URLを作りたいときの実験用の機能 | false |
| debug_mode                 | デバッグモード |  | false |
