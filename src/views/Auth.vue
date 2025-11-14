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
                autocomplete="off"
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
                autocomplete="off"
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
            <a href="#" class="forgot-link" @click.prevent="openForgotPassword">Forgot Password?</a>
          </div>
          
          <button type="submit" class="btn-submit">
            <span v-if="!loading">Login to Account</span>
            <span v-else class="loading-spinner">⏳</span>
          </button>
          
          <div class="divider"><span>or</span></div>
          
          <button type="button" class="btn-google">
            <svg class="google-icon" width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
              <g fill="none" fill-rule="evenodd">
                <path d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
                <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
                <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
                <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
              </g>
            </svg>
            Sign in with Google
          </button>
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
                  autocomplete="off"
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
                  autocomplete="off"
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
                autocomplete="off"
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
                @input="handlePhoneInput"
                @focus="ensurePhonePrefix"
                placeholder="+254"
                autocomplete="off"
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
                autocomplete="new-password"
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
                autocomplete="new-password"
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
          
          <div class="divider"><span>or</span></div>
          
          <button type="button" class="btn-google">
            <svg class="google-icon" width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
              <g fill="none" fill-rule="evenodd">
                <path d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
                <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
                <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
                <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
              </g>
            </svg>
            Sign up with Google
          </button>
        </form>
        
        <!-- Notification Popup -->
        <transition name="notification-slide">
          <div v-if="notification.show" class="notification-popup" :class="notification.type">
            <div class="notification-icon">
              <svg v-if="notification.type === 'success'" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              <svg v-if="notification.type === 'error'" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="15" y1="9" x2="9" y2="15"></line>
                <line x1="9" y1="9" x2="15" y2="15"></line>
              </svg>
              <svg v-if="notification.type === 'info'" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
            </div>
            <span class="notification-message">{{ notification.message }}</span>
          </div>
        </transition>
      </div>
    </div>
    
    <!-- OTP Verification Modal -->
    <div v-if="showOTPModal" class="modal-overlay" @click="closeOTPModal">
      <div class="modal-content" @click.stop>
        <button class="modal-close" @click="closeOTPModal">✕</button>
        <h2 class="modal-title">Verify Your Account 🔐</h2>
        <p class="modal-subtitle">
          We've sent a verification code to your email:
        </p>
        <div class="verification-info">
          <p>📧 {{ maskedEmail }}</p>
        </div>
        
        <form @submit.prevent="handleVerifyOTP" class="otp-form">
          <div class="form-group">
            <label>Enter 6-digit code</label>
            <input 
              type="text" 
              v-model="otpCode"
              placeholder="000000"
              maxlength="6"
              class="otp-input"
              required
            />
          </div>
          
          <button type="submit" class="btn-submit" :disabled="otpLoading">
            <span v-if="!otpLoading">Verify & Continue</span>
            <span v-else class="loading-spinner">⏳</span>
          </button>
          
          <div class="resend-section">
            <button 
              type="button" 
              class="btn-resend"
              @click="resendOTP"
              :disabled="resendCooldown > 0"
            >
              {{ resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend Code' }}
            </button>
          </div>
        </form>
      </div>
    </div>
    
    <!-- Forgot Password Modal -->
    <div v-if="showForgotPasswordModal" class="modal-overlay" @click="showForgotPasswordModal = false">
      <div class="modal-content" @click.stop>
        <button class="modal-close" @click="showForgotPasswordModal = false">✕</button>
        <h2 class="modal-title">Reset Password 🔑</h2>
        <p class="modal-subtitle">
          Enter your email address and we'll send you a verification code
        </p>
        
        <form @submit.prevent="handleForgotPassword" class="otp-form">
          <div class="form-group">
            <label>Email Address</label>
            <input 
              type="email" 
              v-model="forgotPasswordEmail"
              placeholder="your@email.com"
              required
            />
          </div>
          
          <button type="submit" class="btn-submit" :disabled="loading">
            <span v-if="!loading">Send Reset Code</span>
            <span v-else class="loading-spinner">⏳</span>
          </button>
        </form>
      </div>
    </div>
    
    <!-- Reset Password Modal -->
    <div v-if="showResetPasswordModal" class="modal-overlay" @click="showResetPasswordModal = false">
      <div class="modal-content" @click.stop>
        <button class="modal-close" @click="showResetPasswordModal = false">✕</button>
        <h2 class="modal-title">Enter New Password 🔐</h2>
        <p class="modal-subtitle">
          Enter the OTP code sent to {{ resetPasswordData.email }}
        </p>
        
        <form @submit.prevent="handleResetPassword" class="otp-form">
          <div class="form-group">
            <label>Verification Code</label>
            <input 
              type="text" 
              v-model="resetPasswordData.otp"
              placeholder="000000"
              maxlength="6"
              required
            />
          </div>
          
          <div class="form-group">
            <label>New Password</label>
            <input 
              :type="showPassword ? 'text' : 'password'"
              v-model="resetPasswordData.newPassword"
              placeholder="Enter new password"
              required
            />
          </div>
          
          <div class="form-group">
            <label>Confirm Password</label>
            <input 
              :type="showPassword ? 'text' : 'password'"
              v-model="resetPasswordData.confirmPassword"
              placeholder="Confirm new password"
              required
            />
          </div>
          
          <button type="submit" class="btn-submit" :disabled="loading">
            <span v-if="!loading">Reset Password</span>
            <span v-else class="loading-spinner">⏳</span>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { registerUser, signIn, sendOTP, verifyOTP, getCurrentSession, requestPasswordReset, resetPasswordWithOTP } from '@/services/api'

export default {
  name: 'Auth',
  data() {
    return {
      isLogin: true,
      showPassword: false,
      loading: false,
      successMessage: '',
      errorMessage: '',
      notification: {
        show: false,
        message: '',
        type: 'info'
      },
      showOTPModal: false,
      otpCode: '',
      otpType: 'email',
      otpLoading: false,
      resendCooldown: 0,
      pendingUserId: null,
      showForgotPasswordModal: false,
      forgotPasswordEmail: '',
      showResetPasswordModal: false,
      resetPasswordData: {
        email: '',
        otp: '',
        newPassword: '',
        confirmPassword: ''
      },
      loginForm: {
        email: '',
        password: '',
        remember: false
      },
      registerForm: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '+254',
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
    },
    maskedEmail() {
      if (!this.registerForm.email) return ''
      const [name, domain] = this.registerForm.email.split('@')
      const maskedName = name.substring(0, 2) + '***'
      return `${maskedName}@${domain}`
    },
    maskedPhone() {
      if (!this.registerForm.phone) return ''
      const phone = this.registerForm.phone.replace(/\s/g, '')
      return phone.substring(0, 4) + '***' + phone.substring(phone.length - 3)
    }
  },
  async mounted() {
    // Clear all form data on component load
    this.clearLoginForm()
    this.clearRegisterForm()
    
    // Check if user is already logged in
    try {
      const session = await getCurrentSession()
      if (session) {
        this.$router.push('/dashboard')
      }
    } catch (error) {
      // User not logged in, stay on auth page
    }

    // Clear the query parameter from URL if present
    if (this.$route.query.clearForm === 'true') {
      this.$router.replace({ path: '/auth', query: {} })
    }
  },
  methods: {
    switchToLogin() {
      this.isLogin = true
      this.clearMessages()
      this.clearLoginForm()
    },
    switchToRegister() {
      this.isLogin = false
      this.clearMessages()
      this.clearRegisterForm()
    },
    clearMessages() {
      this.successMessage = ''
      this.errorMessage = ''
    },
    clearLoginForm() {
      this.loginForm.email = ''
      this.loginForm.password = ''
      this.loginForm.remember = false
    },
    clearRegisterForm() {
      this.registerForm.firstName = ''
      this.registerForm.lastName = ''
      this.registerForm.email = ''
      this.registerForm.phone = '+254'
      this.registerForm.password = ''
      this.registerForm.confirmPassword = ''
      this.registerForm.agreeTerms = false
    },
    handlePhoneInput() {
      // Ensure phone always starts with +254
      if (!this.registerForm.phone.startsWith('+254')) {
        this.registerForm.phone = '+254'
      }
    },
    ensurePhonePrefix() {
      // Set +254 if field is empty
      if (!this.registerForm.phone || this.registerForm.phone === '') {
        this.registerForm.phone = '+254'
      }
    },
    showNotification(message, type = 'info') {
      this.notification.message = message
      this.notification.type = type
      this.notification.show = true

      setTimeout(() => {
        this.notification.show = false
      }, 3000)
    },
    async handleLogin() {
      this.clearMessages()
      this.loading = true
      
      try {
        const result = await signIn(this.loginForm.email, this.loginForm.password)
        
        if (result.session) {
          this.showNotification('Login successful! Redirecting to dashboard...', 'success')
          
          // Save session if remember me is checked
          if (this.loginForm.remember) {
            localStorage.setItem('rememberMe', 'true')
          }
          
          // Log login activity
          try {
            const { logLogin } = await import('@/services/api')
            await logLogin(result.user.id)
          } catch (logError) {
            console.error('Error logging login activity:', logError)
          }
          
          // Clear login form data
          this.loginForm.email = ''
          this.loginForm.password = ''
          this.loginForm.remember = false
          
          // Redirect to dashboard
          setTimeout(() => {
            this.$router.push('/dashboard')
          }, 1000)
        }
      } catch (error) {
        console.error('Login error:', error)
        this.showNotification(error.message || 'Login failed. Please check your credentials.', 'error')
      } finally {
        this.loading = false
      }
    },
    async handleRegister() {
      this.clearMessages()
      
      // Validate passwords match
      if (this.registerForm.password !== this.registerForm.confirmPassword) {
        this.showNotification('Passwords do not match!', 'error')
        return
      }
      
      // Validate password strength
      if (this.registerForm.password.length < 8) {
        this.showNotification('Password must be at least 8 characters long!', 'error')
        return
      }
      
      // Validate phone number format
      const phoneRegex = /^\+254[17]\d{8}$/
      const cleanPhone = this.registerForm.phone.replace(/\s/g, '')
      
      if (!phoneRegex.test(cleanPhone)) {
        this.showNotification('Please enter a valid Kenyan phone number (e.g., +254712345678)', 'error')
        return
      }
      
      this.loading = true
      
      try {
        const fullName = `${this.registerForm.firstName} ${this.registerForm.lastName}`
        
        const result = await registerUser({
          email: this.registerForm.email,
          password: this.registerForm.password,
          fullName: fullName,
          phone: cleanPhone,
          plan: '5 Mbps' // Default plan
        })
        
        if (result.success) {
          this.showNotification('Account created! Please verify your email.', 'success')
          this.pendingUserId = result.userId
          
          // In development, show OTP in console and alert
          if (import.meta.env.VITE_ENVIRONMENT === 'development' && result.emailOtp) {
            console.log('🔐 Development Mode - Email OTP:', result.emailOtp)
            console.log('📱 Development Mode - Phone OTP:', result.phoneOtp)
            alert(`DEV MODE - Email OTP: ${result.emailOtp}\nPhone OTP: ${result.phoneOtp}`)
          }
          
          // Show OTP verification modal
          this.showOTPModal = true
          this.startResendCooldown()
        } else {
          this.showNotification(result.error || 'Registration failed. Please try again.', 'error')
        }
      } catch (error) {
        console.error('Registration error:', error)
        this.showNotification(error.message || 'Registration failed. Please try again.', 'error')
      } finally {
        this.loading = false
      }
    },
    closeOTPModal() {
      this.showOTPModal = false
      this.otpCode = ''
    },
    async handleVerifyOTP() {
      this.clearMessages()
      this.otpLoading = true
      
      try {
        const identifier = this.registerForm.email
        const verificationType = 'email_verification'
        
        const result = await verifyOTP(identifier, this.otpCode, verificationType)
        
        if (result.success) {
          this.showNotification('Email verified successfully!', 'success')
          
          setTimeout(() => {
            this.closeOTPModal()
            this.showNotification('Account fully verified! You can now log in.', 'success')
            this.switchToLogin()
            this.loginForm.email = this.registerForm.email
          }, 1500)
        } else {
          this.showNotification(result.error || 'Invalid or expired OTP code', 'error')
        }
      } catch (error) {
        console.error('OTP verification error:', error)
        this.showNotification('Verification failed. Please try again.', 'error')
      } finally {
        this.otpLoading = false
      }
    },
    async resendOTP() {
      if (this.resendCooldown > 0) return
      
      try {
        const identifier = this.registerForm.email
        const verificationType = 'email_verification'
        
        const result = await sendOTP(identifier, verificationType)
        
        if (result.success) {
          this.showNotification('New OTP code sent to your email!', 'success')
          
          // In development, show OTP in console and alert
          if (import.meta.env.VITE_ENVIRONMENT === 'development' && result.otp) {
            console.log('🔐 Development Mode - EMAIL OTP:', result.otp)
            alert(`DEV MODE - Your EMAIL OTP is: ${result.otp}`)
          }
          
          this.startResendCooldown()
        } else {
          this.showNotification(result.error || 'Failed to send OTP', 'error')
        }
      } catch (error) {
        console.error('Resend OTP error:', error)
        this.showNotification('Failed to resend OTP. Please try again.', 'error')
      }
    },
    startResendCooldown() {
      this.resendCooldown = 60
      const interval = setInterval(() => {
        this.resendCooldown--
        if (this.resendCooldown <= 0) {
          clearInterval(interval)
        }
      }, 1000)
    },
    openForgotPassword() {
      this.forgotPasswordEmail = ''
      this.showForgotPasswordModal = true
    },
    async handleForgotPassword() {
      this.loading = true
      
      try {
        const result = await requestPasswordReset(this.forgotPasswordEmail)
        
        if (result.success) {
          this.showNotification('Reset code sent to your email!', 'success')
          
          // In development, show OTP in console
          if (import.meta.env.VITE_ENVIRONMENT === 'development' && result.otp) {
            console.log('🔐 Development Mode - PASSWORD RESET OTP:', result.otp)
            alert(`DEV MODE - Your PASSWORD RESET OTP is: ${result.otp}`)
          }
          
          // Close forgot password modal and open reset password modal
          this.showForgotPasswordModal = false
          this.resetPasswordData.email = this.forgotPasswordEmail
          this.showResetPasswordModal = true
        } else {
          this.showNotification(result.error || 'Failed to send reset code', 'error')
        }
      } catch (error) {
        console.error('Forgot password error:', error)
        this.showNotification('Failed to send reset code. Please try again.', 'error')
      } finally {
        this.loading = false
      }
    },
    async handleResetPassword() {
      // Validate passwords match
      if (this.resetPasswordData.newPassword !== this.resetPasswordData.confirmPassword) {
        this.showNotification('Passwords do not match!', 'error')
        return
      }
      
      // Validate password strength
      if (this.resetPasswordData.newPassword.length < 8) {
        this.showNotification('Password must be at least 8 characters long!', 'error')
        return
      }
      
      this.loading = true
      
      try {
        const result = await resetPasswordWithOTP(
          this.resetPasswordData.email,
          this.resetPasswordData.otp,
          this.resetPasswordData.newPassword
        )
        
        if (result.success) {
          this.showNotification('Password reset successful! You can now log in.', 'success')
          
          // Close modal and switch to login
          this.showResetPasswordModal = false
          this.resetPasswordData = { email: '', otp: '', newPassword: '', confirmPassword: '' }
          this.switchToLogin()
          this.loginForm.email = this.resetPasswordData.email
        } else {
          this.showNotification('Invalid or expired OTP code', 'error')
        }
      } catch (error) {
        console.error('Reset password error:', error)
        this.showNotification('Failed to reset password. Please try again.', 'error')
      } finally {
        this.loading = false
      }
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

.divider {
  text-align: center;
  position: relative;
  margin: 1.5rem 0 1rem 0;
  color: #9CA3AF;
  font-size: 0.8rem;
  text-transform: lowercase;
}

.divider::before,
.divider::after {
  content: '';
  position: absolute;
  top: 50%;
  width: 42%;
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
  padding: 0 0.8rem;
}

.btn-google {
  width: 100%;
  padding: 0.85rem 1rem;
  border: 2px solid #E5E7EB;
  background: white;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.7rem;
  font-family: 'Poppins', sans-serif;
  font-size: 0.9rem;
  color: #374151;
}

.btn-google:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  border-color: #D1D5DB;
  background: #F9FAFB;
}

.google-icon {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}

/* Notification Popup Styles */
.notification-popup {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 16px 20px;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 600;
  font-size: 14px;
  z-index: 10000;
  max-width: 400px;
  animation: slideIn 0.3s ease-out;
}

.notification-popup.success {
  background: linear-gradient(135deg, #D1FAE5 0%, #A7F3D0 100%);
  color: #065F46;
  border-left: 4px solid #10B981;
}

.notification-popup.error {
  background: linear-gradient(135deg, #FEE2E2 0%, #FECACA 100%);
  color: #991B1B;
  border-left: 4px solid #EF4444;
}

.notification-popup.info {
  background: linear-gradient(135deg, #DBEAFE 0%, #BFDBFE 100%);
  color: #1E40AF;
  border-left: 4px solid #3B82F6;
}

.notification-icon {
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  padding: 4px;
}

.notification-popup.success .notification-icon {
  background: rgba(16, 185, 129, 0.2);
  color: #065F46;
}

.notification-popup.error .notification-icon {
  background: rgba(239, 68, 68, 0.2);
  color: #991B1B;
}

.notification-popup.info .notification-icon {
  background: rgba(59, 130, 246, 0.2);
  color: #1E40AF;
}

.notification-message {
  flex: 1;
  line-height: 1.4;
}

.notification-slide-enter-active {
  animation: slideIn 0.3s ease-out;
}

.notification-slide-leave-active {
  animation: slideOut 0.3s ease-in;
}

@keyframes slideIn {
  from {
    transform: translateX(400px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slideOut {
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(400px);
    opacity: 0;
  }
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

/* OTP Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
  animation: fadeIn 0.3s ease;
}

.modal-content {
  background: white;
  padding: 2.5rem;
  border-radius: 25px;
  max-width: 500px;
  width: 90%;
  position: relative;
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.3);
  animation: slideInUp 0.4s ease;
}

.modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: #F3F4F6;
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  font-size: 1.3rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-close:hover {
  background: #E5E7EB;
  transform: rotate(90deg);
}

.modal-title {
  font-size: 1.8rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  background: var(--gradient-red-blue);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-family: 'Montserrat', sans-serif;
}

.modal-subtitle {
  color: #666;
  margin-bottom: 1rem;
  font-size: 0.95rem;
}

.verification-info {
  background: #F8F9FA;
  padding: 1rem;
  border-radius: 12px;
  margin-bottom: 1.5rem;
}

.verification-info p {
  margin: 0.5rem 0;
  color: #333;
  font-weight: 600;
  font-size: 0.9rem;
}

.otp-tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  background: #F8F9FA;
  padding: 0.4rem;
  border-radius: 50px;
}

.otp-tab {
  flex: 1;
  padding: 0.7rem 1rem;
  border: none;
  background: transparent;
  border-radius: 50px;
  font-weight: 600;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #666;
  font-family: 'Montserrat', sans-serif;
}

.otp-tab.active {
  background: var(--gradient-red-blue);
  color: white;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
}

.otp-form {
  margin-top: 1.5rem;
}

.otp-input {
  text-align: center;
  font-size: 1.5rem;
  letter-spacing: 0.5rem;
  font-weight: 700;
  font-family: 'Courier New', monospace;
}

.resend-section {
  margin-top: 1rem;
  text-align: center;
}

.btn-resend {
  background: none;
  border: none;
  color: var(--brand-blue);
  font-weight: 600;
  cursor: pointer;
  font-size: 0.9rem;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.btn-resend:hover:not(:disabled) {
  background: #F3F4F6;
}

.btn-resend:disabled {
  color: #999;
  cursor: not-allowed;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
