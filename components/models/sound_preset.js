import MemoryRecord from 'js-memory-record'

export class SoundPreset extends MemoryRecord {
  static get define() {
    return [
      { key: "piece_put",  source: require("../../assets/Universal_Sound_FX/TABLE_TENNIS_Racket_Ball_Hit_07_Hard_mono.wav"), volume: 0.5, },
      { key: "flip_sound", source: require("../../assets/Universal_Sound_FX/RELOAD_Rechamber_Leaver_Action_stereo.wav"),     volume: 1.0, },
    ]
  }
}
