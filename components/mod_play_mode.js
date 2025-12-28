import _ from "lodash"

import { Xcontainer } from "./models/xcontainer.js"
import { Location } from "./models/location.js"
import { HumanSideInfo } from "./models/human_side_info.js"
import { Beetleshine as GX } from "beetleshine"
import assert from "minimalistic-assert"

export const mod_play_mode = {
  props: {
    // 含まれる側だけ操作できるようにする
    sp_human_side: {
      type: String,
      default: "both",
      validator(value) { return HumanSideInfo.keys.includes(value) },
    },
  },

  data() {
    return {
      moves: [],                  // play 時の棋譜
      init_sfen: null,            // play に入ったときの最初の状態
      init_location_key: "black", // play に入ったときの最初の手番
    }
  },

  created() {
    // this.$watch("xcontainer", () => this.emit_update_edit_mode_short_sfen(), {deep: true})
    // this.$watch("init_location_key", () => this.emit_update_edit_mode_short_sfen(), {deep: true})

    this.$watch(() => [
      this.xcontainer,
      this.init_location_key,
      // this.xcontainer.hold_pieces,
    ], () => {
      this.emit_update_edit_mode_short_sfen()
      // this.event_call("ev_edit_mode_short_sfen_change", this.edit_mode_short_sfen())
    }, {deep: true})
  },

  mounted() {
  },

  watch: {
    // 不具合確認用
    edit_mode_short_sfen2(v) {
      this.event_call("ev_edit_mode_short_sfen2_change", v)
    },

    // もともと xcontainer を watch していたがそれだと to_short_sfen が変化しているかどうかにかかわらず呼ばれてしまっていた
    // to_short_sfen の変化を監視したいのだからそれを指定しないといけない
    "xcontainer.to_short_sfen": {
      handler(v) {
        this.event_call("ev_short_sfen_change", v)
      },
    },

    // 現在の手数を返す
    // update:sp_turn とは別にしてある
    turn_offset(v) {
      this.event_call("ev_turn_offset_change", v)
    },

    // 操作モードで盤面が変化したときの指し手の配列
    // ・[a, b, c] の指し手があってポインタが c のとき「←」でポインタを b にするとトリガーする
    // ・このとき [a, b] を返す
    moves_take_turn_offset(v) {
      this.event_call("ev_play_mode_moves_change", v)
    },

    // 現在のコメントを返す
    current_comments(v) {
      this.event_call("ev_comment_change", v)
    },
  },

  methods: {
    play_mode_setup_from(old_val) {
      this.log("play_mode_setup_from")

      if (this.xcontainer.data_source.init_sfen !== undefined) {
        // 棋譜の最初からの指し手をすべて保持
        // view -> play
        if (old_val === "view") {
          this.play_mode_setup()
        }
        // edit -> play
        if (old_val === "edit") {
          this.init_sfen_set()
        }
      } else {
        // 現時点の状態から始める (KIFの場合)
        if (old_val === "view") {
          this.init_location_key = this.xcontainer.current_location.key
        }
        this.init_sfen_set()
      }

      this.play_mode_xcontainer_seek_to(this.turn_offset)
    },

    // これを実行しないと正常に動かない
    play_mode_setup() {
      assert(this.xcontainer.data_source.init_sfen)
      this.init_sfen = this.xcontainer.data_source.init_sfen
      this.moves     = this.xcontainer.data_source.moves
    },

    // 現在の状態を基点として play に入る
    init_sfen_set() {
      this.init_sfen = this.edit_mode_short_sfen()
      this.moves = []
    },

    // FIXME: なんで再度実行している？
    play_mode_xcontainer_seek_to(turn) {
      this.xcontainer = new Xcontainer()
      this.xcontainer.data_source = this.data_source_by(this.play_mode_full_moves_sfen)
      this.xcontainer.current_turn = turn
      this.xcontainer.run()
      this.flip_if_white_run()
    },

    // 「待った」して指す場合を考慮してカレント以降の指し手を削除してから追加する
    moves_set() {
      this.moves = [...this.moves_take_turn_offset, this.last_move_info.to_sfen]
    },

    current_turn_commit() {
      if (!this.play_p) {
        return
      }

      this.benchmark_print("局面再構築", () => {
        // これも20msもかかるので実行したくないけど仕方ないのか？
        // 最後の1手だけを、data_source に追加できればいい気もするけど、しっかりしたテストがないとできない
        // とりあえず、これを実行すれば turn_offset は更新される
        this.xcontainer = new Xcontainer()
        this.xcontainer.data_source = this.data_source_by(this.play_mode_full_moves_sfen)
        this.xcontainer.current_turn = -1
        this.xcontainer.run()
      })

      const params = {
        sfen:            this.play_mode_full_moves_sfen, // 長い sfen
        turn:            this.turn_offset,               // turn を同時に更新するの重要
        last_move_info:  this.last_move_info,            // 最後に動かした駒の詳細
        illegal_hv_list: this.illegal_hv_list,           // 反則情報たち (複数ある場合もある) ※illegal_hv_list を last_move_info に入れると循環で ActionCable がぶっこわれる
      }

      if (this.sp_request_snapshot_hash) {
        params["snapshot_hash"] = this.snapshot_hash() // 履歴を含まない現在の局面(BOD相当のSFEN)
      }

      if (this.sp_request_op_king_check) {
        params["op_king_check"] = this.my_king_check()  // 指し終わってから調べているので、実際の処理は自分が王手されているかで判定する
      }

      params["checkmate_stat"] = this.checkmate_stat

      this.event_call("ev_play_mode_move", params)
      this.event_call("ev_play_mode_next_moves", this.moves)

      this.turn_slider_focus() // 操作モードで詰将棋を動かしていて間違えて1手すぐに戻したいとき「←」キーですぐに戻せるように(スライダーがあれば)フォーカスする
    },

    // 現在の状態を基点とした moves がない棋譜 (init_location が反映されていることが重要)
    edit_mode_short_sfen() {
      if (this.xcontainer) {
        const serializer = this.xcontainer.sfen_serializer
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
        this.event_call("ev_edit_mode_short_sfen_change", this.edit_mode_short_sfen())
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
    //    → this.xcontainer.sfen_serializer.to_board_sfen は変化する
    //    → edit_mode_short_sfen2 も変化する
    // 3. 駒台の玉を11に置いてvで反転(ここがおかしい)
    //    → this.xcontainer.sfen_serializer.to_board_sfen は変化する
    //    → edit_mode_short_sfen2 が変化しない
    //
    // 暫定策として xcontainer と init_location_key だけを監視する watch を入れてそのなかで edit_mode_short_sfen() を実行している
    //
    edit_mode_short_sfen2() {
      return this.edit_mode_short_sfen()
      // if (this.xcontainer) {
      //   const serializer = this.xcontainer.sfen_serializer
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
