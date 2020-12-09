// 汎用コード

import SfenParser from "shogi-player/src/sfen_parser"

const strip_tags = require('striptags')

import Autolinker from 'autolinker'

export default {
  methods: {
    ////////////////////////////////////////////////////////////////////////////////

    delay_block(seconds, block) {
      return setTimeout(block, 1000 * seconds)
    },

    delay_stop(delay_id) {
      if (delay_id) {
        clearTimeout(delay_id)
      }
    },

    ////////////////////////////////////////////////////////////////////////////////

    // ../../../node_modules/autolinker/README.md
    auto_link(str, options = {}) {
      return Autolinker.link(str, {newWindow: true, truncate: 30, mention: "twitter", ...options})
    },

    // string_truncate("hello", {length: 20})
    string_truncate(str, options = {}) {
      return _.truncate(str, {omission: "...", length: 80, ...options})
    },

    defval(v, default_value) {
      if (v == null) {
        return default_value
      } else {
        return v
      }
    },

    rand(n) {
      return Math.floor(Math.random() * n)
    },

    float_to_perc(v, precision = 0) {
      return _.floor(v * 100, precision)
    },

    // 0.1234 -> 12.34
    float_to_perc2(v) {
      const base = 100
      return Math.floor(v * 100 * base) / base
    },

    number_floor(v, precision = 0) {
      return _.floor(v, precision)
    },

    process_now() {
      this.$buefy.loading.open()
    },

    debug_alert(message) {
      if (this.development_p) {
        if (message != null) {
          this.$buefy.toast.open({message: message.toString(), position: "is-bottom", type: "is-danger", duration: 1000 * 1.0, queue: false})
        }
      }
    },

    clog(...args) {
      if (this.development_p) {
        console.log(...args)
      }
    },

    // 1つ前に戻れるなら戻る
    // 戻れないならトップに戻る
    // window.history.length は自分を含めるので、1つ前に戻れる条件は2要素以上あるとき
    // 2要素あっても戻れないことがあるので3にしてみる(適当)→やっぱり2にしとく
    back_to(path = null) {
      if (window.history.length >= 2) {
        this.debug_alert("戻る")
        this.$router.go(-1)
      } else {
        this.debug_alert("戻れない")
        this.$router.push(path || "/")
      }
    },

    // #以降を除いた現在のパス
    // http://localhost:3000/xy?abc=1#1 ↓
    // http://localhost:3000/xy?abc=1
    location_url_without_hash() {
      return window.location.href.replace(window.location.hash, "")
    },

    // ?foo=1#xxx を除いた現在のパス
    // http://localhost:3000/xy?abc=1 ↓
    // http://localhost:3000/xy
    location_url_without_search_and_hash() {
      return this.location_url_without_hash().replace(window.location.search, "")
    },

    // // 他のウィンドウで開く
    // url_open(url) {
    //   // this.process_now()
    //   if (window.open(url, "_self")) {
    //     // Google Chrome では動く
    //   } else {
    //     // iOS Safari ではこちら
    //     this.url_open(url)
    //   }
    // },

    // URLを開く
    // url_open(url, this.target_default) で呼ぶとPCの場合はWindowを開く
    url_open(url, target = null) {
      if (target === "_blank") {
        return this.other_window_open(url)
      }

      // this.process_now()
      location.href = url
    },

    // 通知
    simple_notify(message) {
      this.talk(message)
      this.$buefy.toast.open({message: message, position: "is-bottom", type: "is-info", duration: 1000 * 1, queue: false})
    },

    ////////////////////////////////////////////////////////////////////////////////

    // tweet_url_build_from_text("body")
    tweet_url_build_from_text(text) {
      return this.tweet_url_build_from_params({text: text})
    },

    ////////////////////////////////////////////////////////////////////////////////

    __assert__(value, message = null) {
      if (!value) {
        console.error(value)
        alert(message || "ぶっこわれました")
        debugger
      }
    },

    __assert_equal__(expected, actual, message = null) {
      if (actual !== expected) {
        console.error(`<${expected}> expected but was <${actual}>`)
        alert(message || "ぶっこわれました")
        debugger
      }
    },

    ////////////////////////////////////////////////////////////////////////////////

    // 一番下までスクロール
    scroll_to_bottom(elem) {
      if (elem) {
        this.$nextTick(() => elem.scrollTop = elem.scrollHeight)
      }
    },

    // scroll_to_bottom2(elem) {
    //   if (this.$refs[elem]) {
    //     this.$nextTick(() => {
    //       this.$refs[elem].scrollTop = this.$refs[elem].scrollHeight
    //     })
    //   }
    // },

    simple_format(str) {
      return str.replace(/\n/g, "<br>")
    },

    // sfen_parser.moves.length
    sfen_parse(sfen) {
      return SfenParser.parse(sfen)
    },

    // strip_tags(html)
    // strip_tags(html, '<strong>')
    // strip_tags(html, ['a'])
    // strip_tags(html, [], '\n')
    strip_tags(...args) {
      return strip_tags(...args)
    },
  },

  computed: {
  },
}
