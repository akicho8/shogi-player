<template>
<div>
  <div>$props: {{$props}}</div>
  <div>$attrs: {{$attrs}}</div>
</div>
</template>

<script>
export default {
  props: {
    foo_bar: { type: String,  },
    fooBar:  { type: String,  },
  },
  created() {
    console.log(this.$props)
    console.log(this.$attrs)
  },
}
</script>

<style>
:host {
  display: block;
  background-color: blue;
  height: 300px;
}
</style>
