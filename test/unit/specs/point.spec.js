import { Point } from '@/point.js'

describe('Point', () => {
  it('SFENの座標を受け取る', () => {
    const point = new Point("2c")
    expect(point.toString()).toEqual("7,2")
  })
})
