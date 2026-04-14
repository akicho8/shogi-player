import { DomHelper                 } from "../models/dom_helper.js"
import { KeyboardHelper            } from "../models/keyboard_helper.js"

// ShogiPlayer 側で持っているもの
import { BalloonInfo               } from "../models/balloon_info.js"
import { BinaryInfo                } from "../models/binary_info.js"
import { BoardVariantInfo          } from "../models/board_variant_info.js"
import { OriginMarkVariantInfo     } from "../mod_general_mark/mod_origin_mark/origin_mark_variant_info.js"
import { ClickResponseTimingInfo   } from "../models/click_response_timing_info.js"
import { CoordinateInfo            } from "../models/coordinate_info.js"
import { CoordinateVariantInfo     } from "../models/coordinate_variant_info.js"
import { HumanSideInfo             } from "../models/human_side_info.js"
import { LayoutInfo                } from "../models/layout_info.js"
import { LiftCancelActionInfo      } from "../models/lift_cancel_action_info.js"
import { Location                  } from "../models/location.js"
import { MixBlendModeInfo          } from "../models/mix_blend_mode_info.js"
import { ModeInfo                  } from "../models/mode_info.js"
import { NameDirectionInfo         } from "../models/name_direction_info.js"
import { PieceVariantInfo          } from "../models/piece_variant_info.js"
import { PieceVerticalPositionInfo } from "../models/piece_vertical_position_info.js"
import { PieceVisibilityInfo       } from "../models/piece_visibility_info.js"
import { RequestCheckmateStatInfo  } from "../models/request_checkmate_stat_info.js"
import { StandFlipInfo             } from "../models/stand_flip_info.js"
import { StandGravityInfo          } from "../models/stand_gravity_info.js"
import { StarZIndexInfo            } from "../models/star_z_index_info.js"

// StyleEditor 側で用意したもの
import { AllShowInfo               } from "./models/all_show_info.js"
import { BoardSizePresetInfo       } from "./models/board_size_preset_info.js"
import { OriginMarkPresetInfo      } from "./models/origin_mark_preset_info.js"
import { CategoryInfo              } from "./models/category_info.js"
import { ColorHelper               } from "./models/color_helper.js"
import { CssHelper                 } from "./models/css_helper.js"
import { SePresetInfo              } from "./models/se_preset_info.js"
import { UserCustomCssPresetInfo   } from "./models/user_custom_css_preset_info.js"
import { VariableInfo              } from "./models/variable_info.js"

export const mod_import = {
  beforeCreate() {
    Object.assign(this, {
      DomHelper,
      KeyboardHelper,

      // ShogiPlayer 側で持っているもの
      BalloonInfo,
      BinaryInfo,
      BoardVariantInfo,
      OriginMarkVariantInfo,
      ClickResponseTimingInfo,
      CoordinateInfo,
      CoordinateVariantInfo,
      HumanSideInfo,
      LayoutInfo,
      LiftCancelActionInfo,
      Location,
      MixBlendModeInfo,
      ModeInfo,
      NameDirectionInfo,
      PieceVariantInfo,
      PieceVerticalPositionInfo,
      PieceVisibilityInfo,
      RequestCheckmateStatInfo,
      StandFlipInfo,
      StandGravityInfo,
      StarZIndexInfo,

      // StyleEditor 側で用意したもの
      AllShowInfo,
      BoardSizePresetInfo,
      OriginMarkPresetInfo,
      CategoryInfo,
      ColorHelper,
      CssHelper,
      SePresetInfo,
      UserCustomCssPresetInfo,
      VariableInfo,
    })
  },
}
