const CustomMarked = require("marked")

const renderer = new CustomMarked.Renderer()
renderer.table = (header, body) => `
  <div class="table_wrap">
    <table>
      <thead>${header}</thead>
      <tbody>${body}</tbody>
    </table>
  </div>`

CustomMarked.setOptions({
  renderer: renderer,
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
})

export { CustomMarked }
