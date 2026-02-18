import Color from "colorjs.io"

describe("Color", () => {
  it("HSLA → HSLA", () => {
    let color = new Color("hsla(10deg, 20%, 30%, 0.4)")
    expect(color.alpha).toEqual(0.4)
    expect(color.toString({format: "hsl"})).toEqual("hsl(10 20% 30% / 0.4)")
  })

  it("HSLA → RGBA", () => {
    let color = new Color("hsla(10deg, 20%, 30%, 0.4)")
    expect(color.toString({format: "rgb"})).toEqual("rgb(36% 26% 24% / 0.4)")
  })

  it("RGBA → HSLA", () => {
    let color = new Color("rgba(10,20,30,0.4)")
    expect(color.alpha).toEqual(0.4)
    expect(color.toString({format: "hsl"})).toEqual("hsl(210 50% 7.8431% / 0.4)")
  })

  it("HSLA → HEX", () => {
    let color = new Color("hsla(10deg, 20%, 30%, 0.4)")
    expect(color.toString({format: "hex"})).toEqual("#5c423d66")
  })

  it("不正な値は例外で判断する", () => {
    expect(() => { new Color("") }).toThrow()
  })

  it("HSL の場合に不正な値でもインスタンスができてしまうので16進変換後後に再度チェックする", () => {
    const color = new Color("hsl(n 10% 20%)")
    expect(color.toString({format: "hex"})).toEqual("#NaNNaNNaN")
    expect(() => { new Color("#NaNNaNNaN") }).toThrow()
  })
})
