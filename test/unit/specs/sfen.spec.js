import { Sfen } from '@/sfen.js'

describe('Sfen', () => {
  it('基本', () => {
    const sfen = new Sfen()
    sfen.kifu_body = "position sfen +lnsgkgsnl/1r5b1/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL b S2s 1 moves 7i6h S*2d"
    sfen.parse()
    sfen.field
    sfen.location
    sfen.hold_pieces
    sfen.move_infos
  })
})
