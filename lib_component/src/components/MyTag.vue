<template>
<div>$props: {{$props}}</div>
</template>

<script>
export default {
  props: {
    foo_bar: { type: String,  },
    fooBar:  { type: String,  },
  },
  created() {
    console.log(this.$props)
  }
}
</script>
