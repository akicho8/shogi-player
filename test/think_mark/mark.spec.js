import { Mark } from "@/components/think_mark/mark.js"

describe("Mark", () => {
  describe("ClassMethods", () => {
    it("create", () => {
      const a = Mark.create({mark_pos_key: "7_6", mark_user_name: ""})
      const b = Mark.create(a)
      expect(a === b).toEqual(true)
    })
  })
})
