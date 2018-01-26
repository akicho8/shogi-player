import React from 'react'
import PieceStand from './PieceStand'
import _ from 'lodash'
import { Mediator } from './mediator'
import { Board } from './board'

import axios from "axios"

import "./ShogiPlayer.css"

// Object.defineProperty(Vue.prototype, '_', {value: _})

// Log content type
// localStorage.debug = "axios"
require('axios-debug-log')({
  request: function (debug, config) {
    debug('Request with ' + config.headers['content-type'])
  },
  response: function (debug, response) {
    debug(
      'Response with ' + response.headers['content-type'],
      'from ' + response.config.url
    )
  },
  error: function (debug, error) {
    // Read https://www.npmjs.com/package/axios#handling-errors for more info
    debug('Boom', error)
  }
})

const logger_debug = require('debug')('debug')

class ShogiPlayer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      current_turn: this.props.turn_start, // N手目
      turn_edit_value: null,         // numberフィールドで current_turn を直接操作すると空にしたとき補正値 0 に変換されて使いづらいため別にする。あと -1 のときの挙動もわかりやすい。
      board_turn: false,             // 反転したか？
      turn_edit: false,              // N手目編集中
      env: process.env.NODE_ENV,
      polling_id: null,
      error_message: null,
      interval_id: null,
      read_counter: 0,
    }

    this.mediator = null
    this.loaded_kifu = null

    // this.kifu_read()
    // this.polling_interval_update()
    // this.mediator_update()

    // document.addEventListener("keydown", this.keyboard_operation)
  }

  componentDidMount() {
    this.kifu_read()
    this.polling_interval_update()
    this.mediator_update()
  }

  // componentWillMount()                      { alert("componentWillMount   (DOMに追加前)")                                  }
  // componentDidMount()                       { alert("componentDidMount    (DOMに追加した)")                                }
  // componentWillUnmount()                    { alert("componentWillUnmount (DOMから削除)")                                  }
  //
  // // 編集が更新されたとき
  // componentWillReceiveProps(nextProps)      { alert(`componentWillReceiveProps (nextPropsが変更されたとき) ${nextProps}`)  }
  //
  // // 変数更新によるコンポ更新「前」「後」
  // componentWillUpdate(nextProps, nextState) { alert(`componentWillUpdate (変数更新前) ${nextProps} ${nextState}`)          }
  // componentDidUpdate(prevProps, prevState)  { alert(`componentDidUpdate  (変数更新後) ${prevProps} ${prevState}`)          }
  //
  // // これはフックじゃない。制御用。デフォルトでは true を返す。false すると更新しなくなる。が、 forceUpdate は呼べる
  // shouldComponentUpdate()              { alert("shouldComponentUpdate (更新するかどうか決める用)"); return true; }
  //
  // // isMounted() は おまけでDOMに追加しているかどうか判定できる

  // this.log("created")

  // watch: {
  //   current_turn: function () {
  //     this.mediator_update()
  //   },
  //   turn_edit_value: function () {
  //     this.current_turn = this.state.turn_edit_value
  //   },
  //
  //   /* eslint-disable */
  //   kifu_url:  function () { this.kifu_read() },
  //   kifu_body: function () { this.kifu_read() },
  //   loaded_kifu: function () {
  //     this.mediator_update()
  //   },
  //   polling_interval: function () { this.polling_interval_update() },
  //   /* eslint-enable */
  //
  //   // 引数は親が「変更」したときがトリガー
  //   debug_mode: function (v) {
  //     this.log(`watch debug_mode: ${v}`)
  //   },
  // },

  kifu_read() {
    if (this.props.kifu_url) {
      this.kifu_read_from_url()
    } else {
      this.loaded_kifu = this.props.kifu_body
    }
    this.setState(prevState => ({read_counter: prevState.read_counter + 1}));
    this.log(`read_counter: ${this.state.read_counter}`)
    if (this.props.move_to_last_after_polling) {
      this.setState({current_turn: -1})
    }
  }

  kifu_read_from_url() {
    const url = this.props.kifu_url
    // const url = "http://localhost:3000/wr/hanairobiyori-ispt-20171104_220810.kif"
    // const url = "http://tk2-221-20341.vs.sakura.ne.jp/shogi/wr/ureshino_friend-doglong-20180122_213544.kif"
    const accessd_at = Date.now().toString()
    axios.get(url, {
      params: {"accessd_at": accessd_at},
      responseType: "text",
      timeout: 1000 * 3,
      headers: {"X-SHOGI-PLAYER-TIMESTAMP": accessd_at},
    }).then((response) => {
      this.setState({loaded_kifu: response.data})
      this.setState({error_message: null})
    }).catch((error) => {
      if (error.response) {
        logger_debug("error.response.data: %o", error.response.data)
        logger_debug("error.response.status: %o", error.response.status)
        logger_debug("error.response.statusText: %o", error.response.statusText)
        logger_debug("error.response.headers: %o", error.response.headers)
      } else if (error.request) {
        logger_debug("error.request: %o", error.request)
      } else {
        logger_debug('error.message: %o', error.message)
      }
      logger_debug('error.config: %o', error.config)

      this.setState({loaded_kifu: null})
      this.setState({error_message: error.message})
    })
  }

  polling_interval_update() {
    if (this.props.polling_interval) {
      if (this.interval_id) {
        this.log(`clearInterval(${this.interval_id})`)
        clearInterval(this.interval_id)
      }
      this.interval_id = setInterval(() => { this.kifu_read() }, this.props.polling_interval * 1000)
      this.log(`setInterval() => ${this.interval_id}`)
    }
  }

  mediator_update() {
    if (this.loaded_kifu) {
      this.mediator = new Mediator()
      this.mediator.kifu_body = this.loaded_kifu
      this.mediator.current_turn = this.state.current_turn
      this.mediator.run()
      this.setState({current_turn: this.mediator.normalized_turn})
      if (this.props.location_hash_embed_turn) {
        document.location.hash = this.state.current_turn
      }
    }
  }

  keyboard_operation(e) {
    if (this.props.debug_mode) {
      this.log(document.activeElement)
      this.log(e.shiftKey, e.ctrlKey, e.altKey, e.metaKey)
      this.log("e", e)
      this.log("key", e.key)
      this.log("code", e.code)
    }

    if (!this.props.global_key_event_capture) {
      return
    }

    const dom = document.activeElement
    const controllers = [this.refs.first, this.refs.previous, this.refs.next, this.refs.last] // FIXME: 指定DOMの下にあるか？の方法がわかればもっと簡潔になる
    if (!(dom === undefined || dom.tagName === "BODY" || _.includes(controllers, dom))) {
      return
    }

    if (e.code === "Backspace" || e.code === "ArrowUp" || e.code === "ArrowLeft" || e.key === "k" || e.key === "p" || e.key === "b") {
      this.relative_move(-1, e)
      e.preventDefault()
    }

    if (e.code === "Space" || e.code === "Enter" || e.code === "ArrowDown" || e.code === "ArrowRight" || e.key === "j" || e.key === "n" || e.key === "f") {
      this.relative_move(1, e)
      e.preventDefault()
    }

    // let gap = null
    // let force_value = null
    //
    // if (e.code === "Space" || e.code === "Enter" || e.code === "ArrowDown" || e.code === "ArrowRight" || e.key === "j" || e.key === "n" || e.key === "f") {
    //   gap = 1
    // }
    // if (e.code === "Backspace" || e.code === "ArrowUp" || e.code === "ArrowLeft" || e.key === "k" || e.key === "p" || e.key === "b") {
    //   gap = -1
    // }
    // if (e.key === "PageUp") {
    //   gap = -10
    // }
    // if (e.key === "PageDown") {
    //   gap = 10
    // }
    // if (e.shiftKey || e.ctrlKey || e.altKey || e.metaKey) {
    //   if (gap) {
    //     gap *= 10
    //   }
    // }
    // if (e.key === "[" || e.key === "Home" || e.code === "Escape") {
    //   force_value = this.mediator.any_parser.turn_min
    // }
    // if (e.key === "]" || e.key === "End") {
    //   force_value = this.mediator.any_parser.turn_max
    // }
    //
    // let v = this.state.current_turn
    // if (gap !== null) {
    //   v += gap
    // }
    // if (force_value !== null) {
    //   v = force_value
    // }
    // if (v < this.mediator.any_parser.turn_min) {
    //   v = this.mediator.any_parser.turn_min
    // }
    // if (this.mediator.any_parser.turn_max < v) {
    //   v = this.mediator.any_parser.turn_max
    // }
    // this.state.current_turn = v
    //
    // if (gap !== null || force_value !== null) {
    //   e.preventDefault()
    // }
  }

  navi_relative_move(v, event) {
    this.relative_move(v * this.state.board_turn_sign(), event)
  }

  relative_move(v, event = null) {
    if (event) {
      if (event.shiftKey) {
        if (this.props.shift_key_mag) {
          v *= this.props.shift_key_mag
        }
      }
      if (event.ctrlKey || event.altKey || event.metaKey) {
        if (this.props.system_key_mag) {
          v *= this.props.system_key_mag
        }
      }
    }

    const v2 = this.mediator.clamp(this.state.current_turn + v)
    if (this.state.current_turn !== v2) {
      this.setState({current_turn: v2})
    }
    if (this.props.debug_mode) {
      this.log([v, v2, this.state.current_turn])
    }
    if (this.focus_to("slider")) {
    } else {
      if (v > 0) {
        this.focus_to("next")
      } else {
        this.focus_to("previous")
      }
    }
  }

  move_to_first() {
    this.setState({current_turn: this.mediator.any_parser.turn_min})
    this.focus_to("slider") || this.focus_to("first")
  }

  move_to_last() {
    this.setState({current_turn: this.mediator.any_parser.turn_max})
    this.focus_to("slider") || this.focus_to("last")
  }

  focus_to(key) {
    const el = this.refs[key]
    if (el) {
      el.focus()
      return true
    }
    return false
  }

  board_turn_run() {
    this.setState({board_turn: !this.state.board_turn})
    this.focus_to("slider")
  }

  turn_edit_run() {
    this.setState({turn_edit: true})
    this.setState({turn_edit_value: this.state.current_turn})
    // this.$nextTick(() => { this.refs.turn_edit_input.getDOMNode().focus() })
  }

  board_turn_sign() {
    return this.state.board_turn ? -1 : 1
  }

  log(v) {
    if (this.props.debug_mode) {
      console.log(v)
    }
  }

  render() {
    const rows = []

    if (this.mediator) {
      _.times(Board.dimension, (y) => {
        const row = []
        _.times(Board.dimension, (x) => {
          row.push(<td className={this.mediator.cell_class(x, y).join(" ")}>{this.mediator.cell_view(x, y)}</td>)
        })
        rows.push(<tr>{row}</tr>)
      })
    }

    return (
      <div className="shogi-player">
        <table>
          <tbody>
            {rows}
          </tbody>
        </table>
        <PieceStand />
      </div>
    )
  }
}

ShogiPlayer.defaultProps = {
  kifu_body:                  "position startpos",
  kifu_url:                   null,
  polling_interval:           null,
  move_to_last_after_polling: true,
  turn_start:                 0,
  slider_show:                false,
  controller_show:            false,
  sfen_show:                  false,
  global_key_event_capture:   false,
  location_hash_embed_turn:   false,
  shift_key_mag:              10,
  system_key_mag:             50,
  debug_mode:                 false,
}

// Child.propTypes = {
//   data: React.PropTypes.string,
// };

// this.handleClick = this.handleClick.bind(this);
// https://reactjs.org/docs/handling-events.html

export default ShogiPlayer
