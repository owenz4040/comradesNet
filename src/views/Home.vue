<template>
  <div class="home">
    <!-- Top Banner -->
    <TopBanner />
    
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-bg">
        <div class="particle" v-for="n in particleCount" :key="n" :style="getParticleStyle(n)"></div>
      </div>
      <div class="container">
        <div class="hero-content">
          <div class="hero-text">
            <h1 class="hero-title animate-slideInLeft">
              Fast, Affordable, and Reliable Internet<br/>
              <span class="gradient-text">For Students & Professionals</span>
            </h1>
            <p class="hero-subtitle">
              Stay connected with flexible plans starting at just <strong>KSh 999/month</strong>. 
              Experience blazing-fast speeds and 24/7 support across Kenya! 🇰🇪
            </p>
            <div class="hero-buttons">
              <a href="#plans" class="btn btn-primary">
                📞 CALL TO GET CONNECTED
              </a>
              <a href="tel:0793590575" class="btn btn-phone">
                📞 0793590575
              </a>
            </div>
            <div class="hero-stats">
              <div class="stat">
                <div class="stat-number">10K+</div>
                <div class="stat-label">Happy Customers</div>
              </div>
              <div class="stat">
                <div class="stat-number">50+</div>
                <div class="stat-label">Coverage Areas</div>
              </div>
              <div class="stat">
                <div class="stat-number">24/7</div>
                <div class="stat-label">Support</div>
              </div>
            </div>
          </div>
          <div class="hero-image">
            <div class="floating-card card-1">
              <img src="https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=80&h=80&fit=crop" alt="Speed" class="card-icon" />
              <span>100 Mbps</span>
            </div>
            <div class="floating-card card-2">
              <img src="https://images.unsplash.com/photo-1556761175-b413da4baf72?w=80&h=80&fit=crop" alt="Fast" class="card-icon" />
              <span>Ultra Fast</span>
            </div>
            <div class="floating-card card-3">
              <img src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=80&h=80&fit=crop" alt="Secure" class="card-icon" />
              <span>Secure</span>
            </div>
            <div class="hero-illustration">
              <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=400&fit=crop" alt="Network" class="hero-illustration-img" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features">
      <div class="container">
        <h2 class="section-title">Why Choose Comrades WiFi?</h2>
        <p class="section-subtitle">We provide the best internet experience in Kenya</p>
        
        <div class="features-grid">
          <div class="feature-card" v-for="(feature, index) in features" :key="index">
            <div class="feature-icon">
              <img :src="feature.icon" :alt="feature.title" class="feature-icon-img" />
            </div>
            <h3>{{ feature.title }}</h3>
            <p>{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Plans Carousel -->
    <section class="plans-preview" id="plans">
      <div class="container">
        <h2 class="section-title">Choose Your Perfect Plan</h2>
        <p class="section-subtitle">Flexible, affordable, and lightning-fast internet for everyone</p>
        <PricingCarousel />
      </div>
    </section>

    <!-- Testimonials Section -->
    <Testimonials />

    <!-- Coverage Map Section -->
    <CoverageMap />

    <!-- Support Section -->
    <SupportSection />

    <!-- Referral Banner -->
    <ReferralBanner />

    <!-- CTA Section -->
    <section class="cta">
      <div class="container">
        <div class="cta-content">
          <h2>Ready to Experience Lightning-Fast Internet?</h2>
          <p>Join thousands of satisfied customers across Kenya today!</p>
          <router-link to="/auth" class="btn btn-primary btn-large">Get Connected Now</router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import TopBanner from '../components/TopBanner.vue'
import PricingCarousel from '../components/PricingCarousel.vue'
import Testimonials from '../components/Testimonials.vue'
import CoverageMap from '../components/CoverageMap.vue'
import SupportSection from '../components/SupportSection.vue'
import ReferralBanner from '../components/ReferralBanner.vue'

export default {
  name: 'Home',
  components: {
    TopBanner,
    PricingCarousel,
    Testimonials,
    CoverageMap,
    SupportSection,
    ReferralBanner
  },
  data() {
    return {
      particleCount: window.innerWidth > 768 ? 20 : 5,
      features: [
        {
          icon: '/images/fast.png',
          title: 'FAST',
          description: 'Reliable speeds for streaming, gaming, and browsing without any lag'
        },
        {
          icon: '/images/affordable.jpg',
          title: 'AFFORDABLE',
          description: 'Student-friendly prices starting at just KSh 999 per month'
        },
        {
          icon: '/images/reliable.jpg',
          title: 'RELIABLE',
          description: 'Stable connections with 99.9% uptime and 24/7 support'
        }
      ]
    }
  },
  methods: {
    getParticleStyle(n) {
      const size = Math.random() * 4 + 2
      const duration = Math.random() * 20 + 15
      const delay = Math.random() * 5
      return {
        width: `${size}px`,
        height: `${size}px`,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`,
        background: Math.random() > 0.5 ? 'rgba(220, 20, 60, 0.6)' : 'rgba(0, 102, 204, 0.6)'
      }
    }  },
  methods: {
    getParticleStyle(n) {
      const size = Math.random() * 4 + 2
      const duration = Math.random() * 20 + 15
      const delay = Math.random() * 5
      return {
        width: `${size}px`,
        height: `${size}px`,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`,
        background: Math.random() > 0.5 ? 'rgba(220, 20, 60, 0.6)' : 'rgba(0, 102, 204, 0.6)'
      }
    }  }
}
</script>

<style scoped>
/* Hero Section */
.hero {
  position: relative;
  min-height: 90vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  padding: 4rem 0;
}

.hero-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #0A0E27 0%, #1A1A3E 50%, #0F1729 100%);
  z-index: -1;
  overflow: hidden;
}

.hero-bg::before {
  content: '';
  position: absolute;
  width: 1000px;
  height: 1000px;
  background: radial-gradient(circle, rgba(220, 20, 60, 0.4), transparent 70%);
  border-radius: 50%;
  top: -400px;
  right: -400px;
  animation: float 8s ease-in-out infinite, pulse 4s ease-in-out infinite;
  filter: blur(100px);
  will-change: transform;
}

.hero-bg::after {
  content: '';
  position: absolute;
  width: 900px;
  height: 900px;
  background: radial-gradient(circle, rgba(0, 102, 204, 0.4), transparent 70%);
  border-radius: 50%;
  bottom: -350px;
  left: -350px;
  animation: float 10s ease-in-out infinite reverse, pulse 5s ease-in-out infinite;
  filter: blur(100px);
  will-change: transform;
}

@media (max-width: 768px) {
  .hero-bg::before,
  .hero-bg::after {
    animation: none;
    opacity: 0.3;
  }
}

.particle {
  position: absolute;
  border-radius: 50%;
  opacity: 0.8;
  animation: float-particle 15s ease-in-out infinite;
  box-shadow: 0 0 10px currentColor;
  will-change: transform;
}

@media (max-width: 768px) {
  .particle {
    animation: float-particle 20s ease-in-out infinite;
    opacity: 0.5;
  }
}

@keyframes float-particle {
  0%, 100% {
    transform: translate(0, 0) scale(1);
    opacity: 0.8;
  }
  25% {
    transform: translate(50px, -50px) scale(1.2);
    opacity: 1;
  }
  50% {
    transform: translate(-30px, -100px) scale(0.8);
    opacity: 0.6;
  }
  75% {
    transform: translate(-80px, -30px) scale(1.1);
    opacity: 0.9;
  }
}

.hero-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.hero-title {
  font-size: 4.5rem;
  font-weight: 900;
  line-height: 1.15;
  margin-bottom: 1.5rem;
  animation: fadeInUp 0.8s ease;
  letter-spacing: -2px;
  color: white;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.5), 0 0 40px rgba(220, 20, 60, 0.3);
  position: relative;
}

.gradient-text {
  background: var(--gradient-red-blue);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  display: inline-block;
  position: relative;
  animation: gradient-shift 4s ease infinite;
}

.gradient-text::after {
  content: attr(data-text);
  position: absolute;
  left: 0;
  top: 0;
  z-index: -1;
  background: var(--gradient-red-blue);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: blur(20px);
  opacity: 0.5;
}

.hero-subtitle strong {
  color: #FF6B8A;
  font-weight: 700;
  text-shadow: 0 0 20px rgba(255, 107, 138, 0.6);
}

.hero-subtitle {
  font-size: 1.35rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 2.5rem;
  line-height: 1.8;
  animation: fadeInUp 1s ease;
  font-weight: 400;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.hero-buttons {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 3rem;
  animation: fadeInUp 1.2s ease;
  flex-wrap: wrap;
  align-items: center;
}

.hero-buttons .btn-primary {
  font-size: 1rem;
  padding: 16px 38px;
  text-transform: uppercase;
  font-weight: 800;
  letter-spacing: 1.5px;
  box-shadow: 0 15px 40px rgba(220, 20, 60, 0.4);
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.hero-buttons .btn-primary .btn-icon-wrapper {
  width: 30px;
  height: 30px;
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;
}

.hero-buttons .btn-primary .btn-icon-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(1.2);
}

.hero-buttons .btn-primary:hover {
  box-shadow: 0 20px 50px rgba(220, 20, 60, 0.6);
}

.hero-buttons .btn-primary:hover .btn-icon-img {
  filter: brightness(1.4);
}

.btn-phone {
  background: white;
  color: var(--brand-blue);
  border: 3px solid var(--brand-blue);
  padding: 15px 35px;
  border-radius: 50px;
  font-size: 1.2rem;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 10px 30px rgba(0, 102, 204, 0.2);
  font-family: 'Montserrat', sans-serif;
  position: relative;
  overflow: hidden;
  letter-spacing: 0.5px;
}

.btn-phone::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: var(--brand-blue);
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
  z-index: -1;
}

.btn-phone:hover::before {
  width: 300%;
  height: 300%;
}

.btn-phone:hover {
  color: white;
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 15px 40px rgba(0, 102, 204, 0.4);
}

.hero-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  animation: fadeInUp 1.4s ease;
}

.stat {
  text-align: center;
  padding: 2rem 1.5rem;
  border-radius: 25px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border: 2px solid rgba(255, 255, 255, 0.15);
}

.stat:hover {
  transform: translateY(-15px) scale(1.08) rotateY(5deg);
  box-shadow: 0 25px 60px rgba(220, 20, 60, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3);
  border-color: rgba(220, 20, 60, 0.6);
  background: rgba(220, 20, 60, 0.15);
}

.stat-number {
  font-size: 3rem;
  font-weight: 900;
  color: white;
  font-family: 'Montserrat', sans-serif;
  letter-spacing: -2px;
  display: block;
  margin-bottom: 0.5rem;
  transition: all 0.4s ease;
  text-shadow: 0 4px 20px rgba(220, 20, 60, 0.5), 0 0 40px rgba(255, 107, 138, 0.4);
}

.stat:hover .stat-number {
  transform: scale(1.15);
  text-shadow: 0 4px 30px rgba(220, 20, 60, 0.8), 0 0 60px rgba(255, 107, 138, 0.6);
}

.stat-label {
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.95rem;
  font-weight: 600;
  margin-top: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 1.5px;
}

.hero-image {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.hero-illustration {
  width: 400px;
  height: 400px;
  opacity: 0.3;
  animation: float 4s ease-in-out infinite;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-illustration-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.floating-card {
  position: absolute;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(20px);
  padding: 1.3rem 2rem;
  border-radius: 25px;
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.3);
  font-weight: 700;
  animation: float 3s ease-in-out infinite;
  font-size: 1.1rem;
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  border: 2px solid rgba(255, 255, 255, 0.2);
  color: white;
}

.floating-card .card-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  object-fit: cover;
  flex-shrink: 0;
}

.card-1 {
  top: 10%;
  left: 10%;
  background: var(--gradient-red);
  color: white;
  box-shadow: 0 15px 50px rgba(220, 20, 60, 0.3);
}

.card-2 {
  top: 50%;
  right: 5%;
  background: var(--gradient-blue);
  color: white;
  animation-delay: 1s;
  box-shadow: 0 15px 50px rgba(0, 102, 204, 0.3);
}

.card-3 {
  bottom: 15%;
  left: 15%;
  background: var(--gradient-red-blue);
  color: white;
  animation-delay: 2s;
  box-shadow: 0 15px 50px rgba(220, 20, 60, 0.2);
}

/* Features Section */
.features {
  padding: 8rem 0;
  background: linear-gradient(135deg, #F8F9FA 0%, #FFFFFF 50%, #F8F9FA 100%);
  position: relative;
  overflow: hidden;
}

.features::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(220, 20, 60, 0.03) 0%, transparent 70%);
  animation: float 15s ease-in-out infinite;
}

.features::after {
  content: '';
  position: absolute;
  bottom: -50%;
  right: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(0, 102, 204, 0.03) 0%, transparent 70%);
  animation: float 20s ease-in-out infinite reverse;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3rem;
  position: relative;
  z-index: 1;
}

.feature-card {
  background: white;
  padding: 3rem 2.5rem;
  border-radius: 30px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border: 3px solid transparent;
  text-align: center;
  position: relative;
  overflow: hidden;
  animation: fadeInUp 0.8s ease backwards;
}

.feature-card:nth-child(1) {
  animation-delay: 0.1s;
}

.feature-card:nth-child(2) {
  animation-delay: 0.3s;
}

.feature-card:nth-child(3) {
  animation-delay: 0.5s;
}

.feature-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), transparent);
  transition: left 0.7s;
}

.feature-card::after {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(220, 20, 60, 0.05), transparent 70%);
  opacity: 0;
  transition: opacity 0.5s;
  animation: rotate 20s linear infinite;
}

.feature-card:hover::before {
  left: 100%;
}

.feature-card:hover::after {
  opacity: 1;
}

.feature-card:nth-child(1):hover {
  border-color: var(--brand-red);
  transform: translateY(-20px) scale(1.05) rotateZ(-2deg);
  box-shadow: 0 30px 80px rgba(220, 20, 60, 0.3);
  background: linear-gradient(135deg, #FFF5F5 0%, #FFFFFF 100%);
}

.feature-card:nth-child(2):hover {
  border-color: var(--brand-blue);
  transform: translateY(-20px) scale(1.05);
  box-shadow: 0 30px 80px rgba(0, 102, 204, 0.3);
  background: linear-gradient(135deg, #F0F7FF 0%, #FFFFFF 100%);
}

.feature-card:nth-child(3):hover {
  border-color: var(--accent-black);
  transform: translateY(-20px) scale(1.05) rotateZ(2deg);
  box-shadow: 0 30px 80px rgba(26, 26, 26, 0.3);
  background: linear-gradient(135deg, #F5F5F5 0%, #FFFFFF 100%);
}

.feature-icon {
  width: 110px;
  height: 110px;
  margin: 0 auto 2rem;
  display: block;
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border-radius: 25px;
  overflow: hidden;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  position: relative;
}

.feature-icon::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--gradient-red-blue);
  opacity: 0;
  transition: opacity 0.4s ease;
  mix-blend-mode: overlay;
}

.feature-card:hover .feature-icon::before {
  opacity: 0.3;
}

.feature-icon-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.feature-card:hover .feature-icon {
  transform: scale(1.15) translateY(-10px);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
  border-radius: 30px;
}

.feature-card:hover .feature-icon-img {
  transform: scale(1.2) rotate(5deg);
}

.feature-card h3 {
  font-size: 1.9rem;
  margin-bottom: 1rem;
  color: var(--text-dark);
  font-family: 'Montserrat', sans-serif;
  font-weight: 900;
  letter-spacing: 1px;
  transition: all 0.4s ease;
  position: relative;
  z-index: 2;
}

.feature-card:hover h3 {
  letter-spacing: 2px;
  transform: scale(1.05);
}

.feature-card p {
  color: #666;
  line-height: 1.9;
  font-size: 1.05rem;
  transition: all 0.3s ease;
  position: relative;
  z-index: 2;
}

.feature-card:hover p {
  color: #333;
  transform: translateY(5px);
}

/* Plans Preview */
.plans-preview {
  padding: 8rem 0;
  background: linear-gradient(180deg, #FFFFFF 0%, #F5F7FA 50%, #FFFFFF 100%);
  position: relative;
}

.plans-preview::before {
  content: '';
  position: absolute;
  width: 200px;
  height: 200px;
  background: url('https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=200&h=200&fit=crop') center/cover;
  opacity: 0.05;
  top: 10%;
  left: 5%;
  animation: float 10s ease-in-out infinite;
  border-radius: 50%;
}

.plans-preview::after {
  content: '';
  position: absolute;
  width: 200px;
  height: 200px;
  background: url('https://images.unsplash.com/photo-1556761175-b413da4baf72?w=200&h=200&fit=crop') center/cover;
  opacity: 0.05;
  bottom: 10%;
  right: 5%;
  animation: float 12s ease-in-out infinite reverse;
  border-radius: 50%;
}

/* CTA Section */
.cta {
  padding: 8rem 0;
  background: linear-gradient(135deg, #0A0E27 0%, #1A1A3E 100%);
  position: relative;
  overflow: hidden;
}

.cta::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: radial-gradient(circle at 30% 50%, rgba(220, 20, 60, 0.3), transparent 60%),
              radial-gradient(circle at 70% 50%, rgba(0, 102, 204, 0.3), transparent 60%);
  animation: pulse 8s ease-in-out infinite;
}

.cta::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
  animation: float 6s ease-in-out infinite;
}

.cta-content {
  text-align: center;
  color: white;
  position: relative;
  z-index: 1;
}

.cta-content h2 {
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
  font-family: 'Montserrat', sans-serif;
  font-weight: 900;
  text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.3);
  letter-spacing: -0.5px;
  line-height: 1.2;
}

.cta-content p {
  font-size: 1.4rem;
  margin-bottom: 2.5rem;
  opacity: 0.95;
  font-weight: 400;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

.btn-large {
  padding: 20px 50px;
  font-size: 1.2rem;
  background: white;
  color: var(--brand-red);
  font-family: 'Montserrat', sans-serif;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 2px;
  position: relative;
  overflow: hidden;
  border: 3px solid white;
}

.btn-large::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: var(--gradient-red-blue);
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
  z-index: -1;
}

.btn-large:hover::before {
  width: 400%;
  height: 400%;
}

.btn-large:hover {
  color: white;
  border-color: white;
  transform: translateY(-5px) scale(1.05);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
}

/* Responsive */
@media (max-width: 968px) {
  .hero {
    padding: 2rem 0;
  }
  
  .hero-content {
    grid-template-columns: 1fr;
    text-align: center;
  }
  
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-subtitle {
    font-size: 1.1rem;
  }
  
  .hero-buttons {
    justify-content: center;
    flex-wrap: wrap;
  }
  
  .hero-buttons .btn-primary {
    font-size: 0.9rem;
    padding: 14px 30px;
  }
  
  .hero-image {
    display: none;
  }
  
  .hero-stats {
    gap: 1rem;
  }
  
  .stat {
    padding: 1rem;
  }
  
  .stat-number {
    font-size: 2rem;
  }
  
  .features {
    padding: 4rem 0;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .plans-preview {
    padding: 4rem 0;
  }
  
  .cta {
    padding: 4rem 0;
  }
  
  .cta-content h2 {
    font-size: 2rem;
  }
  
  .cta-content p {
    font-size: 1.1rem;
  }
  
  .btn-large {
    font-size: 1rem;
    padding: 16px 35px;
  }
  
  .btn-phone {
    font-size: 1rem;
    padding: 12px 25px;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-subtitle {
    font-size: 1rem;
  }
  
  .hero-stats {
    grid-template-columns: 1fr;
  }
  
  .cta-content h2 {
    font-size: 1.8rem;
  }
  
  .section-title {
    font-size: 2rem;
  }
}
</style>
