export const app_profile = {
  data() {
    return {
      _ShogiPlayerRenderCount: 0,
      _MainBoardRenderCount: 0,
    }
  },
  beforeUpdate() {
    this.$data._ShogiPlayerRenderCount += 1
  },
}
