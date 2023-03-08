import { ApplicationMemoryRecord } from "./application_memory_record.js"

import KIF_27584 from "./kifu_book_info/27584.kif"
import KIF_37368 from "./kifu_book_info/37368.kif"
import KIF_16217 from "./kifu_book_info/16217.kif"
import KIF_27585 from "./kifu_book_info/27585.kif"
import KIF_27479 from "./kifu_book_info/27479.kif"
import KIF_27480 from "./kifu_book_info/27480.kif"
import KIF_27481 from "./kifu_book_info/27481.kif"
import KIF_27482 from "./kifu_book_info/27482.kif"
import KIF_16216 from "./kifu_book_info/16216.kif"
import KIF_15732 from "./kifu_book_info/15732.kif"
import KIF_39801 from "./kifu_book_info/39801.kif"
import KIF_27483 from "./kifu_book_info/27483.kif"
import KIF_27484 from "./kifu_book_info/27484.kif"
import KIF_08731 from "./kifu_book_info/08731.kif"
import KIF_27485 from "./kifu_book_info/27485.kif"
import KIF_27486 from "./kifu_book_info/27486.kif"
import KIF_27487 from "./kifu_book_info/27487.kif"
import KIF_27488 from "./kifu_book_info/27488.kif"
import KIF_16020 from "./kifu_book_info/16020.kif"
import KIF_27489 from "./kifu_book_info/27489.kif"
import KIF_27637 from "./kifu_book_info/27637.kif"
import KIF_27490 from "./kifu_book_info/27490.kif"
import KIF_15733 from "./kifu_book_info/15733.kif"

import SFEN_15733 from "./kifu_book_info/15733.sfen"
import KIF_BOD_LIKE_SAMPLE1 from "./kifu_book_info/BOD_LIKE_SAMPLE1.kif"
import illegal_check from "./kifu_book_info/illegal_check.kif"

export class KifuBookInfo extends ApplicationMemoryRecord {
  static get define() {
    return [
      {"name": "平手", "black": "先手", "white": "後手", "sp_body": "position startpos"},
      {"key": "KIF_27479", "kif_code": "27479", "generation": 1,    "name": "1709-10-10 宗銀印達57番指し1局", "black": "六代大橋宗銀", "white": "伊藤印達", "sp_body": KIF_27479},
      {"key": "KIF_27480", "kif_code": "27480", "generation": 2,    "name": "1709-10-11 宗銀印達57番指し2局", "black": "伊藤印達", "white": "六代大橋宗銀", "sp_body": KIF_27480},
      {"key": "KIF_27481", "kif_code": "27481", "generation": 3,    "name": "1709-10-18 宗銀印達57番指し3局", "black": "六代大橋宗銀", "white": "伊藤印達", "sp_body": KIF_27481},
      {"key": "KIF_27584", "kif_code": "27584", "generation": null, "name": "1709-10-22 御城将棋 将棋絶妙第6番", "black": "伊藤印達", "white": "三代大橋宗与", "sp_body": KIF_27584},
      {"key": "KIF_27482", "kif_code": "27482", "generation": 4,    "name": "1709-10-29 宗銀印達57番指し4局", "black": "伊藤印達", "white": "六代大橋宗銀", "sp_body": KIF_27482},
      {"key": "KIF_16216", "kif_code": "16216", "generation": 5,    "name": "1709-11-01 宗銀印達57番指し5局", "black": "六代大橋宗銀", "white": "伊藤印達", "sp_body": KIF_16216},
      {"key": "KIF_15732", "kif_code": "15732", "generation": 6,    "name": "1709-11-02 宗銀印達57番指し6局", "black": "伊藤印達", "white": "六代大橋宗銀", "sp_body": KIF_15732},
      {"key": "KIF_39801", "kif_code": "39801", "generation": 7,    "name": "1709-11-03 宗銀印達57番指し7局", "black": "六代大橋宗銀", "white": "伊藤印達", "sp_body": KIF_39801},
      {"key": "KIF_27483", "kif_code": "27483", "generation": 8,    "name": "1709-11-05 宗銀印達57番指し8局", "black": "伊藤印達", "white": "六代大橋宗銀", "sp_body": KIF_27483},
      {"key": "KIF_27484", "kif_code": "27484", "generation": 9,    "name": "1709-11-07 宗銀印達57番指し9局", "black": "六代大橋宗銀", "white": "伊藤印達", "sp_body": KIF_27484},
      {"key": "KIF_08731", "kif_code": "08731", "generation": 10,   "name": "1709-11-08 宗銀印達57番指し10局", "black": "伊藤印達", "white": "六代大橋宗銀", "sp_body": KIF_08731},
      {"key": "KIF_27485", "kif_code": "27485", "generation": 12,   "name": "1709-11-12 宗銀印達57番指し12局", "black": "伊藤印達", "white": "六代大橋宗銀", "sp_body": KIF_27485},
      {"key": "KIF_27486", "kif_code": "27486", "generation": 13,   "name": "1709-11-13 宗銀印達57番指し13局", "black": "六代大橋宗銀", "white": "伊藤印達", "sp_body": KIF_27486},
      {"key": "KIF_27487", "kif_code": "27487", "generation": 24,   "name": "1709-11-25 宗銀印達57番指し24局", "black": "六代大橋宗銀", "white": "伊藤印達", "sp_body": KIF_27487},
      {"key": "KIF_27488", "kif_code": "27488", "generation": 25,   "name": "1709-11-25 宗銀印達57番指し25局", "black": "六代大橋宗銀", "white": "伊藤印達", "sp_body": KIF_27488},
      {"key": "KIF_16020", "kif_code": "16020", "generation": 37,   "name": "1709-12-13 宗銀印達57番指し37局", "black": "六代大橋宗銀", "white": "伊藤印達", "sp_body": KIF_16020},
      {"key": "KIF_27489", "kif_code": "27489", "generation": 41,   "name": "1710-01-16 宗銀印達57番指し41局", "black": "六代大橋宗銀", "white": "伊藤印達", "sp_body": KIF_27489},
      {"key": "KIF_27637", "kif_code": "27637", "generation": 44,   "name": "1710-01-18 宗銀印達57番指し44局", "black": "六代大橋宗銀", "white": "伊藤印達", "sp_body": KIF_27637},
      {"key": "KIF_27490", "kif_code": "27490", "generation": 54,   "name": "1710-03-19 宗銀印達57番指し54局", "black": "六代大橋宗銀", "white": "伊藤印達", "sp_body": KIF_27490},
      {"key": "KIF_27585", "kif_code": "27585", "generation": null, "name": "1710-11-03 御城将棋 将棋絶妙第7番", "black": "伊藤印達", "white": "三代大橋宗与", "sp_body": KIF_27585},
      {"key": "KIF_15733", "kif_code": "15733", "generation": 57,   "name": "1711-02-28 宗銀印達57番指し57局", "black": "六代大橋宗銀", "white": "伊藤印達", "sp_body": KIF_15733},
      {"key": "SFEN_15733", "kif_code": "15733", "generation": 57,  "name": "1711-02-28 宗銀印達57番指し57局", "black": "六代大橋宗銀", "white": "伊藤印達", "sp_body":  SFEN_15733 },
      {"key": "KIF_37368", "kif_code": "37368", "generation": null, "name": "1711-03-00 将棋絶妙第8番", "black": "宮本印佐", "white": "伊藤印達", "sp_body": KIF_37368},
      {"key": "KIF_16217", "kif_code": "16217", "generation": null, "name": "1711-11-21 御城将棋 (印達の絶局)", "black": "六代大橋宗銀", "white": "伊藤印達", "sp_body": KIF_16217},
      {"key": "KIF_BOD_LIKE_SAMPLE1", "kif_code": "BOD_LIKE_SAMPLE1", "generation": null, "name": "BOD形式を含むKIF", "black": null, "white": null, "sp_body": KIF_BOD_LIKE_SAMPLE1},
      {"key": "illegal_check",           "kif_code": "illegal_check",       "generation": null, "name": "反則判定用", "black": null, "white": null, "sp_body": illegal_check},
    ]
  }

  get name() {
    return `${this.black} vs ${this.white}`
  }
}

if (typeof process !== "undefined" && process.argv[1] === __filename) {
  console.log(KifuBookInfo.fetch("simple").key)
  console.log(KifuBookInfo.fetch("simple").name)
}
