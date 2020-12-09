import Vue from "vue"

import vue_application from "./application.client.js"
import vue_storage     from "./vue_storage.js"
import vue_clipboard   from "./vue_clipboard.js"
import vue_sound       from "./vue_sound.js"
import vue_talk        from "./vue_talk.js"

import vue_support_nuxt_side from "./vue_support_nuxt_side.js"

Vue.mixin({
  mixins: [
    vue_application,
    // vue_support,
    // vue_time,
    vue_storage,
    vue_clipboard,
    vue_sound,

    vue_talk,
    vue_support_nuxt_side,
  ],
})
