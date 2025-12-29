export class Vec2d {
  static create(...args) {
    return new this(...args)
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
}
