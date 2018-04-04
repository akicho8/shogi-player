import _ from "lodash"

// import { Place } from "../place"
// import { Soldier } from "../soldier"
// import { SfenParser } from "../sfen_parser"
// import { Mediator } from "../mediator"
// import { Location } from "../location"

export default {
  /* eslint-disable */
  props: {
  },
  /* eslint-enable */

  data() {
    return {
      moves: [],                  // play_mode 時の棋譜
      init_sfen: null,            // play_mode に入ったときの最初の状態
      init_location_key: "black", // play_mode に入ったときの最初の手番
    }
  },

  created() {
  },

  mounted() {
  },

  watch: {
  },

  methods: {
    moves_set(value) {
      this.moves = _.take(this.moves, this.current_turn)
      this.moves.push(value)
      this.$emit("update:update_position1", this.play_mode_current_sfen)
      this.$emit("update:update_position3", value)
        this.$emit("update:update_position2", this.mediator.to_position_sfen)
    },
  },

  computed: {
  },
}
