<template>
  <div id="app">
    <SplashScreen v-if="showSplash" />
    <div v-show="!showSplash">
      <Navbar v-if="!isDashboardRoute" />
      <router-view></router-view>
      <Footer v-if="!isDashboardRoute" />
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
  computed: {
    isDashboardRoute() {
      return this.$route.path === '/dashboard'
    }
  },
  created() {
    // Force scroll to top immediately
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0)
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
    }
  },
  mounted() {
    // Ensure page starts at top
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
    
    // Hide splash screen after 3 seconds
    setTimeout(() => {
      this.showSplash = false
      // Multiple attempts to scroll to top
      setTimeout(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
        document.documentElement.scrollTop = 0
        document.body.scrollTop = 0
      }, 0)
      
      this.$nextTick(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
        document.documentElement.scrollTop = 0
        document.body.scrollTop = 0
      })
    }, 3000)
  },
  watch: {
    showSplash(newVal) {
      if (!newVal) {
        // When splash screen hides, force scroll to top
        this.$nextTick(() => {
          window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
          document.documentElement.scrollTop = 0
          document.body.scrollTop = 0
        })
      }
    }
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
