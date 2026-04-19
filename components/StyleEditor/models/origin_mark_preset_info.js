import { ApplicationMemoryRecord } from "../../models/application_memory_record.js"

export class OriginMarkPresetInfo extends ApplicationMemoryRecord {
  static get define() {
    return [
      {
        key: "なし",
        body: `
[
]
`,
      },
      {
        key: "1箇所",
        body: `
[
  { gm_pos_key: "1_1", gm_user_name: "alice", gm_color_index: 0, },
]
`,
      },
      {
        key: "2箇所",
        body: `
[
  { gm_pos_key: "1_1", gm_user_name: "alice", gm_color_index: 0, },
  { gm_pos_key: "1_2", gm_user_name: "bob",   gm_color_index: 1, },
]
`,
      },
      {
        key: "重なり",
        body: `
[
  { gm_pos_key: "1_1", gm_user_name: "alice", gm_color_index: 0, },
  { gm_pos_key: "1_1", gm_user_name: "bob",   gm_color_index: 1, },
]
`,
      },
      {
        key: "色一覧",
        body: `
[
      { gm_pos_key: "3_1", gm_user_name: "0",  gm_color_index:  0, },
      { gm_pos_key: "2_1", gm_user_name: "1",  gm_color_index:  1, },
      { gm_pos_key: "1_1", gm_user_name: "2",  gm_color_index:  2, },
      { gm_pos_key: "3_2", gm_user_name: "3",  gm_color_index:  3, },
      { gm_pos_key: "2_2", gm_user_name: "4",  gm_color_index:  4, },
      { gm_pos_key: "1_2", gm_user_name: "5",  gm_color_index:  5, },
      { gm_pos_key: "3_3", gm_user_name: "6",  gm_color_index:  6, },
      { gm_pos_key: "2_3", gm_user_name: "7",  gm_color_index:  7, },
      { gm_pos_key: "1_3", gm_user_name: "8",  gm_color_index:  8, },
]
`,
      },
      {
        key: "盤上＋持駒",
        body: `
[
      { gm_pos_key: "1_1", gm_user_name: "alice", gm_color_index: 0, },
      { gm_pos_key: "1_1", gm_user_name: "bob",   gm_color_index: 1, },

      { gm_pos_key: "black_R", gm_user_name: "A", gm_color_index: 0, },
      { gm_pos_key: "black_B", gm_user_name: "B", gm_color_index: 1, },
      { gm_pos_key: "black_G", gm_user_name: "C", gm_color_index: 2, },
      { gm_pos_key: "black_S", gm_user_name: "D", gm_color_index: 3, },
      { gm_pos_key: "black_K", gm_user_name: "E", gm_color_index: 4, },
      { gm_pos_key: "black_N", gm_user_name: "F", gm_color_index: 5, },
      { gm_pos_key: "black_P", gm_user_name: "G", gm_color_index: 6, },
      { gm_pos_key: "black_L", gm_user_name: "L", gm_color_index: 7, },

      { gm_pos_key: "white_R", gm_user_name: "A", gm_color_index: 0, },
      { gm_pos_key: "white_B", gm_user_name: "B", gm_color_index: 1, },
      { gm_pos_key: "white_G", gm_user_name: "C", gm_color_index: 2, },
      { gm_pos_key: "white_S", gm_user_name: "D", gm_color_index: 3, },
      { gm_pos_key: "white_K", gm_user_name: "E", gm_color_index: 4, },
      { gm_pos_key: "white_N", gm_user_name: "F", gm_color_index: 5, },
      { gm_pos_key: "white_P", gm_user_name: "G", gm_color_index: 6, },
      { gm_pos_key: "white_L", gm_user_name: "L", gm_color_index: 7, },
]
`,
      },
      {
        key: "文字数",
        body: `
[
      { gm_pos_key: "1_1", gm_user_name: "12345678901234567890", gm_color_index: 0, },
      { gm_pos_key: "1_1", gm_user_name: "１２３４５６７８９０１２３４５６７８９０", gm_color_index: 0, },
]
`,
      },
    ]
  }
}
