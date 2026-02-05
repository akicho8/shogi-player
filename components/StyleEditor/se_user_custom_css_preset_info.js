import { ApplicationMemoryRecord } from "../models/application_memory_record.js"

export class SeUserCustomCssPresetInfo extends ApplicationMemoryRecord {
  static get define() {
    return [
      {
        key: "無",
        user_custom_css: ``,
      },
      {
        key: "駒に影",
        user_custom_css: `
.ShogiPlayer .PieceObject { filter: drop-shadow(4px 4px 4px hsla(0 0% 0% / 0.5)) }
`,
      },
      {
        key: "盤に影",
        user_custom_css: `
/* 盤テクスチャ有効時にははっきりと影ができる (半透明の盤だと効果は薄い) */
.ShogiPlayer .BoardTexture { filter: drop-shadow(4px 4px 4px hsla(0 0% 0% / 0.5)) }
`,
      },
      {
        key: "駒の色相反転",
        user_custom_css: `
.ShogiPlayer .PieceObject { filter: hue-rotate(0.5turn) }
`,
      },
      {
        key: "7六の地点",
        user_custom_css: `
.ShogiPlayer .place_7_6 { background-color: blue }
`,
      },
    ]
  }
}
