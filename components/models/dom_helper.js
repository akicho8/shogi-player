export class DomHelper {
  static input_focused_p() {
    const dom = document.activeElement
    if (dom == null) {
      return false
    }

    if (dom.tagName === "TEXTAREA" || dom.tagName === "SELECT" || dom.isContentEditable) {
      return true
    }

    if (dom.tagName === "INPUT") {
      const text_input_types = ["text", "password", "number", "email", "tel", "url", "search", "date", "datetime-local"]
      if (text_input_types.includes(dom.type)) {
        return true
      }
    }

    return false
  }
}
