import React from 'react'
import logo from './logo.svg'
import made_with_bulma from './made-with-bulma.png'

import './App.css'
import ShogiPlayer from './ShogiPlayer'
// import DangerButton from './DangerButton'

// import kif_sample2 from './sample1.kif'
import kif_sample2 from './sample1_kif'
// 
console.log(kif_sample2)

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <section className="hero is-primary">
          <div className="hero-head">
            <nav className="navbar">
              <div className="container">
                {/* <img src={logo} className="App-logo" alt="logo" /> */}
                <div className="navbar-brand">
                  <span className="navbar-burger burger" data-target="navbarMenuHeroA">
                    <span></span>
                    <span></span>
                    <span></span>
                  </span>
                </div>
                <div id="navbarMenuHeroA" className="navbar-menu">
                  <div className="navbar-end">
                    <a className="navbar-item" href="https://github.com/akicho8/react-shogi-player">
                      <span className="icon">
                        <i className="fas fa-github"></i>
                      </span>
                      <span>Github</span>
                    </a>
                  </div>
                </div>
              </div>
            </nav>
          </div>

          <div className="hero-body">
            <div className="container has-text-centered">
              <h1 className="title">
                shogi-player
              </h1>
              <h2 className="subtitle">
                (ただいま鋭意作成中)
              </h2>
            </div>
          </div>

          <div className="hero-foot">
            <nav className="tabs">
              <div className="container">
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

        <section className="section">
          <a name="summary"></a>
          <div className="container">
            <h2 className="title">概要</h2>
            <hr/>
            <div className="content">
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

        <section className="section">
          <a name="examples"></a>
          <div className="container">
            <h2 className="title">サンプル</h2>
            <hr/>
            <section className="section">
              <div className="container has-text-centered">

                <div className="columns">
                  <div className="column">
                    <article className="message is-primary has-text-centered is-small">
                      <div className="message-body">
                        コメント付きの KIF 表示。9手目から表示。キーボード操作を優先的にキャプチャ。
                      </div>
                    </article>
                    <h3 className="title yumincho">藤井聡太四段 vs 佐藤天彦名人</h3>
                    <p className="subtitle yumincho">
                      <a href="http://www.asahi.com/shougi/asahicup_live/?ref=jsa" target="_blank">第11回朝日杯将棋オープン戦本戦</a>
                    </p>
                    <hr/>
                    {/* <ShogiPlayer :kifu_body="kif_sample2" :turn_start="9" :slider_show="true" :global_key_event_capture="true" /> */}
                    <ShogiPlayer kifu_body={kif_sample2} turn_start="9" slider_show="true" global_key_event_capture="true" />
                  </div>
                </div>
                <br/>
                <br/>

                <div className="columns">
                  <div className="column">
                    <article className="message is-success has-text-left">
                      <div className="message-header">
                        <p>共通する操作方法など</p>
                      </div>
                      <div className="message-body">
                        <div className="content">
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
              </div>

            </section>
          </div>
        </section>

        <section className="section">
          <a name="usage"></a>
          <div className="container">
            <h3 className="title">使い方</h3>
            <hr/>
            <div className="content" v-html="usage_md"></div>
          </div>
        </section>

        <section className="section">
          <a name="options"></a>
          <div className="container">
            <h2 className="title">オプション</h2>
            <hr/>
            <div className="content" v-html="options_md"></div>
          </div>
        </section>

        <footer className="footer">
          <div className="container">
            <div className="columns">
              <div className="column has-text-centered">
                <a href="https://bulma.io"><img src={made_with_bulma} alt="Made with Bulma" width="128" height="24" /></a>
              </div>
            </div>
          </div>
        </footer>

      </div>
    );
  }
}

export default App
