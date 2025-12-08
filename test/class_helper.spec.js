import { ClassHelper } from "@/components/models/class_helper.js"

let my_global_var = null

class MyClass1 {
  static static_method() { return "(static_method)" }
  static get get_static_method() { return my_global_var }
  imethod() { return "(imethod)" }
  get get_imethod() { return my_global_var }
  get get_foo() { return this.constructor.foo } // 普通にやるとここの constructor は MyClass2 のままになってしまう
}

class MyClass2 {
  static get foo() { return "MyClass2.foo" }
}
ClassHelper.class_include(MyClass2, MyClass1)

class MyClass3 {}
ClassHelper.class_include(MyClass3, MyClass1, {class_methods: true})

describe("ClassHelper", () => {
  it("インスタンスメソッドのみの場合", () => {
    expect(MyClass2.name).toEqual("MyClass2")
    expect((new MyClass2).imethod()).toEqual("(imethod)")
    my_global_var = "initial"
    expect((new MyClass2).get_imethod).toEqual("initial")
    my_global_var = "changed"
    expect((new MyClass2).get_imethod).toEqual("changed")
  })
  it("this.constructor が相手の class になっていること", () => {
    expect((new MyClass2).constructor).toEqual(MyClass2)
    expect((new MyClass2).get_foo).toEqual("MyClass2.foo")
  })
  it("クラスメソッドを含める場合", () => {
    expect(MyClass3.name).toEqual("MyClass3")
    expect(MyClass3.static_method()).toEqual("(static_method)")
    my_global_var = "initial"
    expect(MyClass3.get_static_method).toEqual("initial")
    my_global_var = "changed"
    expect(MyClass3.get_static_method).toEqual("changed")
  })
})
