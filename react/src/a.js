class C {
  constructor(foo) {
    this.foo = foo
  }

  get func1() {
    console.log(this.foo)
  }
}

c = new C(0)
c.foo += 1
c.func1()

class C2 extends C {
  func2() {
    return super.func2() + "b"
  }
}

c = new C2()
console.log(c.func2())          // => "ab"
