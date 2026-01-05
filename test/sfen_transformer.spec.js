import { SfenTransformer } from "@/components/models/sfen_transformer.js"

describe("SfenTransformer", () => {
  it(".flop: movesなし", () => {
    const a = "position sfen +lnsgkgsnl/1r5b1/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL b S2s 1"
    const b = "position sfen lnsgkgsn+l/1b5r1/ppppppppp/9/9/9/PPPPPPPPP/1R5B1/LNSGKGSNL b S2s 1"
    expect(SfenTransformer.flop(a)).toEqual(b)
  })

  it(".flop: moves付き", () => {
    const a = "position sfen +lnsgkgsnl/1r5b1/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL b S2s 1 moves 7i6h S*2d"
    const b = "position sfen lnsgkgsn+l/1b5r1/ppppppppp/9/9/9/PPPPPPPPP/1R5B1/LNSGKGSNL b S2s 1 moves 3i4h S*8d"
    expect(SfenTransformer.flop(a)).toEqual(b)
  })
})
