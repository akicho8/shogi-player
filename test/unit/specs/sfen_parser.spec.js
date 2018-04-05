import { SfenParser } from '@/sfen_parser'

describe('SfenParser', () => {
  it('基本', () => {
    const sfen_parser = new SfenParser()
    sfen_parser.kifu_body = "position sfen +lnsgkgsnl/1r5b1/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL b S2s 1 moves 7i6h S*2d"
    sfen_parser.parse()
    sfen_parser.field
    sfen_parser.location_key
    sfen_parser.hold_pieces
    sfen_parser.move_infos

    expect(sfen_parser.moves).toEqual([ '7i6h', 'S*2d' ])
    expect(sfen_parser.init_sfen).toEqual("position sfen +lnsgkgsnl/1r5b1/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL b S2s 1")
  })
})
