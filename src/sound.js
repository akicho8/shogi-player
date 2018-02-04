// const piece_sound = new Sound("../static/piece_sound.wav", {volume: 0.5})
// piece_sound.options[:volume] = 0.2
// piece_sound.play()

class Sound {
  constructor(url, options = {}) {
    this.url = url
    this.options = options
    this.buffer = null

    if (process.env.NODE_ENV === "test") {
      return
    }

    window.AudioContext = window.AudioContext || window.webkitAudioContext
    this.audio = new AudioContext()
    this.__resource_load()
  }

  play() {
    if (this.is_loaded) {
      const source = this.audio.createBufferSource()
      source.buffer = this.buffer
      if (true) {
        // Sound -> GainNode -> Destination
        const gain_node = this.audio.createGain()
        source.connect(gain_node)
        gain_node.connect(this.audio.destination)
        gain_node.gain.value = this.volume
      } else {
        // Sound -> Destination
        source.connect(this.audio.destination)
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
    const req = new XMLHttpRequest()
    req.responseType = "arraybuffer"
    req.onreadystatechange = () => {
      if (req.readyState === 4) {
        if (req.status === 0 || req.status === 200) {
          this.audio.decodeAudioData(req.response, (buffer) => {
            this.buffer = buffer
          })
        }
      }
    }
    req.open("GET", this.url, true)
    req.send("")
  }
}

export { Sound }
