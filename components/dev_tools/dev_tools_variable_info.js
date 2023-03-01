import { ApplicationMemoryRecord } from "../models/application_memory_record.js"

export class DevToolsVariableInfo extends ApplicationMemoryRecord {
  static get define() {
    return [
      // sp_dev_tools は含めてはいけない
      { key: "sp_dev_tools_position", mut_var: "mut_dev_tools_position", },
      { key: "sp_dev_tools_group",    mut_var: "mut_dev_tools_group",    },
    ]
  }

  get imm_var() {
    return this.key
  }
}
