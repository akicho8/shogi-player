import Vue from "vue"
import vue_application from "./application.client.js"

Vue.mixin({
  mixins: [
    vue_application,
  ],
})

// Howler Howl をグローバルに定義する
// 一箇所だけでロードしてシングルトンにするのが重要 (マジ重要)
// そうしないと Howler.unload() などが全体に効かない
// ShogiPlayer コンポーネントを外側から使って音を出したいときは外側のアプリで Howler を読み込んでおくこと
import "howler"
