import { ApplicationMemoryRecord } from "../../models/application_memory_record.js"
import { CssHelper } from "./css_helper.js"

import emboss_alpha from "!!raw-loader!../../../assets/board_variant/emboss_alpha.svg"
import emboss_opaque from "!!raw-loader!../../../assets/board_variant/emboss_opaque.svg"

import wood_alpha from "!!raw-loader!../../../assets/board_variant/wood_alpha.svg"
import wood_opaque from "!!raw-loader!../../../assets/board_variant/wood_opaque.svg"

export class UserCustomCssPresetInfo extends ApplicationMemoryRecord {
  static get define() {
    return [
      {
        key: "無",
        user_custom_css: ``,
      },
      {
        key: "駒に影",
        user_custom_css: `
.ShogiPlayer .PieceObject { filter: drop-shadow(4px 4px 4px hsl(0 0% 0% / 0.5)) }
`,
      },
      {
        key: "盤に影",
        user_custom_css: `
/* 盤テクスチャ有効時にははっきりと影ができる (半透明の盤だと効果は薄い) */
.ShogiPlayer .BoardTexture { filter: drop-shadow(4px 4px 4px hsl(0 0% 0% / 0.5)) }
`,
      },
      {
        key: "hoverで駒拡大",
        user_custom_css: `
.ShogiPlayer {
  .selectable_p {
    .PieceObject {
      transition: transform 0.2s;
      &:hover {
        transform: scale(1.1);
      }
    }
  }
}
`,
      },
      {
        key: "特定セル",
        user_custom_css: `
.ShogiPlayer {
  .place_7_6 { background-color: hsl(calc(340 + 0)   80% 90%); }
  .place_3_4 { background-color: hsl(calc(340 + 180) 80% 90%); }
}
`,
      },
      {
        key: "盤のみ",
        user_custom_css: `
.ShogiPlayer .Membership { display: none }
`
      },

      { key: "凹凸効果", user_custom_css: CssHelper.svg_to_user_css(emboss_alpha),  },
      { key: "凹凸盤",   user_custom_css: CssHelper.svg_to_user_css(emboss_opaque), },
      { key: "木目効果", user_custom_css: CssHelper.svg_to_user_css(wood_alpha),    },
      { key: "木目盤",   user_custom_css: CssHelper.svg_to_user_css(wood_opaque),   },
    ]
  }
}
