<template>
  <div class="modal-card has-text-left" style="width: auto">
    <header class="modal-card-head">
      <p class="modal-card-title">設定</p>
    </header>
    <section class="modal-card-body">
      <b-field label="モード">
        <div class="block">
          <b-radio v-model="current_mode" native-value="view_mode">再生</b-radio>
          <b-radio v-model="current_mode" native-value="play_mode">操作</b-radio>
          <b-radio v-model="current_mode" native-value="edit_mode">編集</b-radio>
        </div>
      </b-field>
    </section>
    <footer class="modal-card-foot">
      <button class="button is-primary" @click="$parent.close()">閉じる</button>
    </footer>
  </div>
</template>

<script>
export default {
  props: {
    run_mode: {required: true},
  },
  data() {
    return {
      current_mode: this.run_mode,
    }
  },
  watch: {
    current_mode(value) {
      this.$emit("update:run_mode", value)
    },
  },
}
</script>
