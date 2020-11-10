import MemoryRecord from "js-memory-record"

export default class SizeInfo extends MemoryRecord {
  static get define() {
    return [
      
      { key: "none",      },
      { key: "xx-small",  },
      { key: "x-small",   },
      { key: "small",     },
      { key: "default",   },
      { key: "medium",    },
      { key: "large",     },
      { key: "x-large",   },
      { key: "xx-large",  },
      { key: "xxx-large", },
      
    ]
  }
}

if (process.argv[1] === __filename) {
  console.log(SizeInfo.fetch("x-small").key)
  console.log(SizeInfo.fetch("x-small").name)
}
