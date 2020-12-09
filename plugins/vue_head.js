import { HeadGenerator } from "@/components/models/HeadGenerator.js"

export default {
  head() {
    return (new HeadGenerator(this.$config, this.meta)).generate()
  },
}
