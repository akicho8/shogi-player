// 両方で定義したいものはここに入れる

import Vue from "vue"

Vue.mixin({
  computed: {
    development_p() {
      return process.env.NODE_ENV === "development"
    },
  },
})
