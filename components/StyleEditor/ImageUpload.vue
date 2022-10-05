<template lang="pug">
.ImageUpload
  b-field.file.my-4(custom-class="is-small")
    b-upload(v-model="file_info" @input="input_handle" expanded)
      a.button.is-fullwidth.is-size-7
        b-icon(icon="upload")
        span(v-if="file_info")
          | {{file_info.name}}
        span(v-else)
          | 画像アップロード

  b-field.preview.my-4(custom-class="is-small" v-if="file_info")
    .control
      template(v-if="/^image/.test(file_info.type)")
        b-image(:src="file_src")
        .delete_container(@click="close_handle")
          .delete
      template(v-else-if="/^video/.test(file_info.type)")
        video(:src="file_src" controls)
      template(v-else-if="/^audio/.test(file_info.type)")
        audio(:src="file_src" controls)
      template(v-else)
        | プレビュー未対応

  //- template(v-if="new_filter_p")
  //-   b-field(custom-class="is-small" label="ぼかし")
  //-     b-slider(v-model="new_blur" :min="0" :max="30" :step="0.01")
  //-   b-field(custom-class="is-small" label="グレースケール")
  //-     b-slider(v-model="new_grayscale" :min="0" :max="1.0" :step="0.01")
  //-   b-field(custom-class="is-small" label="輝度")
  //-     b-slider(v-model="new_brightness" :min="0" :max="2.0" :step="0.01")

  b-field(v-if="debug_p")
    .control
      pre
        | {{new_single_color}}
        | {{new_grayscale}}
        | {{new_brightness}}
        | {{new_blur}}
        | {{filter_p}}
        | {{new_filter_p}}
        | {{$props}}
</template>

<script>
import MyColorPicker from "./MyColorPicker.vue"

export default {
  name: "ImageUpload",
  components: {
    MyColorPicker,
  },
  props: {
    single_color: { type: String,  required: false, default: "#888888", },
    grayscale:    { type: Number,  required: false, default: 0,         },
    brightness:   { type: Number,  required: false, default: 0,         },
    blur:         { type: Number,  required: false, default: 0,         },
    debug_p:      { type: Boolean, required: false, default: false,     },
    filter_p:     { type: Boolean, required: false, default: false,     },
    disableAlpha: { type: Boolean, required: false, default: false,     },
  },
  data() {
    return {
      file_info: null,
      file_src: null,

      new_single_color: this.single_color,
      new_grayscale:    this.grayscale,
      new_brightness:   this.brightness,
      new_blur:         this.blur,
    }
  },
  watch: {
    file_src(v)         { this.$emit("input", v)               },
    new_single_color(v) { this.$emit("update:single_color", v) },
    new_grayscale(v)    { this.$emit("update:grayscale", v)    },
    new_brightness(v)   { this.$emit("update:brightness", v)   },
    new_blur(v)         { this.$emit("update:blur", v)         },
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

      this.new_grayscale = 0
      this.new_brightness = 1.0
      this.new_blur = 0
    },
  },
  computed: {
    new_filter_p() {
      return this.file_info || this.filter_p
    },
  },
}
</script>

<style lang="sass">
@import "../support.sass"
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
