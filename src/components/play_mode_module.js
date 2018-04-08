import _ from "lodash"

// import { Place } from "../place"
// import { Soldier } from "../soldier"
import { SfenParser } from "../sfen_parser"
import { Mediator } from "../mediator"
import { Location } from "../location"

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
    current_turn() {
      if (this.current_mode === "play_mode") {
        console.log("watch: current_turn")
        this.play_mode_mediator_update()
        // this.current_turn = this.real_turn
        // console.log(this.current_turn)
        // this.update_counter += 1
        // if (this.update_counter >= 1) {
        this.sound_call("piece_sound")
        // }
        // this.update_counter += 1
      }
    },
  },

  methods: {
    play_mode_setup_from(old_val) {
      console.log("play_mode_setup_from")

      // this.mediator_setup_on_create()
      // if (old_val === "view_mode") {
      //   this.init_location_key = this.mediator.current_location.key
      // }
      // const sfen_serializer = this.mediator.sfen_serializer
      // this.init_sfen = "position sfen " + sfen_serializer.to_board_sfen + " " + this.init_location_key[0] + " " + sfen_serializer.to_hold_pieces + " " + "1"
      // this.moves = []
      //
      // this.play_mode_mediator_update()

      // this.mediator_setup_on_create()

      if (this.mediator.data_source.init_sfen !== undefined) {
        // 棋譜の最初からの指し手をすべて保持
        this.init_sfen = this.mediator.data_source.init_sfen
        this.moves = this.mediator.data_source.moves
      } else {
        // 現時点の状態から始める (KIFの場合)
        if (old_val === "view_mode") {
          this.init_location_key = this.mediator.current_location.key
        }
        const sfen_serializer = this.mediator.sfen_serializer
        this.init_sfen = "position sfen " + sfen_serializer.to_board_sfen + " " + this.init_location.key[0] + " " + sfen_serializer.to_hold_pieces + " " + "1"
        this.moves = []
      }

      this.play_mode_mediator_update()

      // this.current_turn = 0

      // this.mediator = new Mediator()
      // this.mediator.data_source = this.data_source_by(this.init_sfen)
      // this.mediator.current_turn = 0
      // this.mediator.run()

      // this.current_turn = this.real_turn
      // this.current_turn = 0
      // this.current_turn_watch_disable = false
    },

    play_mode_mediator_update() {
      this.mediator = new Mediator()
      this.mediator.data_source = this.data_source_by(this.play_mode_current_sfen)
      this.mediator.current_turn = this.current_turn
      this.mediator.run()
    },

    moves_set(value) {
      this.moves = _.take(this.moves, this.real_turn) // 「待った」して指す場合を考慮してカレント以降の指し手を削除する
      this.moves.push(value)
      this.$emit("update:play_mode_long_sfen", this.play_mode_current_sfen)
      this.$emit("update:play_mode_move", value)
    },

    turn_next() {
      // this.sound_call("piece_sound")

      if (this.current_mode === "play_mode") {
        const data_source = new SfenParser()
        data_source.kifu_body = this.play_mode_current_sfen
        data_source.parse()

        this.mediator = new Mediator()
        this.mediator.data_source = data_source
        this.mediator.current_turn = -1
        this.mediator.run()
        this.current_turn = this.real_turn

        this.$emit("update:play_mode_short_sfen", this.mediator.to_position_sfen)
        // this.current_turn = -1
      }

      // console.log("turn_next")

      // this.view_mode_mediator_update()
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
  },
}
