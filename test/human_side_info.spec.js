import { HumanSideInfo } from '@/components/models/human_side_info.js'

describe('HumanSideInfo', () => {
  it('locations', () => {
    expect(HumanSideInfo.fetch("both").locations.map((e) => e.key)).toEqual(["black", "white"])
  })
})
