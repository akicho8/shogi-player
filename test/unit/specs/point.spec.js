import { Point } from '@/point'

describe('Point', () => {
  it('SFENの座標を受け取る', () => {
    const point = new Point("2c")
    expect(point.key).toEqual("7,2")
  })
})
