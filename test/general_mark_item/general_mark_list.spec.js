import { GeneralMarkList } from "@/components/mod_general_mark/general_mark_list.js"

describe("GeneralMarkList", () => {
  it(".from_serial", () => {
    const obj = GeneralMarkList.from_serial("7_6,alice,0,3_4,bob,1")
    expect(obj.to_serial).toEqual("7_6,alice,0,3_4,bob,1")
  })
})
