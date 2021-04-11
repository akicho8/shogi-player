import { SfenParser } from '@/components/models/sfen_parser.js'
import { MoveHash } from '@/components/models/move_hash.js'
import { Place } from '@/components/models/place.js'
import _ from "lodash"

describe('MoveHash', () => {
  it('指し手1つの分解', () => {
    const attrs = MoveHash.parse("7i6h")
    expect(attrs["promoted_trigger"]).toEqual(false)
    expect(attrs["origin_place"]).toEqual(Place.fetch([2, 8]))
    expect(attrs["place"]).toEqual(Place.fetch([3, 7]))
  })

  it('指し手1つの左右反転', () => {
    const a = "S*2d"
    const b = "S*8d"
    const move_attrs = MoveHash.parse(a)
    expect(move_attrs.to_hflip_sfen).toEqual(b)
  })

  it('複数の指し手の左右反転', () => {
    const a = "7i6h+ S*2d"
    const b = "3i4h+ S*8d"
    expect(MoveHash.line_hflip(a)).toEqual(b)
  })
})
