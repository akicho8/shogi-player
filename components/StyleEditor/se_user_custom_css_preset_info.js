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
        key: "特定セル",
        user_custom_css: `
.ShogiPlayer {
  .place_7_6 { background-color: hsl(calc(340 + 0)   80% 90%) }
  .place_3_4 { background-color: hsl(calc(340 + 180) 80% 90%) }
}
`,
      },
      {
        key: "ノイズ盤",
        user_custom_css: `
.ShogiPlayer {
  --sp_board_image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.5" numOctaves="5" /></filter><rect width="100%" height="100%" filter="url(%23n)" opacity="0.5" /></svg>');
`
      },
      {
        key: "ノイズビニ盤",
        user_custom_css: `
.ShogiPlayer {
  --sp_board_image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.5" numOctaves="5" /></filter><rect width="100%" height="100%" fill="orange" /><rect width="100%" height="100%" filter="url(%23n)" opacity="0.5" /></svg>');
`
      },
      {
        key: "木目",
        user_custom_css: `
.ShogiPlayer {
  --sp_board_image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.5 0.01" numOctaves="2" /></filter><rect width="100%" height="100%" fill="hsl(35 90% 65%)" /><rect width="100%" height="100%" filter="url(%23n)" opacity="0.3" style="mix-blend-mode:multiply;" /></svg>');
}
`
      },
    ]
  }
}
