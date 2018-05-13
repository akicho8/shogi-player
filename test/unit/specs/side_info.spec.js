import { SideInfo } from '@/side_info.js'

describe('SideInfo', () => {
  it('locations', () => {
    expect(SideInfo.fetch("both").locations.map((e) => e.key)).toEqual(["black", "white"])
  })
})
