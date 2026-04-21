import { GeneralMarkCollection } from "../general_mark_collection.js"
import { GX } from "../../models/gx"
import { OriginMarkVariantInfo } from "./origin_mark_variant_info.js"

export const mod_origin_mark = {
  props: {
    sp_origin_mark_collection: {
      type: Array,
      default: () => [],
    },
    sp_origin_mark_variant: {
      type: String,
      default: "square",
      validator(value) { return OriginMarkVariantInfo.keys.includes(value) },
    },
  },
  data() {
    return {
      mut_origin_mark_collection: GeneralMarkCollection.create(this.sp_origin_mark_collection),
    }
  },
  watch: {
    sp_origin_mark_collection(v) { this.mut_origin_mark_collection.reset$(v) }, // 外 -> 中
  },
  methods: {
    origin_mark_jump_invoke_event(ev) {
      if (this.play_p && this.current_origin_mark_pos_key) {
        this.event_call("ev_action_origin_mark_jump_invoke", this.current_origin_mark_pos_key, ev)
      }
    },
    origin_mark_jump_cancel_event(ev) {
      if (this.play_p && this.current_origin_mark_pos_key) {
        this.event_call("ev_action_origin_mark_jump_cancel", this.current_origin_mark_pos_key, ev)
      }
    },
  },
  computed: {
    OriginMarkVariantInfo()    { return OriginMarkVariantInfo                                              },
    origin_mark_variant_info() { return OriginMarkVariantInfo.lookup_or_first(this.sp_origin_mark_variant) },

    mut_origin_mark_collection_hash() { return this.mut_origin_mark_collection.hash_table }, // メモ化するために仲介している
  },
}
