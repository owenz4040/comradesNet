<template>
  <div class="carousel-container">
    <h2 class="carousel-title">Our Internet Plans</h2>
    <div class="carousel-wrapper">
      <button 
        class="carousel-nav prev" 
        @click="prevSlide"
        :disabled="currentIndex === 0"
      >
        ‹
      </button>
      
      <div class="carousel-track">
        <div class="carousel-slides">
          <div 
            v-for="(plan, index) in plans" 
            :key="plan.id"
            class="carousel-slide"
            :class="{ 
              'active': index === currentIndex,
              'inactive': index !== currentIndex
            }"
            :style="getSlideStyle(index)"
          >
            <div class="plan-card-carousel" :style="{ borderColor: plan.color, background: plan.bgColor }">
              <div class="plan-badge" v-if="plan.badge">{{ plan.badge }}</div>
              
              <!-- Plan Image -->
              <div class="plan-image-wrapper">
                <img :src="plan.image" :alt="plan.speed + ' plan'" class="plan-image-svg" />
              </div>
              
              <div class="plan-icon-wrapper">
                <div class="wifi-signal">
                  <span class="signal-bar bar-1" :style="{ background: plan.gradient }"></span>
                  <span class="signal-bar bar-2" :style="{ background: plan.gradient }"></span>
                  <span class="signal-bar bar-3" :style="{ background: plan.gradient }"></span>
                  <span class="signal-bar bar-4" :style="{ background: plan.gradient }"></span>
                </div>
              </div>
              
              <h3 class="plan-speed">{{ plan.speed }}</h3>
              
              <div class="plan-pricing-main">
                <span class="currency">KSh</span>
                <span class="price-amount">{{ plan.price }}</span>
                <span class="period">/month</span>
              </div>
              
              <ul class="plan-features-list">
                <li v-for="(feature, i) in plan.features" :key="i">
                  <span class="check-mark">✓</span> {{ feature }}
                </li>
              </ul>
              
              <router-link to="/auth" class="btn-get-plan" :style="{ background: plan.gradient }">
                Get Connected
              </router-link>
            </div>
          </div>
        </div>
      </div>
      
      <button 
        class="carousel-nav next" 
        @click="nextSlide"
        :disabled="currentIndex >= plans.length - 1"
      >
        ›
      </button>
    </div>
    
    <div class="carousel-dots">
      <button 
        v-for="(plan, index) in plans" 
        :key="index"
        class="dot"
        :class="{ active: index === currentIndex }"
        @click="goToSlide(index)"
      ></button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PricingCarousel',
  data() {
    return {
      currentIndex: 0,
      autoRotateInterval: null,
      plans: [
        {
          id: 1,
          speed: '5 Mbps',
          price: '999',
          color: '#1A1A1A',
          bgColor: 'linear-gradient(135deg, #F8F9FA 0%, #FFFFFF 100%)',
          gradient: 'linear-gradient(135deg, #1A1A1A, #4A4A4A)',
          image: '/images/plan-starter.svg',
          badge: '💼 STARTER',
          features: [
            'Perfect for browsing',
            'Social media streaming',
            'Email & messaging',
            '24/7 support'
          ]
        },
        {
          id: 2,
          speed: '10 Mbps',
          price: '1,399',
          color: '#DC143C',
          bgColor: 'linear-gradient(135deg, #FFE5E5 0%, #FFFFFF 100%)',
          gradient: 'linear-gradient(135deg, #FF0000, #B22222)',
          image: '/images/plan-popular.svg',
          badge: '🔥 POPULAR',
          features: [
            'HD video streaming',
            'Fast downloads',
            'Online gaming',
            'Priority support'
          ]
        },
        {
          id: 3,
          speed: '15 Mbps',
          price: '1,799',
          color: '#0066CC',
          bgColor: 'linear-gradient(135deg, #E5F2FF 0%, #FFFFFF 100%)',
          gradient: 'linear-gradient(135deg, #0080FF, #003D80)',
          image: '/images/plan-bestvalue.svg',
          badge: '⚡ BEST VALUE',
          features: [
            'Multiple devices',
            '4K streaming ready',
            'Zero lag gaming',
            'Free router included'
          ]
        },
        {
          id: 4,
          speed: '20 Mbps',
          price: '2,199',
          color: '#4A4A4A',
          bgColor: 'linear-gradient(135deg, #F5F5F5 0%, #FFFFFF 100%)',
          gradient: 'linear-gradient(135deg, #666666, #333333)',
          image: '/images/plan-premium.svg',
          badge: '👑 PREMIUM',
          features: [
            'Ultra-fast speeds',
            'Unlimited devices',
            'Business ready',
            'Premium support'
          ]
        }
      ]
    }
  },
  methods: {
    nextSlide() {
      if (this.currentIndex < this.plans.length - 1) {
        this.currentIndex++
      } else {
        this.currentIndex = 0
      }
    },
    prevSlide() {
      if (this.currentIndex > 0) {
        this.currentIndex--
      } else {
        this.currentIndex = this.plans.length - 1
      }
    },
    goToSlide(index) {
      this.currentIndex = index
      this.resetAutoRotate()
    },
    getSlideStyle(index) {
      if (index === this.currentIndex) {
        return {
          transform: 'translateX(0) scale(1)',
          opacity: 1,
          zIndex: 10
        }
      } else if (index < this.currentIndex) {
        return {
          transform: 'translateX(-120%) scale(0.8)',
          opacity: 0.3,
          zIndex: 1
        }
      } else {
        return {
          transform: 'translateX(120%) scale(0.8)',
          opacity: 0.3,
          zIndex: 1
        }
      }
    },
    resetAutoRotate() {
      if (this.autoRotateInterval) {
        clearInterval(this.autoRotateInterval)
      }
      this.startAutoRotate()
    },
    startAutoRotate() {
      this.autoRotateInterval = setInterval(() => {
        this.nextSlide()
      }, 5000)
    }
  },
  mounted() {
    this.startAutoRotate()
  },
  beforeUnmount() {
    if (this.autoRotateInterval) {
      clearInterval(this.autoRotateInterval)
    }
  }
}
</script>

<style scoped>
.carousel-container {
  width: 100%;
  padding: 2rem 0;
}

.carousel-title {
  text-align: center;
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 3rem;
  background: var(--gradient-red-blue);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-family: 'Montserrat', sans-serif;
}

.carousel-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3rem;
  position: relative;
  min-height: 650px;
  max-width: 1400px;
  margin: 0 auto;
}

.carousel-track {
  flex: 1;
  position: relative;
  height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.carousel-slides {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.carousel-slide {
  position: absolute;
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  width: 400px;
}

.carousel-slide.active {
  opacity: 1;
  transform: translateX(0) scale(1);
  z-index: 10;
  pointer-events: auto;
}

.carousel-slide.inactive {
  pointer-events: none;
}

.plan-card-carousel {
  background: white;
  padding: 2.5rem 2rem;
  border-radius: 30px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  width: 100%;
  border: 5px solid;
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
}

.plan-card-carousel::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 200px;
  z-index: 0;
  opacity: 0.5;
}

.carousel-slide.active .plan-card-carousel {
  transform: translateY(-10px);
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.25);
}

.plan-image-wrapper {
  position: relative;
  z-index: 1;
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;
}

.plan-image-svg {
  width: 180px;
  height: 180px;
  filter: drop-shadow(0 10px 30px rgba(0, 0, 0, 0.25));
  animation: float 3s ease-in-out infinite;
  transition: all 0.3s ease;
}

.carousel-slide.active .plan-image-svg {
  transform: scale(1.05);
  filter: drop-shadow(0 15px 40px rgba(0, 0, 0, 0.35));
}

.plan-badge {
  position: absolute;
  top: -18px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--gradient-red-blue);
  color: white;
  padding: 0.6rem 2rem;
  border-radius: 50px;
  font-size: 0.9rem;
  font-weight: 800;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  white-space: nowrap;
  z-index: 20;
  font-family: 'Montserrat', sans-serif;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.plan-icon-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.wifi-signal {
  display: flex;
  align-items: flex-end;
  gap: 4px;
  height: 50px;
}

.signal-bar {
  width: 8px;
  background: var(--gradient-blue-red);
  border-radius: 3px;
  animation: signal-pulse 1.5s ease-in-out infinite;
}

.bar-1 {
  height: 20%;
  animation-delay: 0s;
}

.bar-2 {
  height: 40%;
  animation-delay: 0.2s;
}

.bar-3 {
  height: 60%;
  animation-delay: 0.4s;
}

.bar-4 {
  height: 80%;
  animation-delay: 0.6s;
}

@keyframes signal-pulse {
  0%, 100% { opacity: 0.4; }
  50% { opacity: 1; }
}

.plan-speed {
  font-size: 2.5rem;
  font-weight: 800;
  text-align: center;
  margin-bottom: 1rem;
  color: var(--text-dark);
  font-family: 'Montserrat', sans-serif;
}

.plan-pricing-main {
  text-align: center;
  margin-bottom: 1.5rem;
  padding: 1rem 0;
  border-top: 2px solid #f0f0f0;
  border-bottom: 2px solid #f0f0f0;
}

.currency {
  font-size: 1rem;
  color: #666;
  font-weight: 600;
}

.price-amount {
  font-size: 2.5rem;
  font-weight: 800;
  background: var(--gradient-red-blue);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0 0.3rem;
  font-family: 'Montserrat', sans-serif;
}

.period {
  font-size: 0.9rem;
  color: #666;
}

.plan-features-list {
  list-style: none;
  margin-bottom: 1.5rem;
  padding: 0;
}

.plan-features-list li {
  padding: 0.7rem 0;
  color: #666;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.95rem;
}

.check-mark {
  color: var(--brand-blue);
  font-weight: bold;
  font-size: 1.2rem;
}

.btn-get-plan {
  display: block;
  width: 100%;
  padding: 1rem;
  border: none;
  border-radius: 50px;
  color: white;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
  font-family: 'Montserrat', sans-serif;
  text-transform: uppercase;
  letter-spacing: 1px;
  text-decoration: none;
  text-align: center;
}

.btn-get-plan:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
}

.carousel-nav {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  border: none;
  background: var(--gradient-red-blue);
  color: white;
  font-size: 2.5rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  flex-shrink: 0;
}

.carousel-nav:hover:not(:disabled) {
  transform: scale(1.15);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
}

.carousel-nav:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: scale(0.95);
}

.carousel-dots {
  display: flex;
  justify-content: center;
  gap: 1.2rem;
  margin-top: 3rem;
}

.dot {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 3px solid var(--brand-blue);
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
}

.dot.active {
  background: var(--gradient-red-blue);
  transform: scale(1.4);
  border-color: transparent;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.dot:hover {
  transform: scale(1.3);
  border-color: var(--brand-red);
}

/* Responsive */
@media (max-width: 968px) {
  .carousel-wrapper {
    gap: 1rem;
    min-height: 550px;
  }
  
  .carousel-nav {
    width: 50px;
    height: 50px;
    font-size: 2rem;
  }
  
  .carousel-track {
    height: 500px;
  }
  
  .carousel-slide {
    width: 320px;
  }
  
  .plan-image-svg {
    width: 140px;
    height: 140px;
  }
}

@media (max-width: 480px) {
  .carousel-title {
    font-size: 1.8rem;
  }
  
  .carousel-wrapper {
    min-height: 500px;
  }
  
  .carousel-nav {
    width: 45px;
    height: 45px;
    font-size: 1.8rem;
  }
  
  .carousel-slide {
    width: 280px;
  }
  
  .plan-card-carousel {
    padding: 2rem 1.5rem;
  }
  
  .plan-image-svg {
    width: 120px;
    height: 120px;
  }
  
  .plan-speed {
    font-size: 2rem;
  }
  
  .price-amount {
    font-size: 2rem;
  }
}
</style>
