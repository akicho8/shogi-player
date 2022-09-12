| Method                                 | 動作                                                                |
|----------------------------------------|---------------------------------------------------------------------|
| `api_random_puton()`                   | 盤面をクリアしてランダムに駒を1つ配置し、Soldier インスタンスを返す |
| `api_place_on(soldier)`                | 盤面に駒を置く                                                      |
| `api_board_clear()`                    | 盤面をクリア                                                        |
| `api_board_turn_set(turn)`             | 指定手数の局面に設定                                                |
| `api_play_mode_xcontainer_seek_to(turn)` | 指定手数の局面に設定・play_mode専用・音出ない                       |
| `api_flip_set(flag)`                   | 反転状態の設定                                                      |
| `api_flip_toggle()`                    | 反転する(コントローラーの「上下ボタン」を押したのと同じ)            |
| `api_retract_a_move()`                 | 待った(2手戻す)                                                     |
| `api_sfen_or_kif_set()`                | 棋譜の設定                                                          |
| `api_turn_slider_focus()`              | 手数のスライダーがあればフォーカスする                              |
