import { SfenParser } from '@/components/models/sfen_parser.js'
import { SfenFliper } from '@/components/models/sfen_fliper.js'
import _ from "lodash"

describe('SfenFliper', () => {
  it('指し手1つの左右反転', () => {
    const a = "S*2d"
    const b = "S*8d"
    const move_attrs = SfenParser.move_hash_from_move_str(a)
    expect(SfenFliper.move_hash_flip_h_as_sfen(move_attrs)).toEqual(b)
  })

  it('複数の指し手の左右反転', () => {
    const a = "7i6h+ S*2d"
    const b = "3i4h+ S*8d"
    expect(SfenFliper.moves_str_flip_h_from_moves_str(a)).toEqual(b)
  })

  it('movesなしSFENの左右反転', () => {
    const a = "position sfen +lnsgkgsnl/1r5b1/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL b S2s 1"
    const b = "position sfen lnsgkgsn+l/1b5r1/ppppppppp/9/9/9/PPPPPPPPP/1R5B1/LNSGKGSNL b S2s 1"
    expect(SfenFliper.sfen_flip_h_from_sfen(a)).toEqual(b)
  })

  it('moves付きSFENの左右反転', () => {
    const a = "position sfen +lnsgkgsnl/1r5b1/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL b S2s 1 moves 7i6h S*2d"
    const b = "position sfen lnsgkgsn+l/1b5r1/ppppppppp/9/9/9/PPPPPPPPP/1R5B1/LNSGKGSNL b S2s 1 moves 3i4h S*8d"
    expect(SfenFliper.sfen_flip_h_from_sfen(a)).toEqual(b)
  })
})
