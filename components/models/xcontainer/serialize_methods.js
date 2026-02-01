import _ from "lodash"
import { GX } from "../gx"
import { SfenSerializer } from "./sfen_serializer.js"

export class SerializeMethods {
  get sfen_serializer() { return new SfenSerializer(this)            }
  // delegates
  get to_simple_sfen()  { return this.sfen_serializer.to_simple_sfen } // "lnsgkgsnl/1r5b1/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL b - 1"
  get snapshot_hash()   { return this.sfen_serializer.snapshot_hash  } // "lnsgkgsnl/1r5b1/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL b -"
  get to_short_sfen()   { return this.sfen_serializer.to_short_sfen  } // "position sfen 4k4/9/4G4/9/9/9/9/9/9 b G2r2b2g4s4n4l18p 1"
}
