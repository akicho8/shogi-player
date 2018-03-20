<template>
  <div class="modal-card" style="width: auto">
    <header class="modal-card-head">
      <p class="modal-card-title">設定</p>
    </header>
    <section class="modal-card-body">
      <b-field label="モード">
        <div class="block">
          <b-radio v-model="run_mode2" native-value="view_mode">ビュー</b-radio>
          <b-radio v-model="run_mode2" native-value="play_mode">プレイ</b-radio>
          <b-radio v-model="run_mode2" native-value="edit_mode">編集</b-radio>
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
  props: ["run_mode"],
  data: function() {
    return {
      run_mode2: this.run_mode,
    }
  },
  watch: {
    run_mode2: function(value) {
      this.$emit('update:run_mode', value)
    },
  },
}
</script>
