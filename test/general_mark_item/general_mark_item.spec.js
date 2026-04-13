import { GeneralMarkItem } from "@/components/mod_general_mark/general_mark_item.js"

describe("GeneralMarkItem", () => {
  const item_a       = { general_mark_pos_key: "7_6", general_mark_group_name: "alice", general_mark_color_index: 0, }
  const serial_str_a = "7_6,alice,0"

  it(".create", () => {
    const a = GeneralMarkItem.create(item_a)
    const b = GeneralMarkItem.create(a)
    expect(a === b).toEqual(true)
  })

  it("#css_class", () => {
    const general_mark_item = GeneralMarkItem.create(item_a)
    expect(general_mark_item.css_class).toEqual("general_mark_color_index0")
  })

  it("#attributes", () => {
    const general_mark_item = GeneralMarkItem.create(item_a)
    expect(general_mark_item.attributes).toEqual(item_a)
  })

  it("#to_h", () => {
    const general_mark_item = GeneralMarkItem.create(item_a)
    expect(general_mark_item.to_h).toEqual(item_a)
  })

  it("#as_json", () => {
    const general_mark_item = GeneralMarkItem.create(item_a)
    expect(general_mark_item.as_json).toEqual(item_a)
  })

  it("#toJSON", () => {
    const general_mark_item = GeneralMarkItem.create(item_a)
    expect(general_mark_item.toJSON()).toEqual(item_a)
  })

  it("#content_equal_p", () => {
    const a = GeneralMarkItem.create(item_a)
    const b = GeneralMarkItem.create(item_a)
    expect(a === b).toEqual(false)
    expect(a.content_equal_p(b)).toEqual(true)
  })

  it("#to_serial", () => {
    const general_mark_item = GeneralMarkItem.create(item_a)
    expect(general_mark_item.to_serial).toEqual(serial_str_a)
  })
})
