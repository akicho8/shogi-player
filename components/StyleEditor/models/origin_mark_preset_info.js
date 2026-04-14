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
  { general_mark_pos_key: "1_1", general_mark_group_name: "alice", general_mark_color_index: 0, },
]
`,
      },
      {
        key: "2箇所",
        body: `
[
  { general_mark_pos_key: "1_1", general_mark_group_name: "alice", general_mark_color_index: 0, },
  { general_mark_pos_key: "1_2", general_mark_group_name: "bob",   general_mark_color_index: 1, },
]
`,
      },
      {
        key: "重なり",
        body: `
[
  { general_mark_pos_key: "1_1", general_mark_group_name: "alice", general_mark_color_index: 0, },
  { general_mark_pos_key: "1_1", general_mark_group_name: "bob",   general_mark_color_index: 1, },
]
`,
      },
      {
        key: "色一覧",
        body: `
[
      { general_mark_pos_key: "3_1", general_mark_group_name: "0",  general_mark_color_index:  0, },
      { general_mark_pos_key: "2_1", general_mark_group_name: "1",  general_mark_color_index:  1, },
      { general_mark_pos_key: "1_1", general_mark_group_name: "2",  general_mark_color_index:  2, },
      { general_mark_pos_key: "3_2", general_mark_group_name: "3",  general_mark_color_index:  3, },
      { general_mark_pos_key: "2_2", general_mark_group_name: "4",  general_mark_color_index:  4, },
      { general_mark_pos_key: "1_2", general_mark_group_name: "5",  general_mark_color_index:  5, },
      { general_mark_pos_key: "3_3", general_mark_group_name: "6",  general_mark_color_index:  6, },
      { general_mark_pos_key: "2_3", general_mark_group_name: "7",  general_mark_color_index:  7, },
      { general_mark_pos_key: "1_3", general_mark_group_name: "8",  general_mark_color_index:  8, },
]
`,
      },
      {
        key: "盤上＋持駒",
        body: `
[
      { general_mark_pos_key: "1_1", general_mark_group_name: "alice", general_mark_color_index: 0, },
      { general_mark_pos_key: "1_1", general_mark_group_name: "bob",   general_mark_color_index: 1, },

      { general_mark_pos_key: "black_R", general_mark_group_name: "A", general_mark_color_index: 0, },
      { general_mark_pos_key: "black_B", general_mark_group_name: "B", general_mark_color_index: 1, },
      { general_mark_pos_key: "black_G", general_mark_group_name: "C", general_mark_color_index: 2, },
      { general_mark_pos_key: "black_S", general_mark_group_name: "D", general_mark_color_index: 3, },
      { general_mark_pos_key: "black_K", general_mark_group_name: "E", general_mark_color_index: 4, },
      { general_mark_pos_key: "black_N", general_mark_group_name: "F", general_mark_color_index: 5, },
      { general_mark_pos_key: "black_P", general_mark_group_name: "G", general_mark_color_index: 6, },
      { general_mark_pos_key: "black_L", general_mark_group_name: "L", general_mark_color_index: 7, },

      { general_mark_pos_key: "white_R", general_mark_group_name: "A", general_mark_color_index: 0, },
      { general_mark_pos_key: "white_B", general_mark_group_name: "B", general_mark_color_index: 1, },
      { general_mark_pos_key: "white_G", general_mark_group_name: "C", general_mark_color_index: 2, },
      { general_mark_pos_key: "white_S", general_mark_group_name: "D", general_mark_color_index: 3, },
      { general_mark_pos_key: "white_K", general_mark_group_name: "E", general_mark_color_index: 4, },
      { general_mark_pos_key: "white_N", general_mark_group_name: "F", general_mark_color_index: 5, },
      { general_mark_pos_key: "white_P", general_mark_group_name: "G", general_mark_color_index: 6, },
      { general_mark_pos_key: "white_L", general_mark_group_name: "L", general_mark_color_index: 7, },
]
`,
      },
      {
        key: "文字数",
        body: `
[
      { general_mark_pos_key: "1_1", general_mark_group_name: "12345678901234567890", general_mark_color_index: 0, },
      { general_mark_pos_key: "1_1", general_mark_group_name: "１２３４５６７８９０１２３４５６７８９０", general_mark_color_index: 0, },
]
`,
      },
    ]
  }
}
