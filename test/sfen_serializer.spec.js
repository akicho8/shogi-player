import { SfenSerializer } from '@/components/models/sfen_serializer.js'
import { SfenParser } from '@/components/models/sfen_parser.js'
import { Xcontainer } from '@/components/models/xcontainer.js'

describe('SfenSerializer', () => {
  it('基本', () => {
    const xcontainer = new Xcontainer()
    xcontainer.data_source = SfenParser.parse("position sfen lr5nl/2n3SB1/3gp2p1/8p/PNP1kpPP1/6p1P/2g+p5/3P1G3/L1K4RL w G2SN5Pbsp 3")
    xcontainer.current_turn = 0
    xcontainer.run()
    const sfen_serializer = new SfenSerializer(xcontainer)
    expect(sfen_serializer.to_s).toEqual("lr5nl/2n3SB1/3gp2p1/8p/PNP1kpPP1/6p1P/2g+p5/3P1G3/L1K4RL w G2SN5Pbsp 3")
  })
})
