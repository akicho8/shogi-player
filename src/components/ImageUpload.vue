<template lang="pug">
.ImageUpload
  b-field.file
    b-upload(v-model="file_info" @input="input_handle" expanded)
      a.button.is-fullwidth.is-size-7
        b-icon(icon="upload")
        span(v-if="file_info")
          | {{file_info.name}}
        span(v-else)
          | 画像アップロード
  .block
    template(v-if="file_src")
      template(v-if="/^image/.test(file_info.type)")
        .preview
          b-image(:src="file_src")
          .delete_container(@click="close_handle")
            .delete
      template(v-else-if="/^video/.test(file_info.type)")
        video(:src="file_src" controls)
      template(v-else-if="/^audio/.test(file_info.type)")
        audio(:src="file_src" controls)
      template(v-else)
        | プレビュー未対応
</template>

<script>
import { support } from "./support.js"

export default {
  name: "ImageUpload",
  mixins: [support],
  data() {
    return {
      file_info: null,
      file_src: null,
    }
  },
  watch: {
    file_src(v) {
      this.$emit("input", v)
    }
  },
  methods: {
    input_handle(v) {
      this.file_info = v
      const reader = new FileReader()
      reader.addEventListener("load", () => { this.file_src = reader.result }, false)
      reader.readAsDataURL(this.file_info)
    },
    close_handle() {
      this.file_info = null
      this.file_src = null
    },
  },
}
</script>

<style lang="sass">
@import "./support.sass"
.ImageUpload
  .file
    .button
      font-size: $size-7
      overflow: hidden

  .preview
    position: relative
    .delete_container
      position: absolute
      top: 0
      right: 0
      .delete
        margin: 0.25rem
        background-color: change_color($black, $alpha: 0.5)
      &:hover
        .delete
          background-color: change_color($black, $alpha: 0.75)
</style>
