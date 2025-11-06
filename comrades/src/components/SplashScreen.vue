<template>
  <transition name="splash-fade">
    <div v-if="isVisible" class="splash-screen">
      <div class="splash-background">
        <div class="animated-circle circle-1"></div>
        <div class="animated-circle circle-2"></div>
        <div class="animated-circle circle-3"></div>
        <div class="animated-circle circle-4"></div>
      </div>
      
      <div class="splash-content">
        <div class="logo-container">
          <img src="/images/logo.png" alt="Comrades WiFi" class="splash-logo" />
          <div class="logo-text-container">
            <h1 class="splash-title">
              <span class="comrades-text">Comrades</span>
              <span class="wifi-text">WiFi</span>
            </h1>
          </div>
        </div>
        
        <div class="tagline">
          <p>Connecting Kenya, One Home at a Time</p>
        </div>
        
        <div class="loading-container">
          <div class="loading-bar">
            <div class="loading-progress"></div>
          </div>
          <div class="loading-dots">
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
          </div>
        </div>
        
        <div class="splash-features">
          <div class="feature-badge">
            <span class="feature-icon">⚡</span>
            <span>Lightning Fast</span>
          </div>
          <div class="feature-badge">
            <span class="feature-icon">💰</span>
            <span>Affordable</span>
          </div>
          <div class="feature-badge">
            <span class="feature-icon">🛡️</span>
            <span>24/7 Support</span>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'SplashScreen',
  data() {
    return {
      isVisible: true
    }
  },
  mounted() {
    // Hide splash screen after 3 seconds
    setTimeout(() => {
      this.isVisible = false
    }, 3000)
  }
}
</script>

<style scoped>
.splash-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #FFFFFF 0%, #F5F7FA 50%, #FFFFFF 100%);
  overflow: hidden;
}

.splash-background {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.animated-circle {
  position: absolute;
  border-radius: 50%;
  opacity: 0.08;
}

.circle-1 {
  width: 500px;
  height: 500px;
  background: var(--gradient-red);
  top: -200px;
  right: -200px;
  animation: float-circle 8s ease-in-out infinite;
}

.circle-2 {
  width: 400px;
  height: 400px;
  background: var(--gradient-blue);
  bottom: -150px;
  left: -150px;
  animation: float-circle 10s ease-in-out infinite reverse;
  animation-delay: 1s;
}

.circle-3 {
  width: 300px;
  height: 300px;
  background: var(--gradient-red-blue);
  top: 50%;
  left: 10%;
  animation: float-circle 12s ease-in-out infinite;
  animation-delay: 2s;
}

.circle-4 {
  width: 350px;
  height: 350px;
  background: var(--gradient-blue-red);
  bottom: 20%;
  right: 15%;
  animation: float-circle 9s ease-in-out infinite reverse;
  animation-delay: 1.5s;
}

@keyframes float-circle {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(30px, -30px) scale(1.1);
  }
  66% {
    transform: translate(-30px, 30px) scale(0.9);
  }
}

.splash-content {
  position: relative;
  z-index: 1;
  text-align: center;
  animation: fadeInScale 0.8s ease-out;
}

@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.logo-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.splash-logo {
  width: 150px;
  height: 150px;
  object-fit: contain;
  filter: drop-shadow(0 10px 40px rgba(0, 0, 0, 0.15));
  animation: logoFloat 3s ease-in-out infinite;
}

@keyframes logoFloat {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(5deg);
  }
}

.logo-text-container {
  animation: slideInUp 0.8s ease-out 0.3s both;
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.splash-title {
  font-size: 4rem;
  font-weight: 900;
  font-family: 'Montserrat', sans-serif;
  margin: 0;
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: center;
}

.comrades-text {
  background: var(--gradient-red);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: shimmer 2s ease-in-out infinite;
}

.wifi-text {
  background: var(--gradient-blue);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: shimmer 2s ease-in-out infinite 0.5s;
}

@keyframes shimmer {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

.tagline {
  font-size: 1.3rem;
  color: #666;
  margin-bottom: 3rem;
  animation: fadeIn 1s ease-out 0.6s both;
  font-weight: 500;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.loading-container {
  margin-bottom: 3rem;
  animation: fadeIn 1s ease-out 0.9s both;
}

.loading-bar {
  width: 300px;
  height: 6px;
  background: #E5E7EB;
  border-radius: 10px;
  overflow: hidden;
  margin: 0 auto 1.5rem;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
}

.loading-progress {
  height: 100%;
  background: var(--gradient-red-blue);
  border-radius: 10px;
  animation: loadingProgress 2.5s ease-in-out infinite;
  box-shadow: 0 0 10px rgba(220, 20, 60, 0.5);
}

@keyframes loadingProgress {
  0% {
    width: 0%;
    transform: translateX(0);
  }
  50% {
    width: 70%;
  }
  100% {
    width: 100%;
    transform: translateX(0);
  }
}

.loading-dots {
  display: flex;
  justify-content: center;
  gap: 0.8rem;
}

.dot {
  width: 12px;
  height: 12px;
  background: var(--gradient-red-blue);
  border-radius: 50%;
  animation: dotBounce 1.4s ease-in-out infinite;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.dot:nth-child(1) {
  animation-delay: 0s;
}

.dot:nth-child(2) {
  animation-delay: 0.2s;
}

.dot:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes dotBounce {
  0%, 80%, 100% {
    transform: scale(0.8);
    opacity: 0.5;
  }
  40% {
    transform: scale(1.3);
    opacity: 1;
  }
}

.splash-features {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
  animation: fadeIn 1s ease-out 1.2s both;
}

.feature-badge {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 1rem 1.5rem;
  background: white;
  border-radius: 50px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  font-weight: 600;
  color: var(--text-dark);
  border: 2px solid transparent;
  transition: all 0.3s ease;
  animation: slideInBottom 0.6s ease-out both;
}

.feature-badge:nth-child(1) {
  animation-delay: 1.3s;
  border-color: rgba(220, 20, 60, 0.2);
}

.feature-badge:nth-child(2) {
  animation-delay: 1.4s;
  border-color: rgba(0, 102, 204, 0.2);
}

.feature-badge:nth-child(3) {
  animation-delay: 1.5s;
  border-color: rgba(220, 20, 60, 0.2);
}

@keyframes slideInBottom {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.feature-icon {
  font-size: 1.5rem;
}

/* Splash Fade Transition */
.splash-fade-enter-active {
  transition: opacity 0.3s ease;
}

.splash-fade-leave-active {
  transition: opacity 0.5s ease;
}

.splash-fade-enter-from,
.splash-fade-leave-to {
  opacity: 0;
}

/* Responsive */
@media (max-width: 768px) {
  .splash-logo {
    width: 100px;
    height: 100px;
  }
  
  .splash-title {
    font-size: 2.5rem;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .tagline {
    font-size: 1rem;
    padding: 0 1rem;
  }
  
  .loading-bar {
    width: 200px;
  }
  
  .splash-features {
    gap: 1rem;
    padding: 0 1rem;
  }
  
  .feature-badge {
    padding: 0.8rem 1.2rem;
    font-size: 0.9rem;
  }
  
  .feature-icon {
    font-size: 1.2rem;
  }
}

@media (max-width: 480px) {
  .splash-title {
    font-size: 2rem;
  }
  
  .splash-features {
    flex-direction: column;
    align-items: center;
  }
}
</style>
