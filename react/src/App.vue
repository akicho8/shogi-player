<template>
<div id="app">
  <section class="hero is-primary">
    <!-- Hero head: will stick at the top -->
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
                  <i class="fa fa-github"></i>
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
            <li><a href="#examples">サンプル</a></li>
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
          将棋の棋譜を再生する JavaScript で次の特徴があります
        </p>
        <ul>
          <li>KIF と SFEN フォーマットに対応</li>
          <li>Flash 未使用</li>
          <li>npm でインストール可</li>
        </ul>
      </div>
    </div>
  </section>

  <section class="section">
    <a name="examples"></a>
    <div class="container">
      <h2 class="title">サンプル</h2>
      <hr>
      <section class="section">
        <div class="container has-text-centered">

          <div class="columns">
            <div class="column">
              <article class="message is-primary has-text-centered is-small">
                <div class="message-body">
                  コメント付きの KIF 表示。9手目から表示。キーボード操作を優先的にキャプチャ。
                </div>
              </article>
              <h3 class="title yumincho">藤井聡太四段 vs 佐藤天彦名人</h3>
              <p class="subtitle yumincho">
                <a href="http://www.asahi.com/shougi/asahicup_live/?ref=jsa" target="_blank">第11回朝日杯将棋オープン戦本戦</a>
              </p>
              <hr>
              <ShogiPlayer :kifu_body="kif_sample2" :start_turn="9" :slider_show="true" :key_event_capture="true" />
            </div>
          </div>
          <br>
          <br>

          <div class="columns">
            <div class="column">
              <article class="message is-primary has-text-centered is-small">
                <div class="message-body">
                  コントローラーとスライダー付き。121手目から表示。
                </div>
              </article>
              <h3 class="title yumincho">藤井聡太四段 vs 澤田真吾六段</h3>
              <p class="subtitle yumincho">第43期棋王戦予選</p>
              <hr>
              <ShogiPlayer :kifu_body="kif_sample1" :start_turn="121" :controller_show="true" :slider_show="true" />
            </div>

            <div class="column">
              <article class="message is-primary has-text-centered is-small">
                <div class="message-body">
                  シンプル。最終手から表示。※盤面クリックで操作可。天王山クリックで反転
                </div>
              </article>
              <h3 class="title yumincho">羽生善治名人 vs 渡辺明竜王</h3>
              <p class="subtitle yumincho">第21期竜王戦七番勝負第4局</p>
              <hr>
              <ShogiPlayer :kifu_body="'position startpos moves 2g2f 8c8d 2f2e 8d8e 6i7h 4a3b 2e2d 2c2d 2h2d P*2c 2d2h 7a7b 3i3h 3c3d 9g9f 9c9d 1g1f 1c1d 3h2g 8e8f 8g8f 8b8f P*8g 8f8d 2g3f 5a5b 7g7f 7c7d 8h2b+ 3a2b 7i8h 7b7c 8h7g 7c6d 3f4e 7d7e 4e5f 2b3c 6g6f 3c4d 5f6g 6a7b 5i6h 8a7c 4i5h 2a3c 6h7i 7e7f 6g7f 4d5e P*7e 9d9e B*7d P*8h 7i8h 7b8c 9f9e 8c7d 7e7d 8d7d P*7e 7d8d 5h6g P*7d 7e7d 8d7d P*7e 6d7e 7f7e 7d7e 7g7f 7e7d S*7e 7d4d P*7d 4d4g+ P*2d 2c2d 7d7c+ 4g4i 2h2d P*2c 2d3d 4c4d P*7i 5b4c 3d3e S*4e 6g5f P*7g 8i7g P*3d 3e4e 3c4e 5f5e R*2h N*3f 2h7h+ 8h9g 4e5g+ 5e4d 4i4d S*5b 4c5d 7i7h 4d4i G*6e 5d4e R*4d 4e5f 4d4i G*4h S*3h 4h4i R*5e 5f4f 3h4i G*4e P*4g 5g4g P*4h 4g3g 2i3g 4f3g 5e4e R*8i G*3h 3g3f G*4f 3f2f 9i9h 8i4i+ P*3i S*2i 3h2h 4i3i'" :start_turn="-1" />
            </div>
          </div>
          <br>
          <br>

          <div class="columns">
            <div class="column">
              <article class="message is-primary has-text-centered is-small">
                <div class="message-body">
                  スライダーのみ表示。初手から表示
                </div>
              </article>
              <h3 class="title yumincho">藤井猛六段 vs 井上慶太六段</h3>
              <p class="subtitle yumincho">第54期順位戦B級2組7回戦</p>
              <hr>
              <ShogiPlayer :kifu_body="'position startpos moves 7g7f 8c8d 2h6h 3c3d 6g6f 7a6b 3i3h 5a4b 4g4f 4b3b 3g3f 2b3c 1g1f 8d8e 8h7g 3b2b 7i7h 5c5d 7h6g 6a5b 2i3g 1a1b 6g5f 5d5e 5f4e 8b8d 3f3e 3d3e 3g2e 3c4d 6f6e 2c2d 6e6d 2d2e 4e4d 4c4d 7g5e N*3b P*3c 2b3c B*4e P*5d 5e6f 3c2b 6f8d 4d4e 6d6c+'" :start_turn="0" :slider_show="true" />
            </div>

            <div class="column">
              <article class="message is-primary has-text-centered is-small">
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

          <template v-if="false">
            <div class="columns">
              <div class="column">
                <article class="message is-primary has-text-centered is-small">
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
                  <p>共通する操作方法など</p>
                </div>
                <div class="message-body">
                  <div class="content">
                    <p>
                      <ul>
                        <li>盤面の左右をクリックすると前後の手番に進む</li>
                        <li>シフトを押しながらで10倍速</li>
                        <li>シフト以外のシステムキーだと50倍速(シフトキーも押していると500倍速)</li>
                        <li>天王山(５五の地点)をクリックすると反転</li>
                        <li>「N手目」の部分をクリックで編集可</li>
                        <li>スライダーがある場合は優先的にフォーカスする
                        <li>スライダーにフォーカスがある状態だと左右キーが効く(ブラウザの標準機能)</li>
                      </ul>
                    </p>
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
      <div class="content" v-html="options_md"></div>
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

var marked = require('marked')
marked.setOptions({
  renderer: new marked.Renderer(),
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
      kif_sample1: require("./藤井聡太四段_vs_澤田真吾六段.kif"),
      kif_sample2: require("./第11回朝日杯将棋オープン戦本戦.kif"),
      usage_md: marked(require('./usage.md')),
      options_md: marked(require('./options.md')),
    }
  },

  components: {
    ShogiPlayer
  },
}
</script>

<style lang="sass">
.yumincho
  font-family: "YuMincho", "Yu Mincho", serif
</style>
