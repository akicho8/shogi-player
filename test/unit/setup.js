import Vue from 'vue'

Vue.config.productionTip = false

jest.mock("../../src/assets/piece_sound.wav", () => "")
