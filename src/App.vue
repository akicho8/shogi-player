<template lang="pug">
#app
  .hero.is-primary.is-medium
    .hero-head
      nav.navbar
        .container
          .navbar-brand
            span.navbar-burger.burger(data-target="navbarMenuHeroA")
              span
              span
              span

          #navbarMenuHeroA.navbar-menu
            .navbar-end
              a.navbar-item(href="https://github.com/akicho8/shogi-player")
                span.icon
                  i.fab.fa-github
                span
                 | Github

    .hero-body
      .container.has-text-centered
        h1.title
          | shogi-player

    .hero-foot
      nav.tabs
        .container
          ul
            li: a(href="#summary") 概要
            li: a(href="#examples") デモ
            li: a(href="#usage") 使い方
            li: a(href="#options") オプション

  // ShogiPlayer(:kifu_body="`position startpos moves 7g7f 7c7d 7f7e 7d7e 7i7h 7e7f 7h7g 7f7g+ 6i5h 7g8h 9i9h 7a6b`" :start_turn="-1" :theme="'simple'" :run_mode="'edit_mode'" :sfen_show="true" :debug_mode="true")
  //- ShogiPlayer(:kifu_body="`position startpos moves 7g7f 7c7d 7f7e 7d7e 7i7h 7e7f 7h7g 7f7g+ 6i5h 7g8h 9i9h 7a6b`" :start_turn="-1" :theme="'simple'")
  //- ShogiPlayer(:kifu_body="`position startpos moves 7g7f 7c7d 7f7e 7d7e 7i7h 7e7f 7h7g 7f7g+ 6i5h 7g8h 9i9h 7a6b`" :start_turn="-1" :theme="'simple'" :run_mode="'edit_mode'")
  //- ShogiPlayer(:kifu_body="`position sfen 4k4/9/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL w - 1`" :start_turn="-1" :theme="'simple'" :run_mode="'play_mode'")
  //- ShogiPlayer(:kifu_body="`position startpos`" :start_turn="-1" :theme="'simple'" :run_mode="'play_mode'")
  //- ShogiPlayer(:kifu_body="`position sfen lnsgkgsnl/1r5b1/ppppppppp/9/9/2P6/PP1PPPPPP/1B5R1/LNSGKGSNL b - 1`" :start_turn="-1" :theme="'simple'" :run_mode="'play_mode'")
  //- ShogiPlayer(:kifu_body="`position sfen lnsgkgsnl/1r5b1/ppppppppp/9/9/2P6/PP1PPPPPP/1B5R1/LNSGKGSNL w - 2`" :start_turn="-1" :theme="'simple'" :run_mode="'play_mode'")

  .section
    a(name="summary")
    .container
      h2.title 概要
      hr
      .content
        p
          | 将棋の棋譜を再生できる JavaScript で次の特徴があります
        ul
          li KIF と SFEN フォーマットに対応
          li 検討できる (操作モード)
          li 詰将棋が作れる (編集モード)
        p
          | その他
        ul
          li Flash 未使用
          li Vue.js で動作
          li Buefy (Bulma CSS) 使用

  .section
    a(name="examples")
    .container
      h2.title デモ
      hr
      .section
        .container.has-text-centered
          h3.title.has-text-left 1. 再生モード
          hr
          .columns
            .column
              article.message.is-info
                .message-body
                  | コメント付きの KIF 表示。9手目から表示。テーマ:real。駒音あり

              h3.title.yumincho 藤井聡太四段 vs 佐藤天彦名人
              p.subtitle.yumincho
                a(href="http://www.asahi.com/shougi/asahicup_live/?ref=jsa" target="_blank") 第11回朝日杯将棋オープン戦本戦
              hr
              ShogiPlayer.original(
                :kifu_body="kif_sample1"
                :start_turn="9"
                :slider_show="true"
                :theme="'real'"
                :size="'xxx-large'"
                :bg_variant="'a'"
                :sound_effect="true"
                :volume="0.25"
                :debug_mode="false"
              )
          br
          br

          .columns
            .column
              article.message.is-info
                .message-body
                  | シンプル。最終手から表示。※盤面クリックで操作可。天王山クリックで反転

              h3.title.yumincho 羽生善治名人 vs 渡辺明竜王
              p.subtitle.yumincho 第21期竜王戦七番勝負第4局
              hr
              ShogiPlayer(:kifu_body="'position startpos moves 2g2f 8c8d 2f2e 8d8e 6i7h 4a3b 2e2d 2c2d 2h2d P*2c 2d2h 7a7b 3i3h 3c3d 9g9f 9c9d 1g1f 1c1d 3h2g 8e8f 8g8f 8b8f P*8g 8f8d 2g3f 5a5b 7g7f 7c7d 8h2b+ 3a2b 7i8h 7b7c 8h7g 7c6d 3f4e 7d7e 4e5f 2b3c 6g6f 3c4d 5f6g 6a7b 5i6h 8a7c 4i5h 2a3c 6h7i 7e7f 6g7f 4d5e P*7e 9d9e B*7d P*8h 7i8h 7b8c 9f9e 8c7d 7e7d 8d7d P*7e 7d8d 5h6g P*7d 7e7d 8d7d P*7e 6d7e 7f7e 7d7e 7g7f 7e7d S*7e 7d4d P*7d 4d4g+ P*2d 2c2d 7d7c+ 4g4i 2h2d P*2c 2d3d 4c4d P*7i 5b4c 3d3e S*4e 6g5f P*7g 8i7g P*3d 3e4e 3c4e 5f5e R*2h N*3f 2h7h+ 8h9g 4e5g+ 5e4d 4i4d S*5b 4c5d 7i7h 4d4i G*6e 5d4e R*4d 4e5f 4d4i G*4h S*3h 4h4i R*5e 5f4f 3h4i G*4e P*4g 5g4g P*4h 4g3g 2i3g 4f3g 5e4e R*8i G*3h 3g3f G*4f 3f2f 9i9h 8i4i+ P*3i S*2i 3h2h 4i3i'" :start_turn="-1" :theme="'real'" :bg_variant="'p'" :piece_variant="'b'")

            .column
              article.message.is-info
                .message-body
                  | スライダーのみ表示。初手から表示

              h3.title.yumincho 藤井猛六段 vs 井上慶太六段
              p.subtitle.yumincho 第54期順位戦B級2組7回戦
              hr
              ShogiPlayer(:kifu_body="'position startpos moves 7g7f 8c8d 2h6h 3c3d 6g6f 7a6b 3i3h 5a4b 4g4f 4b3b 3g3f 2b3c 1g1f 8d8e 8h7g 3b2b 7i7h 5c5d 7h6g 6a5b 2i3g 1a1b 6g5f 5d5e 5f4e 8b8d 3f3e 3d3e 3g2e 3c4d 6f6e 2c2d 6e6d 2d2e 4e4d 4c4d 7g5e N*3b P*3c 2b3c B*4e P*5d 5e6f 3c2b 6f8d 4d4e 6d6c+'" :start_turn="0" :slider_show="true" :theme="'real'" :bg_variant="'g'")

          br
          br

          .columns
            .column
              article.message.is-info
                .message-body
                  | コントローラーとスライダー付き。121手目から表示。

              h3.title.yumincho 藤井聡太四段 vs 澤田真吾六段
              p.subtitle.yumincho 第43期棋王戦予選
              hr
              ShogiPlayer(:kifu_body="kif_sample2" :start_turn="121" :controller_show="true" :slider_show="true" :theme="'simple'")

            .column
              article.message.is-info
                .message-body
                  | 駒落ち。最終手から表示。局面のSFENも表示

              h3.title.yumincho 小池重明 vs 加藤一二三十段
              p.subtitle.yumincho 加藤一二三の駒落道場
              hr
              ShogiPlayer(:kifu_body="'position sfen lnsgkgsnl/1r7/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL w - 1 moves 8c8d 7g7f 7a6b 5g5f 8d8e 8h7g 5c5d 2h5h 6b5c 7i6h 5a4b 5i4h 3a3b 4h3h 4c4d 5f5e 3b4c 5e5d 4c5d 6h5g 5d6e 5g5f 6e7f 5f5e 7f6g+ P*5d 5c6b 5h5f 6g7g 8i7g B*3d 5f6f P*5b 6i7i 8b8d 5e4d 8d7d P*7h 7d5d S*4c 3d4c 4d4c+ 4b4c B*7f 5b5c 7i6h 4c3b 6h5h P*4c 7f5d 5c5d 8g8f B*7i 8f8e P*8b 6f8f 7i3e+ 8e8d S*7b 8f8i 3e4e P*6g 7c7d 9g9f 4e5f 8i8f 5f5e 9f9e 5e6d 8f8i 7d7e 7g8e 5d5e 8e9c+ 8a9c 9e9d P*9h 9i9h 6d6e 8i8f 6e9h 9d9c+ 9a9c R*9a 9h6e 9a9c+ 5e5f 5h4h L*9b 9c8b P*8a N*7g 6e7d 8b9a S*8b 9a8b 8a8b S*6e 7d9f 8f5f 9f7h 7g8e 7h6g P*7c 7b8a P*9c 6c6d P*6h 6g8e 9c9b+ 8a9b 7c7b+ 6a7b 6e5d N*4b 5d5c+ P*5d 5c6b 7b6b L*2f R*6i L*2e N*3a 5f4f S*3d 3g3f 6b5c 2i3g 4c4d 4f5f 2c2d 2e2d P*2c 3f3e 3d3e 2d2c+ 3a2c 2f2c+ 3b2c P*3f 3e2d 5f5i 6i6h+ 1g1f L*3d N*2h 4d4e 5i5h 6h7g 2g2f 1c1d 2f2e 2d1c 3g4e 5c4d S*4f P*2f 4e5c+ L*4e 4f5g 8e7d P*6e 7d6e P*5f 5d5e 4h3g 5e5f 5g4h P*4f 3g4f 4e4f'" :start_turn="-1" :controller_show="true" :slider_show="true" :sfen_show="true" :theme="'simple'")

          br
          br

          .columns
            .column
              article.message.is-success.has-text-left
                .message-header
                  p 共通する操作方法

                .message-body
                  .content
                    ul
                      li 盤面の左右をクリックすると前後の手番に進みます
                      li シフトを押しながらで10倍速になります
                      li シフト以外のシステムキーだと50倍速になります(シフトキーも押していると500倍速)
                      li 天王山(５五の地点)をクリックすると反転します
                      li 「N手目」の部分をクリックで編集できます
                      li スライダーがある場合は優先的にフォーカスします
                      li スライダーにフォーカスがある状態だと左右キーが効きます(ブラウザの標準機能)
                      li スライダーは fn + ←→ キーで最初と最後に移動します(ブラウザの標準機能)

          br
          br
          br
          h3.title.has-text-left 2. 操作モード
          hr

          .columns
            .column
              article.message.is-info
                .message-body
                  | 自分で操作できる。戻れば操作をやり直せる

              ShogiPlayer(:kifu_body="'position startpos moves 7g7f 8c8d 2h6h 3c3d 6g6f 7a6b 3i3h 5a4b 4g4f 4b3b 3g3f 2b3c 1g1f 8d8e 8h7g 3b2b 7i7h 5c5d 7h6g 6a5b 2i3g 1a1b 6g5f 5d5e 5f4e 8b8d 3f3e 3d3e 3g2e 3c4d 6f6e 2c2d 6e6d 2d2e 4e4d 4c4d 7g5e N*3b P*3c 2b3c B*4e P*5d 5e6f 3c2b 6f8d 4d4e 6d6c+'" :start_turn="-1" :slider_show="true" :controller_show="true" :theme="'real'" :size="'medium'" :bg_variant="'a'" :sound_effect="true" :volume="0.25" :debug_mode="false" :run_mode="'play_mode'")

            .column
              article.message.is-info
                .message-body
                  | human_side_key オプションで先手側だけ操作できるようにする

              ShogiPlayer(:kifu_body="'position startpos moves 7g7f 8c8d 2h6h 3c3d 6g6f 7a6b 3i3h 5a4b 4g4f 4b3b 3g3f 2b3c 1g1f 8d8e 8h7g 3b2b 7i7h 5c5d 7h6g 6a5b 2i3g 1a1b 6g5f 5d5e 5f4e 8b8d 3f3e 3d3e 3g2e 3c4d 6f6e 2c2d 6e6d 2d2e 4e4d 4c4d 7g5e N*3b P*3c 2b3c B*4e P*5d 5e6f 3c2b 6f8d 4d4e 6d6c+'" :start_turn="20" :slider_show="true" :controller_show="true" :theme="'real'" :size="'medium'" :bg_variant="'a'" :sound_effect="true" :volume="0.25" :debug_mode="false" :run_mode="'play_mode'" :human_side_key="'black'")

          .columns
            .column
              article.message.is-info
                .message-body
                  | 駒落ちの場合は後手から始まる(動作確認用)
              ShogiPlayer(:kifu_body="`position sfen 4k4/9/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL w - 1`" :start_turn="-1" :theme="'simple'" :run_mode="'play_mode'")

            .column
              article.message.is-info
                .message-body
                  | 2手目の盤面から開始する場合も後手から始まる(動作確認用)
              ShogiPlayer(:kifu_body="`position sfen lnsgkgsnl/1r5b1/ppppppppp/9/9/2P6/PP1PPPPPP/1B5R1/LNSGKGSNL w - 2`" :start_turn="-1" :theme="'simple'" :run_mode="'play_mode'")

          .columns
            .column
              article.message.is-success.has-text-left
                .message-header
                  p 操作モードについて

                .message-body
                  .content
                    ul
                      li スライダー等で変更した任意局面から手番側の操作が行えます
                      li いちど指すとその手が最終手になります(分岐には対応していません)
                      li human_side_key オプションで片側の操作のみに絞れます
                      li Emitイベントに反応して、相手側の指し手を追加した棋譜で kifu_body を更新すればCPUとの対戦のようなことができます
                      li 再生モードの棋譜とは独立しています(再生モードの棋譜を上書きしません)
                      li 指し手を決定したときスライダーがあればスライダーにフォーカスにするのですぐに「←」キーで手を戻すことができます(2019-05-02)

          br
          br
          h3.title.has-text-left 3. 編集モード
          hr

          .columns
            .column
              article.message.is-info
                .message-body
                  | すべての駒を自由に動かせる

              ShogiPlayer(:kifu_body="'position startpos moves 7g7f 8c8d 2h6h 3c3d 6g6f 7a6b 3i3h 5a4b 4g4f 4b3b 3g3f 2b3c 1g1f 8d8e 8h7g 3b2b 7i7h 5c5d 7h6g 6a5b 2i3g 1a1b 6g5f 5d5e 5f4e 8b8d 3f3e 3d3e 3g2e 3c4d 6f6e 2c2d 6e6d 2d2e 4e4d 4c4d 7g5e N*3b P*3c 2b3c B*4e P*5d 5e6f 3c2b 6f8d 4d4e 6d6c+'" :start_turn="-1" :slider_show="true" :theme="'real'" :size="'medium'" :bg_variant="'a'" :sound_effect="true" :volume="0.25" :debug_mode="false" :run_mode="'edit_mode'")

            .column
              article.message.is-info
                .message-body
                  | 詰将棋用の初期配置で開始

              ShogiPlayer(:preset_key="'詰将棋'" :slider_show="true" :theme="'real'" :size="'medium'" :bg_variant="'a'" :sound_effect="true" :volume="0.25" :debug_mode="false" :run_mode="'edit_mode'")

          br
          br

          template(v-if="false")
            .columns
              .column
                article.message.is-info
                  .message-body
                    | 外部KIFファイルの読み込み

                ShogiPlayer(:kifu_url="'http://tk2-221-20341.vs.sakura.ne.jp/shogi/wr/ureshino_friend-doglong-20180122_213544.kif?plain=1'" :start_turn="-1" :controller_show="true" :slider_show="true" :debug_mode="true" :polling_interval="30")

            br
            br

          .columns
            .column
              article.message.is-success.has-text-left
                .message-header
                  p 操作方法

                .message-body
                  .content
                    ul
                      li 盤上の駒は右クリックで裏返せます(v, Space キーでも可)
                      li または修飾キー(shift, option, meta, control キーのいずれか)を押しながら左クリックでも裏返せます
                      li 駒を持った状態で右クリックすると駒を元に戻せます (Escape または q キーでも可)
                      li 駒台と駒箱に駒を移動するときに修飾キーを押しているとまとめて移動します
                      li ショートカットキーがあります(b:先手の駒台 w:後手の駒台 Backspace または t で駒箱)
                      li 修飾キーも効くので例えば先手の駒箱の歩をクリックしてから shift + w を押すと先手の駒台の歩がすべて後手の駒台に移動します
                      li 盤上の駒にカーソルを合わせて w, b, Backspace, t を押すと自動的に持ち上げてからそのキーをタイプしたことになります(持ち上げる手間が省略できる)

          .columns
            .column
              article.message.is-success.has-text-left
                .message-header
                  p 再生モードからのモード切り替えについて

                .message-body
                  .content
                    ul
                      li 右の<b-icon icon="dots-vertical" size="is-small"></b-icon>をクリックするとモードを切り替えることができます
                      li 棋譜再生モードの途中で「操作」に切り替えると手番側の駒を動かせるようになります。主に検討したいときに使います
                      li 「操作」モードに入るとき SFEN (USI) の場合はそのまま再生モードでの棋譜を保持した状態で始まります。(スライダーで最初の局面に戻せます)
                      li 一方 KIF の場合は都合上<b>現在の局面から</b>の開始になります。(つまりスライダーで最初の局面に戻せません)
                      li (SFENと同様になるようにしようかと思いましたが、「操作」モードにに入ったところを基点(0手目)とするのでわかりやすいというメリットがあることに気づきました)
                      li 手番に関わらず、ただ自由に駒を動かしたいときは「編集」モードになります
                      li 棋譜再生モードの途中で「操作」に切り替えると手番側の駒を動かせるようになります
                      li 再生モードから他のモードに切り替えてから再生モードに戻ったとき、他のモードに切り替える前の状態に復帰します (つまり継盤のような形になります)

  .section
    a(name="modal_in_style")
    .container
      h3.title モーダル内表示の例
      hr
      .columns
        .column
          article.message.is-info
            .message-body
              .content
                | mobile のときは size オプションで指定したサイズは無効になり、なるべく横幅いっぱいになるように調整します。
                | 右の<b-icon icon="dots-vertical" size="is-small"></b-icon>も非表示にします。

          .buttons
            a.button(@click="modal_p = true") 開く

          p
            | .modal-card.is-shogi-player-modal-card のようにします

          b-modal(:active.sync="modal_p" has-modal-card)
            .modal-card.is-shogi-player-modal-card
              header.modal-card-head
                p.modal-card-title.is-size-5
                  | 詰将棋13手詰
                button(class="delete" aria-label="close" @click="modal_p = false")

              section.modal-card-body
                shogi-player(
                  :run_mode="view_mode"
                  :debug_mode="false"
                  :start_turn="-1"
                  :kifu_body="'position sfen 4R1gnk/6+Bsl/5+P1pp/9/9/9/9/9/9 b rb3g3s3n2l15p 1 moves 3b2a 3a2a 5a2a+ 1a2a G*3b 2a1a 3b2b 1a2b N*3d 2b1a S*2b'"
                  :key_event_capture="true"
                  :slider_show="true"
                  :controller_show="true"
                  :theme="'simple'"
                  :size="'default'"
                  :sound_effect="true"
                )

                .box.is-size-6
                  | 1手目と5手詰が重要

              footer.modal-card-foot
                //- b-tooltip(label="この局面から自分で操作")
                //-   b-switch(v-model="sp_run_mode" true-value="play_mode" false-value="view_mode") 継盤
                a.button(@click="modal_p = false") 閉じる
                a.button(@click.prevent.stop="") ボタン2
                a.button(@click.prevent.stop="") ボタン3

          pre
            | b-modal(:active.sync="modal_p" has-modal-card)
            |   .modal-card.is-shogi-player-modal-card
            |     header.modal-card-head
            |       p.modal-card-title.is-size-5
            |         | 詰将棋13手詰
            |       button(class="delete" aria-label="close" @click="modal_p = false")
            |
            |     section.modal-card-body
            |       shogi-player(
            |         :run_mode="view_mode"
            |         :debug_mode="false"
            |         :start_turn="-1"
            |         :kifu_body="'position sfen 4R1gnk/6+Bsl/5+P1pp/9/9/9/9/9/9 b rb3g3s3n2l15p 1 moves 3b2a 3a2a 5a2a+ 1a2a G*3b 2a1a 3b2b 1a2b N*3d 2b1a S*2b'"
            |         :key_event_capture="true"
            |         :slider_show="true"
            |         :sfen_show="false"
            |         :controller_show="true"
            |         :theme="'simple'"
            |         :size="'default'"
            |         :sound_effect="true"
            |       )
            |
            |       .box.is-size-6
            |         | 1手目と5手詰が重要
            |
            |     footer.modal-card-foot.space_between
            |       a.button(@click="modal_p = false") 閉じる
  .section
    a(name="usage")
    .container
      h3.title 使い方
      hr
      .content(v-html="usage_md")

  .section
    a(name="options")
    .container
      h2.title オプション
      hr
      .columns
        .column
          //- この form は prevent が効いているか確認するためのもの
          form(action="/")
            ShogiPlayer(
              :run_mode.sync="run_mode"
              :kifu_body.sync="kifu_body"
              :start_turn.sync="start_turn"
              :theme.sync="theme"
              :size.sync="size"
              :bg_variant.sync="bg_variant"
              :piece_variant.sync="piece_variant"
              :debug_mode.sync="debug_mode"
              :hidden_if_piece_stand_blank="hidden_if_piece_stand_blank"
              :setting_button_show="setting_button_show"
              :flip.sync="flip"
              :digit_show="digit_show"
              :final_label="final_label"
              :key_event_capture="key_event_capture"
              :slider_show="slider_show"
              :controller_show="controller_show"
              :sfen_show="sfen_show"
              :overlay_navi="overlay_navi"
              :sound_effect="sound_effect"
              :volume="volume"
              :human_side_key="human_side_key"
              @update:play_mode_long_sfen="play_mode_long_sfen_set"
              @update:play_mode_short_sfen="play_mode_short_sfen_set"
              @update:play_mode_move="play_mode_move_set"
              )
              //- Slot動作確認用
              template(slot="sfen_part" slot-scope="props")
                | ({{props.mediator.to_sfen}})
                //- hr
                //- | ({{props.mediator.to_sfen_without_turn}})
          hr

      .columns
        .column
          section
            b-field(label="run_mode")
              .block
                template(v-for="e in RunModeInfo.values")
                  b-radio(v-model="run_mode" :native-value="e.key") {{e.name}}({{e.key}})

            .box
              b-field(label="theme")
                .block
                  template(v-for="e in ThemeInfo.values")
                    b-radio(v-model="theme" :native-value="e.key") {{e.name}}({{e.key}})

              b-field(label="bg_variant")
                .block
                  template(v-for="e in BgVariantInfo.values")
                    b-radio(v-model="bg_variant" :native-value="e.key") {{e.name}}

              b-field(label="piece_variant")
                .block
                  template(v-for="e in PieceVariantInfo.values")
                    b-radio(v-model="piece_variant" :native-value="e.key") {{e.name}}({{e.key}})

              b-field(label="size")
                .block
                  template(v-for="e in SizeInfo.values")
                    b-radio(v-model="size" :native-value="e.key") {{e.key}}

            .box
              b-field(grouped group-multiline)
                b-field(label="sound_effect")
                  b-switch(v-model="sound_effect")

                b-field(label="volume")
                  .block
                    input(v-model.number="volume" type="range" min="0" max="1.0" step="0.01")
                    | {{volume}}

            b-field(grouped group-multiline)
              b-field(label="start_turn")
                b-input(v-model="start_turn" type="number")

              b-field(label="final_label")
                b-input(v-model.trim="final_label" type="text")

            b-field(grouped group-multiline)
              b-field(label="slider_show")
                b-switch(v-model="slider_show")

              b-field(label="controller_show")
                b-switch(v-model="controller_show")

              b-field(label="sfen_show")
                b-switch(v-model="sfen_show")

              b-field(label="overlay_navi")
                b-switch(v-model="overlay_navi")

              b-field(label="key_event_capture")
                b-switch(v-model="key_event_capture")

              b-field(label="flip")
                b-switch(v-model="flip")

              b-field(label="digit_show")
                b-switch(v-model="digit_show")

              b-field(label="debug_mode")
                b-switch(v-model="debug_mode")

              b-field(label="hidden_if_piece_stand_blank")
                b-switch(v-model="hidden_if_piece_stand_blank")

              b-field(label="setting_button_show")
                b-switch(v-model="setting_button_show")

            b-field(label="human_side_key")
              .block
                template(v-for="e in SideInfo.values")
                  b-radio(v-model="human_side_key" :native-value="e.key") {{e.key}}

            b-field(label="kifu_body (KIF or USI(sfen)形式")
              b-input(v-model="kifu_body" type="textarea")

            article.message.is-primary.has-text-left
              .message-header
                p 引数

              .message-body
                | &lt;shogi-player
                | :<b>run_mode</b>="'{{run_mode}}'"
                | :<b>theme</b>="'{{theme}}'"
                | :<b>bg_variant</b>="'{{bg_variant}}'"
                | :<b>piece_variant</b>="'{{piece_variant}}'"
                | :<b>size</b>="'{{size}}'"
                | :<b>start_turn</b>="{{start_turn}}"
                | :<b>slider_show</b>="{{slider_show}}"
                | :<b>controller_show</b>="{{controller_show}}"
                | :<b>sfen_show</b>="{{sfen_show}}"
                | :<b>overlay_navi</b>="{{overlay_navi}}"
                | :<b>human_side_key</b>="'{{human_side_key}}'"
                | :<b>sound_effect</b>="{{sound_effect}}"
                | :<b>volume</b>="{{volume}}"
                | :<b>key_event_capture</b>="{{key_event_capture}}"
                | :<b>debug_mode</b>="{{debug_mode}}"
                | :<b>hidden_if_piece_stand_blank</b>="{{hidden_if_piece_stand_blank}}"
                | :<b>setting_button_show</b>="{{setting_button_show}}"
                | :<b>flip</b>="{{flip}}"
                | :<b>digit_show</b>="{{digit_show}}"
                | :<b>final_label</b>="'{{final_label}}'"
                | :<b>kifu_body</b>="'{{kifu_body}}'"
                | /&gt;

            br
            br
            h4.title 操作モードのイベント受信内容
            b-field(label="@update:play_mode_long_sfen: 操作モードで指した直後の局面を発行(movesあり)")
              b-input(:value="play_mode_long_sfen" type="textarea")

            b-field(label="@update:play_mode_short_sfen: 操作モードで指した直後の局面を発行(movesなし)")
              b-input(:value="play_mode_short_sfen" type="textarea")

            b-field(label="@update:play_mode_move: 操作モードで指した手(sfenのmovesの最後の1つ)")
              b-input(:value="play_mode_move" type="text")

            br

      .table_wrap
        .content(v-html="options_md")

      .table_wrap
        .content(v-html="license_md")

  footer.footer
    .container
      .columns
        .column.has-text-centered
          a(href="https://bulma.io")
            img(src="./assets/made-with-bulma.png" alt="Made with Bulma" width="128" height="24")
</template>

<script>
/* eslint-disable import/first */

import "css-browser-selector"

import Vue from 'vue'
import Vuex from 'vuex'
import Buefy from 'buefy'

Vue.use(Vuex)
Vue.use(Buefy)

import ShogiPlayer from './components/ShogiPlayer'

import SideInfo from "./side_info"
import RunModeInfo from "./run_mode_info"
import ThemeInfo from "./theme_info"
import BgVariantInfo from "./bg_variant_info"
import PieceVariantInfo from "./piece_variant_info"
import SizeInfo from "./size_info"

// Object.defineProperty(Vue.prototype, 'SideInfo', {value: SideInfo})

// Object.defineProperty(Vue.prototype, 'RunModeInfo', {value: RunModeInfo})
// Object.defineProperty(Vue.prototype, 'ThemeInfo', {value: ThemeInfo})
// Object.defineProperty(Vue.prototype, 'BgVariantInfo', {value: BgVariantInfo})
// Object.defineProperty(Vue.prototype, 'SizeInfo', {value: SizeInfo})

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
    // FIXME: npm run unit で raw-loader が効かない問題を回避している。が、SideInfo.values などがないとテストがこけるので最低限入れとく
    if (process.env.NODE_ENV === "test") {
      return {
        SideInfo,
        RunModeInfo,
        ThemeInfo,
        BgVariantInfo,
        PieceVariantInfo,
        SizeInfo,
      }
    }

    return {
      SideInfo,
      RunModeInfo,
      ThemeInfo,
      BgVariantInfo,
      PieceVariantInfo,
      SizeInfo,

      modal_p: false,
      modal_p2: false,

      // カスタマイズ用
      run_mode: "view_mode",   // play_mode
      theme: "real",
      bg_variant: "a",
      piece_variant: "a",
      size: "default",
      start_turn: -1,
      slider_show: true,
      overlay_navi: true,
      controller_show: true,
      sfen_show: true,
      human_side_key: 'both',
      sound_effect: true,
      volume: 0.5,
      key_event_capture: false,
      debug_mode: false,
      hidden_if_piece_stand_blank: false,
      setting_button_show: true,
      flip: false,
      digit_show: false,

      final_label: null,
      kifu_body: require("./極限早繰り銀.kif"),

      play_mode_long_sfen: null,
      play_mode_short_sfen: null,
      play_mode_move: null,

      kif_sample1: require("./第11回朝日杯将棋オープン戦本戦.kif"),
      kif_sample2: require("./藤井聡太四段_vs_澤田真吾六段.kif"),
      usage_md: marked(require('./usage.md')),
      options_md: marked(require('./options.md')),
      license_md: marked(require('./license.md')),
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
@import "buefy/dist/buefy.css"
@import "~bulma/sass/utilities/mixins.sass"

pre
  white-space: pre-wrap
  word-break: break-all

html
  +mobile
    font-size: 70%

#app
  .section
    +mobile
      margin: 2em 0em
      margin-bottom: 1em
      padding: 0

  .message-body
    +mobile
      font-size: 75%

  .title
    +mobile
      font-size: 150%

// ここで読み込むとカレントディレクトリが /src 扱いのため components/* から ../assets と参照してもパスが合わない
// main.js で読み込むと .sass のファイル基準になる
// @import "./components/ShogiPlayer.sass"
</style>
