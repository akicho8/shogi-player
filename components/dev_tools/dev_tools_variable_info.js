import MemoryRecord from "js-memory-record"

export class DevToolsVariableInfo extends MemoryRecord {
  static get define() {
    return [
      { key: "sp_dev_tools_position", mut_var: "mut_dev_tools_position", },
      { key: "sp_dev_tools_group",    mut_var: "mut_dev_tools_group",    },
    ]
  }

  get imm_var() {
    return this.key
  }
}
