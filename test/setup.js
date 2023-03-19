import Vue from 'vue'
import Buefy from 'buefy'

Vue.use(Buefy)
Vue.config.productionTip = false

global.window = Object.create({})
// https://stackoverflow.com/questions/68679993/referenceerror-resizeobserver-is-not-defined
window.ResizeObserver = window.ResizeObserver || jest.fn().mockImplementation(() => ({
  disconnect: jest.fn(),
  observe: jest.fn(),
  unobserve: jest.fn(),
}))
