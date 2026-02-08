export const mod_player_info = {
  props: {
    // 対局者名と時間など
    sp_player_info: {
      type: Object,
      default: null,
    },
  },
  methods: {
    player_info_at(location) {
      if (this.sp_player_info) {
        return this.sp_player_info[location.key]
      }
    },
  },
}
