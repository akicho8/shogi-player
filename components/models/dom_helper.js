export class DomHelper {
  static focus_on_input_tag_p() {
    const dom = document.activeElement
    if (dom == null) {
      return false
    }

    const is_input = ["INPUT", "TEXTAREA", "SELECT"].includes(dom.tagName)
    const is_editable = dom.isContentEditable // contenteditable="true" 対策

    return is_input || is_editable
  }
}
