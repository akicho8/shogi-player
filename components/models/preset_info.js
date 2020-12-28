import MemoryRecord from "js-memory-record"
// import { Location } from "../location"

export class PresetInfo extends MemoryRecord {
  static get define() {
    return [
      { key: "詰将棋",                  sfen: "position sfen 4k4/9/9/9/9/9/9/9/9 b 2r2b4g4s4n4l18p 1",                                       first_location_key: "black", piece_box: [["K", 1]]},
      { key: "詰将棋 - 美濃",           sfen: "position sfen ln1g5/1ks6/1ppp5/p8/9/9/9/9/9 b BGSNL2rb2g2s2n2l14p 1",                         first_location_key: "black", piece_box: [["K", 1]]},
      { key: "詰将棋 - 矢倉",           sfen: "position sfen 7nl/6gk1/5gspp/5pp2/9/9/9/9/9 b BGSNL2rbg2s2n2l14p 1",                          first_location_key: "black", piece_box: [["K", 1]]},
      { key: "戦型 右四間 vs 四間飛車", sfen: "position sfen ln1g1g1nl/1ks2r3/1pppp1bpp/p3spp2/9/P1P1SP1PP/1P1PP1P2/1BK1GR3/LNSG3NL b - 25", first_location_key: "black", piece_box: []},
      { key: "全部駒箱",                sfen: "position sfen 9/9/9/9/9/9/9/9/9 b - 1",                                                       first_location_key: "black", piece_box: [["B", 2], ["R", 2], ["L", 4], ["N", 4], ["S", 4], ["G", 4], ["P", 18], ["K", 2]]},
      { key: "平手",                    sfen: "position sfen lnsgkgsnl/1r5b1/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL b - 1",               first_location_key: "black", piece_box: []},
      { key: "香落ち",                  sfen: "position sfen lnsgkgsn1/1r5b1/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL w - 1",               first_location_key: "white", piece_box: [["L", 1]]},
      { key: "右香落ち",                sfen: "position sfen 1nsgkgsnl/1r5b1/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL w - 1",               first_location_key: "white", piece_box: [["L", 1]]},
      { key: "角落ち",                  sfen: "position sfen lnsgkgsnl/1r7/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL w - 1",                 first_location_key: "white", piece_box: [["B", 1]]},
      { key: "飛車落ち",                sfen: "position sfen lnsgkgsnl/7b1/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL w - 1",                 first_location_key: "white", piece_box: [["R", 1]]},
      { key: "飛香落ち",                sfen: "position sfen lnsgkgsn1/7b1/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL w - 1",                 first_location_key: "white", piece_box: [["R", 1], ["L", 1]]},
      { key: "二枚落ち",                sfen: "position sfen lnsgkgsnl/9/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL w - 1",                   first_location_key: "white", piece_box: [["B", 1], ["R", 1]]},
      { key: "三枚落ち",                sfen: "position sfen lnsgkgsn1/9/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL w - 1",                   first_location_key: "white", piece_box: [["B", 1], ["R", 1], ["L", 1]]},
      { key: "四枚落ち",                sfen: "position sfen 1nsgkgsn1/9/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL w - 1",                   first_location_key: "white", piece_box: [["B", 1], ["R", 1], ["L", 2]]},
      { key: "六枚落ち",                sfen: "position sfen 2sgkgs2/9/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL w - 1",                     first_location_key: "white", piece_box: [["B", 1], ["R", 1], ["L", 2], ["N", 2]]},
      { key: "八枚落ち",                sfen: "position sfen 3gkg3/9/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL w - 1",                       first_location_key: "white", piece_box: [["B", 1], ["R", 1], ["L", 2], ["N", 2], ["S", 2]]},
      { key: "十枚落ち",                sfen: "position sfen 4k4/9/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL w - 1",                         first_location_key: "white", piece_box: [["B", 1], ["R", 1], ["L", 2], ["N", 2], ["S", 2], ["G", 2]]},
      { key: "十九枚落ち",              sfen: "position sfen 4k4/9/9/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL w - 1",                                 first_location_key: "white", piece_box: [["B", 1], ["R", 1], ["L", 2], ["N", 2], ["S", 2], ["G", 2], ["P", 9]]},
      { key: "二十枚落ち",              sfen: "position sfen 9/9/9/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL w - 1",                                   first_location_key: "white", piece_box: [["B", 1], ["R", 1], ["L", 2], ["N", 2], ["S", 2], ["G", 2], ["P", 9], ["K", 1]]},

    ]
  }
}

if (process.argv[1] === __filename) {
  console.log(PresetInfo.fetch("平手"))
  console.log(PresetInfo.fetch("香落ち").first_location_key)
}
