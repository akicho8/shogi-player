<template lang="pug">
//- StyleEditor(:sp_body="$route.query.body" :sp_player_info="sp_player_info")
StyleEditor
</template>

<script>
export default {
  name: "PageEditor",
  data () {
    return {
      // sp_player_info: null,
    }
  },
  // created() {
  //   // http://0.0.0.0:5000/editor?test=1
  //   if (this.$route.query.test) {
  //     this.sp_player_info = {
  //       black: { name: "先手先手先手先手", time: "12:34", },
  //       white: { name: "後手後手後手後手", time: "56:78", },
  //     }
  //     this.$route.query.body = "position sfen lnsgkgsnl/1r7/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL b - 1 moves 8c8d"
  //   }
  // },
  computed: {
    meta() {
      return {
        title: "スタイルエディタ",
      }
    },
  },
}
</script>

<style lang="sass">
.PageEditor
</style>
