import Vue from "vue"
import ShogiPlayer from "@/components/ShogiPlayer"

describe("ShogiPlayer", () => {
  it("should render correct contents", () => {
    const Constructor = Vue.extend(ShogiPlayer)
    const vm = new Constructor({propsData: {kifu_body: "position startpos moves 7g7f"}}).$mount()
    expect(vm.kifu_body).toEqual("position startpos moves 7g7f")
  })
})
