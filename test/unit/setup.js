import Vue from 'vue'
import Vuex from 'vuex'
import Buefy from 'buefy'

Vue.use(Vuex)
Vue.use(Buefy)

Vue.config.productionTip = false

jest.mock("../../src/assets/piece_sound.wav", () => "")
jest.mock("../../src/assets/flip_sound.wav", () => "")
