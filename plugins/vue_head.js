import { HeadGenerator } from "@/components/models/head_generator.js"

export default {
  head() {
    return (new HeadGenerator(this.$config, this.meta)).generate()
  },
}
