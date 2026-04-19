import { GeneralMarkCollection } from "../general_mark_collection.js"
import { GX } from "../../models/gx"

export const mod_think_mark = {
  props: {
    // 思考印の初期配列を指定する
    sp_think_mark_collection: { type: Array, default: () => [], },
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
  computed: {
    mut_think_mark_collection_hash() { return this.mut_think_mark_collection.hash_table }, // メモ化する
  },
}
