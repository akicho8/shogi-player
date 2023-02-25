<template>
<div id="app">
  <pre>~/src/shogi-player/web_component/src/App.vue</pre>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/>
</div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue"

export default {
  name: "App",
  components: {
    HelloWorld,
  },
}
</script>

<style>
#app > img {
  height: 64px;
}
#app {
  text-align: center;
}
</style>
