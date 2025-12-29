export class Vec2d {
  static create(...args) {
    return new this(...args)
  }

  static one() {
    return this.create(1.0, 1.0)
  }

  constructor(x, y) {
    this.x = x
    this.y = y
    Object.freeze(this)
  }

  get to_a() {
    return [this.x, this.y]
  }

  get inspect() {
    return "(" + this.to_a.join(",") + ")"
  }

  scale(s) {
    return this.constructor.create(this.x * s, this.y * s)
  }

  add(other) {
    return this.constructor.create(this.x + other.x, this.y + other.y)
  }
}
