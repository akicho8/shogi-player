import { ApplicationMemoryRecord } from "./application_memory_record.js"
import { SfenParser } from "./sfen_parser.js"

export class SfenBookInfo extends ApplicationMemoryRecord {
  static get define() {
    return [
      // { key: "相全駒手番△",           sfen: "position sfen lnsgkgsnl/1r5b1/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL b - 1 moves 1g1f 1c1d 1f1e 1d1e 1i1e 1a1e P*1d 1e1g+ 1d1c+ 1g2g 1c2c 2g3g 2c3c 3g4g 3c4c 4g5g 4c5c 5g6g 5c6c 6g7g 6c7c 7g8g 7c8c 8g9g 8c9c 9g8h 9c8b 8h9i 8b9a 9i8i 9a8a 8i7i 8a7a 7i7h 7a6a 5a4b 5i4h 7h6i 6a5a 6i5i 5a4a 4b5b 4h5g 5i4i 4a3a 4i3i 3a2a 3i2i 2a2b 2i2h 2b3b 2h3h 3b4b 5b4b 5g4g 3h3i 4g3g 3i4i 3g3f 4b4c 3f3g 4i4h 3g4h 4c3b 4h3h 3b2a 3h2h 2a1a 2h1i 1a2a 1i2i 2a3a 2i3i 3a4a 3i4i 4a5a 4i5i 5a5b 5i5h 5b5a 5h5i 5a5b 5i5h 5b4b 5h6h 4b5a 6h5h 5a6a 5h4i 6a5a 4i5h 5a4a 5h6i 4a5a 6i6h 5a5b 6h6i 5b4b 6i5i 4b5a", },
      // { key: "反則確認用",             sfen: "position sfen 7k1/5Gb2/7SL/8K/6s1P/9/9/9/8L b GNP 1", },
      // { key: "最初から王手",           sfen: "position sfen 7k1/5Gb2/8L/8K/6s1P/9/9/9/8L b GNP 1", },
      // { key: "連続王手の千日手確認用", sfen: "position sfen 9/9/8l/8k/6KR1/8p/9/9/9 b - 1", },
      // { key: "頭金で一手詰確認用",     sfen: "position sfen 4k4/9/4G4/9/9/9/9/9/9 b GP 1", },
      // { key: "頭歩で王手確認用",       sfen: "position sfen 4k4/9/9/9/9/9/9/9/9 b P 1", },
      { key: "盤上は玉のみで他持駒",     sfen: "position sfen 4k4/9/9/9/9/9/9/9/4K4 b RB2G2S2N2L9Prb2g2s2n2l9p 1", },
      { key: "すべて持駒",               sfen: "position sfen 9/9/9/9/9/9/9/9/9 b KRB2G2S2N2L9Pkrb2g2s2n2l9p 1", },
      { key: "▲飛2△角2",               sfen: "position sfen lnsgkgsnl/9/ppppppppp/9/9/9/PPPPPPPPP/9/LNSGKGSNL b 2R2b 1", },
      { key: "▲飛2角2△",               sfen: "position sfen lnsgkgsnl/9/ppppppppp/9/9/9/PPPPPPPPP/9/LNSGKGSNL b 2R2B 1", },
      { key: "適当な局面",               sfen: "position sfen lr5nl/2n3SB1/3gp2p1/8p/PNP1kpPP1/6p1P/2g+p5/3P1G3/L1K4RL w G2SN5Pbsp 3", },
      { key: "最速角交換",               sfen: "position sfen lnsgkgsnl/1r5b1/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL b - 1 moves 7g7f 3c3d 8h2b+ 3a2b", }, // 初手=1手目 からの角交換
      { key: "最速角交換から相筋違い角", sfen: "position sfen lnsgkg1nl/1r5s1/pppppp1pp/6p2/9/2P6/PP1PPPPPP/7R1/LNSGKGSNL b Bb 5 moves B*4e B*6e", },         // 初手=5手目 からの相筋違い角
      { key: "駒表示確認用",             sfen: "position sfen l+n1g1g1n+l/1ks2r1+r1/1pppp1bpp/p2+b+sp+p2/9/P1P1+SP1PP/1+P+BPP1P2/1BK1GR1+R1/+L+NSG3NL b R2B3G4S5N11L99Pr2b3g4s5n11l99p 1", },
      { key: "最後の審判",               sfen: "position sfen 1+P1pS2+PR/2n2S1lg/1l3p1p1/1G2n1pS1/N1p2k3/3S2l2/4K1lgP/3P1+p2p/4Pg1PN b BPrb4p 1 moves B*5f 4e4d 4b3c 4d5c 5a4b 5c5b 5f7d B*6c 7d6c+ 5b6c B*8e 6c6b 4b5a 6b5c 3c4b 5c4d P*4e 4d4e 8e6g P*5f 6g5f 4e4d 4b3c 4d5c 5a4b 5c5b 5f7d B*6c 7d6c+ 5b6c B*8e 6c6b 4b5a 6b5c 3c4b 5c4d P*4e 4d4e 8e6g P*5f 6g5f 4e4d 4b3c 4d5c 5a4b 5c5b 5f7d B*6c 7d6c+ 5b6c B*8e 6c6b 4b5a 6b5c 3c4b 5c4d P*4e 4d4e 8e6g 4e4d 2d3c 4d3e 1i2g 3e2f G*1f 2f2g 6g4i 4h4i G*2h", },
    ]
  }

  get sfen_parsed() {
    return SfenParser.parse(this.sfen)
  }
}
