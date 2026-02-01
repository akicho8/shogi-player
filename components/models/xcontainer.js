import _ from "lodash"
import Vue from "vue"

import { GX } from "./gx"

import { AnyParser } from "./any_parser.js"

export class Xcontainer {
  static setup_default(attributes = {}) {
    return this.setup_by(attributes)
  }

  static setup_by(attributes = {}) {
    const instance = this.create(attributes)
    instance.run()
    return instance
  }

  static create(attributes = {}) {
    const normalized_attributes = {
      data_source: AnyParser.from_attributes(attributes),
      current_turn: attributes["current_turn"] ?? 0,
    }
    return new this(normalized_attributes)
  }

  constructor(...args) {
    this.initialize(...args)
  }
}

import { ClassHelper          } from "./class_helper"
import { CoreMethods          } from "./xcontainer/core_methods"
import { SerializeMethods     } from "./xcontainer/serialize_methods"
import { UtilityMethods       } from "./xcontainer/utility_methods"
import { TransformMethods     } from "./xcontainer/transform_methods"
import { HoldPieceMethods     } from "./xcontainer/hold_piece_methods"
import { BoardMethods         } from "./xcontainer/board_methods"
import { KingFormationMethods } from "./xcontainer/king_formation_methods"
import { PieceBoxMethods      } from "./xcontainer/piece_box_methods"
import { TurnMethods          } from "./xcontainer/turn_methods"

ClassHelper.class_include(Xcontainer, CoreMethods)
ClassHelper.class_include(Xcontainer, SerializeMethods)
ClassHelper.class_include(Xcontainer, UtilityMethods)
ClassHelper.class_include(Xcontainer, TransformMethods)
ClassHelper.class_include(Xcontainer, HoldPieceMethods)
ClassHelper.class_include(Xcontainer, BoardMethods)
ClassHelper.class_include(Xcontainer, KingFormationMethods)
ClassHelper.class_include(Xcontainer, PieceBoxMethods)
ClassHelper.class_include(Xcontainer, TurnMethods)
