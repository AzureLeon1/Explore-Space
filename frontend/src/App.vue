<template>
  <div id="app">
    <div v-if="$route.name !== 'Login'" style="position: fixed; z-index: 10; top: 120px;">
      <navi />
    </div>
    <div>
      <router-view/>
    </div>
  </div>
</template>

<script>
import Navi from './components/Navi.vue'
export default {
  name: 'App',
  components: {
    Navi
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
