import { Location } from '@/location.js'

describe('Location', () => {
  it('fetch', () => {
    Location.fetch("black")
  })

  it('cycle_lookup', () => {
    expect(Location.cycle_lookup(-1).key).toEqual("white")
  })

  it('flip', () => {
    expect(Location.fetch("black").flip.key).toEqual("white")
  })
  
  it('any_name', () => {
    expect(Location.fetch("black").any_name(false)).toEqual("先手")
    expect(Location.fetch("black").any_name(true)).toEqual("下手")
  })
})
