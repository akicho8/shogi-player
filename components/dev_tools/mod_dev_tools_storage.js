const LOCAL_STORAGE_VARIABLE_NAME = "__sp_dev_tools__"

import { MyLocalStorage } from "../models/my_local_storage.js"

export const mod_dev_tools_storage = {
  beforeMount() {
    const hash = MyLocalStorage.get(LOCAL_STORAGE_VARIABLE_NAME)
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
      console.log(this.ls_store_hash)
      MyLocalStorage.set(LOCAL_STORAGE_VARIABLE_NAME, this.ls_store_hash)
    },
  },
  methods: {
    dev_tools_reset_handle() {
      this.DevToolsVariableInfo.values.forEach(e => {
        this.$data[e.mut_var] = this.$options.props[e.imm_var]["default"]
      })
      MyLocalStorage.remove(LOCAL_STORAGE_VARIABLE_NAME)
    },
  },
  computed: {
    MyLocalStorage() { return MyLocalStorage },
    ls_store_hash() {
      return this.DevToolsVariableInfo.values.reduce((a, e) => ({...a, [e.imm_var]: this.$data[e.mut_var]}), {})
    },
  },
}
