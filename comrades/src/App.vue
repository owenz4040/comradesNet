<template>
  <div id="app">
    <SplashScreen v-if="showSplash" />
    <div v-show="!showSplash">
      <Navbar />
      <router-view></router-view>
      <Footer />
    </div>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import SplashScreen from './components/SplashScreen.vue'

export default {
  name: 'App',
  components: {
    Navbar,
    Footer,
    SplashScreen
  },
  data() {
    return {
      showSplash: true
    }
  },
  mounted() {
    // Hide splash screen after 3 seconds
    setTimeout(() => {
      this.showSplash = false
    }, 3000)
  }
}
</script>

<style>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
