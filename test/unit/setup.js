import Vue from 'vue'
import Buefy from 'buefy'

Vue.use(Buefy)

Vue.config.productionTip = false

jest.mock("../../src/assets/piece_sound.wav", () => "")
jest.mock("../../src/assets/flip_sound.wav", () => "")
