<template>
<div>
  {{message}}
  <table border='1'>
    <tr v-for='row in rows'>
      <td v-for='value in row'>
        {{value}}
      </td>
    </tr>
  </table>
  <button @click="play">次へ</button>
</div>
</template>

<script>
import { C } from "../foo"

var a = new C(1)

/* eslint-disable no-new */
export default {
  name: 'HelloWorld',
  data () {
    return {
      message: "ok",
      rows: [],
      turn_index: 0,
      moves: [
        // {"sfen":"lnsgkgsnl/1r5b1/ppppppppp/9/9/7P1/PPPPPPP1P/1B5R1/LNSGKGSNL w - 2","move":"２六歩(27)","hash":"c057f3d656801725865eff21380df70af7c3dafb","csa":"+2726FU","comments":[]},
        // {"sfen":"lnsgkgsnl/1r5b1/p1ppppppp/1p7/9/7P1/PPPPPPP1P/1B5R1/LNSGKGSNL b - 3","move":"８四歩(83)","hash":"32941a1c91f364d968d8fa3ade25538cb93e08a7","csa":"-8384FU","comments":[]},
        // {"sfen":"lnsgkgsnl/1r5b1/p1ppppppp/1p7/9/2P4P1/PP1PPPP1P/1B5R1/LNSGKGSNL w - 4","move":"７六歩(77)","hash":"cc1a9d9465487ee1d970e725eee8b1f9ca15e2fb","csa":"+7776FU","comments":[]},
      ]
    }
  },
  created () {
    let boardSize = 9
    for (let x = 0; x < boardSize; x++) {
      this.rows.push(Array(boardSize))
    }
  },
  methods: {
    play () {
      console.log('play')
    }
  }
}
</script>

<style scoped>
</style>
