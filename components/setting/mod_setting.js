import SettingModal from "./SettingModal.vue"

export const mod_setting = {
  props: {
    // 設定ボタンの表示
    sp_setting: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      setting_modal_instance: null,
    }
  },
  beforeDestroy() {
    this.setting_modal_close()
  },
  methods: {
    // 棋譜の読み込みタップ時の処理
    setting_modal_open_handle() {
      this.setting_modal_close()
      // https://buefy.org/documentation/modal/
      this.setting_modal_instance = this.$buefy.modal.open({
        // width: "", // width ではなく max-width に設定される
        customClass: "SettingModal",
        component: SettingModal,
        parent: this,
        trapFocus: true,
        hasModalCard: true,
        animation: "",
        canCancel: ["outside", "escape"],
        onCancel: () => {},
      })
    },
    setting_modal_close() {
      if (this.setting_modal_instance) {
        this.setting_modal_instance.close()
        this.setting_modal_instance = null
      }
    },
  },
}
