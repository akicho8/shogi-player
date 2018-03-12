import { SfenSerializer } from '@/sfen_serializer'
import { SfenParser } from '@/sfen_parser'
import { Mediator } from '@/mediator'

describe('SfenSerializer', () => {
  it('基本', () => {
    const parser = new SfenParser()
    parser.kifu_body = "position sfen lr5nl/2n3SB1/3gp2p1/8p/PNP1kpPP1/6p1P/2g+p5/3P1G3/L1K4RL w G2SN5Pbsp 3"
    parser.parse()

    const mediator = new Mediator()
    mediator.parser = parser
    mediator.current_turn = 0
    mediator.run()
    const sfen_serializer = new SfenSerializer(mediator)
    expect(sfen_serializer.to_s).toEqual("lr5nl/2n3SB1/3gp2p1/8p/PNP1kpPP1/6p1P/2g+p5/3P1G3/L1K4RL w G2SN5Pbsp 3")
  })
})
