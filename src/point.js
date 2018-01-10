// -*- compile-command: "babel-node point.js" -*-

import { Board } from "./board"

class Point {
  constructor (pos) {
    let x, y
    if (typeof(pos) === "string") {
      let chars = pos.split("")
      x = chars[0]
      y = chars[1]
      x = Board.boardSize() - Number(x)
      y = y.charCodeAt(0) - "a".charCodeAt(0)
    } else {
      x = pos[0]
      y = pos[1]
    }
    this.x = x
    this.y = y
  }

  // 単なる文字列化ではなくハッシュのキーに使ったとき自動的に呼ばれて結果がキーになる
  // これがないとキーがユニークにならない
  toString() {
    return [this.x, this.y].toString()
  }
}

export { Point }

if (process.argv[1] == __filename) {
  let obj1 = new Position(1, 2)
  let obj2 = new Position(1, 2)
  console.log(obj1.toString() == obj2.toString())
  console.log(obj1 == obj2)
  console.log(Object.is(obj1, obj2))
  console.log(obj1["x"])
  console.log(obj1.x)

  obj1 = new Position(1, 2)
  obj2 = new Position(1, 2)
  let hash = {}
  hash[obj1] = 1
  hash[obj2] += 10
  console.log(hash)

  console.log([1, 2] == [1, 2])
  console.log([1, 2] === [1, 2])
  console.log([1, 2].toString() === [1, 2].toString())
}
