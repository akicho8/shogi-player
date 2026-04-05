import { ThinkMarkList } from "./think_mark_list.js"
import { GX } from "../models/gx"

export const think_mark_core = {
  props: {
    // 思考印の初期配列を指定する
    sp_think_mark_list: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      mut_think_mark_list: ThinkMarkList.create(this.sp_think_mark_list),
    }
  },

  watch: {
    ////////////////////////////////////////////////////////////////////////////////
    //
    // ・以下の方法であれば一応双方向(:sp_think_mark_list.sync="sp_think_mark_list" 形式に)できる
    // ・しかし無限ループを回避するため新しい値と現在の値の比較が必要になる
    // ・絶対必要な機能でもない
    // ・なので使わないことにする
    //
    // sp_think_mark_list: {
    //   handler(new_list) {
    //     if (!_.isEqual(new_list, this.mut_think_mark_list.as_json)) {
    //       this.mut_think_mark_list = ThinkMarkList.create(new_list)
    //     }
    //   },
    //   deep: true, // 配列の中のオブジェクトの変更も監視する
    // },
    //
    // mut_think_mark_list: {
    //   handler(new_obj) {
    //     const pure_array = new_obj.as_json
    //     if (!_.isEqual(pure_array, this.sp_think_mark_list)) {
    //       this.event_call("update:sp_think_mark_list", pure_array)
    //     }
    //   },
    //   deep: true, // 配列の中のオブジェクトの変更は監視する
    // }
    ////////////////////////////////////////////////////////////////////////////////

    // 次の方法であれば単純にコンポーネント引数の更新を内部に反映するだけになる
    // つまり一方通行なので無限ループは絶対に起きない
    sp_think_mark_list(v) { this.mut_think_mark_list.reset(v) }, // 外 -> 中
    // なお、↓これを入れると無限ループする
    // mut_think_mark_list(v) { this.event_call("update:sp_think_mark_list", v.as_json)    }, // 中 -> 外
  },

  methods: {
    //////////////////////////////////////////////////////////////////////////////// 公開API

    // 指定の状態にする
    // api_mark_list_reset(list = []) {
    //   this.mut_think_mark_list = ThinkMarkList.create(list)
    // },

    // 指定の場所にマークをつける (または外す)
    // api_mark_list_toggle(mark_params) {
    //   this.mut_think_mark_list.toggle(mark_params)
    // },

    // マークをすべて消す
    // api_mark_list_clear() {
    //   this.mut_think_mark_list.clear()
    // },

    // マークの状態をjson化したのを返す
    // これは api_mark_list_reset の引数にできる
    // api_mark_list_as_json() {
    //   return this.mut_think_mark_list.as_json
    // },
  },
  computed: {
    mut_think_mark_list_hash() { return this.mut_think_mark_list.marks_hash },
  },
}
