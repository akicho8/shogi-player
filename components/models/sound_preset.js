import piece_put from "../../assets/Universal_Sound_FX/TABLE_TENNIS_Racket_Ball_Hit_07_Hard_mono.wav"
import flip_sound from "../../assets/Universal_Sound_FX/RELOAD_Rechamber_Leaver_Action_stereo.wav"

import MemoryRecord from 'js-memory-record'

export class SoundPreset extends MemoryRecord {
  static get define() {
    return [
      { key: "piece_put",  source: piece_put,  volume: 0.5, },
      { key: "flip_sound", source: flip_sound, volume: 2.0, },
    ]
  }
}
