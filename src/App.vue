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
    // Ensure page starts at top
    window.scrollTo(0, 0)
    
    // Hide splash screen after 3 seconds
    setTimeout(() => {
      this.showSplash = false
      // Scroll to top after splash screen
      this.$nextTick(() => {
        window.scrollTo(0, 0)
      })
    }, 3000)
  }
}
</script>

<style>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
}

/* Prevent auto-scroll on page load */
body {
  overflow-anchor: none;
}
</style>
