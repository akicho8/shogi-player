const PSTORE_VERSION = 1
const PSTORE_KEY     = "__sp_style_editor__"

import { Pstore } from "../models/pstore.js"

export const mod_storage = {
  beforeMount() {
    this.xstore_load()
  },
  methods: {
    // SAVE ボタン
    xstore_save_handle() {
      this.xstore_save()
      this.$buefy.toast.open({message: "SAVE OK", queue: false})
    },

    // LOAD ボタン
    xstore_load_handle() {
      this.xstore_load()
      this.$buefy.toast.open({message: "LOAD OK", queue: false})
    },

    // 保存
    xstore_save() {
      Pstore.set(PSTORE_KEY, {...this.xstore_attributes, PSTORE_VERSION: PSTORE_VERSION})
    },

    // 復元
    // 1. 同じ引数があればそっちを優先する ← 臭う
    // 2. そのあとでストレージにあれば復元する
    xstore_load() {
      const params  = this.$route.query || {}
      const storage = this.xstore_storage()
      this.SeVariableInfo.values.forEach(e => {
        const v = params[e.key] ?? storage[e.key]
        if (v != null) {
          this.$data[e.key] = v
        }
      })
    },

    // private

    xstore_storage() {
      const storage = Pstore.get(PSTORE_KEY) || {}
      if (storage.PSTORE_VERSION !== PSTORE_VERSION) {
        return {}
      }
      return storage
    },
  },
  computed: {
    xstore_attributes() {
      return this.SeVariableInfo.values.reduce((a, e) => ({...a, [e.key]: this.$data[e.key]}), {})
    },
  },
}
