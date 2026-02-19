import { GX } from "../../models/gx.js"
import Color from "colorjs.io"

export class ColorHelper {
  static random(options = {}) {
    const alpha = options.alpha ?? 1.0
    const h = GX.irand(360)
    const s = GX.irand(100)
    const l = GX.irand(100)
    return `hsl(${h} ${s}% ${l}% / ${alpha})`
  }

  static normalize(str) {
    if (str != null) {
      return this.hsl_format(str)
    }
  }

  static hsl_format(v) {
    GX.assert_not_null(v)
    return this.create(v.toString()).toString({format: "hsl"})
  }

  static create(...args) {
    return new Color(...args)
  }

  static invalid_p(str) {
    return !this.valid_p(str)
  }

  static valid_p(str) {
    let valid = true
    try {
      const color = new Color(str)                // "hsl(n 10% 20%)" でも生煮えオブジェクトができてしまう
      const hex = color.toString({format: "hex"}) // そこでいったん hex 変換すると #NaNNaNNaN になるので
      new Color(hex)                              // それで再度作ると今度は例外が出る
    } catch (e) {                                 // という、きもい判定をしている
      valid = false
    }
    return valid
  }
}
