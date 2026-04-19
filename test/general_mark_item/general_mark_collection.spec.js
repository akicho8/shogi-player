import { GeneralMarkItem } from "@/components/mod_general_mark/general_mark_item.js"
import { GeneralMarkCollection } from "@/components/mod_general_mark/general_mark_collection.js"

describe("GeneralMarkCollection", () => {
  const item_a       = { gm_pos_key: "7_6", gm_user_name: "alice", gm_color_index: 0, }
  const item_b       = { gm_pos_key: "3_4", gm_user_name: "bob",   gm_color_index: 1, }
  const items        = [item_a, item_b]
  const serial_str_a = "7_6,alice,0"
  const serial_str_b = "3_4,bob,1"
  const serial_str   = [serial_str_a, serial_str_b].join(",")

  it(".empty", () => {
    expect(GeneralMarkCollection.empty().size).toEqual(0)
  })

  it(".create", () => {
    expect(GeneralMarkCollection.create(items).size).toEqual(items.length)
  })

  it(".from_serial", () => {
    expect(GeneralMarkCollection.from_serial(serial_str).to_serial).toEqual(serial_str)
  })

  it(".command_create", () => {
    const command = GeneralMarkCollection.command_create("push", item_a)
    expect(command.method).toEqual("push")
    expect(command.params).toEqual(item_a)
  })

  it("#reset$", () => {
    const obj = GeneralMarkCollection.empty()
    obj.reset$(items)
    expect(obj.to_serial).toEqual(serial_str)
  })

  it("#clear$", () => {
    const obj = GeneralMarkCollection.create(items)
    expect(obj.clear$()).toEqual(true)
    expect(obj.clear$()).toEqual(undefined)
    expect(obj.size).toEqual(0)
  })

  it("#push$", () => {
    const obj = GeneralMarkCollection.empty()
    expect(obj.push$(item_a)).toEqual(true)
    expect(obj.push$(item_a)).toEqual(undefined)
  })

  it("#remove$", () => {
    const obj = GeneralMarkCollection.empty()
    expect(obj.push$(item_a)).toEqual(true)
    expect(obj.remove$(item_a)).toEqual(true)
    expect(obj.remove$(item_a)).toEqual(undefined)
  })

  it("#toggle$", () => {
    const obj = GeneralMarkCollection.empty()
    expect(obj.toggle$(item_a)).toEqual(true)
    expect(obj.size).toEqual(1)
    expect(obj.toggle$(item_a)).toEqual(true)
    expect(obj.size).toEqual(0)
  })

  it("#any_p", () => {
    const obj = GeneralMarkCollection.create([item_a])
    expect(obj.any_p(item_a)).toEqual(true)
    expect(obj.any_p(item_b)).toEqual(false)
  })

  it("#include_p", () => {
    const obj = GeneralMarkCollection.create([item_a])
    expect(obj.include_p(item_a)).toEqual(true)
    expect(obj.include_p(item_b)).toEqual(false)
  })

  it("#exclude_p", () => {
    const obj = GeneralMarkCollection.create([item_a])
    expect(obj.exclude_p(item_a)).toEqual(false)
    expect(obj.exclude_p(item_b)).toEqual(true)
  })

  it("#hash_table", () => {
    const obj = GeneralMarkCollection.create(items)
    expect(obj.hash_table["7_6"].length).toEqual(1)
    expect(obj.hash_table["3_4"].length).toEqual(1)
  })

  it("#as_json", () => {
    const obj = GeneralMarkCollection.create(items)
    expect(obj.as_json).toEqual(items)
  })

  it("#toJSON", () => {
    const obj = GeneralMarkCollection.create(items)
    expect(obj.toJSON()).toEqual(items)
  })

  it("#to_a", () => {
    const obj = GeneralMarkCollection.create([item_a])
    expect(obj.to_a[0]).toEqual(GeneralMarkItem.create(item_a))
  })

  it("#to_serial", () => {
    const obj = GeneralMarkCollection.create(items)
    expect(obj.to_serial).toEqual(serial_str)
  })

  it("#size", () => {
    const obj = GeneralMarkCollection.create([item_a])
    expect(obj.size).toEqual(1)
  })

  it("#empty_p", () => {
    const obj = GeneralMarkCollection.empty()
    expect(obj.empty_p).toEqual(true)
  })

  it("#exist_p", () => {
    const obj = GeneralMarkCollection.create([item_a])
    expect(obj.exist_p).toEqual(true)
  })

  it("#many_p", () => {
    const obj = GeneralMarkCollection.empty()
    expect(obj.push$(item_a)).toEqual(true)
    expect(obj.many_p).toEqual(false)
    expect(obj.push$(item_b)).toEqual(true)
    expect(obj.many_p).toEqual(true)
  })

  it("#many_p", () => {
    const obj = GeneralMarkCollection.empty()
    expect(obj.push$(item_a)).toEqual(true)
    expect(obj.many_p).toEqual(false)
    expect(obj.push$(item_b)).toEqual(true)
    expect(obj.many_p).toEqual(true)
  })

  it("#command_for_toggle", () => {
    const obj = GeneralMarkCollection.empty()
    expect(obj.include_p(item_a)).toEqual(false)
    obj.command_execute$(obj.command_for_toggle(item_a))
    expect(obj.include_p(item_a)).toEqual(true)
    obj.command_execute$(obj.command_for_toggle(item_a))
    expect(obj.include_p(item_a)).toEqual(false)
  })

  it("#command_execute$", () => {
    const obj = GeneralMarkCollection.empty()
    obj.command_execute$(GeneralMarkCollection.command_create("push", item_a))
    expect(obj.include_p(item_a)).toEqual(true)
    obj.command_execute$(GeneralMarkCollection.command_create("remove", item_a))
    expect(obj.include_p(item_a)).toEqual(false)
  })

  it("#find_all_by_gm_user_name", () => {
    const obj = GeneralMarkCollection.create([item_a])
    expect(obj.find_all_by_gm_user_name("alice").length).toEqual(1)
    expect(obj.find_all_by_gm_user_name("bob").length).toEqual(0)
  })

  it("#gm_user_name_exist_p", () => {
    const obj = GeneralMarkCollection.create([item_a])
    expect(obj.gm_user_name_exist_p("alice")).toEqual(true)
    expect(obj.gm_user_name_exist_p("bob")).toEqual(false)
  })

  it("#gm_user_name_reject$", () => {
    const obj = GeneralMarkCollection.create(items)
    expect(obj.gm_user_name_exist_p("alice")).toEqual(true)
    obj.gm_user_name_reject$("alice")
    expect(obj.gm_user_name_exist_p("alice")).toEqual(false)
  })
})
