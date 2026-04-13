import { GeneralMarkItem } from "@/components/mod_general_mark/general_mark_item.js"
import { GeneralMarkList } from "@/components/mod_general_mark/general_mark_list.js"

describe("GeneralMarkList", () => {
  const item_a       = { general_mark_pos_key: "7_6", general_mark_group_name: "alice", general_mark_color_index: 0, }
  const item_b       = { general_mark_pos_key: "3_4", general_mark_group_name: "bob",   general_mark_color_index: 1, }
  const items        = [item_a, item_b]
  const serial_str_a = "7_6,alice,0"
  const serial_str_b = "3_4,bob,1"
  const serial_str   = [serial_str_a, serial_str_b].join(",")

  it(".empty", () => {
    expect(GeneralMarkList.empty().size).toEqual(0)
  })

  it(".create", () => {
    expect(GeneralMarkList.create(items).size).toEqual(items.length)
  })

  it(".from_serial", () => {
    expect(GeneralMarkList.from_serial(serial_str).to_serial).toEqual(serial_str)
  })

  it(".command_create", () => {
    const command = GeneralMarkList.command_create("push", item_a)
    expect(command.method).toEqual("push")
    expect(command.params).toEqual(item_a)
  })

  it("#reset$", () => {
    const general_mark_list = GeneralMarkList.empty()
    general_mark_list.reset$(items)
    expect(general_mark_list.to_serial).toEqual(serial_str)
  })

  it("#clear$", () => {
    const general_mark_list = GeneralMarkList.create(items)
    expect(general_mark_list.clear$()).toEqual(true)
    expect(general_mark_list.clear$()).toEqual(undefined)
    expect(general_mark_list.size).toEqual(0)
  })

  it("#push$", () => {
    const general_mark_list = GeneralMarkList.empty()
    expect(general_mark_list.push$(item_a)).toEqual(true)
    expect(general_mark_list.push$(item_a)).toEqual(undefined)
  })

  it("#remove$", () => {
    const general_mark_list = GeneralMarkList.empty()
    expect(general_mark_list.push$(item_a)).toEqual(true)
    expect(general_mark_list.remove$(item_a)).toEqual(true)
    expect(general_mark_list.remove$(item_a)).toEqual(undefined)
  })

  it("#toggle$", () => {
    const general_mark_list = GeneralMarkList.empty()
    expect(general_mark_list.toggle$(item_a)).toEqual(true)
    expect(general_mark_list.size).toEqual(1)
    expect(general_mark_list.toggle$(item_a)).toEqual(true)
    expect(general_mark_list.size).toEqual(0)
  })

  it("#any_p", () => {
    const general_mark_list = GeneralMarkList.create([item_a])
    expect(general_mark_list.any_p(item_a)).toEqual(true)
    expect(general_mark_list.any_p(item_b)).toEqual(false)
  })

  it("#include_p", () => {
    const general_mark_list = GeneralMarkList.create([item_a])
    expect(general_mark_list.include_p(item_a)).toEqual(true)
    expect(general_mark_list.include_p(item_b)).toEqual(false)
  })

  it("#exclude_p", () => {
    const general_mark_list = GeneralMarkList.create([item_a])
    expect(general_mark_list.exclude_p(item_a)).toEqual(false)
    expect(general_mark_list.exclude_p(item_b)).toEqual(true)
  })

  it("#hash_table", () => {
    const general_mark_list = GeneralMarkList.create(items)
    expect(general_mark_list.hash_table["7_6"].length).toEqual(1)
    expect(general_mark_list.hash_table["3_4"].length).toEqual(1)
  })

  it("#as_json", () => {
    const general_mark_list = GeneralMarkList.create(items)
    expect(general_mark_list.as_json).toEqual(items)
  })

  it("#toJSON", () => {
    const general_mark_list = GeneralMarkList.create(items)
    expect(general_mark_list.toJSON()).toEqual(items)
  })

  it("#to_a", () => {
    const general_mark_list = GeneralMarkList.create([item_a])
    expect(general_mark_list.to_a[0]).toEqual(GeneralMarkItem.create(item_a))
  })

  it("#to_serial", () => {
    const general_mark_list = GeneralMarkList.create(items)
    expect(general_mark_list.to_serial).toEqual(serial_str)
  })

  it("#size", () => {
    const general_mark_list = GeneralMarkList.create([item_a])
    expect(general_mark_list.size).toEqual(1)
  })

  it("#empty_p", () => {
    const general_mark_list = GeneralMarkList.empty()
    expect(general_mark_list.empty_p).toEqual(true)
  })

  it("#exist_p", () => {
    const general_mark_list = GeneralMarkList.create([item_a])
    expect(general_mark_list.exist_p).toEqual(true)
  })

  it("#many_p", () => {
    const general_mark_list = GeneralMarkList.empty()
    expect(general_mark_list.push$(item_a)).toEqual(true)
    expect(general_mark_list.many_p).toEqual(false)
    expect(general_mark_list.push$(item_b)).toEqual(true)
    expect(general_mark_list.many_p).toEqual(true)
  })

  it("#many_p", () => {
    const general_mark_list = GeneralMarkList.empty()
    expect(general_mark_list.push$(item_a)).toEqual(true)
    expect(general_mark_list.many_p).toEqual(false)
    expect(general_mark_list.push$(item_b)).toEqual(true)
    expect(general_mark_list.many_p).toEqual(true)
  })

  it("#command_for_toggle", () => {
    const general_mark_list = GeneralMarkList.empty()
    expect(general_mark_list.include_p(item_a)).toEqual(false)
    general_mark_list.command_execute$(general_mark_list.command_for_toggle(item_a))
    expect(general_mark_list.include_p(item_a)).toEqual(true)
    general_mark_list.command_execute$(general_mark_list.command_for_toggle(item_a))
    expect(general_mark_list.include_p(item_a)).toEqual(false)
  })

  it("#command_execute$", () => {
    const general_mark_list = GeneralMarkList.empty()
    general_mark_list.command_execute$(GeneralMarkList.command_create("push", item_a))
    expect(general_mark_list.include_p(item_a)).toEqual(true)
    general_mark_list.command_execute$(GeneralMarkList.command_create("remove", item_a))
    expect(general_mark_list.include_p(item_a)).toEqual(false)
  })

  it("#find_all_by_group_name", () => {
    const general_mark_list = GeneralMarkList.create([item_a])
    expect(general_mark_list.find_all_by_group_name("alice").length).toEqual(1)
    expect(general_mark_list.find_all_by_group_name("bob").length).toEqual(0)
  })

  it("#group_name_exist_p", () => {
    const general_mark_list = GeneralMarkList.create([item_a])
    expect(general_mark_list.group_name_exist_p("alice")).toEqual(true)
    expect(general_mark_list.group_name_exist_p("bob")).toEqual(false)
  })

  it("#group_name_reject$", () => {
    const general_mark_list = GeneralMarkList.create(items)
    expect(general_mark_list.group_name_exist_p("alice")).toEqual(true)
    general_mark_list.group_name_reject$("alice")
    expect(general_mark_list.group_name_exist_p("alice")).toEqual(false)
  })
})
