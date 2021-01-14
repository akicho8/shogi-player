import Vue from "vue"

import vue_application from "./application.client.js"
import vue_sound from "./vue_sound.js"

Vue.mixin({
  mixins: [
    vue_application,
    vue_sound,
  ],
})
