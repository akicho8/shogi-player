<template>
<div id="app">
  <section class="hero is-primary is-medium">
    <div class="hero-head">
      <nav class="navbar">
        <div class="container">
          <div class="navbar-brand">
            <!-- <a class="navbar-item"> -->
            <!--   shogi-player -->
            <!-- </a> -->
            <span class="navbar-burger burger" data-target="navbarMenuHeroA">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </div>
          <div id="navbarMenuHeroA" class="navbar-menu">
            <div class="navbar-end">
              <!-- <a class="navbar-item is-active"> -->
              <!--   Home -->
              <!-- </a> -->
              <!-- <a class="navbar-item"> -->
              <!--   Examples -->
              <!-- </a> -->
              <a class="navbar-item" href="https://github.com/akicho8/shogi-player">
                <span class="icon">
                  <i class="fab fa-github"></i>
                </span>
                <span>Github</span>
              </a>
              <!-- <span class="navbar-item"> -->
              <!--   <a class="button is-primary is-inverted"> -->
              <!--     <span class="icon"> -->
              <!--       <i class="fa fa-github"></i> -->
              <!--     </span> -->
              <!--     <span>Download</span> -->
              <!--   </a> -->
              <!-- </span> -->
            </div>
          </div>
        </div>
      </nav>
    </div>

    <!-- Hero content: will be in the middle -->
    <div class="hero-body">
      <div class="container has-text-centered">
        <h1 class="title">
          shogi-player
        </h1>
        <h2 class="subtitle">
        </h2>
      </div>
    </div>

    <!-- Hero footer: will stick at the bottom -->
    <div class="hero-foot">
      <nav class="tabs">
        <div class="container">
          <ul>
            <li><a href="#summary">概要</a></li>
            <li><a href="#examples">デモ</a></li>
            <li><a href="#usage">使い方</a></li>
            <li><a href="#options">オプション</a></li>
          </ul>
        </div>
      </nav>
    </div>
  </section>

  <section class="section">
    <a name="summary"></a>
    <div class="container">
      <h2 class="title">概要</h2>
      <hr>
      <div class="content">
        <p>
          将棋の棋譜を再生できる JavaScript で次の特徴があります
        </p>
        <ul>
          <li>KIF と SFEN フォーマットに対応</li>
          <li>Flash 未使用</li>
          <li>npm でインストール可</li>
          <li>操作モードで途中の局面から自分で操作可</li>
          <li>編集モードで詰将棋の盤面作成可</li>
        </ul>
      </div>
    </div>
  </section>

  <section class="section">
    <a name="examples"></a>
    <div class="container">
      <h2 class="title">デモ</h2>
      <hr>
      <section class="section">
        <div class="container has-text-centered">
          <h3 class="title has-text-left">1. 再生モード</h3>
          <hr>
          <div class="columns">
            <div class="column">
              <article class="message is-info has-text-centered">
                <div class="message-body">
                  コメント付きの KIF 表示。9手目から表示。テーマ:real。駒音あり
                </div>
              </article>
              <h3 class="title yumincho">藤井聡太四段 vs 佐藤天彦名人</h3>
              <p class="subtitle yumincho">
                <a href="http://www.asahi.com/shougi/asahicup_live/?ref=jsa" target="_blank">第11回朝日杯将棋オープン戦本戦</a>
              </p>
              <hr>
              <ShogiPlayer class="original" :kifu_body="kif_sample1" :start_turn="9" :slider_show="true" :theme="'real'" :size="'large'" :variation="'a'" :sound_effect="true" :volume="0.25" :debug_mode="false"/>
            </div>
          </div>
          <br>
          <br>

          <div class="columns">
            <div class="column">
              <article class="message is-info has-text-centered">
                <div class="message-body">
                  シンプル。最終手から表示。※盤面クリックで操作可。天王山クリックで反転
                </div>
              </article>
              <h3 class="title yumincho">羽生善治名人 vs 渡辺明竜王</h3>
              <p class="subtitle yumincho">第21期竜王戦七番勝負第4局</p>
              <hr>
              <ShogiPlayer :kifu_body="'position startpos moves 2g2f 8c8d 2f2e 8d8e 6i7h 4a3b 2e2d 2c2d 2h2d P*2c 2d2h 7a7b 3i3h 3c3d 9g9f 9c9d 1g1f 1c1d 3h2g 8e8f 8g8f 8b8f P*8g 8f8d 2g3f 5a5b 7g7f 7c7d 8h2b+ 3a2b 7i8h 7b7c 8h7g 7c6d 3f4e 7d7e 4e5f 2b3c 6g6f 3c4d 5f6g 6a7b 5i6h 8a7c 4i5h 2a3c 6h7i 7e7f 6g7f 4d5e P*7e 9d9e B*7d P*8h 7i8h 7b8c 9f9e 8c7d 7e7d 8d7d P*7e 7d8d 5h6g P*7d 7e7d 8d7d P*7e 6d7e 7f7e 7d7e 7g7f 7e7d S*7e 7d4d P*7d 4d4g+ P*2d 2c2d 7d7c+ 4g4i 2h2d P*2c 2d3d 4c4d P*7i 5b4c 3d3e S*4e 6g5f P*7g 8i7g P*3d 3e4e 3c4e 5f5e R*2h N*3f 2h7h+ 8h9g 4e5g+ 5e4d 4i4d S*5b 4c5d 7i7h 4d4i G*6e 5d4e R*4d 4e5f 4d4i G*4h S*3h 4h4i R*5e 5f4f 3h4i G*4e P*4g 5g4g P*4h 4g3g 2i3g 4f3g 5e4e R*8i G*3h 3g3f G*4f 3f2f 9i9h 8i4i+ P*3i S*2i 3h2h 4i3i'" :start_turn="-1" :theme="'real'" :variation="'p'"/>
            </div>

            <div class="column">
              <article class="message is-info has-text-centered">
                <div class="message-body">
                  スライダーのみ表示。初手から表示
                </div>
              </article>
              <h3 class="title yumincho">藤井猛六段 vs 井上慶太六段</h3>
              <p class="subtitle yumincho">第54期順位戦B級2組7回戦</p>
              <hr>
              <ShogiPlayer :kifu_body="'position startpos moves 7g7f 8c8d 2h6h 3c3d 6g6f 7a6b 3i3h 5a4b 4g4f 4b3b 3g3f 2b3c 1g1f 8d8e 8h7g 3b2b 7i7h 5c5d 7h6g 6a5b 2i3g 1a1b 6g5f 5d5e 5f4e 8b8d 3f3e 3d3e 3g2e 3c4d 6f6e 2c2d 6e6d 2d2e 4e4d 4c4d 7g5e N*3b P*3c 2b3c B*4e P*5d 5e6f 3c2b 6f8d 4d4e 6d6c+'" :start_turn="0" :slider_show="true" :theme="'real'" :variation="'g'" />
            </div>

          </div>
          <br>
          <br>

          <div class="columns">
            <div class="column">
              <article class="message is-info has-text-centered">
                <div class="message-body">
                  コントローラーとスライダー付き。121手目から表示。
                </div>
              </article>
              <h3 class="title yumincho">藤井聡太四段 vs 澤田真吾六段</h3>
              <p class="subtitle yumincho">第43期棋王戦予選</p>
              <hr>
              <ShogiPlayer :kifu_body="kif_sample2" :start_turn="121" :controller_show="true" :slider_show="true" />
            </div>

            <div class="column">
              <article class="message is-info has-text-centered">
                <div class="message-body">
                  駒落ち。最終手から表示。局面のSFENも表示
                </div>
              </article>
              <h3 class="title yumincho">小池重明 vs 加藤一二三十段</h3>
              <p class="subtitle yumincho">加藤一二三の駒落道場</p>
              <hr>
              <ShogiPlayer :kifu_body="'position sfen lnsgkgsnl/1r7/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL w - 1 moves 8c8d 7g7f 7a6b 5g5f 8d8e 8h7g 5c5d 2h5h 6b5c 7i6h 5a4b 5i4h 3a3b 4h3h 4c4d 5f5e 3b4c 5e5d 4c5d 6h5g 5d6e 5g5f 6e7f 5f5e 7f6g+ P*5d 5c6b 5h5f 6g7g 8i7g B*3d 5f6f P*5b 6i7i 8b8d 5e4d 8d7d P*7h 7d5d S*4c 3d4c 4d4c+ 4b4c B*7f 5b5c 7i6h 4c3b 6h5h P*4c 7f5d 5c5d 8g8f B*7i 8f8e P*8b 6f8f 7i3e+ 8e8d S*7b 8f8i 3e4e P*6g 7c7d 9g9f 4e5f 8i8f 5f5e 9f9e 5e6d 8f8i 7d7e 7g8e 5d5e 8e9c+ 8a9c 9e9d P*9h 9i9h 6d6e 8i8f 6e9h 9d9c+ 9a9c R*9a 9h6e 9a9c+ 5e5f 5h4h L*9b 9c8b P*8a N*7g 6e7d 8b9a S*8b 9a8b 8a8b S*6e 7d9f 8f5f 9f7h 7g8e 7h6g P*7c 7b8a P*9c 6c6d P*6h 6g8e 9c9b+ 8a9b 7c7b+ 6a7b 6e5d N*4b 5d5c+ P*5d 5c6b 7b6b L*2f R*6i L*2e N*3a 5f4f S*3d 3g3f 6b5c 2i3g 4c4d 4f5f 2c2d 2e2d P*2c 3f3e 3d3e 2d2c+ 3a2c 2f2c+ 3b2c P*3f 3e2d 5f5i 6i6h+ 1g1f L*3d N*2h 4d4e 5i5h 6h7g 2g2f 1c1d 2f2e 2d1c 3g4e 5c4d S*4f P*2f 4e5c+ L*4e 4f5g 8e7d P*6e 7d6e P*5f 5d5e 4h3g 5e5f 5g4h P*4f 3g4f 4e4f'" :start_turn="-1" :controller_show="true" :slider_show="true" :sfen_show="true" />
            </div>
          </div>
          <br>
          <br>

          <div class="columns">
            <div class="column">
              <article class="message is-success has-text-left">
                <div class="message-header">
                  <p>共通する操作方法</p>
                </div>
                <div class="message-body">
                  <div class="content">
                    <ul>
                      <li>盤面の左右をクリックすると前後の手番に進む</li>
                      <li>シフトを押しながらで10倍速</li>
                      <li>シフト以外のシステムキーだと50倍速(シフトキーも押していると500倍速)</li>
                      <li>天王山(５五の地点)をクリックすると反転</li>
                      <li>「N手目」の部分をクリックで編集可</li>
                      <li>スライダーがある場合は優先的にフォーカスする</li>
                      <li>スライダーにフォーカスがある状態だと左右キーが効く(ブラウザの標準機能)</li>
                    </ul>
                  </div>
                </div>
              </article>
            </div>
          </div>

          <br>
          <br>
          <br>
          <h3 class="title has-text-left">2. 操作モード</h3>
          <hr>

          <div class="columns">
            <div class="column">
              <article class="message is-info has-text-centered">
                <div class="message-body">
                  自分で操作できる。戻れば操作をやり直せる
                </div>
              </article>
              <ShogiPlayer :kifu_body="'position startpos moves 7g7f 8c8d 2h6h 3c3d 6g6f 7a6b 3i3h 5a4b 4g4f 4b3b 3g3f 2b3c 1g1f 8d8e 8h7g 3b2b 7i7h 5c5d 7h6g 6a5b 2i3g 1a1b 6g5f 5d5e 5f4e 8b8d 3f3e 3d3e 3g2e 3c4d 6f6e 2c2d 6e6d 2d2e 4e4d 4c4d 7g5e N*3b P*3c 2b3c B*4e P*5d 5e6f 3c2b 6f8d 4d4e 6d6c+'" :start_turn="-1" :slider_show="true" :controller_show="true" :theme="'real'" :size="'medium'" :variation="'a'" :sound_effect="true" :volume="0.25" :debug_mode="false" :run_mode="'play_mode'"/>
            </div>
            <div class="column">
              <article class="message is-info has-text-centered">
                <div class="message-body">
                  human_side オプションで先手側だけ操作できるようにする
                </div>
              </article>
              <ShogiPlayer :kifu_body="'position startpos moves 7g7f 8c8d 2h6h 3c3d 6g6f 7a6b 3i3h 5a4b 4g4f 4b3b 3g3f 2b3c 1g1f 8d8e 8h7g 3b2b 7i7h 5c5d 7h6g 6a5b 2i3g 1a1b 6g5f 5d5e 5f4e 8b8d 3f3e 3d3e 3g2e 3c4d 6f6e 2c2d 6e6d 2d2e 4e4d 4c4d 7g5e N*3b P*3c 2b3c B*4e P*5d 5e6f 3c2b 6f8d 4d4e 6d6c+'" :start_turn="-1" :slider_show="true" :controller_show="true" :theme="'real'" :size="'medium'" :variation="'a'" :sound_effect="true" :volume="0.25" :debug_mode="false" :run_mode="'play_mode'" :human_side="'black'"/>
            </div>
          </div>

          <div class="columns">
            <div class="column">
              <article class="message is-success has-text-left">
                <div class="message-header">
                  <p>操作モードについて</p>
                </div>
                <div class="message-body">
                  <div class="content">
                    <ul>
                      <li>スライダー等で変更した任意局面から手番側の操作が行えます</li>
                      <li>いちど指すとその手が最終手になります(分岐には対応していません)</li>
                      <li>human_side オプションで片側の操作のみに絞れます</li>
                      <li>Emit Events に反応して、相手側の指し手を追加した棋譜で kifu_body を更新すればCPUとの対戦のようなことができます</li>
                      <li>再生モードの棋譜とは独立しています(再生モードの棋譜を上書きしません)</li>
                    </ul>
                  </div>
                </div>
              </article>
            </div>
          </div>

          <br>
          <br>
          <h3 class="title has-text-left">3. 編集モード</h3>
          <hr>

          <div class="columns">
            <div class="column">
              <article class="message is-info has-text-centered">
                <div class="message-body">
                  すべての駒を自由に動かせる
                </div>
              </article>
              <ShogiPlayer :kifu_body="'position startpos moves 7g7f 8c8d 2h6h 3c3d 6g6f 7a6b 3i3h 5a4b 4g4f 4b3b 3g3f 2b3c 1g1f 8d8e 8h7g 3b2b 7i7h 5c5d 7h6g 6a5b 2i3g 1a1b 6g5f 5d5e 5f4e 8b8d 3f3e 3d3e 3g2e 3c4d 6f6e 2c2d 6e6d 2d2e 4e4d 4c4d 7g5e N*3b P*3c 2b3c B*4e P*5d 5e6f 3c2b 6f8d 4d4e 6d6c+'" :start_turn="-1" :slider_show="true" :theme="'real'" :size="'medium'" :variation="'a'" :sound_effect="true" :volume="0.25" :debug_mode="false" :run_mode="'edit_mode'"/>
            </div>

            <div class="column">
              <article class="message is-info has-text-centered">
                <div class="message-body">
                  詰将棋用の初期配置で開始
                </div>
              </article>
              <ShogiPlayer :init_preset_key="'詰将棋'" :slider_show="true" :theme="'real'" :size="'medium'" :variation="'a'" :sound_effect="true" :volume="0.25" :debug_mode="false" :run_mode="'edit_mode'"/>
            </div>
          </div>
          <br>
          <br>

          <template v-if="false">
            <div class="columns">
              <div class="column">
                <article class="message is-info has-text-centered">
                  <div class="message-body">
                    外部KIFファイルの読み込み
                  </div>
                </article>
                <ShogiPlayer :kifu_url="'http://tk2-221-20341.vs.sakura.ne.jp/shogi/wr/ureshino_friend-doglong-20180122_213544.kif?plain=1'" :start_turn="-1" :controller_show="true" :slider_show="true" :debug_mode="true" :polling_interval="30" />
              </div>
            </div>
            <br>
            <br>
          </template>

          <div class="columns">
            <div class="column">
              <article class="message is-success has-text-left">
                <div class="message-header">
                  <p>操作方法</p>
                </div>
                <div class="message-body">
                  <div class="content">
                    <ul>
                      <li>盤上の駒は右クリックで裏返せます</li>
                      <li>shift, option, meta, control キーのいずれかを押しながら左クリックでも裏返せます</li>
                      <li>駒を持った状態で右クリックすると駒を元に戻します</li>
                    </ul>
                  </div>
                </div>
              </article>
            </div>
          </div>

          <div class="columns">
            <div class="column">
              <article class="message is-success has-text-left">
                <div class="message-header">
                  <p>再生モードからのモード切り替えについて</p>
                </div>
                <div class="message-body">
                  <div class="content">
                    <ul>
                      <li>右の<b-icon icon="dots-vertical" size="is-small"></b-icon>をクリックするとモードを切り替えれます</li>
                      <li>棋譜再生モードの途中で「操作」に切り替えると手番側の駒を動かせるようになります。検討したいときに使います</li>
                      <li>「操作」モードに入るとき SFEN (USI) の場合はそのまま再生モードでの棋譜を保持した状態で始まります。(スライダーで最初の局面に戻せる)</li>
                      <li>一方 KIF の場合は都合上<b>現在の局面から</b>の開始になります。(スライダーで最初の局面に戻せない)。※SFENと同様になるよう今後対応予定</li>
                      <li>手番に関わらず、ただ自由に駒を動かしたいときは「編集」モードにします。</li>
                    </ul>
                  </div>
                </div>
              </article>
            </div>
          </div>

        </div>
      </section>
    </div>
  </section>

  <section class="section">
    <a name="usage"></a>
    <div class="container">
      <h3 class="title">使い方</h3>
      <hr>
      <div class="content" v-html="usage_md"></div>
    </div>
  </section>

  <section class="section">
    <a name="options"></a>
    <div class="container">
      <h2 class="title">オプション</h2>
      <hr>
      <div class="columns">
        <div class="column">
          <ShogiPlayer
            :run_mode.sync="run_mode"
            :kifu_body.sync="kifu_body"
            :start_turn="start_turn"
            :theme="theme"
            :size="size"
            :variation="variation"
            :debug_mode.sync="debug_mode"
            :digit_show="digit_show"
            :final_label="final_label"
            :key_event_capture="key_event_capture"
            :slider_show="slider_show"
            :controller_show="controller_show"
            :sfen_show="sfen_show"
            :sound_effect="sound_effect"
            :volume="volume"
            :human_side="human_side"
            @update:play_mode_long_sfen="play_mode_long_sfen_set"
            @update:play_mode_short_sfen="play_mode_short_sfen_set"
            @update:play_mode_move="play_mode_move_set"
            />
          <hr>
        </div>
      </div>
      <div class="columns">
        <div class="column">
          <section>
            <b-field label="run_mode">
              <div class="block">
                <b-radio v-model="run_mode" native-value="view_mode">view_mode</b-radio>
                <b-radio v-model="run_mode" native-value="play_mode">play_mode</b-radio>
                <b-radio v-model="run_mode" native-value="edit_mode">edit_mode</b-radio>
              </div>
            </b-field>

            <b-field label="theme">
              <div class="block">
                <b-radio v-model="theme" native-value="none">none</b-radio>
                <b-radio v-model="theme" native-value="simple">simple</b-radio>
                <b-radio v-model="theme" native-value="real">real</b-radio>
              </div>
            </b-field>

            <b-field label="variation">
              <div class="block">
                <template v-for="val in ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']">
                  <b-radio v-model="variation" :native-value="val">{{val}}</b-radio>
                </template>
              </div>
            </b-field>

            <b-field label="size">
              <div class="block">
                <b-radio v-model="size" native-value="none">none</b-radio>
                <b-radio v-model="size" native-value="x-small">x-small</b-radio>
                <b-radio v-model="size" native-value="small">small</b-radio>
                <b-radio v-model="size" native-value="default">default</b-radio>
                <b-radio v-model="size" native-value="medium">medium</b-radio>
                <b-radio v-model="size" native-value="large">large</b-radio>
                <b-radio v-model="size" native-value="x-large">x-large</b-radio>
              </div>
            </b-field>

            <template v-if="false">
              <b-field label="variation">
                <b-select placeholder="Select a name" v-model="variation">
                  <option v-for="val in ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n']" :value="val" :key="val">{{val}}</option>
                </b-select>
              </b-field>
            </template>

            <b-field label="start_turn">
              <b-input v-model="start_turn" type="number" />
            </b-field>
            <b-field label="slider_show">
              <b-switch v-model="slider_show" />
            </b-field>
            <b-field label="controller_show">
              <b-switch v-model="controller_show" />
            </b-field>
            <b-field label="sfen_show">
              <b-switch v-model="sfen_show" />
            </b-field>
            <b-field label="sound_effect">
              <b-switch v-model="sound_effect" />
            </b-field>
            <b-field label="volume">
              <div class="block">
                <input v-model.number="volume" type="range" min="0" max="1.0" step="0.01" /> {{volume}}
              </div>
            </b-field>
            <b-field label="human_side">
              <div class="block">
                <b-radio v-model="human_side" native-value="">両方</b-radio>
                <b-radio v-model="human_side" native-value="black">☗</b-radio>
                <b-radio v-model="human_side" native-value="white">☖</b-radio>
              </div>
            </b-field>
            <b-field label="key_event_capture">
              <b-switch v-model="key_event_capture" />
            </b-field>
            <b-field label="debug_mode">
              <b-switch v-model="debug_mode" />
            </b-field>
            <b-field label="digit_show">
              <b-switch v-model="digit_show" />
            </b-field>
            <b-field label="final_label">
              <b-input v-model.trim="final_label" type="text" />
            </b-field>
            <b-field label="kifu_body">
              <b-input v-model="kifu_body" type="textarea" />
            </b-field>

            <article class="message is-primary has-text-left">
              <div class="message-header">
                <p>引数</p>
              </div>
              <div class="message-body">
                &lt;shogi-player
                :<b>run_mode</b>="'{{run_mode}}'"
                :<b>theme</b>="'{{theme}}'"
                :<b>variation</b>="'{{variation}}'"
                :<b>size</b>="'{{size}}'"
                :<b>start_turn</b>="{{start_turn}}"
                :<b>slider_show</b>="{{slider_show}}"
                :<b>controller_show</b>="{{controller_show}}"
                :<b>sfen_show</b>="{{sfen_show}}"
                :<b>human_side</b>="'{{human_side}}'"
                :<b>sound_effect</b>="{{sound_effect}}"
                :<b>volume</b>="{{volume}}"
                :<b>key_event_capture</b>="{{key_event_capture}}"
                :<b>debug_mode</b>="{{debug_mode}}"
                :<b>digit_show</b>="{{digit_show}}"
                :<b>final_label</b>="'{{final_label}}'"
                :<b>kifu_body</b>="'{{kifu_body}}'"
                /&gt;
              </div>
            </article>

            <br>
            <br>
            <h4 class="title">操作モードのイベント受信内容</h4>
            <b-field label="@update:play_mode_long_sfen: 操作モードで指した直後の局面を発行(movesあり)">
              <b-input :value="play_mode_long_sfen" type="textarea" />
            </b-field>
            <b-field label="@update:play_mode_short_sfen: 操作モードで指した直後の局面を発行(movesなし)">
              <b-input v-model="play_mode_short_sfen" type="textarea" />
            </b-field>
            <b-field label="@update:play_mode_move: 操作モードで指した手(sfenのmovesの最後の1つ)">
              <b-input v-model="play_mode_move" type="text" />
            </b-field>
            <br>

          </section>
        </div>
      </div>
      <div class="table_wrap">
        <div class="content" v-html="options_md"></div>
      </div>
    </div>
  </section>

  <footer class="footer">
    <div class="container">
      <div class="columns">
        <div class="column has-text-centered">
          <a href="https://bulma.io"><img src="./assets/made-with-bulma.png" alt="Made with Bulma" width="128" height="24"></a>
        </div>
      </div>
    </div>
  </footer>
</div>
</template>

<script>
import ShogiPlayer from './components/ShogiPlayer'

import Vue from 'vue'
import Buefy from 'buefy'

Vue.use(Buefy)

const marked = require('marked')
const renderer = new marked.Renderer()
renderer.table = (header, body) => '<div class="table_wrap"><table>\n' + '<thead>\n' + header + '</thead>\n' + '<tbody>\n' + body + '</tbody>\n' + '</table></div>\n'
marked.setOptions({
  renderer: renderer,
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
})

export default {
  name: 'app',

  data() {
    // FIXME: npm run unit で raw-loader が効かない問題を回避している
    if (process.env.NODE_ENV === "test") {
      return {}
    }

    return {
      // カスタマイズ用
      run_mode: "view_mode",   // play_mode
      theme: "simple",
      variation: "a",
      size: "default",
      start_turn: -1,
      slider_show: true,
      controller_show: true,
      sfen_show: true,
      human_side: "",
      sound_effect: true,
      volume: 0.5,
      key_event_capture: false,
      debug_mode: false,
      digit_show: false,

      // ▼牧野光則 五段 vs. 中尾敏之 五段 第31期竜王戦６組ランキング戦 - 無料の棋譜サービス 将棋DB2
      // https://shogidb2.com/games/a5f9637ab3f88cf6d344f001142569b6744226ff
      final_label: "持将棋",
      kifu_body: "position startpos moves 7g7f 8c8d 7i6h 3c3d 6h7g 7a6b 2g2f 3a4b 5g5f 4a3b 4i5h 5a4a 3i4h 7c7d 8h7i 5c5d 6i7h 6c6d 2f2e 4b3c 5i6i 6b6c 6g6f 8a7c 5h6g 6a5b 4g4f 4c4d 4h4g 2b3a 4g3f 3a5c 4f4e 4d4e 3f4e 8b8a 2h4h 4a3a 4e3f 8d8e 9g9f 9c9d 1g1f 1c1d 7i6h 3a2b 6i7i 5b4c 6h4f P*4d 1i1g 5c4b 4h1h 5d5e 5f5e 9d9e 9f9e 6d6e 6f6e 7c6e 7g6f 8e8f 8g8f 4b8f P*8g 8f5i+ 6f6e 9a9e P*9f 9e9f 9i9f P*9e 9f9e 5i9e 1f1e P*8h 7i8h 1d1e 6g7g P*8f 8g8f P*8e P*9f 9e8d P*6d 6c5b 8f8e 8d3i L*8d 8a9a P*1b 1a1b P*1c 1b1c P*1d 1c1d N*2f 3i2i 2f1d 2b1b 1h6h N*7c P*4g 4d4e 4f5g 7c6e 6h6e S*5f 6e6i 2i3h 8d8b+ 9a3a P*1c 2a1c 5g9c+ L*6e L*6f 3h3g 6f6e 3g3f 6d6c+ 3f4g 6i1i P*6f 1g1e 4g3g 1i1g 3g2f 9c6f 2f1g 6c5b P*8g 8h8g R*6i 6f5f 6i8i+ S*8h N*9d N*8f S*9h 8g9g P*8g 7h8g 9h8g+ 9g8g 8i5i 5f6f G*5f 6f8d P*6f 8f9d 6f6g+ 8g8f 6g7g 8h7g 5f6g S*6f 5i8i 8f9e 1g2f P*6h 6g7h P*4b 2f1e 4b4a+ 3a1a 7g8f 1c2e 8d6b 1e4h S*5g 4h5h P*4d G*9c 4d4c+ 3b4c G*9g P*8a 8b9b 9c9b L*1f 9b9c 6b8d 9c8d 9e8d 1b1c 1d2b+ 1c2d 1f1a+ 3c2b N*2g P*1d R*1b 2e1g+ P*2f 1g2g G*2e 5h2e 2f2e 2d1e 8d7c B*4d B*6b L*7a 6b7a+ 4d7a 6e6b+ 7a9c 1b2b+ L*8b L*8d 8b8d 8e8d L*7a 6b7a 9c7a 5b6b B*4d 2b3b G*4b 4a4b 7a6b 7c7b 4c3c 3b3a 4d1g+ G*3f 8i3i P*3e 6b8d 3f4e P*5f L*8e 5f5g+ 8e8d 5g5f 6f6e 5f5e 4e5e 3i3e P*4e S*4d L*1i L*1h 1i1h 1g1h 5e4d 3c4d B*3c 1e1f 3c4d+ 3e4d 4e4d 1f1g 4d4c+ B*4g 6e5d 4g2e+ R*3c G*2d 4c4d 1d1e 4d3d 2d3d 3c3d+ 2e3d 3a3d L*3g B*5f R*7i G*4h 7i5i+ 3d4e 1g2h G*5h 5i7i 4e1e P*1g 5d6c 2h1i 6h6g N*3f 4h4g 3f2h+ 5f2c+ 3g3h+ 6g6f 2g3g 4g5f N*6d 5h6g 6d5f 2c5f P*6h 6f6e 6h6i+ 6e6d G*5c S*7c 6i6h 6g6f 7h7g S*8e 6h7h 9f9e 7i4i N*4e 5c6c 6d6c+ S*5d G*5e 5d5e 5f5e P*6g 8e7d 6g6h+ 7f7e 6h6g 6f6g 7g6g 7c6b+ 4i5i 5e2b G*7f 4e3c+ 7h7g 2b3b 5i8i 8f8e G*8f 9g8f 7f8f S*9h 8i7i G*9g 8f9g 9h9g 7i9i 9g8f G*8g G*9f 9i8i 8f7g 6g7g 8d8a+ G*8f 9f8f 8g8f 8e8d G*8e 7d7c 8e8d 7c8d+ 8f8e 8d8e 8i8e G*9g 8e9e P*9f 9e8d P*8e 8d4d G*1f 2h2g G*4e S*2d 4e4d 2d1e 1f1e R*8i S*8f S*7f L*7h 7g7h 3b7f 1h2i 9d8b+ 3h2h 6c6d 8i5i+ 1e2d 5i5f 7f4c P*7f S*6e 5f6g 6e7f 6g6d 9f9e 6d6i 8e8d 6i9i 7f8e S*7g 7e7d 2i3i 8d8c+ 7g8f 9g8f S*7e 8f9f P*8d 9e9d P*9e 9f9e 9i9e S*9f 9e8f 4c8g 8d8e 8g7h G*7g 7h6i L*6g 6i2e 8f9f 9d9c+ 8e8f 7d7c+ 8f8g+",

      play_mode_long_sfen: null,
      play_mode_short_sfen: null,
      play_mode_move: null,

      kif_sample1: require("./第11回朝日杯将棋オープン戦本戦.kif"),
      kif_sample2: require("./藤井聡太四段_vs_澤田真吾六段.kif"),
      usage_md: marked(require('./usage.md')),
      options_md: marked(require('./options.md')),
    }
  },

  components: {
    ShogiPlayer
  },

  methods: {
    play_mode_long_sfen_set(v) {
      this.play_mode_long_sfen = v
    },
    play_mode_short_sfen_set(v) {
      this.play_mode_short_sfen = v
    },
    play_mode_move_set(v) {
      this.play_mode_move = v
    },
    // update_kifu_source(v) {
    //   // this.kifu_body = v
    // },
  },
}
</script>

<style lang="sass">
@import "./App"
@import "buefy/lib/buefy.css"

// ここで読み込むとカレントディレクトリが /src 扱いのため components/* から ../assets と参照してもパスが合わない
// main.js で読み込むと .sass のファイル基準になる
// @import "./components/ShogiPlayer.sass"
</style>
