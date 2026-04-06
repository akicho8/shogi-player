import { GeneralMarkItem } from "@/components/mod_general_mark/general_mark_item.js"

describe("GeneralMarkItem", () => {
  it(".create", () => {
    const a = GeneralMarkItem.create({general_mark_pos_key: "7_6", general_mark_group_name: ""})
    const b = GeneralMarkItem.create(a)
    expect(a === b).toEqual(true)
  })

  it("#to_serial", () => {
    const obj = GeneralMarkItem.create({general_mark_pos_key: "7_6", general_mark_group_name: "alice", general_mark_color_index: 0})
    expect(obj.to_serial).toEqual("7_6,alice,0")
  })
})
