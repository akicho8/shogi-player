// const piece_sound = new Sound("../static/piece_sound.wav", {volume: 0.5})
// piece_sound.options[:volume] = 0.2
// piece_sound.play()

import axios from "axios"

var __audio_context__

// new Sound() のたびに new AudioContext() すると6回目ぐらいでエラーになるため根本的な解決にはなっていないが外で一回だけ呼ぶ
if (typeof window !== "undefined" && process.env.NODE_ENV !== "test") {
  window.AudioContext = window.AudioContext || window.webkitAudioContext
  __audio_context__ = new AudioContext()
}

export default class Sound {
  constructor(url, options = {}) {
    this.url = url
    this.options = options
    this.buffer = null

    if (process.env.NODE_ENV === "test") {
      return
    }

    this.__resource_load()
  }

  play() {
    if (this.is_loaded) {
      const source = __audio_context__.createBufferSource()
      source.buffer = this.buffer
      if (this.volume === null) {
        // Sound -> Destination
        source.connect(__audio_context__.destination)
      } else {
        // Sound -> GainNode -> Destination
        const gain_node = __audio_context__.createGain()
        source.connect(gain_node)
        gain_node.connect(__audio_context__.destination)
        gain_node.gain.value = this.volume
      }
      source.start(0)
    }
  }

  get is_loaded() {
    return this.buffer !== null
  }

  get volume() {
    let volume = 1.0
    if (this.options["volume"] !== undefined) {
      volume = this.options["volume"]
    }
    return volume
  }

  __resource_load() {
    // 動かない
    if (false) {
      axios(this.uri, {responseType: "arraybuffer"})
        .then(data => this.context.decodeAudioData(data))
        .then(buffer => { this.buffer = buffer })
    }

    // Safari でも動く
    if (true) {
      const req = new XMLHttpRequest()
      req.responseType = "arraybuffer"
      req.onreadystatechange = () => {
        if (req.readyState === 4) {
          if (req.status === 0 || req.status === 200) {
            console.log(`${this.constructor.name}#__resource_load("${this.url}")`)
            __audio_context__.decodeAudioData(req.response, buffer => { this.buffer = buffer })
          }
        }
      }
      req.open("GET", this.url, true)
      req.send("")
    }

    // 簡単だけどsafariでは動かない
    if (false) {
      fetch(this.url)
        .then(response => response.arrayBuffer())
        .then(bin => __audio_context__.decodeAudioData(bin, buffer => (this.buffer = buffer)))
    }
  }
}
