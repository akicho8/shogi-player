import Vue from "vue"
import HelloPlayer from "@/components/HelloPlayer"

describe("HelloPlayer", () => {
  it("should render correct contents", () => {
    const Constructor = Vue.extend(HelloPlayer)
    const vm = new Constructor({propsData: {kifu_body: "position startpos moves 7g7f"}}).$mount()
    expect(vm.kifu_body).toEqual("position startpos moves 7g7f")
  })
})
