const LOCAL_STORAGE_VARIABLE_NAME = "__sp_dev_tools__"

import { Pstore } from "../models/pstore.js"

export const mod_dev_tools_storage = {
  watch: {
    ls_store_hash() {
      Pstore.set(LOCAL_STORAGE_VARIABLE_NAME, this.ls_store_hash)
    },
  },
  methods: {
    dev_tools_restore() {
      const hash = Pstore.get(LOCAL_STORAGE_VARIABLE_NAME)
      if (hash) {
        this.DevToolsVariableInfo.values.forEach(e => {
          if (this.$props[e.imm_var] == null) {  // 明示的な指定がなくて
            const value = hash[e.imm_var]        // localStorage に
            if (value != null) {                 // 値があれば
              this.$data[e.mut_var] = value      // 復元する
            }
          }
        })
      }
    },
    dev_tools_reset_handle() {
      this.DevToolsVariableInfo.values.forEach(e => {
        this.$data[e.mut_var] = this.$options.props[e.imm_var]["default"]
      })
      Pstore.remove(LOCAL_STORAGE_VARIABLE_NAME)
    },
  },
  computed: {
    Pstore() { return Pstore },
    ls_store_hash() {
      return this.DevToolsVariableInfo.values.reduce((a, e) => ({...a, [e.imm_var]: this.$data[e.mut_var]}), {})
    },
  },
}
