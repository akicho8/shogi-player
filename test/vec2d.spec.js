import { Vec2d } from "@/components/models/vec2d.js"

describe("Vec2d", () => {
  it("#to_a", () => {
    expect(Vec2d.create(5, 6).to_a).toEqual([5, 6])
  })

  it("#inspect", () => {
    expect(Vec2d.create(5, 6).inspect).toEqual("(5,6)")
  })
})
