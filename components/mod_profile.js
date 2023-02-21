export const mod_profile = {
  data() {
    return {
      _ShogiPlayerRenderCount: 0,
      _BoardBaseRenderCount: 0,
    }
  },
  beforeUpdate() {
    this.$data._ShogiPlayerRenderCount += 1
  },
}
