import _ from "lodash"

import { Mediator } from "../mediator"
import { Location } from "../location"
import { SideInfo } from "../side_info"

export default {
  /* eslint-disable */
  props: {
    human_side_key: { type: String, default: "both", }, // 含まれる側だけ操作できるようにする
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
    play_mode_setup_from(old_val) {
      this.log("play_mode_setup_from")

      if (this.mediator.data_source.init_sfen !== undefined) {
        // 棋譜の最初からの指し手をすべて保持
        // view_mode -> play_mode
        if (old_val === "view_mode") {
          this.init_sfen = this.mediator.data_source.init_sfen
          this.moves = this.mediator.data_source.moves
        }
        // edit_mode -> play_mode
        if (old_val === "edit_mode") {
          this.init_sfen_build()
        }
      } else {
        // 現時点の状態から始める (KIFの場合)
        if (old_val === "view_mode") {
          this.init_location_key = this.mediator.current_location.key
        }
        this.init_sfen_build()
      }

      this.play_mode_mediator_seek_to(this.real_turn)
    },

    // 現在の状態を基点として play_mode に入る
    init_sfen_build() {
      const sfen_serializer = this.mediator.sfen_serializer
      this.init_sfen = "position sfen " + sfen_serializer.to_board_sfen + " " + this.init_location.key[0] + " " + sfen_serializer.to_hold_pieces + " " + "1"
      this.moves = []
    },

    play_mode_mediator_seek_to(turn) {
      this.mediator = new Mediator()
      this.mediator.data_source = this.data_source_by(this.play_mode_current_sfen)
      this.mediator.current_turn = turn
      this.mediator.run()
    },

    moves_set(value) {
      this.moves = _.take(this.moves, this.real_turn) // 「待った」して指す場合を考慮してカレント以降の指し手を削除する
      this.moves.push(value)
    },

    turn_next() {
      if (this.current_run_mode === "play_mode") {
        this.mediator = new Mediator()
        this.mediator.data_source = this.data_source_by(this.play_mode_current_sfen)
        this.mediator.current_turn = -1
        this.mediator.run()
        this.sound_call("piece_sound")

        this.$emit("update:play_mode_long_sfen", this.play_mode_current_sfen)
        this.$emit("update:play_mode_move", _.last(this.moves))
        this.$emit("update:play_mode_short_sfen", this.mediator.to_position_sfen)
      }
    },
  },

  computed: {
    play_mode_current_sfen() {
      if (this.init_sfen) {
        return this.init_sfen + " moves " + this.moves.join(" ")
      } else {
        return null
      }
    },

    init_location() {
      return Location.fetch(this.init_location_key)
    },

    human_locations() {
      return SideInfo.fetch(this.human_side_key).locations
    },
  },
}
