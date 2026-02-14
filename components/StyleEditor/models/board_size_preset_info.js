import { ApplicationMemoryRecord } from "../../models/application_memory_record.js"

export class BoardSizePresetInfo extends ApplicationMemoryRecord {
  static get define() {
    return [
      {
        key: "初期値",
        func: context => {
          context.sp_board_view_x = 0
          context.sp_board_view_y = 0
          context.sp_board_view_w = 9
          context.sp_board_view_h = 9
        }
      },
      {
        key: "右上5x5",
        func: context => {
          context.sp_board_view_x = 4
          context.sp_board_view_y = 0
          context.sp_board_view_w = 5
          context.sp_board_view_h = 5
        }
      },
      {
        key: "右上6x6",
        func: context => {
          context.sp_board_view_x = 3
          context.sp_board_view_y = 0
          context.sp_board_view_w = 6
          context.sp_board_view_h = 6
        }
      },
      {
        key: "左上6x6",
        func: context => {
          context.sp_board_view_x = 0
          context.sp_board_view_y = 0
          context.sp_board_view_w = 6
          context.sp_board_view_h = 6
        }
      },
      {
        key: "中将棋風",
        func: context => {
          context.sp_board_view_x = -3
          context.sp_board_view_y = 0
          context.sp_board_view_w = 12
          context.sp_board_view_h = 12
        }
      },
      {
        key: "俯瞰",
        func: context => {
          context.sp_board_view_x = -5
          context.sp_board_view_y = -5
          context.sp_board_view_w = 19
          context.sp_board_view_h = 19
        }
      },
    ]
  }
}
