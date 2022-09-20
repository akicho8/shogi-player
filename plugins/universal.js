// 両方で定義したいものはここに入れる

import Vue from "vue"
// import vue_support from "./vue_support.js"

Vue.mixin({
  mixins: [
    // vue_support,
  ],
  computed: {
    development_p() {
      return process.env.NODE_ENV === "development"
    },
  },
})
