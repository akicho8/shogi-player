import { GX } from "../../models/gx.js"

export class ColorHelper {
  static random(options = {}) {
    const alpha = options.alpha ?? 1.0
    const h = GX.irand(360)
    const s = GX.irand(100)
    const l = GX.irand(100)
    return `hsla(${h},${s}%,${l}%,${alpha})`
  }
}
