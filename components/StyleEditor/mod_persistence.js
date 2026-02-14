const PSTORE_KEY      = "__sp_style_editor__"
const PSTORE_VERSION  = 4
const PSTORE_AUTOLOAD = false

import { Pstore } from "../models/pstore.js"

export const mod_persistence = {
  beforeMount() {
    if (PSTORE_AUTOLOAD) {
      this.xstore_load()
    }
  },

  methods: {
    // SAVE
    xstore_save_handle() {
      const count = this.xstore_save()
      this.$buefy.toast.open({message: `${count}個の設定項目を保存しました`, queue: false})
    },

    // LOAD
    xstore_load_handle() {
      const count = this.xstore_load()
      this.$buefy.toast.open({message: `${count}個の設定項目を復元しました`, queue: false})
    },

    // 保存
    xstore_save() {
      Pstore.set(PSTORE_KEY, {...this.xstore_attributes, PSTORE_VERSION: PSTORE_VERSION})
      return Object.keys(this.xstore_attributes).length
    },

    // 復元
    // 「同じ引数があればそっちを優先する」とするのはバグの温床となる(というかなった)ため関与しないようにする
    xstore_load() {
      const storage = this.xstore_storage()
      let count = 0
      this.VariableInfo.values.forEach(e => {
        if (storage.hasOwnProperty(e.key)) {
          this[e.key] = storage[e.key]
          count += 1
        }
      })
      return count
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
      return this.VariableInfo.values.reduce((a, e) => ({...a, [e.key]: this[e.key]}), {})
    },

    xstore_autoload_link() {
      const url = new URL(window.location.href)
      url.searchParams.set("initial_action", "xstore_load")
      return url.toString()
    },
  },
}
