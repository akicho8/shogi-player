import Vue from "vue"

import vue_application from "./application.client.js"

Vue.mixin({
  mixins: [
    vue_application,
  ],
})
