import { GeneralMarkList } from "../mod_general_mark/general_mark_list.js"
import { GX } from "../models/gx"

export const mod_think_mark = {
  props: {
    // 思考印の初期配列を指定する
    sp_think_mark_list: { type: Array, default: () => [], },
  },
  data() {
    return {
      mut_think_mark_list: GeneralMarkList.create(this.sp_think_mark_list),
    }
  },
  watch: {
    // 次の方法であれば単純にコンポーネント引数の更新を内部に反映するだけになり、一方通行なので無限ループは絶対に起きない
    sp_think_mark_list(v) { this.mut_think_mark_list.reset(v) }, // 外 -> 中
  },
  computed: {
    // メモ化する
    mut_think_mark_list_hash() { return this.mut_think_mark_list.hash_table },
  },
}
