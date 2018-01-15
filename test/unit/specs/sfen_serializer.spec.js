import { SfenSerializer } from '@/sfen_serializer'
import { Mediator } from '@/mediator'

describe('SfenSerializer', () => {
  it('基本', () => {
    const mediator = new Mediator()
    mediator.kifu_body = "position sfen lr5nl/2n3SB1/3gp2p1/8p/PNP1kpPP1/6p1P/2g+p5/3P1G3/L1K4RL w G2SN5Pbsp 120"
    mediator.current_turn = 0
    mediator.run()
    const sfen_serializer = new SfenSerializer(mediator)
    expect(sfen_serializer.toString).toEqual("lr5nl/2n3SB1/3gp2p1/8p/PNP1kpPP1/6p1P/2g+p5/3P1G3/L1K4RL w G2SN5Pbsp 120")
  })
})
