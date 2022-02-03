import Vue from "vue"

import vue_application from "./application.client.js"

// window.Howler と window.Howl を定義する
import { Howl, Howler } from "howler"

Vue.mixin({
  mixins: [
    vue_application,
  ],
})
