export default {
  methods: {
    tab_is_active_p() {
      return !this.tab_is_hidden_p()
    },

    dialog_ok(message, options = {}) {
      options = {
        type: "info",
        talk: true,
        ...options,
      }
      this.$buefy.dialog.alert({
        title: options.title,
        type: `is-${options.type}`,
        // hasIcon: true,
        message: message,
        onConfirm: () => { this.sound_play("click") },
        onCancel:  () => { this.sound_play("click") },
      })
    },

    dialog_ng(message, params = {}) {
      params = {
        type: "danger",
        ...params,
      }
      this.dialog_ok(message, params)
    },

    toast_ok(message, options = {}) {
      this.$buefy.toast.open({message: message, position: "is-bottom", type: "is-primary", queue: false, ...options})
    },

    toast_warn(message, options = {}) {
      this.$buefy.toast.open({message: message, position: "is-bottom", type: "is-warning", queue: false, ...options})
    },

    toast_ng(message, options = {}) {
      this.$buefy.toast.open({message: message, position: "is-bottom", type: "is-danger", queue: false, ...options})
    },
  },
}
