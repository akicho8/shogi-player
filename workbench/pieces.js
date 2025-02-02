new Vue({
  el: '#app',
  data: {
    source: [
      {name: "金", unique_key: 0, piece_stand: true},
      {name: "銀", unique_key: 1, piece_stand: false},
      {name: "歩", unique_key: 2, piece_stand: false},
      {name: "金", unique_key: 3, piece_stand: true},
      {name: "銀", unique_key: 4, piece_stand: false},
      {name: "歩", unique_key: 5, piece_stand: false},
      {name: "歩", unique_key: 6, piece_stand: false},
      {name: "歩", unique_key: 7, piece_stand: false},
      {name: "歩", unique_key: 8, piece_stand: false},
      {name: "歩", unique_key: 9, piece_stand: false},
      {name: "歩", unique_key:10, piece_stand: false},
    ],
    soldiers: [],
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
        e.piece_stand = (Math.floor(Math.random() * 2) === 0)
        return e
      })
      this.soldiers = list
    },
  }
})
