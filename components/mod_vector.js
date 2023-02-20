export const mod_vector = {
  methods: {
    vector_one() {
      return {
        x: 1.0,
        y: 1.0,
      }
    },

    vector_scale(vec, scale) {
      return {
        x: vec.x * scale,
        y: vec.y * scale,
      }
    },

    vector_add(vec, other) {
      return {
        x: vec.x + other.x,
        y: vec.y + other.y,
      }
    },
  },
}
