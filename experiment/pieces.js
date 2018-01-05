new Vue({
  el: '#app',
  data: {
    source: [
      {name: "金", unique_key: 0, komadai: true},
      {name: "銀", unique_key: 1, komadai: false},
      {name: "歩", unique_key: 2, komadai: false},
      {name: "金", unique_key: 3, komadai: true},
      {name: "銀", unique_key: 4, komadai: false},
      {name: "歩", unique_key: 5, komadai: false},
      {name: "歩", unique_key: 6, komadai: false},
      {name: "歩", unique_key: 7, komadai: false},
      {name: "歩", unique_key: 8, komadai: false},
      {name: "歩", unique_key: 9, komadai: false},
      {name: "歩", unique_key:10, komadai: false},
    ],
    battlers: [],
  },
  created: function() {
    this.shuffle()
  },
  methods: {
    shuffle: function() {
      let list = []
      list = _.shuffle(this.source)
      console.log(list)
      list = list.map((e) => {
        return e
      })
      this.battlers = list
    },
  }
})
