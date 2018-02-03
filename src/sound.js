// const piece_sound = new Sound("../static/piece_sound.wav")
// piece_sound.play

class Sound {
  constructor(url) {
    this.url = url
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
      source.connect(this.audio.destination)
      source.start(0)
    }
  }

  get is_loaded() {
    return this.buffer !== null
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
