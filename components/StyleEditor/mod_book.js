import { KifuBookInfo } from "../models/kifu_book_info.js"
import { SfenBookInfo } from "../models/sfen_book_info.js"

export const mod_book = {
  methods: {
    kifu_book_change_handle() {
      if (this.kifu_book_info) {
        this.body_update(this.kifu_book_info.sp_body)
        this.sp_player_info.black.name = this.kifu_book_info.black
        this.sp_player_info.white.name = this.kifu_book_info.white
      }
    },

    sfen_book_change_handle() {
      if (this.sfen_book_info) {
        this.body_update(this.sfen_book_info.sfen)
      }
    },

    user_body_apply_handle() {
      this.sp_body = this.user_body
    },

    body_update(body) {
      this.user_body = body
      this.user_body_apply_handle()
    },
  },
  computed: {
    KifuBookInfo()   { return KifuBookInfo                              },
    kifu_book_info() { return KifuBookInfo.fetch_if(this.kifu_book_key) },

    SfenBookInfo()   { return SfenBookInfo                              },
    sfen_book_info() { return SfenBookInfo.fetch_if(this.sfen_book_key) },
  },
}
