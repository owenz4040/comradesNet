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
          
          <template v-if="isLoggedIn">
            <router-link to="/dashboard" @click="closeMobileMenu">Dashboard</router-link>
            <div class="user-menu">
              <button class="user-btn" @click="toggleUserMenu">
                <div class="user-avatar">{{ userInitial }}</div>
                <span>{{ userName }}</span>
                <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                  <path d="M1 1L6 6L11 1" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
              </button>
              <div v-if="userMenuOpen" class="user-dropdown">
                <router-link to="/dashboard" @click="closeMenus" class="dropdown-item">
                  <span>📊</span> Dashboard
                </router-link>
                <button @click="handleLogout" class="dropdown-item">
                  <span>🚪</span> Logout
                </button>
              </div>
            </div>
          </template>
          <router-link v-else to="/auth" class="btn btn-primary nav-btn" @click="closeMobileMenu">
            Get Started
          </router-link>
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
import { supabase } from '@/services/api.js'

export default {
  name: 'Navbar',
  data() {
    return {
      mobileMenuOpen: false,
      userMenuOpen: false,
      isLoggedIn: false,
      userName: 'User',
      userEmail: ''
    }
  },
  computed: {
    userInitial() {
      return this.userName.charAt(0).toUpperCase()
    }
  },
  async mounted() {
    await this.checkAuth()
    // Listen for auth state changes
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session) {
        await this.loadUserData(session.user)
      } else if (event === 'SIGNED_OUT') {
        this.isLoggedIn = false
        this.userName = 'User'
        this.userEmail = ''
      }
    })
  },
  methods: {
    async checkAuth() {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
          await this.loadUserData(user)
        }
      } catch (error) {
        console.error('Error checking auth:', error)
      }
    },
    async loadUserData(user) {
      this.isLoggedIn = true
      this.userEmail = user.email
      
      try {
        const { data: profile } = await supabase
          .from('users')
          .select('name')
          .eq('id', user.id)
          .single()
        
        this.userName = profile?.name || user.email.split('@')[0]
      } catch (error) {
        this.userName = user.email.split('@')[0]
      }
    },
    toggleMobileMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen
      this.userMenuOpen = false
    },
    toggleUserMenu() {
      this.userMenuOpen = !this.userMenuOpen
    },
    closeMobileMenu() {
      this.mobileMenuOpen = false
      this.userMenuOpen = false
    },
    closeMenus() {
      this.mobileMenuOpen = false
      this.userMenuOpen = false
    },
    async handleLogout() {
      try {
        await supabase.auth.signOut()
        this.isLoggedIn = false
        this.closeMenus()
        this.$router.push('/')
      } catch (error) {
        console.error('Error logging out:', error)
        alert('Failed to logout')
      }
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

.user-menu {
  position: relative;
}

.user-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 8px 16px;
  background: linear-gradient(135deg, rgba(220, 20, 60, 0.1), rgba(0, 102, 204, 0.1));
  border: 2px solid rgba(220, 20, 60, 0.2);
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  color: var(--text-dark);
}

.user-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  border-color: var(--brand-red);
}

.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--gradient-red-blue);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.9rem;
}

.user-dropdown {
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  background: white;
  border-radius: 15px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  min-width: 200px;
  overflow: hidden;
  animation: slideDown 0.3s ease;
  z-index: 100;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 12px 20px;
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  color: var(--text-dark);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  font-family: 'Poppins', sans-serif;
  font-size: 0.95rem;
}

.dropdown-item:hover {
  background: linear-gradient(135deg, rgba(220, 20, 60, 0.1), rgba(0, 102, 204, 0.1));
  color: var(--brand-red);
}

.dropdown-item span {
  font-size: 1.2rem;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
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
  
  .user-menu {
    width: 100%;
  }
  
  .user-btn {
    width: 100%;
    justify-content: flex-start;
  }
  
  .user-dropdown {
    position: static;
    box-shadow: none;
    margin-top: 0.5rem;
    border: 2px solid #F3F4F6;
  }
}
</style>
