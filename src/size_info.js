import { MemoryRecord } from "./memory_record"

class SizeInfo extends MemoryRecord {
  static get define() {
    return [
      /* eslint-disable */
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
      /* eslint-enable */
    ]
  }

  get name() {
    return this.attributes.key
  }
}

export { SizeInfo }

if (process.argv[1] === __filename) {
  console.log(SizeInfo.fetch("x-small").key)
  console.log(SizeInfo.fetch("x-small").name)
}
