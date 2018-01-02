// -*- coding: utf-8; compile-command: "../node_modules/.bin/babel-node usi.js" -*-
// -*- coding: utf-8; compile-command: "node usi.js" -*-

var XRegExp = require('xregexp')
// import { XRegExp } from 'xregexp'
// const Piece = require('./piece')
// import { XRegExp } from "xregexp"
import { Piece } from './piece'

// console.log(Piece.foo())

class Sfen {
  constructor (source) {
    this.source = source
    this.attributes = {}
  }

  parse () {
    this.source = this.source.replace(/startpos/, "sfen lnsgkgsnl/1r5b1/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL b - 1")
    // (/position\s+(sfen\s+(?<sfen>\S+)\s+(?<b_or_w>\S+)\s+(?<hold_pieces>\S+)\s+(?<turn_counter_next>\d+)|(?<startpos>startpos))(\s+moves\s+(?<moves>.*))?/)
    const regex = XRegExp("sfen\\s+(?<sfen>\\S+)\\s+(?<b_or_w>\\S+)\\s+(?<hold_pieces>\\S+)\\s+(?<turn_counter_next>\\d+)(\\s+moves\\s+(?<moves>.*))?")
    this.md = XRegExp.exec(this.source, regex)
    this.attributes        = this.md
    this.sfen              = this.md["sfen"]
    this.b_or_w            = this.md["b_or_w"]
    this.turn_counter_next = this.md["turn_counter_next"]
    this.moves             = this.md["moves"]
  }

  field () {
    let field = {}
    this.sfen.split("/").forEach((e, y) => {
      let x = 0
      XRegExp.forEach(e, XRegExp("(?<promoted>\\+?)(?<piece>\\S)"), (m, i) => {
        if (/\d+/.test(m.piece)) {
          x += Number(m.piece)
        } else {
          field[[x, y]] = {
            position: {x: x, y: y},
            piece: Piece.fetch(m.piece),
            promoted: (m.promoted === '+'),
            location: this.location_by(m.piece),
          }
          x += 1
        }
      })
    })
    return field
  }

  location_by (v) {
    if (/[A-Z]/.test(v)) {
      return "black"
    } else {
      return "white"
    }
  }

  location () {
    if (this.b_or_w === "b") {
      return "black"
    } else {
      return "white"
    }
  }

  hold_pieces () {
    const list = {}
    if (this.attributes["hold_pieces"] !== "-") {
      XRegExp.forEach(this.attributes["hold_pieces"], XRegExp("(?<count>\\d+?)(?<piece>\\S)"), (m, i) => {
        const count = Number(m.count || 1)
        console.log(count)
        // piece = Piece.fetch_by_sfen_char(ch)
        // location = Location.fetch_by_sfen_char(ch)
        // pieces[location] ||= []
        // pieces[location].concat([piece] * count)
        // end
      })
    }
    return list
  }

  turn_counter() {
    return Number(this.attributes["turn_counter_next"]) - 1
  }

  komaochi_p() {
    return (this.turn_counter() % 2) === 0 && this.location() == "white"
  }

  move_infos () {
    return this.attributes["moves"].split(/\s+/).map((e) => {
      return e
    })
  }

  toString () {
    return `(${this.source})`
  }
}

if (process.argv[1] === require.main.filename) {
  let sfen = new Sfen("position sfen +lnsgkgsnl/1r5b1/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL b S2s 1 moves 7i6h S*2d")
  sfen.parse()
  // console.log(sfen.field())
  // console.log(sfen.location())
  // console.log(sfen.hold_pieces())
  console.log(sfen.move_infos())
}

// export { Sfen }
