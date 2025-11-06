<template>
  <div class="auth-page">
    <div class="auth-bg">
      <div class="bg-circle circle-1"></div>
      <div class="bg-circle circle-2"></div>
      <div class="bg-circle circle-3"></div>
    </div>
    
    <div class="auth-container">
      <!-- Image Section -->
      <div class="auth-image-section">
        <img src="/images/internet2.jpg" alt="Comrades WiFi" class="auth-hero-image" />
      </div>
      
      <div class="auth-card">
        <!-- Logo Section -->
        <div class="auth-logo">
          <img src="/images/logo.png" alt="Comrades WiFi" class="logo-image" />
          <span class="logo-text">Comrades <span class="wifi-text">WiFi</span></span>
        </div>
        
        <!-- Tab Switcher -->
        <div class="auth-tabs">
          <button 
            class="auth-tab" 
            :class="{ active: isLogin }"
            @click="switchToLogin"
          >
            Login
          </button>
          <button 
            class="auth-tab" 
            :class="{ active: !isLogin }"
            @click="switchToRegister"
          >
            Register
          </button>
        </div>
        
        <!-- Login Form -->
        <form v-if="isLogin" @submit.prevent="handleLogin" class="auth-form">
          <h2 class="form-title">Welcome Back! 👋</h2>
          <p class="form-subtitle">Sign in to manage your account</p>
          
          <div class="form-group">
            <label for="login-email">Email Address</label>
            <div class="input-wrapper">
              <span class="input-icon">📧</span>
              <input 
                type="email" 
                id="login-email"
                v-model="loginForm.email"
                placeholder="your@email.com"
                required
              />
            </div>
          </div>
          
          <div class="form-group">
            <label for="login-password">Password</label>
            <div class="input-wrapper">
              <span class="input-icon">🔒</span>
              <input 
                :type="showPassword ? 'text' : 'password'" 
                id="login-password"
                v-model="loginForm.password"
                placeholder="Enter your password"
                required
              />
              <button 
                type="button" 
                class="toggle-password"
                @click="showPassword = !showPassword"
              >
                {{ showPassword ? '👁️' : '👁️‍🗨️' }}
              </button>
            </div>
          </div>
          
          <div class="form-options">
            <label class="checkbox-label">
              <input type="checkbox" v-model="loginForm.remember" />
              <span>Remember me</span>
            </label>
            <a href="#" class="forgot-link">Forgot Password?</a>
          </div>
          
          <button type="submit" class="btn-submit">
            <span v-if="!loading">Login to Account</span>
            <span v-else class="loading-spinner">⏳</span>
          </button>
          
          <div class="social-login">
            <p class="divider"><span>Or continue with</span></p>
            <div class="social-buttons">
              <button type="button" class="btn-social google">
                <span class="social-icon">🔍</span>
                Google
              </button>
              <button type="button" class="btn-social facebook">
                <span class="social-icon">📘</span>
                Facebook
              </button>
            </div>
          </div>
        </form>
        
        <!-- Register Form -->
        <form v-else @submit.prevent="handleRegister" class="auth-form">
          <h2 class="form-title">Create Account 🚀</h2>
          <p class="form-subtitle">Join thousands of happy customers!</p>
          
          <div class="form-row">
            <div class="form-group">
              <label for="register-firstname">First Name</label>
              <div class="input-wrapper">
                <span class="input-icon">👤</span>
                <input 
                  type="text" 
                  id="register-firstname"
                  v-model="registerForm.firstName"
                  placeholder="John"
                  required
                />
              </div>
            </div>
            
            <div class="form-group">
              <label for="register-lastname">Last Name</label>
              <div class="input-wrapper">
                <span class="input-icon">👤</span>
                <input 
                  type="text" 
                  id="register-lastname"
                  v-model="registerForm.lastName"
                  placeholder="Doe"
                  required
                />
              </div>
            </div>
          </div>
          
          <div class="form-group">
            <label for="register-email">Email Address</label>
            <div class="input-wrapper">
              <span class="input-icon">📧</span>
              <input 
                type="email" 
                id="register-email"
                v-model="registerForm.email"
                placeholder="your@email.com"
                required
              />
            </div>
          </div>
          
          <div class="form-group">
            <label for="register-phone">Phone Number</label>
            <div class="input-wrapper">
              <span class="input-icon">📱</span>
              <input 
                type="tel" 
                id="register-phone"
                v-model="registerForm.phone"
                placeholder="+254 727 895 108"
                required
              />
            </div>
          </div>
          
          <div class="form-group">
            <label for="register-password">Password</label>
            <div class="input-wrapper">
              <span class="input-icon">🔒</span>
              <input 
                :type="showPassword ? 'text' : 'password'" 
                id="register-password"
                v-model="registerForm.password"
                placeholder="Create a strong password"
                required
              />
              <button 
                type="button" 
                class="toggle-password"
                @click="showPassword = !showPassword"
              >
                {{ showPassword ? '👁️' : '👁️‍🗨️' }}
              </button>
            </div>
            <div class="password-strength">
              <div class="strength-bar" :class="passwordStrength"></div>
            </div>
          </div>
          
          <div class="form-group">
            <label for="register-confirm">Confirm Password</label>
            <div class="input-wrapper">
              <span class="input-icon">🔒</span>
              <input 
                :type="showPassword ? 'text' : 'password'" 
                id="register-confirm"
                v-model="registerForm.confirmPassword"
                placeholder="Re-enter password"
                required
              />
            </div>
          </div>
          
          <div class="form-group">
            <label class="checkbox-label terms-label">
              <input type="checkbox" v-model="registerForm.agreeTerms" required />
              <span>I agree to the <a href="#">Terms & Conditions</a> and <a href="#">Privacy Policy</a></span>
            </label>
          </div>
          
          <button type="submit" class="btn-submit" :disabled="!registerForm.agreeTerms">
            <span v-if="!loading">Create Account</span>
            <span v-else class="loading-spinner">⏳</span>
          </button>
          
          <div class="social-login">
            <p class="divider"><span>Or register with</span></p>
            <div class="social-buttons">
              <button type="button" class="btn-social google">
                <span class="social-icon">🔍</span>
                Google
              </button>
              <button type="button" class="btn-social facebook">
                <span class="social-icon">📘</span>
                Facebook
              </button>
            </div>
          </div>
        </form>
        
        <!-- Success Message -->
        <div v-if="successMessage" class="success-banner">
          <span class="success-icon">✅</span>
          {{ successMessage }}
        </div>
        
        <!-- Error Message -->
        <div v-if="errorMessage" class="error-banner">
          <span class="error-icon">❌</span>
          {{ errorMessage }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Auth',
  data() {
    return {
      isLogin: true,
      showPassword: false,
      loading: false,
      successMessage: '',
      errorMessage: '',
      loginForm: {
        email: '',
        password: '',
        remember: false
      },
      registerForm: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        agreeTerms: false
      }
    }
  },
  computed: {
    passwordStrength() {
      const password = this.registerForm.password
      if (!password) return ''
      if (password.length < 6) return 'weak'
      if (password.length < 10) return 'medium'
      return 'strong'
    }
  },
  methods: {
    switchToLogin() {
      this.isLogin = true
      this.clearMessages()
    },
    switchToRegister() {
      this.isLogin = false
      this.clearMessages()
    },
    clearMessages() {
      this.successMessage = ''
      this.errorMessage = ''
    },
    async handleLogin() {
      this.clearMessages()
      this.loading = true
      
      // Simulate API call
      setTimeout(() => {
        this.loading = false
        this.successMessage = 'Login successful! Redirecting...'
        
        // Redirect after 2 seconds
        setTimeout(() => {
          this.$router.push('/')
        }, 2000)
      }, 1500)
    },
    async handleRegister() {
      this.clearMessages()
      
      // Validate passwords match
      if (this.registerForm.password !== this.registerForm.confirmPassword) {
        this.errorMessage = 'Passwords do not match!'
        return
      }
      
      this.loading = true
      
      // Simulate API call
      setTimeout(() => {
        this.loading = false
        this.successMessage = 'Account created successfully! Please check your email.'
        
        // Switch to login after 2 seconds
        setTimeout(() => {
          this.switchToLogin()
          this.loginForm.email = this.registerForm.email
        }, 2000)
      }, 1500)
    }
  }
}
</script>

<style scoped>
.auth-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  position: relative;
  overflow: hidden;
}

.auth-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #F5F7FA 0%, #FFFFFF 50%, #F8F9FA 100%);
  z-index: -1;
}

.bg-circle {
  position: absolute;
  border-radius: 50%;
  opacity: 0.08;
  animation: float 8s ease-in-out infinite;
}

.circle-1 {
  width: 500px;
  height: 500px;
  background: var(--gradient-red);
  top: -200px;
  right: -200px;
}

.circle-2 {
  width: 400px;
  height: 400px;
  background: var(--gradient-blue);
  bottom: -150px;
  left: -150px;
  animation-delay: 2s;
}

.circle-3 {
  width: 300px;
  height: 300px;
  background: var(--gradient-red-blue);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation-delay: 4s;
}

.auth-container {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 3rem;
  max-width: 1400px;
  width: 100%;
  align-items: stretch;
  min-height: 700px;
}

.auth-image-section {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeInUp 0.6s ease;
}

.auth-hero-image {
  width: 100%;
  height: 100%;
  min-height: 700px;
  object-fit: cover;
  border-radius: 30px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}

.auth-hero-image:hover {
  transform: scale(1.02);
  box-shadow: 0 25px 70px rgba(0, 0, 0, 0.25);
}

.auth-card {
  background: white;
  padding: 2rem;
  border-radius: 30px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  position: relative;
  animation: fadeInUp 0.8s ease;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
}

.auth-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 1.5rem;
}

.logo-image {
  height: 60px;
  width: auto;
  object-fit: contain;
  filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.1));
  transition: all 0.3s ease;
}

.logo-image:hover {
  transform: scale(1.05);
}

.logo-text {
  background: var(--gradient-red);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-family: 'Montserrat', sans-serif;
  font-size: 1.6rem;
  font-weight: 800;
}

.wifi-text {
  background: var(--gradient-blue);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.auth-tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  background: #F8F9FA;
  padding: 0.4rem;
  border-radius: 50px;
}

.auth-tab {
  flex: 1;
  padding: 0.8rem 1.5rem;
  border: none;
  background: transparent;
  border-radius: 50px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #666;
  font-family: 'Montserrat', sans-serif;
}

.auth-tab.active {
  background: var(--gradient-red-blue);
  color: white;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
}

.auth-form {
  animation: fadeInUp 0.6s ease;
}

.form-title {
  font-size: 1.6rem;
  font-weight: 800;
  margin-bottom: 0.4rem;
  background: var(--gradient-red-blue);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-family: 'Montserrat', sans-serif;
}

.form-subtitle {
  color: #666;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.4rem;
  font-weight: 600;
  color: var(--text-dark);
  font-size: 0.85rem;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 0.8rem;
  font-size: 1.1rem;
  z-index: 1;
}

.input-wrapper input {
  width: 100%;
  padding: 0.8rem 0.8rem 0.8rem 2.5rem;
  border: 2px solid #E5E7EB;
  border-radius: 12px;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  font-family: 'Poppins', sans-serif;
}

.input-wrapper input:focus {
  outline: none;
  border-color: var(--brand-blue);
  box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.1);
}

.toggle-password {
  position: absolute;
  right: 0.8rem;
  background: none;
  border: none;
  font-size: 1.1rem;
  cursor: pointer;
  padding: 0.4rem;
  transition: transform 0.2s ease;
}

.toggle-password:hover {
  transform: scale(1.1);
}

.password-strength {
  margin-top: 0.4rem;
  height: 3px;
  background: #E5E7EB;
  border-radius: 2px;
  overflow: hidden;
}

.strength-bar {
  height: 100%;
  transition: all 0.3s ease;
  border-radius: 2px;
}

.strength-bar.weak {
  width: 33%;
  background: #EF4444;
}

.strength-bar.medium {
  width: 66%;
  background: #F59E0B;
}

.strength-bar.strong {
  width: 100%;
  background: #10B981;
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.2rem;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  cursor: pointer;
  font-size: 0.8rem;
  color: #666;
}

.checkbox-label input[type="checkbox"] {
  width: 16px;
  height: 16px;
  cursor: pointer;
  accent-color: var(--brand-blue);
}

.terms-label {
  align-items: flex-start;
}

.terms-label span {
  line-height: 1.6;
}

.terms-label a {
  color: var(--brand-blue);
  text-decoration: none;
  font-weight: 600;
}

.terms-label a:hover {
  text-decoration: underline;
}

.forgot-link {
  color: var(--brand-blue);
  text-decoration: none;
  font-size: 0.8rem;
  font-weight: 600;
  transition: color 0.3s ease;
}

.forgot-link:hover {
  color: var(--brand-red);
}

.btn-submit {
  width: 100%;
  padding: 0.9rem;
  border: none;
  border-radius: 50px;
  background: var(--gradient-red-blue);
  color: white;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  font-family: 'Montserrat', sans-serif;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.btn-submit:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
}

.btn-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.loading-spinner {
  display: inline-block;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.social-login {
  margin-top: 1.5rem;
}

.divider {
  text-align: center;
  position: relative;
  margin-bottom: 1rem;
  color: #999;
  font-size: 0.85rem;
}

.divider::before,
.divider::after {
  content: '';
  position: absolute;
  top: 50%;
  width: 35%;
  height: 1px;
  background: #E5E7EB;
}

.divider::before {
  left: 0;
}

.divider::after {
  right: 0;
}

.divider span {
  background: white;
  padding: 0 1rem;
}

.social-buttons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.8rem;
}

.btn-social {
  padding: 0.7rem 0.8rem;
  border: 2px solid #E5E7EB;
  background: white;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  font-family: 'Poppins', sans-serif;
  font-size: 0.85rem;
}

.btn-social:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.btn-social.google:hover {
  border-color: #DB4437;
  color: #DB4437;
}

.btn-social.facebook:hover {
  border-color: #4267B2;
  color: #4267B2;
}

.social-icon {
  font-size: 1.1rem;
}

.success-banner,
.error-banner {
  margin-top: 0.8rem;
  padding: 0.8rem 1.2rem;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-weight: 600;
  animation: slideInRight 0.4s ease;
  font-size: 0.85rem;
}

.success-banner {
  background: #D1FAE5;
  color: #065F46;
  border: 2px solid #10B981;
}

.error-banner {
  background: #FEE2E2;
  color: #991B1B;
  border: 2px solid #EF4444;
}

.success-icon,
.error-icon {
  font-size: 1.3rem;
}

/* Responsive */
@media (max-width: 968px) {
  .auth-container {
    grid-template-columns: 1fr;
    gap: 2rem;
    min-height: auto;
  }
  
  .auth-image-section {
    order: 1;
  }
  
  .auth-card {
    padding: 2rem;
    order: 2;
  }
  
  .auth-hero-image {
    min-height: 400px;
    max-height: 500px;
  }
  
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .form-title {
    font-size: 1.4rem;
  }
}

@media (max-width: 480px) {
  .auth-page {
    padding: 1rem;
  }
  
  .auth-card {
    padding: 1.5rem;
  }
  
  .form-title {
    font-size: 1.5rem;
  }
  
  .social-buttons {
    grid-template-columns: 1fr;
  }
  
  .auth-benefits {
    padding: 2rem;
  }
}
</style>
