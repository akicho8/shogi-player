import { GX } from "../../models/gx"
import { GeneralMarkCollection } from "../general_mark_collection.js"
import { ThinkMarkVariantInfo } from "./think_mark_variant_info.js"

export const mod_think_mark = {
  props: {
    sp_think_mark_collection: {
      type: Array,
      default: () => [],
    },
    sp_think_mark_variant: {
      type: String,
      default: "tmv_circle_color",
      validator(value) { return ThinkMarkVariantInfo.keys.includes(value) },
    },
  },
  data() {
    return {
      mut_think_mark_collection: GeneralMarkCollection.create(this.sp_think_mark_collection),
    }
  },
  watch: {
    // 次の方法であれば単純にコンポーネント引数の更新を内部に反映するだけになり、一方通行なので無限ループは絶対に起きない
    sp_think_mark_collection(v) { this.mut_think_mark_collection.reset$(v) }, // 外 -> 中
  },

  methods: {
    think_mark_click_event(think_mark_pos_key, ev) {
      if (this.play_p) {
        this.event_call("ev_think_mark_click", think_mark_pos_key, ev)
      }
    },
  },

  computed: {
    ThinkMarkVariantInfo()    { return ThinkMarkVariantInfo                                              },
    think_mark_variant_info() { return ThinkMarkVariantInfo.lookup_or_first(this.sp_think_mark_variant) },

    mut_think_mark_collection_hash() { return this.mut_think_mark_collection.hash_table }, // メモ化する
  },
}
