<template>
  <nav class="navbar">
    <div class="container">
      <div class="nav-content">
        <router-link to="/" class="logo">
          <img src="/images/logo.png" alt="Comrades WiFi" class="logo-image" />
          <span class="logo-text">Comrades <span class="wifi-text">WiFi</span></span>
        </router-link>
        
        <div class="nav-links" :class="{ active: mobileMenuOpen }">
          <router-link to="/" @click="closeMobileMenu">Home</router-link>
          <router-link to="/plans" @click="closeMobileMenu">Plans</router-link>
          <router-link to="/contact" @click="closeMobileMenu">Contact</router-link>
          <router-link to="/auth" class="btn btn-primary nav-btn" @click="closeMobileMenu">Get Started</router-link>
        </div>
        
        <button class="mobile-menu-btn" @click="toggleMobileMenu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      mobileMenuOpen: false
    }
  },
  methods: {
    toggleMobileMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen
    },
    closeMobileMenu() {
      this.mobileMenuOpen = false
    }
  }
}
</script>

<style scoped>
.navbar {
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(20px);
  box-shadow: 0 5px 30px rgba(0, 0, 0, 0.08);
  position: sticky;
  top: 0;
  z-index: 1000;
  padding: 1rem 0;
  transition: all 0.3s ease;
  border-bottom: 1px solid rgba(220, 20, 60, 0.1);
}

.nav-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
}

.logo:hover {
  transform: scale(1.05);
}

.logo-image {
  height: 50px;
  width: auto;
  object-fit: contain;
  filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.1));
}

.logo-text {
  background: var(--gradient-red);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-family: 'Montserrat', sans-serif;
  font-size: 1.5rem;
  font-weight: 800;
  letter-spacing: -0.5px;
  text-shadow: 2px 2px 20px rgba(220, 20, 60, 0.2);
}

.wifi-text {
  background: var(--gradient-blue);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 2px 2px 20px rgba(0, 102, 204, 0.2);
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.nav-links a {
  text-decoration: none;
  color: var(--text-dark);
  font-weight: 600;
  transition: all 0.3s ease;
  position: relative;
}

.nav-links a:not(.btn)::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 0;
  height: 3px;
  background: var(--gradient-red-blue);
  transition: width 0.3s ease;
}

.nav-links a:not(.btn):hover::after,
.nav-links a:not(.btn).router-link-active::after {
  width: 100%;
}

.nav-links a:not(.btn):hover {
  color: var(--brand-red);
}

.nav-btn {
  padding: 10px 25px;
  font-size: 14px;
  animation: glow 3s ease-in-out infinite;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.mobile-menu-btn {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
}

.mobile-menu-btn span {
  width: 25px;
  height: 3px;
  background: var(--brand-red);
  border-radius: 3px;
  transition: all 0.3s ease;
}

@media (max-width: 768px) {
  .mobile-menu-btn {
    display: flex;
  }
  
  .nav-links {
    position: fixed;
    top: 70px;
    right: -100%;
    width: 70%;
    height: calc(100vh - 70px);
    background: white;
    flex-direction: column;
    padding: 2rem;
    box-shadow: -5px 0 30px rgba(0, 0, 0, 0.1);
    transition: right 0.3s ease;
    align-items: flex-start;
  }
  
  .nav-links.active {
    right: 0;
  }
  
  .nav-links a {
    width: 100%;
    padding: 1rem 0;
  }
}
</style>
