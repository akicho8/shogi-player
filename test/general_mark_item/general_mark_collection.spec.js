import { GeneralMarkItem } from "@/components/mod_general_mark/general_mark_item.js"
import { GeneralMarkCollection } from "@/components/mod_general_mark/general_mark_collection.js"

describe("GeneralMarkCollection", () => {
  const item_a       = { general_mark_pos_key: "7_6", general_mark_user_name: "alice", general_mark_color_index: 0, }
  const item_b       = { general_mark_pos_key: "3_4", general_mark_user_name: "bob",   general_mark_color_index: 1, }
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
    const general_mark_collection = GeneralMarkCollection.empty()
    general_mark_collection.reset$(items)
    expect(general_mark_collection.to_serial).toEqual(serial_str)
  })

  it("#clear$", () => {
    const general_mark_collection = GeneralMarkCollection.create(items)
    expect(general_mark_collection.clear$()).toEqual(true)
    expect(general_mark_collection.clear$()).toEqual(undefined)
    expect(general_mark_collection.size).toEqual(0)
  })

  it("#push$", () => {
    const general_mark_collection = GeneralMarkCollection.empty()
    expect(general_mark_collection.push$(item_a)).toEqual(true)
    expect(general_mark_collection.push$(item_a)).toEqual(undefined)
  })

  it("#remove$", () => {
    const general_mark_collection = GeneralMarkCollection.empty()
    expect(general_mark_collection.push$(item_a)).toEqual(true)
    expect(general_mark_collection.remove$(item_a)).toEqual(true)
    expect(general_mark_collection.remove$(item_a)).toEqual(undefined)
  })

  it("#toggle$", () => {
    const general_mark_collection = GeneralMarkCollection.empty()
    expect(general_mark_collection.toggle$(item_a)).toEqual(true)
    expect(general_mark_collection.size).toEqual(1)
    expect(general_mark_collection.toggle$(item_a)).toEqual(true)
    expect(general_mark_collection.size).toEqual(0)
  })

  it("#any_p", () => {
    const general_mark_collection = GeneralMarkCollection.create([item_a])
    expect(general_mark_collection.any_p(item_a)).toEqual(true)
    expect(general_mark_collection.any_p(item_b)).toEqual(false)
  })

  it("#include_p", () => {
    const general_mark_collection = GeneralMarkCollection.create([item_a])
    expect(general_mark_collection.include_p(item_a)).toEqual(true)
    expect(general_mark_collection.include_p(item_b)).toEqual(false)
  })

  it("#exclude_p", () => {
    const general_mark_collection = GeneralMarkCollection.create([item_a])
    expect(general_mark_collection.exclude_p(item_a)).toEqual(false)
    expect(general_mark_collection.exclude_p(item_b)).toEqual(true)
  })

  it("#hash_table", () => {
    const general_mark_collection = GeneralMarkCollection.create(items)
    expect(general_mark_collection.hash_table["7_6"].length).toEqual(1)
    expect(general_mark_collection.hash_table["3_4"].length).toEqual(1)
  })

  it("#as_json", () => {
    const general_mark_collection = GeneralMarkCollection.create(items)
    expect(general_mark_collection.as_json).toEqual(items)
  })

  it("#toJSON", () => {
    const general_mark_collection = GeneralMarkCollection.create(items)
    expect(general_mark_collection.toJSON()).toEqual(items)
  })

  it("#to_a", () => {
    const general_mark_collection = GeneralMarkCollection.create([item_a])
    expect(general_mark_collection.to_a[0]).toEqual(GeneralMarkItem.create(item_a))
  })

  it("#to_serial", () => {
    const general_mark_collection = GeneralMarkCollection.create(items)
    expect(general_mark_collection.to_serial).toEqual(serial_str)
  })

  it("#size", () => {
    const general_mark_collection = GeneralMarkCollection.create([item_a])
    expect(general_mark_collection.size).toEqual(1)
  })

  it("#empty_p", () => {
    const general_mark_collection = GeneralMarkCollection.empty()
    expect(general_mark_collection.empty_p).toEqual(true)
  })

  it("#exist_p", () => {
    const general_mark_collection = GeneralMarkCollection.create([item_a])
    expect(general_mark_collection.exist_p).toEqual(true)
  })

  it("#many_p", () => {
    const general_mark_collection = GeneralMarkCollection.empty()
    expect(general_mark_collection.push$(item_a)).toEqual(true)
    expect(general_mark_collection.many_p).toEqual(false)
    expect(general_mark_collection.push$(item_b)).toEqual(true)
    expect(general_mark_collection.many_p).toEqual(true)
  })

  it("#many_p", () => {
    const general_mark_collection = GeneralMarkCollection.empty()
    expect(general_mark_collection.push$(item_a)).toEqual(true)
    expect(general_mark_collection.many_p).toEqual(false)
    expect(general_mark_collection.push$(item_b)).toEqual(true)
    expect(general_mark_collection.many_p).toEqual(true)
  })

  it("#command_for_toggle", () => {
    const general_mark_collection = GeneralMarkCollection.empty()
    expect(general_mark_collection.include_p(item_a)).toEqual(false)
    general_mark_collection.command_execute$(general_mark_collection.command_for_toggle(item_a))
    expect(general_mark_collection.include_p(item_a)).toEqual(true)
    general_mark_collection.command_execute$(general_mark_collection.command_for_toggle(item_a))
    expect(general_mark_collection.include_p(item_a)).toEqual(false)
  })

  it("#command_execute$", () => {
    const general_mark_collection = GeneralMarkCollection.empty()
    general_mark_collection.command_execute$(GeneralMarkCollection.command_create("push", item_a))
    expect(general_mark_collection.include_p(item_a)).toEqual(true)
    general_mark_collection.command_execute$(GeneralMarkCollection.command_create("remove", item_a))
    expect(general_mark_collection.include_p(item_a)).toEqual(false)
  })

  it("#find_all_by_general_mark_user_name", () => {
    const general_mark_collection = GeneralMarkCollection.create([item_a])
    expect(general_mark_collection.find_all_by_general_mark_user_name("alice").length).toEqual(1)
    expect(general_mark_collection.find_all_by_general_mark_user_name("bob").length).toEqual(0)
  })

  it("#general_mark_user_name_exist_p", () => {
    const general_mark_collection = GeneralMarkCollection.create([item_a])
    expect(general_mark_collection.general_mark_user_name_exist_p("alice")).toEqual(true)
    expect(general_mark_collection.general_mark_user_name_exist_p("bob")).toEqual(false)
  })

  it("#general_mark_user_name_reject$", () => {
    const general_mark_collection = GeneralMarkCollection.create(items)
    expect(general_mark_collection.general_mark_user_name_exist_p("alice")).toEqual(true)
    general_mark_collection.general_mark_user_name_reject$("alice")
    expect(general_mark_collection.general_mark_user_name_exist_p("alice")).toEqual(false)
  })
})
