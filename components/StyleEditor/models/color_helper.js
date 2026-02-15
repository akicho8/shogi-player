import { GX } from "../../models/gx.js"
import chroma from "chroma-js"

export class ColorHelper {
  static random(options = {}) {
    const alpha = options.alpha ?? 1.0
    const h = GX.irand(360)
    const s = GX.irand(100)
    const l = GX.irand(100)
    return `hsla(${h}, ${s}%, ${l}%, ${alpha})`
  }

  static hsla_format(v) {
    GX.assert_not_null(v)
    return chroma(v).css("hsla")
  }
}
