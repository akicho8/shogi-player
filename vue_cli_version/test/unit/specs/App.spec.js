import Vue from 'vue'
import App from '@/App'

describe('App', () => {
  it('基本', () => {
    const Constructor = Vue.extend(App)
    const vm = new Constructor().$mount()
    vm.kifu_body = "position startpos"
    vm.$forceUpdate()
  })
})
