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
                <div className="navbar-brand">
                  <span className="navbar-burger burger" data-target="navbarMenuHeroA">
                    <span></span>
                    <span></span>
                    <span></span>
                  </span>
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
                React version
              </h2>
            </div>
          </div>
        </section>
        <section className="section">
          <a name="examples"></a>
          <div className="container">
            <section className="section">
              <div className="container has-text-centered">
                <div className="columns">
                  <div className="column">
                    {/* <ShogiPlayer :kifu_body="kif_sample2" :start_turn="9" :slider_show="true" :key_event_capture="true" /> */}
                    <ShogiPlayer kifu_body={kif_sample2} start_turn="9" slider_show="true" key_event_capture="true" />
                  </div>
                </div>
              </div>
            </section>
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
