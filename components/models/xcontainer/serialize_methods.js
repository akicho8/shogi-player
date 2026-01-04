import _ from "lodash"
import { Beetleshine as GX } from "beetleshine"
import { SfenSerializer } from "./sfen_serializer.js"

export class SerializeMethods {
  // "lnsgkgsnl/1r5b1/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL b - 1"
  get to_simple_sfen() {
    return this.sfen_serializer.to_s
  }

  // "lnsgkgsnl/1r5b1/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL b -"
  get to_sfen_without_turn() {
    return this.sfen_serializer.to_s_without_turn
  }

  // position sfen 4k4/9/4G4/9/9/9/9/9/9 b G2r2b2g4s4n4l18p 1
  get to_short_sfen() {
    return `position sfen ${this.to_simple_sfen}`
  }

  get sfen_serializer() {
    return new SfenSerializer(this)
  }
}
