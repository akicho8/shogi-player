import _ from "lodash"

import { SfenParser } from '@/components/models/sfen_parser.js'
import { Place      } from '@/components/models/place.js'
import { MoveHash   } from '@/components/models/move_hash.js'

describe('SfenParser', () => {
  it('基本', () => {
    const sfen_parser = SfenParser.parse("position sfen +lnsgkgsnl/1r5b1/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL b S2s 1 moves 7i6h S*2d")
    sfen_parser.field
    sfen_parser.location_key
    sfen_parser.hold_pieces
    sfen_parser.move_infos

    expect(sfen_parser.moves).toEqual([ '7i6h', 'S*2d' ])
    expect(sfen_parser.init_sfen).toEqual("position sfen +lnsgkgsnl/1r5b1/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL b S2s 1")
  })

  it('1手目は先手', () => {
    const sfen_parser = new SfenParser()
    sfen_parser.raw_body = "position sfen lnsgkgsnl/1r5b1/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL b - 1"
    sfen_parser.parse()
    expect(sfen_parser.location_by_offset(0).key).toEqual('black')
  })

  it('2手目は△', () => {
    const sfen_parser = new SfenParser()
    sfen_parser.raw_body = "position sfen lnsgkgsnl/1r5b1/ppppppppp/9/9/2P6/PP1PPPPPP/1B5R1/LNSGKGSNL w - 2"
    sfen_parser.parse()
    expect(sfen_parser.location_by_offset(0).key).toEqual('white')
  })

  it('72手目は△', () => {
    const sfen_parser = new SfenParser()
    sfen_parser.raw_body = "position sfen lr4knl/3g2gs1/4ppP2/p4bNpp/2pSsN3/PPPP1P2P/2N1P1G2/2G6/L1K4RL w BPs3p 72 moves 2b3c"
    sfen_parser.parse()
    expect(sfen_parser.location_by_offset(0).key).toEqual('white')
  })

  it('駒落ちの初手は△', () => {
    const sfen_parser = new SfenParser()
    sfen_parser.raw_body = "position sfen lnsgkgsnl/1r5b1/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL w - 1"
    sfen_parser.parse()
    expect(sfen_parser.location_by_offset(0).key).toEqual('white')
  })

  it('駒落ちの3手目は△', () => {
    const sfen_parser = new SfenParser()
    sfen_parser.raw_body = "position sfen lnsgkgsnl/1r5b1/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL w - 3"
    sfen_parser.parse()
    expect(sfen_parser.location_by_offset(0).key).toEqual('white')
  })

  // it('指定の手数以降を求める例', () => {
  //   const sfen_parser = new SfenParser()
  //   sfen_parser.raw_body = "position sfen 7nl/7k1/9/7pp/6N2/9/9/9/9 b GS2r2b3g3s2n3l16p 1 moves S*2c 2b1c 2c1b+ 1c1b G*2c"
  //   sfen_parser.parse()
  //   const index = sfen_parser.base_location.code + 2
  //   console.log(index)
  //   const moves = _.takeRight(sfen_parser.moves, index)
  //   console.log(moves)
  // })

  it('開始を1にする例', () => {
    const sfen_parser = new SfenParser()
    sfen_parser.raw_body = "position sfen 7nl/7k1/9/7pp/6N2/9/9/9/9 b GS2r2b3g3s2n3l16p 2"
    sfen_parser.parse()
    expect(sfen_parser.init_sfen_from_one).toEqual('position sfen 7nl/7k1/9/7pp/6N2/9/9/9/9 b GS2r2b3g3s2n3l16p 1')
  })

  it('movesなしSFENの左右反転', () => {
    const a = "position sfen +lnsgkgsnl/1r5b1/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL b S2s 1"
    const b = "position sfen lnsgkgsn+l/1b5r1/ppppppppp/9/9/9/PPPPPPPPP/1R5B1/LNSGKGSNL b S2s 1"
    expect(SfenParser.sfen_flop(a)).toEqual(b)
  })

  it('moves付きSFENの左右反転', () => {
    const a = "position sfen +lnsgkgsnl/1r5b1/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL b S2s 1 moves 7i6h S*2d"
    const b = "position sfen lnsgkgsn+l/1b5r1/ppppppppp/9/9/9/PPPPPPPPP/1R5B1/LNSGKGSNL b S2s 1 moves 3i4h S*8d"
    expect(SfenParser.sfen_flop(a)).toEqual(b)
  })
})
