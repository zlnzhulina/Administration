<template>
  <div id="app">
    <router-view/>
<header-com v-if="this.$route.meta.flag"></header-com>
  </div>
</template>

<script>
import Header from "./components/header"
export default {
  components:{
    "header-com":Header
  },
  name: 'App'
}
</script>

<style>
a{
  text-decoration: none;
}
#app {
  width: 100%;
  height: 100%;
  overflow: visible;
  position: relative;
}
</style>
