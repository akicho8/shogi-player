import SfenParser from '@/sfen_parser'

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

  it('1手目は先手', () => {
    const sfen_parser = new SfenParser()
    sfen_parser.kifu_body = "position sfen lnsgkgsnl/1r5b1/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL b - 1"
    sfen_parser.parse()
    expect(sfen_parser.location_by_offset(0).key).toEqual('black')
  })

  it('2手目は△', () => {
    const sfen_parser = new SfenParser()
    sfen_parser.kifu_body = "position sfen lnsgkgsnl/1r5b1/ppppppppp/9/9/2P6/PP1PPPPPP/1B5R1/LNSGKGSNL w - 2"
    sfen_parser.parse()
    expect(sfen_parser.location_by_offset(0).key).toEqual('white')
  })

  it('72手目は△', () => {
    const sfen_parser = new SfenParser()
    sfen_parser.kifu_body = "position sfen lr4knl/3g2gs1/4ppP2/p4bNpp/2pSsN3/PPPP1P2P/2N1P1G2/2G6/L1K4RL w BPs3p 72 moves 2b3c"
    sfen_parser.parse()
    expect(sfen_parser.location_by_offset(0).key).toEqual('white')
  })

  it('駒落ちの初手は△', () => {
    const sfen_parser = new SfenParser()
    sfen_parser.kifu_body = "position sfen lnsgkgsnl/1r5b1/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL w - 1"
    sfen_parser.parse()
    expect(sfen_parser.location_by_offset(0).key).toEqual('white')
  })

  it('駒落ちの3手目は△', () => {
    const sfen_parser = new SfenParser()
    sfen_parser.kifu_body = "position sfen lnsgkgsnl/1r5b1/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL w - 3"
    sfen_parser.parse()
    expect(sfen_parser.location_by_offset(0).key).toEqual('white')
  })
})
