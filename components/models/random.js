export const Random = {
  rand(n = 1.0) {
    return Math.random() * n
  },

  range(a, b) {
    return this.rand(b - a) + a
  },

  int_range_include(a, b) {
    return this.rand(b - a + 1) + a
  },
}
