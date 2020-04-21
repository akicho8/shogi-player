import _ from "lodash"

import Mediator from "../mediator"
import Location from "../location"
import SideInfo from "../side_info"

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
    edit_mode_snapshot_sfen(v) {
      this.$emit("update:edit_mode_snapshot_sfen", v)
    },

    // 操作モード(または再生モード)で盤面が変化したとき(常に更新)
    mediator: {
      handler(v) {
        this.$emit("update:play_mode_snapshot_sfen", v.to_position_sfen)
      },
      deep: true,
    },
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
          this.init_sfen_set()
        }
      } else {
        // 現時点の状態から始める (KIFの場合)
        if (old_val === "view_mode") {
          this.init_location_key = this.mediator.current_location.key
        }
        this.init_sfen_set()
      }

      this.play_mode_mediator_seek_to(this.turn_offset)
    },

    // 現在の状態を基点として play_mode に入る
    init_sfen_set() {
      this.init_sfen = this.edit_mode_snapshot_sfen
      this.moves = []
    },

    play_mode_mediator_seek_to(turn) {
      this.mediator = new Mediator()
      this.mediator.data_source = this.data_source_by(this.play_mode_full_moves_sfen)
      this.mediator.current_turn = turn
      this.mediator.run()
    },

    // 「待った」して指す場合を考慮してカレント以降の指し手を削除してから追加する
    moves_set(value) {
      this.moves = [...this.moves_take_turn_offset, value]
    },

    turn_next() {
      if (this.current_run_mode === "play_mode") {
        this.mediator = new Mediator()
        this.mediator.data_source = this.data_source_by(this.play_mode_full_moves_sfen)
        this.mediator.current_turn = -1
        this.mediator.run()
        this.sound_call("piece_sound")

        this.$emit("update:play_mode_advanced_full_moves_sfen", this.play_mode_full_moves_sfen)
        this.$emit("update:play_mode_advanced_last_move", _.last(this.moves))
        this.$emit("update:play_mode_advanced_snapshot_sfen", this.mediator.to_position_sfen)

        // 操作モードで詰将棋を動かしていて間違えて1手すぐに戻したいとき「←」キーですぐに戻せるように(スライダーがあれば)フォーカスする
        if (this.$refs.turn_slider) {
          this.$refs.turn_slider.focus()
        }
      }
    },
  },

  computed: {
    play_mode_full_moves_sfen() {
      if (this.init_sfen) {
        return this.init_sfen + " moves " + this.moves.join(" ")
      }
    },

    init_location() {
      return Location.fetch(this.init_location_key)
    },

    human_locations() {
      return SideInfo.fetch(this.human_side_key).locations
    },

    // moves.take(turn_offset) を返す
    // 5手ある棋譜で3手目まで戻したときは3手分の指し手を返す
    moves_take_turn_offset() {
      return _.take(this.moves, this.turn_offset)
    },

    // 現在の状態を基点とした moves がない棋譜 (init_location が反映されていることが重要)
    edit_mode_snapshot_sfen() {
      if (this.mediator) {
        const serializer = this.mediator.sfen_serializer
        return [
          "position sfen",
          serializer.to_board_sfen,
          this.init_location.key[0],
          serializer.to_hold_pieces,
          1,
        ].join(" ")
      }
    },
  },
}
