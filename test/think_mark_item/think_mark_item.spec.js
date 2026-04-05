import { ThinkMark } from "@/components/mod_think_mark/think_mark_item.js"

describe("ThinkMark", () => {
  describe("ClassMethods", () => {
    it("create", () => {
      const a = ThinkMark.create({think_mark_pos_key: "7_6", think_mark_user_name: ""})
      const b = ThinkMark.create(a)
      expect(a === b).toEqual(true)
    })
  })
})
