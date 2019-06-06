import AnyFuncInfo from "../any_func_info"

export default {
  /* eslint-disable */
  props: {
  },
  /* eslint-enable */

  data() {
    return {
      any_func_key: null, // 常に選択してないことにしたくて v-model にして設定して any_func_key 変更のタイミングで null に再設定したけど選択してないことにはできなかったのでこれ意味ない
    }
  },

  methods: {
    any_func_click_handle(any_func_info) {
      any_func_info.func(this)
    },
  },

  computed: {
    any_func_info_values() {
      return AnyFuncInfo.values
    },
  },
}
