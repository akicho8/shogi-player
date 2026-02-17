export class KeyboardHelper {
  static pure_enter_p(e) {
    return e.key === "Enter" && !e.isComposing
  }

  static modifier_p(e) {
    return e.shiftKey || e.ctrlKey || e.altKey || e.metaKey
  }

  static shift_p(e) {
    return e.shiftKey
  }

  // そもそも shift を押してはダメの条件がはいっているため pure_key_p(e, "#") が絶対に判定できない
  static pure_key_p(e, key) {
    return !this.modifier_p(e) && e.key === key
  }

  static pure_code_p(e, code) {
    return !this.modifier_p(e) && e.code === code
  }

  //////////////////////////////////////////////////////////////////////////////// soft_* は Shift に関与しない版

  static soft_modifier_p(e) {
    return e.ctrlKey || e.altKey || e.metaKey
  }

  // shift に関与しないため soft_pure_key_p(e, "#") は判定できる
  static soft_pure_key_p(e, key) {
    return !this.soft_modifier_p(e) && e.key === key
  }
}
