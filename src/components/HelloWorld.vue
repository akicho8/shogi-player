<template>
<div class="shogi_player">
  {{message}}
  <table border='1'>
    <tr v-for="y in boardSize">
      <template v-for="x in boardSize">
        <td :class="cell_class(x -1, y - 1)">
          {{cell_view(x - 1, y - 1)}}
        </td>
      </template>
    </tr>
  </table>
  <button @click="play">次へ</button>
</div>
</template>

<script>

import { Sfen } from "../usi"

/* eslint-disable no-new */
export default {
  name: 'HelloWorld',

  data () {
    return {
      boardSize: 9,
      message: "ok",
      sfen: null,
      field: {},
      turn_index: 0,
    }
  },

  created () {
    // position startpos moves 2g2f 3c3d 2f2e 2b3c 7g7f 3a4b 3i4h 5c5d 5i6h 5d5e 3g3f 8b5b 4h3g 4b5c 3g4f 5c4d 4i5h 5a6b 6h7h 6b7b 6g6f 7b8b 5h6g 7a7b 8h7g 9c9d 7h8h 9d9e 9i9h 8c8d 8h9i 7b8c 7i8h 6a7b 6f6e 7c7d 6g6f 8a7c 7g8f 5b5a 2h7h 8d8e 8f5i 3c4b 6i7i 2a3c 7f7e 7d7e 6f7e 4b7e 7h7e P*7d 7e7f G*7e 7f7h 5e5f 5g5f 7e6e 5f5e P*5f 5i2f 1c1d P*6b 4a5b 6b6a+ 5a6a 5e5d 6e6f 7h6h 6f7f P*7g 7f7e 6h5h 7e6f 5h6h 6f6e B*3b 8e8f 8g8f 3d3e 3b2c+ 6c6d 3f3e 6a2a 2c3d 9a9b 2f4h 2a9a 2e2d 6e7e 3d5f P*8d 4h7e 7d7e 6h6d 5b6c 6d6h B*6e 6h6e 7c6e 5f6e R*5i N*6f 7b7c B*5b 6c6d 6e6d 7c6d P*6e B*4h 6e6d 4h6f+ G*7c
    
    this.sfen = new Sfen("position sfen lnsgkgsnl/1r5b1/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL w - 1 moves 7g7f")
    this.sfen.parse()
    this.field = this.sfen.field()
    this.play_index = 0
  },

  methods: {
    play () {
      this.play_index += 1
    },

    cell_view(x, y) {
      const cell = this.field[[x, y]]
      let str = ""
      if (cell) {
        str = cell.piece.name
      }
      return str
    },

    cell_class(x, y) {
      const cell = this.field[[x, y]]
      let klass = []
      if (cell) {
        klass.push(cell.location)
      }
      return klass
    }
  },
}
</script>

<style scoped lang="sass">
.shogi_player
  .white
    transform: rotate(180deg)
</style>
