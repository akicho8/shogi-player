import axios from "axios"
const logger_debug = require('debug')('debug')

export default {
  /* eslint-disable */
  props: {
    kifu_url:           { type: String,  default: null, },
    polling_interval:   { type: Number,  default: 0,    },
  },
  /* eslint-enable */

  data() {
    return {
      interval_id: null,
      kifu_body_from_url: null,
    }
  },

  created() {
  },

  mounted() {
  },

  watch: {
    kifu_url() {
      this.axios_call()
    },
    polling_interval() {
      this.polling_interval_update()
    },
  },

  methods: {
    polling_interval_update() {
      if (this.polling_interval >= 1) {
        if (this.interval_id) {
          this.log(`clearInterval(${this.interval_id})`)
          clearInterval(this.interval_id)
          this.interval_id = null
        }
        this.interval_id = setInterval(() => { this.axios_call() }, this.polling_interval * 1000)
        this.log(`setInterval() => ${this.interval_id}`)
      }
    },

    axios_call() {
      const url = this.kifu_url
      // const url = "http://localhost:3000/wr/hanairobiyori-ispt-20171104_220810.kif"
      // const url = "http://tk2-221-20341.vs.sakura.ne.jp/shogi/wr/ureshino_friend-doglong-20180122_213544.kif"
      const accessd_at = Date.now().toString()
      axios({
        url: url,
        method: "get",
        params: {"accessd_at": accessd_at},
        responseType: "text",
        timeout: 1000 * 3,
        headers: {"X-SHOGI-PLAYER-TIMESTAMP": accessd_at},
      }).then((response) => {
        this.error_message = null
        this.inside_custom_kifu = null
        this.kifu_body_from_url = response.data
        // this.mediator_setup(this.start_turn)
      }).catch((error) => {
        if (error.response) {
          logger_debug("error.response.data: %o", error.response.data)
          logger_debug("error.response.status: %o", error.response.status)
          logger_debug("error.response.statusText: %o", error.response.statusText)
          logger_debug("error.response.headers: %o", error.response.headers)
        } else if (error.request) {
          logger_debug("error.request: %o", error.request)
        } else {
          logger_debug('error.message: %o', error.message)
        }
        logger_debug('error.config: %o', error.config)

        this.kifu_body_from_url = null
        this.error_message = error.message
      })
    },
  },

  computed: {
  },
}
