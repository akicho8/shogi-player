import { GeneralMarkItem } from "@/components/mod_general_mark/general_mark_item.js"

describe("GeneralMarkItem", () => {
  const item_a       = { gm_pos_key: "7_6", gm_user_name: "alice", gm_color_index: 0, }
  const serial_str_a = "7_6,alice,0"

  it(".create", () => {
    const a = GeneralMarkItem.create(item_a)
    const b = GeneralMarkItem.create(a)
    expect(a === b).toEqual(true)
  })

  it("#css_class", () => {
    const obj = GeneralMarkItem.create(item_a)
    expect(obj.css_class).toEqual("general_mark_color_index0")
  })

  it("#attributes", () => {
    const obj = GeneralMarkItem.create(item_a)
    expect(obj.attributes).toEqual(item_a)
  })

  it("#to_h", () => {
    const obj = GeneralMarkItem.create(item_a)
    expect(obj.to_h).toEqual(item_a)
  })

  it("#as_json", () => {
    const obj = GeneralMarkItem.create(item_a)
    expect(obj.as_json).toEqual(item_a)
  })

  it("#toJSON", () => {
    const obj = GeneralMarkItem.create(item_a)
    expect(obj.toJSON()).toEqual(item_a)
  })

  it("#content_equal_p", () => {
    const a = GeneralMarkItem.create(item_a)
    const b = GeneralMarkItem.create(item_a)
    expect(a === b).toEqual(false)
    expect(a.content_equal_p(b)).toEqual(true)
  })

  it("#to_serial", () => {
    const obj = GeneralMarkItem.create(item_a)
    expect(obj.to_serial).toEqual(serial_str_a)
  })
})
