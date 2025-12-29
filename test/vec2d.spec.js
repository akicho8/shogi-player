import { Vec2d } from "@/components/models/vec2d.js"

describe("Vec2d", () => {
  it("#to_a", () => {
    expect(Vec2d.create(5, 6).to_a).toEqual([5, 6])
  })

  it("#inspect", () => {
    expect(Vec2d.create(5, 6).inspect).toEqual("(5,6)")
  })

  it("#scale", () => {
    expect(Vec2d.create(5, 6).scale(2).inspect).toEqual("(10,12)")
  })

  it("#add", () => {
    expect(Vec2d.create(5, 6).add(Vec2d.create(1, 2)).inspect).toEqual("(6,8)")
  })
})
