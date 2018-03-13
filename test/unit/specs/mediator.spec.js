import { Mediator } from "@/mediator.js"
import { SfenParser } from "@/sfen_parser.js"

describe("Mediator", () => {
  it("基本", () => {
    const data_source = new SfenParser()
    data_source.kifu_body = "position startpos moves 7g7f 8c8d 2g2f 4a3b 6i7h 8d8e 8h7g 3c3d 7i6h 2b7g+ 6h7g 3a2b 3i3h 7a6b 3g3f 2b3c 4g4f 6c6d 5i6h 6b6c 2i3g 5a4b 3h4g 7c7d 4i4h 8a7c 2h2i 8b8a 6g6f 6a6b 4g5f 9c9d 9g9f 1c1d 1g1f 6c5d 6h7i 5d6c 7i8h 6c5d 2f2e 5d6c 5f6g 6c5d 5g5f 4c4d 2i5i 4b3a 5f5e 5d4c 6g5f 3a2b 5i6i 2b3a 6i2i 3a2b 4f4e 4d4e 5f4e 8e8f 8g8f P*8e 8f8e 9d9e 9f9e 7d7e 7f7e 6d6e B*7f 6b5b 7g8f 6e6f 8i7g P*4d 4e5f 3d3e 3f3e 7c8e 7g8e P*3f 3g4e 4d4e P*6d N*7b 6d6c+ 5b6c 7f4c+ 3b4c S*5b B*7f 7h7g P*8g 7g8g B*6g 5f6g 7f8g+ 8h8g 6f6g+ B*8i 6g6f 5b4c+ G*7f 8g8h 7f8f 8h7i 8f7g P*6h S*6g 8i6g 6f6g 4c3c 2b3c S*3d 3c4d B*2b S*3c 3d3c 4d5e 3c3b 5e6d N*7f 7g7f 6h6g B*4f S*5g N*5e S*5f 8a8e 5g4f S*7h 7i7h 5e6g+ 5f6g 8e8g+ 7h7i 7f6g 2b5e+ 6d7e G*6e 7e8e N*7g 8e7f 6e7e 7f7e 5e6e 7e8d 6e8g S*6h 7i8i 6h7g+ R*8a N*8c P*8e 8d7c P*7d"
    data_source.parse()

    const mediator = new Mediator()
    mediator.data_source = data_source
    mediator.current_turn = 121
    mediator.run()
  })
})
