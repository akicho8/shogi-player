import _ from "lodash"

import { Mediator } from "./models/mediator.js"
import { Location } from "./models/location.js"
import { HumanSideInfo } from "./models/human_side_info.js"
import { EffectInfo } from "./models/effect_info.js"

export const play_mode_module = {
  props: {
    sp_human_side: { type: String, default: "both", }, // 含まれる側だけ操作できるようにする
    play_mode_advanced_short_sfen_emit: { type: Boolean, default: false, },
  },

  data() {
    return {
      moves: [],                  // play_mode 時の棋譜
      init_sfen: null,            // play_mode に入ったときの最初の状態
      init_location_key: "black", // play_mode に入ったときの最初の手番
    }
  },

  created() {
    // this.$watch("mediator", () => this.emit_update_edit_mode_short_sfen(), {deep: true})
    // this.$watch("init_location_key", () => this.emit_update_edit_mode_short_sfen(), {deep: true})

    this.$watch(() => [
      this.mediator,
      this.init_location_key,
      // this.mediator.hold_pieces,
    ], () => {
      this.emit_update_edit_mode_short_sfen()
      // this.$emit("update:edit_mode_short_sfen", this.edit_mode_short_sfen())
    }, {deep: true})
  },

  mounted() {
  },

  watch: {
    // 不具合確認用
    edit_mode_short_sfen2(v) {
      this.$emit("update:edit_mode_short_sfen2", v)
    },

    // もともと mediator を watch していたがそれだと to_short_sfen が変化しているかどうかにかかわらず呼ばれてしまっていた
    // to_short_sfen の変化を監視したいのだからそれを指定しないといけない
    "mediator.to_short_sfen": {
      handler(v) {
        this.$emit("update:short_sfen", v)
      },
    },

    // 現在の手数を返す
    // update:sp_turn とは別にしてある
    turn_offset(v) {
      this.$emit("update:turn_offset", v)
    },

    // 操作モードで盤面が変化したときの指し手の配列
    // ・[a, b, c] の指し手があってポインタが c のとき「←」でポインタを b にするとトリガーする
    // ・このとき [a, b] を返す
    moves_take_turn_offset(v) {
      this.$emit("update:moves_take_turn_offset", v)
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
      this.init_sfen = this.edit_mode_short_sfen()
      this.moves = []
    },

    play_mode_mediator_seek_to(turn) {
      this.mediator = new Mediator()
      this.mediator.data_source = this.data_source_by(this.play_mode_full_moves_sfen)
      this.mediator.current_turn = turn
      this.mediator.run()
      this.flip_if_white_run()
    },

    // 「待った」して指す場合を考慮してカレント以降の指し手を削除してから追加する
    moves_set() {
      this.moves = [...this.moves_take_turn_offset, this.last_move_info.to_sfen]
    },

    turn_next() {
      if (this.play_p) {
        if (this.sp_play_effect_type) {
          if (this.$data._last_clicked_cell) {
            EffectInfo.fetch(this.sp_play_effect_type).run({from_el: this.$data._last_clicked_cell})
          }
        }

        // ↓FIXME: これも20msほどかかるので実行したくない
        this.mediator = new Mediator()
        this.mediator.data_source = this.data_source_by(this.play_mode_full_moves_sfen)
        this.mediator.current_turn = -1
        this.mediator.run()
        this.$nextTick(() => this.sound_play("piece_put")) // 音がずれるため少し待つ 20ms 待たない場合は nextTick 不要

        this.$emit("update:play_mode_advanced_full_moves_sfen", {
          sfen:           this.play_mode_full_moves_sfen, // sfen と
          turn:           this.turn_offset,               // turn を同時に更新するの重要
          last_move_info: this.last_move_info,
        })

        this.$emit("update:play_mode_advanced_moves", this.moves)

        // 遅いのでデフォルトではOFFにする。消してもいい
        if (this.play_mode_advanced_short_sfen_emit) {
          this.$emit("update:play_mode_advanced_short_sfen", this.mediator.to_short_sfen) // 14 ms
        }

        // 操作モードで詰将棋を動かしていて間違えて1手すぐに戻したいとき「←」キーですぐに戻せるように(スライダーがあれば)フォーカスする
        this.turn_slider_focus()
      }
    },

    // 現在の状態を基点とした moves がない棋譜 (init_location が反映されていることが重要)
    edit_mode_short_sfen() {
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

    emit_update_edit_mode_short_sfen() {
      if (this.edit_p) {
        this.$emit("update:edit_mode_short_sfen", this.edit_mode_short_sfen())
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
      return HumanSideInfo.fetch(this.sp_human_side).locations
    },

    // moves.take(turn_offset) を返す
    // ・3手ある棋譜で2手目まで戻したときは2手分の指し手を返す
    // ・たとえば [a, b, c] の指し手があって turn_offset を 2 にしたとき [a, b] を返す
    moves_take_turn_offset() {
      return _.take(this.moves, this.turn_offset)
    },

    // 現在の状態を基点とした moves がない棋譜 (init_location が反映されていることが重要)
    //
    // この方法はリアクティブにならない場合がある
    //
    // 不具合再現手順
    // 1. 編集モード→詰将棋
    // 2. 51の玉をvで反転(OK)
    //    → this.mediator.sfen_serializer.to_board_sfen は変化する
    //    → edit_mode_short_sfen2 も変化する
    // 3. 駒台の玉を11に置いてvで反転(ここがおかしい)
    //    → this.mediator.sfen_serializer.to_board_sfen は変化する
    //    → edit_mode_short_sfen2 が変化しない
    //
    // 暫定策として mediator と init_location_key だけを監視する watch を入れてそのなかで edit_mode_short_sfen() を実行している
    //
    edit_mode_short_sfen2() {
      return this.edit_mode_short_sfen()
      // if (this.mediator) {
      //   const serializer = this.mediator.sfen_serializer
      //   return [
      //     "position sfen",
      //     serializer.to_board_sfen,
      //     this.init_location.key[0],
      //     serializer.to_hold_pieces,
      //     1,
      //   ].join(" ")
      // }
    },
  },
}
