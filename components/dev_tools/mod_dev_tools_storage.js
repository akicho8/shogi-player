const LOCAL_STORAGE_VARIABLE_NAME = "__sp_dev_tools__"

import { Pstore } from "../models/pstore.js"

export const mod_dev_tools_storage = {
  beforeMount() {
    const hash = Pstore.get(LOCAL_STORAGE_VARIABLE_NAME)
    if (hash) {
      if (true) {
        this.DevToolsVariableInfo.values.forEach(e => {
          const value = hash[e.imm_var]
          if (value) {
            this.$data[e.mut_var] = value
          }
        })
      }
    }
  },
  watch: {
    ls_store_hash() {
      Pstore.set(LOCAL_STORAGE_VARIABLE_NAME, this.ls_store_hash)
    },
  },
  methods: {
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
