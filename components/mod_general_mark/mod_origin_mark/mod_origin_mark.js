import { GeneralMarkList } from "../general_mark_list.js"
import { GX } from "../../models/gx"
import { OriginMarkVariantInfo } from "./origin_mark_variant_info.js"

export const mod_origin_mark = {
  props: {
    sp_origin_mark_list: {
      type: Array,
      default: () => [],
    },
    sp_origin_mark_variant: {
      type: String,
      default: "omv_square_color",
      validator(value) { return OriginMarkVariantInfo.keys.includes(value) },
    },
  },
  data() {
    return {
      mut_origin_mark_list: GeneralMarkList.create(this.sp_origin_mark_list),
    }
  },
  watch: {
    sp_origin_mark_list(v) { this.mut_origin_mark_list.reset$(v) }, // 外 -> 中
  },
  methods: {
    origin_mark_jump_invoke_event(ev) {
      if (this.play_p && this.current_general_mark_pos_key) {
        this.event_call("ev_action_origin_mark_jump_invoke", this.current_general_mark_pos_key, ev)
      }
    },
    origin_mark_jump_cancel_event(ev) {
      if (this.play_p && this.current_general_mark_pos_key) {
        this.event_call("ev_action_origin_mark_jump_cancel", this.current_general_mark_pos_key, ev)
      }
    },
  },
  computed: {
    OriginMarkVariantInfo()    { return OriginMarkVariantInfo                                              },
    origin_mark_variant_info() { return OriginMarkVariantInfo.lookup_or_first(this.sp_origin_mark_variant) },

    mut_origin_mark_list_hash() { return this.mut_origin_mark_list.hash_table }, // メモ化するために仲介している
  },
}
