<script setup>
import { ref } from 'vue'

defineProps({
  fooBar: String,
})

const count = ref(0)
</script>

<template>
  <h1>{{ fooBar }}</h1>
  <button type="button" @click="count++">count is {{ count }}</button>
</template>

<style scoped>
</style>
