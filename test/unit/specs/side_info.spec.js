import { Location } from '@/side_info.js'

describe('SideInfo', () => {
  it('locations', () => {
    expect(Location.fetch("black").locations.map((e) => e.key)).toEqual(["black", "white"])
  })
})
