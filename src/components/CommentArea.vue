<template>
<div class="comment_area" v-if="comments_pack">
  <div v-if="current_comments">
    <div class="columns">
      <div class="column"><!-- is-three-fifths is-offset-one-fifth -->
        <article class="message is-info has-text-left">
          <div class="message-body">
            <div class="content">
              <template v-for="str in current_comments">
                <template v-if="_.isEmpty(str)">
                  <br>
                </template>
                <template v-else>
                  <div v-html="auto_link(str)"></div>
                </template>
              </template>
            </div>
          </div>
        </article>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import Vue from 'vue'
import _ from "lodash"
import Autolinker from 'autolinker'

// To use lodash's _ in the vue template
Object.defineProperty(Vue.prototype, '_', {value: _})

export default {
  props: {
    comments_pack: { required: true },
    current_comments: { required: true },
  },

  created() {
    this.autolinker = new Autolinker()
  },

  methods: {
    auto_link(str) {
      return this.autolinker.link(str)
    },
  },
}
</script>
