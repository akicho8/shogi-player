const LS_KEY = "__sp_dev_tools__"

import { MyLocalStorage } from "../models/my_local_storage.js"

export const mod_dev_tools_storage = {
  beforeMount() {
    const hash = MyLocalStorage.get(LS_KEY)
    if (hash) {
      const value = hash["sp_dev_tools_layout"]
      if (value) {
        this.new_dev_tools_layout = value
      }
    }
  },
  watch: {
    ls_store_hash() {
      MyLocalStorage.set(LS_KEY, this.ls_store_hash)
    },
  },
  methods: {
    dev_tools_reset_handle() {
      this.new_dev_tools_layout = this.$options.props["sp_dev_tools_layout"]["default"]
      MyLocalStorage.remove(LS_KEY)
    },
  },
  computed: {
    MyLocalStorage() { return MyLocalStorage },
    ls_store_hash() {
      return {
        sp_dev_tools_layout: this.new_dev_tools_layout,
      }
    },
  },
}
