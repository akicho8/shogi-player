import Vue from "vue"
import Router from "vue-router"
import MainDocumentIndex from "@/components/MainDocument/MainDocumentIndex.vue"
import StyleEditor from "@/components/StyleEditor.vue"

Vue.use(Router)

export default new Router({
  mode: "history",
  routes: [
    { path: "/",            name: "MainDocumentIndex", component: MainDocumentIndex,  },
    { path: "/StyleEditor", name: "StyleEditor",       component: StyleEditor, },
  ],
})
